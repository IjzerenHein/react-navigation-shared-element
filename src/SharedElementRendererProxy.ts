import SharedElementRendererData, {
  ISharedElementRendererData,
} from './SharedElementRendererData';
import { Route } from './types';
import SharedElementSceneData from './SharedElementSceneData';

export class SharedElementRendererProxy implements ISharedElementRendererData {
  private data: SharedElementRendererData | null = null;

  startTransition(closing: boolean) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.startTransition called before Proxy was initialized'
      );
      return;
    }
    return this.data.startTransition(closing);
  }

  endTransition(closing: boolean) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.endTransition called before Proxy was initialized'
      );
      return;
    }
    return this.data.endTransition(closing);
  }

  willActivateScene(sceneData: SharedElementSceneData, route: Route) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.willActivateScene called before Proxy was initialized'
      );
      return;
    }
    return this.data.willActivateScene(sceneData, route);
  }

  didActivateScene(sceneData: SharedElementSceneData, route: Route) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.didActivateScene called before Proxy was initialized'
      );
      return;
    }
    return this.data.didActivateScene(sceneData, route);
  }

  get source(): SharedElementRendererData | null {
    return this.data;
  }

  set source(data: SharedElementRendererData | null) {
    this.data = data;
  }
}
