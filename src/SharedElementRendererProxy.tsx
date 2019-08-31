import SharedElementRendererData, {
  ISharedElementRendererData,
} from './SharedElementRendererData';
import { SharedElementAnimatedValue, NavigationProp } from './types';
import SharedElementSceneData from './SharedElementSceneData';

export class SharedElementRendererProxy implements ISharedElementRendererData {
  private data: SharedElementRendererData | null = null;

  startTransition(animValue: SharedElementAnimatedValue) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.startTransition called before Proxy was initialized'
      );
      return;
    }
    return this.data.startTransition(animValue);
  }

  endTransition() {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.endTransition called before Proxy was initialized'
      );
      return;
    }
    return this.data.endTransition();
  }

  willActivateScene(
    sceneData: SharedElementSceneData,
    navigation: NavigationProp
  ) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.willActivateScene called before Proxy was initialized'
      );
      return;
    }
    return this.data.willActivateScene(sceneData, navigation);
  }

  didActivateScene(
    sceneData: SharedElementSceneData,
    navigation: NavigationProp
  ) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.didActivateScene called before Proxy was initialized'
      );
      return;
    }
    return this.data.didActivateScene(sceneData, navigation);
  }

  get source(): SharedElementRendererData | null {
    return this.data;
  }

  set source(data: SharedElementRendererData | null) {
    this.data = data;
  }
}
