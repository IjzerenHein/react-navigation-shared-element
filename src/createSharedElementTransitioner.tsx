import * as React from 'react';
import { Animated } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SharedElementRendererView from './SharedElementRendererView';
import SharedElementRendererData from './SharedElementRendererData';
import createSharedElementScene from './createSharedElementScene';

function createSharedElementEnabledNavigator(
  createNavigator: any,
  routeConfigs: any,
  navigatorConfig: any,
  rendererData: SharedElementRendererData
) {
  const wrappedRouteConfigs = {
    ...routeConfigs,
  };
  for (const key in routeConfigs) {
    wrappedRouteConfigs[key] = createSharedElementScene(
      routeConfigs[key],
      rendererData
    );
  }
  return createNavigator(wrappedRouteConfigs, {
    ...navigatorConfig,
    onTransitionStart: (transitionProps: any, prevTransitionProps: any) => {
      //console.log('onTransitionStart: ', transitionProps, prevTransitionProps);
      rendererData.startTransition(
        Animated.subtract(transitionProps.position, transitionProps.index - 1)
      );
      if (navigatorConfig.onTransitionStart) {
        navigatorConfig.onTransitionStart(transitionProps, prevTransitionProps);
      }
    },
    onTransitionEnd: (transitionProps: any, prevTransitionProps: any) => {
      //console.log('onTransitionEnd: ', transitionProps, prevTransitionProps);
      rendererData.endTransition();
      if (navigatorConfig.onTransitionEnd) {
        navigatorConfig.onTransitionEnd(transitionProps, prevTransitionProps);
      }
    },
  });
}

function createSharedElementTransitioner(
  createNavigator: any,
  RouteConfigs: any,
  NavigatorConfig: any
): React.ComponentType<any> {
  const rendererData = new SharedElementRendererData();
  const Navigator = createSharedElementEnabledNavigator(
    createNavigator,
    RouteConfigs,
    NavigatorConfig,
    rendererData
  );

  class SharedElementRenderer extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Navigator {...this.props} />
          <SharedElementRendererView rendererData={rendererData} />
        </React.Fragment>
      );
    }
  }
  hoistNonReactStatics(SharedElementRenderer, Navigator);
  return SharedElementRenderer;
}

export default createSharedElementTransitioner;
