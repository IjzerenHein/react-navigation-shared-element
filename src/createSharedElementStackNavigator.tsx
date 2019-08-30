import * as React from 'react';
import { Animated } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SharedElementRendererView from './SharedElementRendererView';
import SharedElementRendererData, {
  ISharedElementRendererData,
} from './SharedElementRendererData';
import createSharedElementScene from './createSharedElementScene';
import SharedElementRendererContext from './SharedElementRendererContext';
import { SharedElementRendererProxy } from './SharedElementRendererProxy';

function createSharedElementEnabledNavigator(
  createNavigator: any,
  routeConfigs: any,
  navigatorConfig: any,
  rendererData: ISharedElementRendererData
) {
  const wrappedRouteConfigs = {
    ...routeConfigs,
  };
  for (const key in routeConfigs) {
    let routeConfig = wrappedRouteConfigs[key];
    const component = ((typeof routeConfig === 'object') && routeConfig.screen) ? routeConfig.screen : routeConfig;
    if (component.name !== 'Navigator') {
      // console.log('Navigator detected, ignoring: ', component);
      const wrappedComponent = createSharedElementScene(
        component,
        rendererData
      );
      if (component === routeConfig) {
        wrappedRouteConfigs[key] = wrappedComponent;
      }
      else {
        wrappedRouteConfigs[key] = {
          ...routeConfig,
          screen: wrappedComponent
        };
      }
    }
  }
  
  return createNavigator(wrappedRouteConfigs, {
    ...navigatorConfig,
    onTransitionStart: (transitionProps: any, prevTransitionProps: any) => {
      if (transitionProps.index === prevTransitionProps.index) return;
      // console.log('onTransitionStart: ', transitionProps, prevTransitionProps);
      rendererData.startTransition(
        Animated.subtract(transitionProps.position, transitionProps.index - 1)
      );
      if (navigatorConfig.onTransitionStart) {
        navigatorConfig.onTransitionStart(transitionProps, prevTransitionProps);
      }
    },
    onTransitionEnd: (transitionProps: any, prevTransitionProps: any) => {
      // console.log('onTransitionEnd: ', transitionProps, prevTransitionProps);
      rendererData.endTransition();
      if (navigatorConfig.onTransitionEnd) {
        navigatorConfig.onTransitionEnd(transitionProps, prevTransitionProps);
      }
    },
  });
}

function createSharedElementStackNavigator(
  createNavigator: any,
  RouteConfigs: any,
  NavigatorConfig: any
): React.ComponentType<any> {
  // Create a proxy which is later updated to link
  // to the renderer
  const rendererDataProxy = new SharedElementRendererProxy();

  //const rendererData = new SharedElementRendererData();
  const SharedElementNavigator = createSharedElementEnabledNavigator(
    createNavigator,
    RouteConfigs,
    NavigatorConfig,
    rendererDataProxy
  );

  class SharedElementRenderer extends React.Component {
    static displayName = 'SharedElementRenderer';
    private rendererData?: SharedElementRendererData;
    render() {
      return (
        <SharedElementRendererContext.Consumer>
          {rendererData => {
            // In case a renderer is already present higher up in the chain
            // then don't bother creating a renderer here, but use that one instead
            if (rendererData) {
              rendererDataProxy.source = rendererData;
              return <SharedElementNavigator {...this.props} />;

              // Create/use our own renderer here
            } else {
              this.rendererData =
                this.rendererData || new SharedElementRendererData();
              rendererDataProxy.source = this.rendererData;
              return (
                <SharedElementRendererContext.Provider
                  value={this.rendererData}
                >
                  <SharedElementNavigator {...this.props} />
                  <SharedElementRendererView rendererData={this.rendererData} />
                </SharedElementRendererContext.Provider>
              );
            }
          }}
        </SharedElementRendererContext.Consumer>
      );
    }
  }
  hoistNonReactStatics(SharedElementRenderer, SharedElementNavigator);
  return SharedElementRenderer;
}

export default createSharedElementStackNavigator;
