import { ISharedElementRendererData } from "./SharedElementRendererData";
import SharedElementSceneData, {
  SharedElementSceneEventType,
} from "./SharedElementSceneData";

export class SharedElementRendererProxy implements ISharedElementRendererData {
  private data: ISharedElementRendererData | null = null;

  startTransition(closing: boolean, navigatorId: string, nestingDepth: number) {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.startTransition called before Proxy was initialized"
      );
      return;
    }
    return this.data.startTransition(closing, navigatorId, nestingDepth);
  }

  endTransition(closing: boolean, navigatorId: string, nestingDepth: number) {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.endTransition called before Proxy was initialized"
      );
      return;
    }
    return this.data.endTransition(closing, navigatorId, nestingDepth);
  }

  updateSceneState(
    scene: SharedElementSceneData,
    eventType: SharedElementSceneEventType
  ) {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.updateSceneState called before Proxy was initialized"
      );
      return;
    }
    return this.data.updateSceneState(scene, eventType);
  }

  get source(): ISharedElementRendererData | null {
    return this.data;
  }

  set source(data: ISharedElementRendererData | null) {
    this.data = data;
  }

  get nestingDepth(): number {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.nestingDepth called before Proxy was initialized"
      );
      return 0;
    }
    return this.data.nestingDepth + 1;
  }

  addDebugRef(): number {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.addDebugRef called before Proxy was initialized"
      );
      return 0;
    }
    return this.data.addDebugRef();
  }

  releaseDebugRef(): number {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.relaseDebugRef called before Proxy was initialized"
      );
      return 0;
    }
    return this.data.releaseDebugRef();
  }
}
