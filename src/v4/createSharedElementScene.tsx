import hoistNonReactStatics from "hoist-non-react-statics";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { nodeFromRef } from "react-native-shared-element";

import { ISharedElementRendererData } from "../SharedElementRendererData";
import SharedElementSceneContext from "../SharedElementSceneContext";
import SharedElementSceneData from "../SharedElementSceneData";
import { SharedElementSceneComponent, SharedElementRoute } from "../types";
import { NavigationProp, Route } from "./types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  navigation: NavigationProp;
};

function routeFromNavigation(navigation: any): SharedElementRoute {
  return {
    key: navigation.state.key,
    name: navigation.state.routeName,
    params: navigation.state.params || {},
  };
}

export function getActiveRouteState(route: any): Route {
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
  rendererData: ISharedElementRendererData,
  CaptureProgressComponent: React.ComponentType<{
    sceneData: SharedElementSceneData;
  }>,
  navigatorId: string,
  verbose: boolean
): React.ComponentType<any> {
  class SharedElementSceneView extends React.PureComponent<PropsType> {
    private subscriptions: {
      [key: string]: {
        remove(): void;
      };
    } = {};
    private readonly sceneData: SharedElementSceneData =
      new SharedElementSceneData(
        Component,
        () => Component.sharedElements,
        routeFromNavigation(this.props.navigation),
        navigatorId,
        rendererData.nestingDepth,
        verbose
      );

    componentDidMount() {
      const { navigation } = this.props;
      this.subscriptions = {
        willFocus: navigation.addListener("willFocus", this.onWillFocus),
        didFocus: navigation.addListener("didFocus", this.onDidFocus),
        willBlur: navigation.addListener("willBlur", this.onWillBlur),
      };
    }

    componentWillUnmount() {
      Object.values(this.subscriptions).forEach((subscription) =>
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
            <CaptureProgressComponent sceneData={this.sceneData} />
            <Component {...this.props} />
          </View>
        </SharedElementSceneContext.Provider>
      );
    }

    componentDidUpdate() {
      this.sceneData.updateRoute(routeFromNavigation(this.props.navigation));
    }

    private onSetRef = (ref: any) => {
      this.sceneData.setAncestor(nodeFromRef(ref));
    };

    private onWillFocus = () => {
      const { navigation } = this.props;
      const activeRoute = getActiveRouteState(navigation.state);
      //console.log('onWillFocus: ', navigation.state, activeRoute);
      if (navigation.state.routeName === activeRoute.routeName) {
        this.sceneData.updateRoute(routeFromNavigation(navigation));
        rendererData.updateSceneState(this.sceneData, "willFocus");
      }
    };

    private onDidFocus = () => {
      const { navigation } = this.props;
      const activeRoute = getActiveRouteState(navigation.state);
      if (navigation.state.routeName === activeRoute.routeName) {
        // console.log('onDidFocus: ', this.sceneData.name, navigation);
        this.sceneData.updateRoute(routeFromNavigation(navigation));
        rendererData.updateSceneState(this.sceneData, "didFocus");
      }
    };

    private onWillBlur = () => {
      const { navigation } = this.props;
      const activeRoute = getActiveRouteState(navigation.state);
      //console.log('onWillBlur: ', navigation.state, activeRoute);
      if (navigation.state.routeName === activeRoute.routeName) {
        this.sceneData.updateRoute(routeFromNavigation(navigation));
        rendererData.updateSceneState(this.sceneData, "willBlur");
      }
    };
  }

  hoistNonReactStatics(SharedElementSceneView, Component);
  return SharedElementSceneView;
}

export default createSharedElementScene;
