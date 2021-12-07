import { SharedElementCompatRouteProxy } from "./SharedElementCompatRouteProxy";
import SharedElementSceneData, {
  SharedElementSceneEventType,
} from "./SharedElementSceneData";
import {
  SharedElementEventSubscription,
  SharedElementsStrictConfig,
  SharedElementAnimatedValue,
  SharedElementTransitionProps,
  SharedElementRoute,
} from "./types";
import { normalizeSharedElementsConfig } from "./utils";

export type SharedElementRendererUpdateHandler = () => any;

export interface ISharedElementRendererData {
  updateSceneState(
    eventType: SharedElementSceneEventType,
    scene: SharedElementSceneData
  ): void;
  readonly nestingDepth: number;
  addDebugRef(): number;
  releaseDebugRef(): number;
}

function getSharedElements(
  scene: SharedElementSceneData,
  otherScene: SharedElementSceneData,
  showing: boolean
): SharedElementsStrictConfig | null {
  const sharedElements = scene.getSharedElements();
  if (!sharedElements) return null;
  return normalizeSharedElementsConfig(
    sharedElements(
      new SharedElementCompatRouteProxy(scene.route),
      new SharedElementCompatRouteProxy(otherScene.route),
      showing
    )
  );
}

const NO_SHARED_ELEMENTS: any[] = [];

type SceneRoute = {
  scene: SharedElementSceneData;
  subscription: SharedElementEventSubscription | null;
};

/**
 * TODO
 * - [ ] Not all lifecycle events not emitted by stack when using gestures (close modal)
 */

export default class SharedElementRendererData
  implements ISharedElementRendererData
{
  private scenes: SceneRoute[] = [];
  private updateSubscribers = new Set<SharedElementRendererUpdateHandler>();

  // Data for detecting route changes. `nextRoute` indicates the route being
  // navigated to (being shown). `prevRoute` indicates the route the navigator
  // is coming from (being hidden). `routeAnimValue` is the Animated.Value,
  // going from 0 (prev route shown) to 1 (new route shown). All three need
  // to be set in order for a shared-element transition to happen.
  // This data is collected through a combination of `focus`, `startTransition`
  // and `endTransition` events that are emitted by the router.
  private route: SharedElementRoute | null = null;
  private nextRoute: SharedElementRoute | null = null;
  private prevRoute: SharedElementRoute | null = null;
  private routeAnimValue: SharedElementAnimatedValue;
  private isTransitionStarted: boolean = false;
  private isTransitionClosing: boolean = false;
  private transitionNavigatorId: string = "";
  private transitionNestingDepth: number = -1;

  private sharedElements: SharedElementsStrictConfig | null = null;
  private isShowing: boolean = true;
  private nextScene: SharedElementSceneData | null = null;
  private prevScene: SharedElementSceneData | null = null;
  private sceneAnimValue: SharedElementAnimatedValue;

  public debugRefCount: number = 0;

  updateSceneState(
    eventType: SharedElementSceneEventType,
    scene: SharedElementSceneData
  ): void {
    if (this.debug) {
      const { navigatorId, nestingDepth } = scene;
      console.debug(
        `[${navigatorId}]${eventType}, nestingDepth: ${nestingDepth}, scene: "${scene.name}"`
      );
    }

    // Initialize current route if needed
    if (!this.route && scene.route) this.route = scene.route;
    if (!this.prevRoute && this.route) this.prevRoute = this.route;

    const isNative = false;
    if (isNative) {
      switch (eventType) {
        case "willFocus":
          // TODO
          break;
        case "willBlur":
          // TODO
          break;
        /* case "startOpenTransition":
        case "startClosingTransition":
          {
            const closing = eventType === "startClosingTransition";
            this.startSceneTransition(scene, closing);
          }
          break; */
        case "endOpenTransition":
        case "endClosingTransition":
          // const closing = eventType === "endClosingTransition";
          // this.endSceneTransition(scene, closing);
          this.endTransitions();
          break;
        /* case "updateAnimValue":
          break; */
      }
    } else {
      // Traditional implementation
      switch (eventType) {
        case "willFocus":
          this.registerScene(scene);
          this.updateNextRoute(scene);
          break;
        case "didFocus":
          this.route = scene.route;
          this.registerScene(scene);
          break;
        case "startOpenTransition":
        case "startClosingTransition":
          {
            const closing = eventType === "startClosingTransition";
            this.startSceneTransition(scene, closing);
          }
          break;
        case "endOpenTransition":
        case "endClosingTransition":
          // const closing = eventType === "endClosingTransition";
          // this.endSceneTransition(scene, closing);
          this.endTransitions();
          break;
      }
    }

    this.startTransitionsIfNeeded();
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

  private startTransitionsIfNeeded() {
    if (this.prevRoute && this.nextRoute && this.routeAnimValue) {
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  private endTransitions() {
    if (this.nextRoute || this.prevRoute || this.routeAnimValue) {
      this.nextRoute = null;
      this.prevRoute = null;
      this.routeAnimValue = null;
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  private startSceneTransition(
    scene: SharedElementSceneData,
    closing: boolean
  ) {
    // NOTE: For react-navigation 4, only the navigatorId and nestingDepth fields are supported
    // so do not use any of the other fields here, because doing so will [break stuff](https://www.youtube.com/watch?v=ZpUYjpKg9KY)
    /* const { navigatorId, nestingDepth } = scene;

    if (scene.route) {
      if (!this.route && !closing) this.route = scene.route;
      if (!this.prevRoute && closing) this.prevRoute = scene.route;
      if (!this.nextRoute && !closing) this.nextRoute = scene.route;
    }

    // Try to get the animated-value from the routes
    if (closing && this.prevRoute) {
      const scene = this.getScene(this.prevRoute);
      if (scene?.navigatorId === navigatorId) {
        this.routeAnimValue = scene?.getAnimValue(false);
      }
    } // else if (!closing && this.nextRoute) {
    // const scene = this.getScene(this.nextRoute);
    // if (scene?.navigatorId === navigatorId) {
    //  this.routeAnimValue = scene?.getAnimValue(false);
    // }
    // }

    if (!this.isTransitionStarted || this.nextRoute) {
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

    console.log(
      `Prev-route: ${this.prevRoute?.name}, Next-route:  ${this.nextRoute?.name}, anim-value: ${this.routeAnimValue}`
    );

    this.startTransitionsIfNeeded();
     */
  }

  /* private endSceneTransition(scene: SharedElementSceneData, closing: boolean) {
    // NOTE: For react-navigation 4, only the navigatorId and nestingDepth fields are supported
    // so do not use any of the other fields here, because doing so will [break stuff](https://www.youtube.com/watch?v=ZpUYjpKg9KY)
    // const { navigatorId } = scene;

    if (
      !this.isTransitionStarted ||
      this.transitionNavigatorId !== navigatorId
    ) {
      return;
    }

    this.isTransitionStarted = false;

    // End transitions
    this.endTransitions();
  } */

  private updateNextRoute(scene: SharedElementSceneData) {
    // In case of nested navigators, multiple scenes will become
    // activated. Make sure to use the scene that is nested most deeply,
    // as this will be the one visible to the user
    if (!this.nextRoute) {
      this.nextRoute = scene.route;
    } else {
      const nextScene = this.getScene(this.nextRoute);
      if (nextScene && nextScene.nestingDepth <= scene.nestingDepth) {
        this.nextRoute = scene.route;
      }
    }
  }

  private willFocusScene(scene: SharedElementSceneData) {
    this.registerScene(scene);
    this.updateNextRoute(scene);

    // Try to get the animated-value from the routes
    /* if (this.isTransitionStarted) {
      if (this.isTransitionClosing && this.prevRoute) {
        const scene = this.getScene(this.prevRoute);
        if (scene?.navigatorId === this.transitionNavigatorId) {
          this.routeAnimValue = scene?.getAnimValue(true);
        }
      } else if (!this.isTransitionClosing && this.nextRoute) {
        const scene = this.getScene(this.nextRoute);
        if (scene?.navigatorId === this.transitionNavigatorId) {
          this.routeAnimValue = scene?.getAnimValue(false);
        }
      }
    } */

    /* if (this.nextRoute && this.prevRoute && !this.routeAnimValue) {
      const nextScene = this.getScene(this.nextRoute);
      const prevScene = this.getScene(this.prevRoute);
      this.routeAnimValue =
        nextScene?.getAnimValue(false) ?? prevScene?.getAnimValue(false);
    }*/

    this.startTransitionsIfNeeded();
  }

  /* private didFocusScene(scene: SharedElementSceneData) {
    if (!this.route || !this.prevRoute) {
      this.route = scene.route;
    } else {
      const routeScene = this.getScene(this.route);
      if (routeScene && routeScene.nestingDepth <= scene.nestingDepth) {
        this.route = scene.route;
      }
    }

    this.registerScene(scene);
  } */

  private registerScene(scene: SharedElementSceneData) {
    this.scenes.push({
      scene,
      subscription: null,
    });
    if (this.scenes.length > 10) {
      const { subscription } = this.scenes[0];
      this.scenes.splice(0, 1);
      subscription?.();
    }
    this.updateSceneListeners();
  }

  private updateSceneListeners() {
    this.scenes.forEach((sceneRoute) => {
      const { scene, subscription } = sceneRoute;
      const isActive =
        (this.nextRoute && this.nextRoute.key === scene.route.key) ||
        (this.prevRoute && this.prevRoute.key === scene.route.key);
      if (isActive && !subscription) {
        sceneRoute.subscription = scene.addUpdateListener(() => {
          // TODO: optimize?
          this.emitUpdateEvent();
        });
      } else if (!isActive && subscription) {
        sceneRoute.subscription = null;
        subscription();
      }
    });
  }

  private getScene(
    route: SharedElementRoute | null
  ): SharedElementSceneData | null {
    const sceneRoute = route
      ? this.scenes.find((sc) => sc.scene.route.key === route.key)
      : undefined;
    return sceneRoute ? sceneRoute.scene : null;
  }

  private updateSharedElements() {
    const { nextRoute, prevRoute, routeAnimValue } = this;
    const nextScene = this.getScene(nextRoute);
    const prevScene = this.getScene(prevRoute);
    const sceneAnimValue = routeAnimValue;

    // Update current scene & previous scene
    if (
      nextScene === this.nextScene &&
      prevScene === this.prevScene &&
      sceneAnimValue === this.sceneAnimValue
    )
      return;
    console.log(
      `Next scene changed: ${
        nextScene === this.nextScene ? "NO" : "YES"
      }, Prev scene changed: ${
        prevScene === this.prevScene ? "NO" : "YES"
      }, Anim-value changed: ${
        sceneAnimValue === this.sceneAnimValue ? "NO" : "YES"
      }`
    );

    this.nextScene = nextScene;
    this.prevScene = prevScene;
    this.sceneAnimValue = sceneAnimValue;

    // Update shared elements
    let sharedElements: SharedElementsStrictConfig | null = null;
    let isShowing = true;
    if (sceneAnimValue && nextScene && prevScene && nextRoute && prevRoute) {
      sharedElements = getSharedElements(nextScene, prevScene, true);
      if (!sharedElements) {
        isShowing = false;
        sharedElements = getSharedElements(prevScene, nextScene, false);
      }
    }
    if (this.sharedElements !== sharedElements) {
      if (this.debug) {
        if (sharedElements) {
          console.debug(
            `Transition start: "${prevScene?.name}" -> "${
              nextScene?.name
            }", elements: ${JSON.stringify(sharedElements, undefined, 2)}`
          );
        } else {
          console.debug(`Transition end: "${nextScene?.name}"`);
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
    return () => this.updateSubscribers.delete(handler);
  }

  private emitUpdateEvent(): void {
    this.updateSubscribers.forEach((handler) => handler());
  }

  getTransitions(): SharedElementTransitionProps[] {
    const { sharedElements, prevScene, nextScene, isShowing, sceneAnimValue } =
      this;

    if (!sharedElements || !nextScene || !prevScene) {
      console.log("NO TRANSITIONS");
      return NO_SHARED_ELEMENTS;
    }
    console.log("TRANSITIONS: ", sharedElements.length);
    return sharedElements.map(({ id, otherId, ...other }) => {
      const startId = isShowing ? otherId || id : id;
      const endId = isShowing ? id : otherId || id;
      return {
        key: nextScene.route.key,
        position: sceneAnimValue,
        start: {
          ancestor: (prevScene ? prevScene.getAncestor() : undefined) || null,
          node: (prevScene ? prevScene.getNode(startId) : undefined) || null,
        },
        end: {
          ancestor: (nextScene ? nextScene.getAncestor() : undefined) || null,
          node: (nextScene ? nextScene.getNode(endId) : undefined) || null,
        },
        ...other,
      };
    });
  }

  get nestingDepth(): number {
    return 0;
  }
}
