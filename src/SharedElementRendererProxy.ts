import { ISharedElementRendererData } from "./SharedElementRendererData";
import SharedElementSceneData, {
  SharedElementSceneEventType,
} from "./SharedElementSceneData";

export class SharedElementRendererProxy implements ISharedElementRendererData {
  private data: ISharedElementRendererData | null = null;

  updateSceneState(
    eventType: SharedElementSceneEventType,
    scene: SharedElementSceneData
  ) {
    if (!this.data) {
      console.warn(
        "SharedElementRendererProxy.updateSceneState called before Proxy was initialized"
      );
      return;
    }
    return this.data.updateSceneState(eventType, scene);
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
