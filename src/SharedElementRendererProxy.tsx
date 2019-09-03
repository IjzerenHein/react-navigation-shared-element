import SharedElementRendererData, {
  ISharedElementRendererData,
} from './SharedElementRendererData';
import { SharedElementAnimatedValue, Route } from './types';
import SharedElementSceneData from './SharedElementSceneData';

export class SharedElementRendererProxy implements ISharedElementRendererData {
  private data: SharedElementRendererData | null = null;

  startTransition(
    animValue: SharedElementAnimatedValue,
    route: Route,
    prevRoute: Route
  ) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.startTransition called before Proxy was initialized'
      );
      return;
    }
    return this.data.startTransition(animValue, route, prevRoute);
  }

  endTransition(route: Route, prevRoute: Route) {
    if (!this.data) {
      console.warn(
        'SharedElementRendererProxy.endTransition called before Proxy was initialized'
      );
      return;
    }
    return this.data.endTransition(route, prevRoute);
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
