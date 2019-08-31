import {
  SharedElementNode,
  SharedElementEventSubscription,
  SharedElementSceneComponent,
  NavigationProp,
} from './types';

export type SharedElementSceneUpdateHandlerEventType =
  | 'ancestor'
  | 'add'
  | 'remove';

export type SharedElementSceneUpdateHandler = (
  eventType: SharedElementSceneUpdateHandlerEventType,
  node: SharedElementNode | undefined,
  id: string
) => any;

export default class SharedElementSceneData {
  private updateSubscribers = new Set<SharedElementSceneUpdateHandler>();
  private ancestorNode?: SharedElementNode = undefined;
  private nodes: {
    [key: string]: SharedElementNode;
  } = {};
  public readonly Component: SharedElementSceneComponent;
  public readonly name: string;
  public navigation: NavigationProp;

  constructor(
    Component: SharedElementSceneComponent,
    navigation: NavigationProp
  ) {
    this.Component = Component;
    this.navigation = navigation;
    this.name =
      Component.displayName ||
      Component.name ||
      (Component.constructor ? Component.constructor.name : undefined) ||
      '';
  }

  getAncestor(): SharedElementNode | undefined {
    return this.ancestorNode;
  }

  setAncestor(ancestorNode: SharedElementNode | null) {
    // console.log('SharedElementSceneData.setAncestor');
    if (this.ancestorNode === ancestorNode) return;
    this.ancestorNode = ancestorNode || undefined;
    this.emitUpdateEvent('ancestor', this.ancestorNode, '');
  }

  addNode(id: string, node: SharedElementNode): void {
    // console.log('SharedElementSceneData.addNode: ', id);
    this.nodes[id] = node;
    this.emitUpdateEvent('add', node, id);
  }

  removeNode(id: string, node: SharedElementNode): void {
    // console.log('SharedElementSceneData.removeNode: ', id);
    delete this.nodes[id];
    this.emitUpdateEvent('remove', node, id);
  }

  getNode(id: string): SharedElementNode | undefined {
    return this.nodes[id];
  }

  addUpdateListener(
    handler: SharedElementSceneUpdateHandler
  ): SharedElementEventSubscription {
    this.updateSubscribers.add(handler);
    return {
      remove: () => this.updateSubscribers.delete(handler),
    };
  }

  private emitUpdateEvent(
    eventType: SharedElementSceneUpdateHandlerEventType,
    node: SharedElementNode | undefined,
    id: string
  ): void {
    this.updateSubscribers.forEach(handler => handler(eventType, node, id));
  }
}
