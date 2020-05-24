import * as React from "react";
import {
  SharedElement as RawSharedElement,
  SharedElementProps as RawSharedElementProps,
} from "react-native-shared-element";

import SharedElementSceneContext from "./SharedElementSceneContext";
import SharedElementSceneData from "./SharedElementSceneData";
import { SharedElementNode } from "./types";
// import invariant from '../utils/invariant';

export type SharedElementProps = Omit<RawSharedElementProps, "onNode"> & {
  id: string;
};

class SharedElement extends React.Component<SharedElementProps> {
  private node: SharedElementNode | null = null;
  private sharedId: string = "";
  private sceneData: SharedElementSceneData | null = null;

  constructor(props: SharedElementProps) {
    super(props);
    this.sharedId = props.id;
  }

  render() {
    const {
      id, //eslint-disable-line @typescript-eslint/no-unused-vars
      ...otherProps
    } = this.props;
    return (
      <SharedElementSceneContext.Consumer>
        {(sceneData) => {
          /*invariant(
            sceneData != null,
            'The SharedElementSceneContext is not set, did you forget to wrap your scene component with `createSharedElementScene(..)`?'
          );*/
          this.sceneData = sceneData;
          return <RawSharedElement {...otherProps} onNode={this.onSetNode} />;
        }}
      </SharedElementSceneContext.Consumer>
    );
  }

  componentDidUpdate() {
    const { id } = this.props;
    if (this.sharedId !== id) {
      if (this.sceneData && this.sharedId && this.node) {
        this.sceneData.removeNode(this.sharedId, this.node);
      }
      this.sharedId = id;
      if (this.sceneData && this.sharedId && this.node) {
        this.sceneData.addNode(this.sharedId, this.node);
      }
    }
  }

  private onSetNode = (node: SharedElementNode | null) => {
    if (this.node === node) {
      return;
    }
    if (this.sceneData && this.node && this.sharedId) {
      this.sceneData.removeNode(this.sharedId, this.node);
    }
    this.node = node;
    if (this.sceneData && this.node && this.sharedId) {
      this.sceneData.addNode(this.sharedId, this.node);
    }
    this.node = node;
  };
}

export default SharedElement;
