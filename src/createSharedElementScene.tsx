import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { nodeFromRef } from 'react-native-shared-element';
import SharedElementSceneData from './SharedElementSceneData';
import SharedElementSceneContext from './SharedElementSceneContext';
import {
  SharedElementEventSubscription,
  NavigationProp,
  SharedElementSceneComponent,
} from './types';
import { ISharedElementRendererData } from './SharedElementRendererData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  navigation: NavigationProp;
};

function getActiveRouteState(route: any): any {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  } else {
    return getActiveRouteState(route.routes[route.index]);
  }
}

function createSharedElementScene(
  Component: SharedElementSceneComponent,
  rendererData: ISharedElementRendererData
): React.ComponentType<any> {
  class SharedElementSceneView extends React.PureComponent<PropsType> {
    private subscriptions: {
      [key: string]: SharedElementEventSubscription;
    } = {};
    private sceneData: SharedElementSceneData = new SharedElementSceneData(
      Component
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

    private onWillFocus = () => {
      const { navigation } = this.props;
      rendererData.willActivateScene(this.sceneData, navigation);
    };

    private onDidFocus = () => {
      const { navigation } = this.props;
      const activeRoute = getActiveRouteState(navigation.state);
      if (navigation.state.routeName === activeRoute.routeName) {
        // console.log('onDidFocus: ', this.sceneData.name, navigation);
        rendererData.didActivateScene(this.sceneData, navigation);
      }
    };
  }

  hoistNonReactStatics(SharedElementSceneView, Component);
  return SharedElementSceneView;
}

export default createSharedElementScene;
