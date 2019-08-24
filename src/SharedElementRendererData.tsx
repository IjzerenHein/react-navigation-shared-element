import SharedElementSceneData from './SharedElementSceneData';
import {
  SharedElementEventSubscription,
  SharedElementConfig,
  SharedElementAnimatedValue,
  SharedElementTransitionProps,
} from './types';

export type SharedElementRendererUpdateHandler = () => any;

export default class SharedElementRendererData {
  private sceneData: SharedElementSceneData | null = null;
  private prevSceneData: SharedElementSceneData | null = null;
  private updateSubscribers = new Set<SharedElementRendererUpdateHandler>();
  private sceneSubscription: SharedElementEventSubscription | null = null;
  private sharedElements: SharedElementConfig = [];
  private animValue: SharedElementAnimatedValue;

  willActivateScene(
    sceneData: SharedElementSceneData,
    sharedElements: SharedElementConfig,
    animValue: SharedElementAnimatedValue
  ): void {
    // console.log('SharedElementRendererData.willActivateScene');
    if (!this.prevSceneData) return;
    this.sceneData = sceneData;
    this.sharedElements = sharedElements;
    this.animValue = animValue;
    if (sharedElements.length) {
      this.sceneSubscription = this.sceneData.addUpdateListener(() => {
        // TODO optimize
        this.emitUpdateEvent();
      });
      this.emitUpdateEvent();
    }
  }

  didActivateScene(sceneData: SharedElementSceneData): void {
    //console.log('SharedElementRendererData.didActivateScene');
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
    return this.sharedElements.map(({ id, sourceId, animation }) => ({
      position: this.animValue,
      start: {
        ancestor: prevSceneData ? prevSceneData.getAncestor() : undefined,
        node: prevSceneData ? prevSceneData.getNode(sourceId) : undefined,
      },
      end: {
        ancestor: sceneData ? sceneData.getAncestor() : undefined,
        node: sceneData ? sceneData.getNode(id) : undefined,
      },
      ...animation,
    }));
  }
}
