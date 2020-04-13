import SharedElementSceneData, {
  SharedElementSceneEventType
} from "./SharedElementSceneData";
import {
  SharedElementEventSubscription,
  SharedElementsStrictConfig,
  SharedElementAnimatedValue,
  SharedElementTransitionProps,
  Route
} from "./types";
import { normalizeSharedElementsConfig } from "./utils";

export type SharedElementRendererUpdateHandler = () => any;

export interface ISharedElementRendererData {
  startTransition(
    closing: boolean,
    navigatorId: string,
    nestingDepth: number
  ): void;
  endTransition(
    closing: boolean,
    navigatorId: string,
    nestingDepth: number
  ): void;
  updateSceneState(
    sceneData: SharedElementSceneData,
    route: Route,
    sceneEvent: SharedElementSceneEventType
  ): void;
  readonly nestingDepth: number;
  addDebugRef(): number;
  releaseDebugRef(): number;
}

function getSharedElements(
  sceneData: SharedElementSceneData,
  otherSceneData: SharedElementSceneData,
  showing: boolean
): SharedElementsStrictConfig | null {
  const { sharedElements } = sceneData.Component;
  if (!sharedElements) return null;
  return normalizeSharedElementsConfig(
    sharedElements(sceneData.navigation, otherSceneData.navigation, showing)
  );
}

const NO_SHARED_ELEMENTS: any[] = [];

type SceneRoute = {
  scene: SharedElementSceneData;
  route: Route;
  subscription: SharedElementEventSubscription | null;
};

/**
 * TODO
 * - [ ] Not all lifecycle events not emitted by stack when using gestures (close modal)
 */

export default class SharedElementRendererData
  implements ISharedElementRendererData {
  private scenes: SceneRoute[] = [];
  private updateSubscribers = new Set<SharedElementRendererUpdateHandler>();
  private sharedElements: SharedElementsStrictConfig | null = null;
  private isShowing: boolean = true;

  private route: Route | null = null;
  private prevRoute: Route | null = null;
  private routeAnimValue: SharedElementAnimatedValue;

  private scene: SharedElementSceneData | null = null;
  private prevScene: SharedElementSceneData | null = null;
  private sceneAnimValue: SharedElementAnimatedValue;

  private isTransitionStarted: boolean = false;
  private isTransitionClosing: boolean = false;
  private transitionNavigatorId: string = "";
  private transitionNestingDepth: number = -1;

  public debugRefCount: number = 0;

  startTransition(closing: boolean, navigatorId: string, nestingDepth: number) {
    if (this.debug)
      console.debug(
        `[${navigatorId}]startTransition, closing: ${closing}, nestingDepth: ${nestingDepth}`
      );

    if (!this.isTransitionStarted || this.route) {
      this.prevRoute = this.route;
      this.route = null;
      this.routeAnimValue = null;

      // When a transition wasn't completely fully, but a new transition
      // has already started, then the `willBlur` event is not called.
      // For this particular case, we capture the animation-value of the
      // last (previous) scene that is now being hidden.
      if (this.isTransitionStarted) {
        const scene = this.getScene(this.prevRoute);
        if (scene) {
          this.routeAnimValue = scene.getAnimValue(true);
        }
      }

      this.isTransitionStarted = true;
      this.isTransitionClosing = closing;
      this.transitionNavigatorId = navigatorId;
      this.transitionNestingDepth = nestingDepth;
    } else {
      // When navigators are nested, `startTransition` may be called multiple
      // times. In such as case, we want to use the most shallow navigator,
      // as that is the one doing the transition.
      if (nestingDepth < this.transitionNestingDepth) {
        this.transitionNavigatorId = navigatorId;
        this.transitionNestingDepth = nestingDepth;
      }
    }
  }

  endTransition(closing: boolean, navigatorId: string, nestingDepth: number) {
    if (this.debug)
      console.debug(
        `[${navigatorId}]endTransition, closing: ${closing}, nestingDepth: ${nestingDepth}`
      );

    if (
      !this.isTransitionStarted ||
      this.transitionNavigatorId !== navigatorId
    ) {
      return;
    }

    this.isTransitionStarted = false;

    if (this.prevRoute != null) {
      this.prevRoute = null;
      this.routeAnimValue = null;
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  updateSceneState(
    sceneData: SharedElementSceneData,
    route: Route,
    sceneEvent: SharedElementSceneEventType
  ): void {
    switch (sceneEvent) {
      case "willFocus":
        return this.willFocusScene(sceneData, route);
      case "didFocus":
        return this.didFocusScene(sceneData, route);
      //case "willBlur":
      //return this.willBlurScene(sceneData, route);
    }
  }

  addDebugRef(): number {
    return ++this.debugRefCount;
  }

  releaseDebugRef(): number {
    return --this.debugRefCount;
  }

  get debug() {
    return this.debugRefCount > 0;
  }

  willFocusScene(sceneData: SharedElementSceneData, route: Route): void {
    if (this.debug)
      console.debug(
        `[${sceneData.navigatorId}]willFocus, scene: "${sceneData.name}", depth: ${sceneData.nestingDepth}, closing: ${this.isTransitionClosing}`
      );
    this.registerScene(sceneData, route);

    // Wait for a transition start, before starting any animations
    if (!this.isTransitionStarted) return;

    // Use the animation value from the navigator that
    // started the transition
    if (this.prevRoute) {
      const scene = this.isTransitionClosing
        ? this.getScene(this.prevRoute)
        : sceneData;
      if (scene?.navigatorId === this.transitionNavigatorId) {
        this.routeAnimValue = scene?.getAnimValue(this.isTransitionClosing);
      }
    }

    // In case of nested navigators, multiple scenes will become
    // activated. Make sure to use the scene that is nested most deeply,
    // as this will be the one visible to the user
    if (!this.route) {
      this.route = route;
    } else {
      const routeScene = this.getScene(this.route);
      if (routeScene && routeScene.nestingDepth <= sceneData.nestingDepth) {
        this.route = route;
      }
    }

    // Update transition
    if (this.prevRoute && this.route && this.routeAnimValue) {
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  didFocusScene(sceneData: SharedElementSceneData, route: Route): void {
    if (this.debug)
      console.debug(
        `[${sceneData.navigatorId}]didFocus, scene: "${sceneData.name}", depth: ${sceneData.nestingDepth}`
      );

    if (!this.route || this.prevRoute) {
      this.route = route;
    } else {
      const routeScene = this.getScene(this.route);
      if (routeScene && routeScene.nestingDepth <= sceneData.nestingDepth) {
        this.route = route;
      }
    }
    this.registerScene(sceneData, route);
  }

  /*willBlurScene(
    sceneData: SharedElementSceneData,
    // @ts-ignore
    route: Route // eslint-disable-line @typescript-eslint/no-unused-vars
  ): void {
    if (this.debug)
      console.debug(
        `[${sceneData.navigatorId}]willBlur, scene: "${sceneData.name}", depth: ${sceneData.nestingDepth}`
      );

    // Wait for a transition start, before starting any animations
    if (!this.isTransitionStarted) return;

    // Use the animation value from the navigator that
    // started the transition
    if (
      this.isTransitionClosing &&
      sceneData.navigatorId === this.transitionNavigatorId &&
      !this.routeAnimValue
    ) {
      this.routeAnimValue = sceneData.getAnimValue(this.isTransitionClosing);
    }

    // Update transition
    if (this.prevRoute && this.route && this.routeAnimValue) {
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }*/

  private registerScene(sceneData: SharedElementSceneData, route: Route) {
    this.scenes.push({
      scene: sceneData,
      route,
      subscription: null
    });
    if (this.scenes.length > 10) {
      const { subscription } = this.scenes[0];
      this.scenes.splice(0, 1);
      if (subscription) subscription.remove();
    }
    this.updateSceneListeners();
  }

  private updateSceneListeners() {
    this.scenes.forEach(sceneRoute => {
      const { scene, route, subscription } = sceneRoute;
      const isActive =
        (this.route && this.route.key === route.key) ||
        (this.prevRoute && this.prevRoute.key === route.key);
      if (isActive && !subscription) {
        sceneRoute.subscription = scene.addUpdateListener(() => {
          // TODO optimize
          this.emitUpdateEvent();
        });
      } else if (!isActive && subscription) {
        sceneRoute.subscription = null;
        subscription.remove();
      }
    });
  }

  private getScene(route: Route | null): SharedElementSceneData | null {
    const sceneRoute = route
      ? this.scenes.find(sc => sc.route.key === route.key)
      : undefined;
    return sceneRoute ? sceneRoute.scene : null;
  }

  private updateSharedElements() {
    const { route, prevRoute, routeAnimValue } = this;
    const scene = this.getScene(route);
    const prevScene = this.getScene(prevRoute);
    const sceneAnimValue = routeAnimValue;

    // Update current scene & previous scene
    if (
      scene === this.scene &&
      prevScene === this.prevScene &&
      sceneAnimValue === this.sceneAnimValue
    )
      return;
    this.scene = scene;
    this.prevScene = prevScene;
    this.sceneAnimValue = sceneAnimValue;

    // Update shared elements
    let sharedElements: SharedElementsStrictConfig | null = null;
    let isShowing = true;
    if (sceneAnimValue && scene && prevScene) {
      sharedElements = getSharedElements(scene, prevScene, true);
      if (!sharedElements) {
        isShowing = false;
        sharedElements = getSharedElements(prevScene, scene, false);
      }
    }
    if (this.sharedElements !== sharedElements) {
      if (this.debug) {
        if (sharedElements) {
          console.debug(
            `Transition start: "${prevScene?.name}" -> "${
              scene?.name
            }", elements: ${JSON.stringify(sharedElements, undefined, 2)}`
          );
        } else {
          console.debug(`Transition end: "${scene?.name}"`);
        }
      }
      this.sharedElements = sharedElements;
      this.isShowing = isShowing;
      /*console.log(
        'updateSharedElements: ',
        sharedElements,
        ' ,isShowing: ',
        isShowing,
        ', animValue: ',
        animValue
      );*/
      this.emitUpdateEvent();
    }
  }

  addUpdateListener(
    handler: SharedElementRendererUpdateHandler
  ): SharedElementEventSubscription {
    this.updateSubscribers.add(handler);
    return {
      remove: () => this.updateSubscribers.delete(handler)
    };
  }

  private emitUpdateEvent(): void {
    this.updateSubscribers.forEach(handler => handler());
  }

  getTransitions(): SharedElementTransitionProps[] {
    const {
      sharedElements,
      prevScene,
      scene,
      isShowing,
      sceneAnimValue,
      route
    } = this;

    if (!sharedElements || !scene || !prevScene || !route)
      return NO_SHARED_ELEMENTS;
    return sharedElements.map(({ id, otherId, ...other }) => {
      const startId = isShowing ? otherId || id : id;
      const endId = isShowing ? id : otherId || id;
      return {
        key: route.key,
        position: sceneAnimValue,
        start: {
          ancestor: (prevScene ? prevScene.getAncestor() : undefined) || null,
          node: (prevScene ? prevScene.getNode(startId) : undefined) || null
        },
        end: {
          ancestor: (scene ? scene.getAncestor() : undefined) || null,
          node: (scene ? scene.getNode(endId) : undefined) || null
        },
        ...other
      };
    });
  }

  get nestingDepth(): number {
    return 0;
  }
}
