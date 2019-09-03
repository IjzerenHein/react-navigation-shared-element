import SharedElementSceneData from './SharedElementSceneData';
import {
  SharedElementEventSubscription,
  SharedElementsStrictConfig,
  SharedElementAnimatedValue,
  SharedElementTransitionProps,
  Route,
} from './types';
import { normalizeSharedElementsConfig } from './utils';

export type SharedElementRendererUpdateHandler = () => any;

export interface ISharedElementRendererData {
  startTransition(
    animValue: SharedElementAnimatedValue,
    route: Route,
    prevRoute: Route
  ): void;
  endTransition(route: Route, prevRoute: Route): void;
  willActivateScene(sceneData: SharedElementSceneData, route: Route): void;
  didActivateScene(sceneData: SharedElementSceneData, route: Route): void;
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

export default class SharedElementRendererData
  implements ISharedElementRendererData {
  private scenes: SceneRoute[] = [];
  private updateSubscribers = new Set<SharedElementRendererUpdateHandler>();
  private sharedElements: SharedElementsStrictConfig | null = null;
  private isShowing: boolean = true;
  private animValue: SharedElementAnimatedValue;
  private route: Route | null = null;
  private prevRoute: Route | null = null;
  private scene: SharedElementSceneData | null = null;
  private prevScene: SharedElementSceneData | null = null;

  startTransition(
    animValue: SharedElementAnimatedValue,
    route: Route,
    // @ts-ignore
    prevRoute: Route //eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    //console.log('startTransition, route: ', route.key);
    this.animValue = animValue;
    this.prevRoute = this.route;
    this.route = route;
    this.updateSceneListeners();
    this.updateSharedElements();
  }

  endTransition(
    // @ts-ignore
    route: Route, //eslint-disable-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    prevRoute: Route //eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    //console.log('endTransition, route: ', route.key);
    if (this.prevRoute != null) {
      this.prevRoute = null;
      this.animValue = null;
      this.updateSceneListeners();
      this.updateSharedElements();
    }
  }

  willActivateScene(sceneData: SharedElementSceneData, route: Route): void {
    //console.log('willActivateScene, route: ', route.key);
    this.registerScene(sceneData, route);
  }

  didActivateScene(sceneData: SharedElementSceneData, route: Route): void {
    //console.log('didActivateScene, route: ', route.key);
    this.prevRoute = null;
    this.registerScene(sceneData, route);
  }

  private registerScene(sceneData: SharedElementSceneData, route: Route) {
    this.scenes.push({
      scene: sceneData,
      route,
      subscription: null,
    });
    if (this.scenes.length > 5) {
      const { subscription } = this.scenes[0];
      this.scenes.splice(0, 1);
      if (subscription) subscription.remove();
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
        subscription.remove();
      }
    });
  }

  private updateSharedElements() {
    const { route, prevRoute, animValue } = this;
    const sceneRoute = route
      ? this.scenes.find(sc => sc.route.key === route.key)
      : undefined;
    const prevSceneRoute = prevRoute
      ? this.scenes.find(sc => sc.route.key === prevRoute.key)
      : undefined;
    const scene = sceneRoute ? sceneRoute.scene : null;
    const prevScene = prevSceneRoute ? prevSceneRoute.scene : null;

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
      /*console.log(
        'updateSharedElements: ',
        sharedElements,
        ' ,isShowing: ',
        isShowing
      );*/
      this.emitUpdateEvent();
    }
  }

  addUpdateListener(
    handler: SharedElementRendererUpdateHandler
  ): SharedElementEventSubscription {
    this.updateSubscribers.add(handler);
    return {
      remove: () => this.updateSubscribers.delete(handler),
    };
  }

  private emitUpdateEvent(): void {
    this.updateSubscribers.forEach(handler => handler());
  }

  getTransitions(): SharedElementTransitionProps[] {
    const { sharedElements, prevScene, scene, isShowing, animValue } = this;
    // console.log('getTransitions: ', sharedElements);
    if (!sharedElements || !scene || !prevScene) return NO_SHARED_ELEMENTS;
    return sharedElements.map(({ id, otherId, ...other }) => {
      const startId = isShowing ? otherId || id : id;
      const endId = isShowing ? id : otherId || id;
      return {
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
}
