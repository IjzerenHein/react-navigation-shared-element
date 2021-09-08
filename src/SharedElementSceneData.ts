import {
  SharedElementNode,
  SharedElementEventSubscription,
  SharedElementAnimatedValue,
  SharedElementRoute,
  SharedElementSceneComponent,
  SharedElementsComponentConfig,
} from "./types";

export type SharedElementSceneUpdateHandlerEventType =
  | "ancestor"
  | "add"
  | "remove";

export type SharedElementSceneUpdateHandler = (
  eventType: SharedElementSceneUpdateHandlerEventType,
  node: SharedElementNode | undefined,
  id: string
) => any;

const INVERT_OPTIONS = {
  inputRange: [0, 1],
  outputRange: [1, 0],
};

export type SharedElementSceneEventType =
  | "willFocus"
  | "didFocus"
  | "willBlur"
  | "didBlur";

export default class SharedElementSceneData {
  private updateSubscribers = new Set<SharedElementSceneUpdateHandler>();
  private ancestorNode?: SharedElementNode = undefined;
  private nodes: {
    [key: string]: SharedElementNode;
  } = {};
  private animValue: any;
  public readonly getSharedElements: () => SharedElementsComponentConfig | void;
  public readonly name: string;
  public readonly navigatorId: string;
  public readonly nestingDepth: number;
  public readonly debug: boolean;
  public readonly route: SharedElementRoute;

  constructor(
    Component: SharedElementSceneComponent,
    getSharedElements: () => SharedElementsComponentConfig | void,
    route: SharedElementRoute,
    navigatorId: string,
    nestingDepth: number,
    debug: boolean
  ) {
    this.getSharedElements = getSharedElements;
    this.route = route;
    this.navigatorId = navigatorId;
    this.nestingDepth = nestingDepth;
    this.debug = debug;
    this.name =
      Component.displayName ||
      Component.name ||
      (Component.constructor ? Component.constructor.name : undefined) ||
      "";
  }

  public updateRoute(route: SharedElementRoute) {
    if (route.key !== this.route.key) {
      throw new Error(
        "SharedElementNavigation: Integrity error, route key should never change"
      );
    }
    // @ts-ignore
    this.route = route;
  }

  setAnimValue(value: any) {
    this.animValue = value;
  }

  getAnimValue(closing: boolean): SharedElementAnimatedValue | undefined {
    const { animValue } = this;
    if (!animValue) return;
    return closing ? animValue.interpolate(INVERT_OPTIONS) : animValue;
  }

  getAncestor(): SharedElementNode | undefined {
    return this.ancestorNode;
  }

  setAncestor(ancestorNode: SharedElementNode | null) {
    // console.log('SharedElementSceneData.setAncestor');
    if (this.ancestorNode === ancestorNode) return;
    this.ancestorNode = ancestorNode || undefined;
    this.emitUpdateEvent("ancestor", this.ancestorNode, "");
  }

  addNode(id: string, node: SharedElementNode): void {
    // console.log('SharedElementSceneData.addNode: ', id);
    this.nodes[id] = node;
    this.emitUpdateEvent("add", node, id);
  }

  removeNode(id: string, node: SharedElementNode): void {
    // console.log('SharedElementSceneData.removeNode: ', id);
    delete this.nodes[id];
    this.emitUpdateEvent("remove", node, id);
  }

  getNode(id: string): SharedElementNode | undefined {
    return this.nodes[id];
  }

  addUpdateListener(
    handler: SharedElementSceneUpdateHandler
  ): SharedElementEventSubscription {
    this.updateSubscribers.add(handler);
    return () => this.updateSubscribers.delete(handler);
  }

  private emitUpdateEvent(
    eventType: SharedElementSceneUpdateHandlerEventType,
    node: SharedElementNode | undefined,
    id: string
  ): void {
    this.updateSubscribers.forEach((handler) => handler(eventType, node, id));
  }
}
