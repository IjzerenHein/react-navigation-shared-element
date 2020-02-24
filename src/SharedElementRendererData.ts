import SharedElementSceneData, {
  SharedElementSceneEventType,
} from './SharedElementSceneData';
import {
  SharedElementEventSubscription,
  SharedElementsStrictConfig,
  SharedElementTransitionProps,
  SharedElementRoute,
} from './types';
import { normalizeSharedElementsConfig } from './utils';
import { Animated } from 'react-native';

export type SharedElementRendererUpdateHandler = () => any;

export interface ISharedElementRendererData {
  startTransition(closing: boolean, navigatorId: string): void;
  endTransition(closing: boolean, navigatorId: string): void;
  updateSceneState(
    sceneData: SharedElementSceneData,
    route: SharedElementRoute,
    sceneEvent: SharedElementSceneEventType
  ): void;
  readonly nestingDepth: number;
}

function getSharedElements(
  sceneData: SharedElementSceneData,
  otherSceneData: SharedElementSceneData,
  showing: boolean
): SharedElementsStrictConfig | null {
  const { sharedElements } = sceneData.Component;
  if (!sharedElements) return null;
  return normalizeSharedElementsConfig(
    sharedElements(sceneData.route, otherSceneData.route, showing)
  );
}

const NO_SHARED_ELEMENTS: any[] = [];

type SceneRoute = {
  scene: SharedElementSceneData;
  route: SharedElementRoute;
  subscription: SharedElementEventSubscription | null;
};

/**
 * TODO
 *
 * - [X] Start animation on `startTransition`
 * - [X] Use animValue from started navigator
 * - [X] Use route from deepest nested scene
 * - [X] Support nesting
 * - [ ] Not all lifecycle events not emitted by stack when using gestures (close modal)
 */

export default class SharedElementRendererData
  implements ISharedElementRendererData {
  private scenes: SceneRoute[] = [];
  private updateSubscribers = new Set<SharedElementRendererUpdateHandler>();
  private sharedElements: SharedElementsStrictConfig | null = null;
  private isShowing: boolean = true;
  private animValue?: Animated.AnimatedInterpolation | null;
  private route: SharedElementRoute | null = null;
  private prevRoute: SharedElementRoute | null = null;
  private scene: SharedElementSceneData | null = null;
  private prevScene: SharedElementSceneData | null = null;

  private isTransitionStarted: boolean = false;
  private isTransitionClosing: boolean = false;
  private transitionNavigatorId: string = '';

  startTransition(closing: boolean, navigatorId: string) {
    console.log(
      `startTransition[${navigatorId}], closing: ${closing}, route: ${this.route}`,
      this
    );

    this.prevRoute = this.route;
    this.route = null;
    this.animValue = null;

    // When a transition wasn't completely fully, but a new transition
    // has already started, then the `willBlur` event is not called.
    // For this particular case, we capture the animation-value of the
    // last (previous) scene that is now being hidden.
    if (this.isTransitionStarted && this.prevRoute) {
      const scene = this.getScene(this.prevRoute);
      if (scene) this.animValue = scene.getAnimValue(true);
    }

    this.isTransitionStarted = true;
    this.isTransitionClosing = closing;
    this.transitionNavigatorId = navigatorId;
  }

  endTransition(
    // @ts-ignore
    closing: boolean,
    // @ts-ignore
    navigatorId: string
  ) {
    console.log(`endTransition[${navigatorId}], closing: ${closing}`);

    this.isTransitionStarted = false;

    if (this.prevRoute != null) {
      this.prevRoute = null;
      this.animValue = null;
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  updateSceneState(
    sceneData: SharedElementSceneData,
    route: SharedElementRoute,
    sceneEvent: SharedElementSceneEventType
  ): void {
    switch (sceneEvent) {
      case 'willFocus':
        return this.willFocusScene(sceneData, route);
      case 'didFocus':
        return this.didFocusScene(sceneData, route);
      case 'willBlur':
        return this.willBlurScene(sceneData, route);
    }
  }

  willFocusScene(
    sceneData: SharedElementSceneData,
    route: SharedElementRoute
  ): void {
    console.log(
      `willFocusScene[${sceneData.navigatorId}], name: ${sceneData.name}, depth: ${sceneData.nestingDepth}`
    );
    this.registerScene(sceneData, route);

    // Wait for a transition start, before starting any animations
    if (!this.isTransitionStarted) return;

    // Use the animation value from the navigator that
    // started the transition
    if (
      !this.isTransitionClosing &&
      this.prevRoute &&
      sceneData.navigatorId === this.transitionNavigatorId &&
      !this.animValue
    ) {
      this.animValue = sceneData.getAnimValue(false);
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
    if (this.prevRoute && this.route && this.animValue) {
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  didFocusScene(
    sceneData: SharedElementSceneData,
    route: SharedElementRoute
  ): void {
    console.log(
      `didFocusScene[${sceneData.navigatorId}], name: ${sceneData.name}, depth: ${sceneData.nestingDepth}`
    );
    this.route = route;
    this.prevRoute = null;
    this.registerScene(sceneData, route);
  }

  willBlurScene(
    sceneData: SharedElementSceneData,
    // @ts-ignore
    route: SharedElementRoute
  ): void {
    console.log(
      `willBlurScene[${sceneData.navigatorId}], name: ${sceneData.name}, depth: ${sceneData.nestingDepth}`
    );

    // Wait for a transition start, before starting any animations
    if (!this.isTransitionStarted) return;

    // Use the animation value from the navigator that
    // started the transition
    if (
      this.isTransitionClosing &&
      sceneData.navigatorId === this.transitionNavigatorId &&
      !this.animValue
    ) {
      this.animValue = sceneData.getAnimValue(true);
    }

    // Update transition
    if (this.prevRoute && this.route && this.animValue) {
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  private registerScene(
    sceneData: SharedElementSceneData,
    route: SharedElementRoute
  ) {
    this.scenes.push({
      scene: sceneData,
      route,
      subscription: null,
    });
    if (this.scenes.length > 10) {
      const { subscription } = this.scenes[0];
      this.scenes.splice(0, 1);
      if (subscription) subscription();
    }
    this.updateSceneListeners();
    this.updateSharedElements();
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
        subscription();
      }
    });
  }

  private getScene(
    route: SharedElementRoute | null
  ): SharedElementSceneData | null {
    const sceneRoute = route
      ? this.scenes.find(sc => sc.route.key === route.key)
      : undefined;
    return sceneRoute ? sceneRoute.scene : null;
  }

  private updateSharedElements() {
    const { route, prevRoute, animValue } = this;
    const scene = this.getScene(route);
    const prevScene = this.getScene(prevRoute);

    // Update current scene & previous scene
    if (scene === this.scene && prevScene === this.prevScene) return;
    this.scene = scene;
    this.prevScene = prevScene;

    // Update shared elements
    let sharedElements: SharedElementsStrictConfig | null = null;
    let isShowing = true;
    if (animValue && scene && prevScene) {
      sharedElements = getSharedElements(scene, prevScene, true);
      if (!sharedElements) {
        isShowing = false;
        sharedElements = getSharedElements(prevScene, scene, false);
      }
    }
    if (this.sharedElements !== sharedElements) {
      this.sharedElements = sharedElements;
      this.isShowing = isShowing;
      console.log(
        'updateSharedElements: ',
        sharedElements,
        ' ,isShowing: ',
        isShowing,
        ', animValue: ',
        animValue
      );
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
    this.updateSubscribers.forEach(handler => handler());
  }

  getTransitions(): SharedElementTransitionProps[] {
    const {
      sharedElements,
      prevScene,
      scene,
      isShowing,
      animValue,
      route,
    } = this;

    if (!sharedElements || !scene || !prevScene || !route)
      return NO_SHARED_ELEMENTS;
    return sharedElements.map(({ id, otherId, ...other }) => {
      const startId = isShowing ? otherId || id : id;
      const endId = isShowing ? id : otherId || id;
      return {
        key: route.key,
        position: animValue,
        start: {
          ancestor: (prevScene ? prevScene.getAncestor() : undefined) || null,
          node: (prevScene ? prevScene.getNode(startId) : undefined) || null,
        },
        end: {
          ancestor: (scene ? scene.getAncestor() : undefined) || null,
          node: (scene ? scene.getNode(endId) : undefined) || null,
        },
        ...other,
      };
    });
  }

  get nestingDepth(): number {
    return 0;
  }
}
