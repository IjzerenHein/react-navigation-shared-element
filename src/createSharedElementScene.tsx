import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { nodeFromRef } from 'react-native-shared-element';
import SharedElementSceneData from './SharedElementSceneData';
import SharedElementSceneContext from './SharedElementSceneContext';
import { SharedElementsConfig, SharedElementEventSubscription } from './types';
import { ISharedElementRendererData } from './SharedElementRendererData';
import { normalizeSharedElementsConfig } from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  navigation: any;
};

function getActiveRouteState(route: any): any {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route;
  } else {
    return getActiveRouteState(route.routes[route.index]);
  }
}

function createSharedElementScene(
  Component: React.ComponentType<any>,
  rendererData: ISharedElementRendererData
): React.ComponentType<any> {
  class SharedElementSceneView extends React.PureComponent<PropsType> {
    private initial: boolean = true;
    private subscriptions: {
      [key: string]: SharedElementEventSubscription;
    } = {};
    private sceneData: SharedElementSceneData = new SharedElementSceneData(
      Component.displayName ||
        Component.name ||
        (Component.constructor ? Component.constructor.name : undefined) ||
        ''
    );

    componentDidMount() {
      const { navigation } = this.props;
      this.subscriptions = {
        willFocus: navigation.addListener('willFocus', this.onWillFocus),
        didFocus: navigation.addListener('didFocus', this.onDidFocus),
      };
    }

    componentWillUnmount() {
      Object.values(this.subscriptions).forEach(subscription =>
        subscription.remove()
      );
    }

    render() {
      // console.log('SharedElementSceneView.render');
      return (
        <SharedElementSceneContext.Provider value={this.sceneData}>
          <View
            style={styles.container}
            collapsable={false}
            ref={this.onSetRef}
          >
            <Component {...this.props} />
          </View>
        </SharedElementSceneContext.Provider>
      );
    }

    private onSetRef = (ref: any) => {
      this.sceneData.setAncestor(nodeFromRef(ref));
    };

    private getSharedElements(): SharedElementsConfig | null {
      const { navigation } = this.props;
      let sharedElements =
        // @ts-ignore
        navigation.getParam('sharedElements') || Component.sharedElements;
      if (!sharedElements) return null;
      if (typeof sharedElements === 'function') {
        sharedElements = sharedElements(navigation);
      }
      return sharedElements
        ? normalizeSharedElementsConfig(sharedElements)
        : null;
    }

    private onWillFocus = () => {
      const sharedElements = this.getSharedElements();
      if (sharedElements && this.initial) {
        this.initial = false;
        rendererData.willActivateScene(this.sceneData, sharedElements);
      }
    };

    private onDidFocus = () => {
      const { navigation } = this.props;
      const activeRoute = getActiveRouteState(navigation.state);
      if (navigation.state.routeName === activeRoute.routeName) {
        // console.log('onDidFocus: ', this.sceneData.name, activeRoute, this.props.navigation.state.routeName);
        rendererData.didActivateScene(this.sceneData);
      }
    };
  }

  hoistNonReactStatics(SharedElementSceneView, Component);
  return SharedElementSceneView;
}

export default createSharedElementScene;
