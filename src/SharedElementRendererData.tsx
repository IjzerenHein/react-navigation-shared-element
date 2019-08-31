import SharedElementSceneData from './SharedElementSceneData';
import {
  SharedElementEventSubscription,
  SharedElementsConfig,
  SharedElementAnimatedValue,
  SharedElementTransitionProps,
} from './types';
import { normalizeSharedElementsConfig } from './utils';

export type SharedElementRendererUpdateHandler = () => any;

export interface ISharedElementRendererData {
  startTransition(animValue: SharedElementAnimatedValue): void;
  endTransition(): void;
  willActivateScene(sceneData: SharedElementSceneData): void;
  didActivateScene(sceneData: SharedElementSceneData): void;
}

function getSharedElements(
  sceneData: SharedElementSceneData,
  otherSceneData: SharedElementSceneData,
  show: boolean
): SharedElementsConfig | null {
  const { sharedElements } = sceneData.Component;
  if (!sharedElements) return null;
  // TODO push/pop distinction?
  return normalizeSharedElementsConfig(
    sharedElements(sceneData.navigation, otherSceneData.navigation, show)
  );
}

export default class SharedElementRendererData
  implements ISharedElementRendererData {
  private sceneData: SharedElementSceneData | null = null;
  private prevSceneData: SharedElementSceneData | null = null;
  private updateSubscribers = new Set<SharedElementRendererUpdateHandler>();
  private sceneSubscription: SharedElementEventSubscription | null = null;
  private sharedElements: SharedElementsConfig = [];
  private animValue: SharedElementAnimatedValue;

  startTransition(animValue: SharedElementAnimatedValue) {
    this.animValue = animValue;
  }

  endTransition() {
    // Nothing to do
  }

  willActivateScene(sceneData: SharedElementSceneData): void {
    /*console.log(
      'SharedElementRendererData.willActivateScene: ',
      sceneData.name,
      ', previous: ',
      this.prevSceneData ? this.prevSceneData.name : ''
    );*/
    if (!this.prevSceneData) return;
    const sharedElements =
      getSharedElements(sceneData, this.prevSceneData, true) ||
      getSharedElements(this.prevSceneData, sceneData, false);
    if (sharedElements && sharedElements.length) {
      // console.log('sharedElements: ', sharedElements, sceneData);
      this.sceneData = sceneData;
      this.sharedElements = sharedElements;
      this.sceneSubscription = this.sceneData.addUpdateListener(() => {
        // TODO optimize
        this.emitUpdateEvent();
      });
      this.emitUpdateEvent();
    }
  }

  didActivateScene(sceneData: SharedElementSceneData): void {
    //console.log('SharedElementRendererData.didActivateScene: ', sceneData.name);
    if (this.sceneSubscription) {
      this.sceneSubscription.remove();
      this.sceneSubscription = null;
    }
    this.prevSceneData = sceneData;
    if (this.sceneData) {
      this.sceneData = null;
      if (this.sharedElements.length) {
        this.sharedElements = [];
        this.emitUpdateEvent();
      }
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
    const { prevSceneData, sceneData } = this;
    // console.log('getTransitions: ', sceneData, prevSceneData);
    return this.sharedElements.map(({ id, sourceId, animation, debug }) => {
      return {
        position: this.animValue,
        start: {
          ancestor:
            (prevSceneData ? prevSceneData.getAncestor() : undefined) || null,
          node:
            (prevSceneData ? prevSceneData.getNode(sourceId) : undefined) ||
            null,
        },
        end: {
          ancestor: (sceneData ? sceneData.getAncestor() : undefined) || null,
          node: (sceneData ? sceneData.getNode(id) : undefined) || null,
        },
        ...animation,
        debug,
      };
    });
  }
}
