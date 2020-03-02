import * as React from 'react';
import { View, StyleSheet, InteractionManager } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { nodeFromRef } from 'react-native-shared-element';
import SharedElementSceneData from './SharedElementSceneData';
import SharedElementSceneContext from './SharedElementSceneContext';
import {
  SharedElementEventSubscription,
  SharedElementSceneComponent,
} from './types';
import { ISharedElementRendererData } from './SharedElementRendererData';
import { getActiveRoute } from './utils';
import {
  StackNavigationProp,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import { Route } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  navigation: StackNavigationProp<any>;
  route: Route<any>;
};

function createSharedElementScene(
  Component: SharedElementSceneComponent,
  rendererData: ISharedElementRendererData,
  AnimationContext: React.Context<StackCardInterpolationProps | undefined>,
  navigatorId: string
): React.ComponentType<any> {
  class SharedElementSceneView extends React.PureComponent<PropsType> {
    private subscriptions: {
      [key: string]: SharedElementEventSubscription;
    } = {};
    private sceneData: SharedElementSceneData = new SharedElementSceneData(
      Component,
      this.props.navigation,
      this.props.route,
      navigatorId,
      rendererData.nestingDepth
    );

    componentDidMount() {
      const { navigation } = this.props;
      this.subscriptions = {
        willFocus: navigation.addListener('focus', this.onWillFocus),
        willBlur: navigation.addListener('blur', this.onWillBlur),
        transitionStart: navigation.addListener(
          'transitionStart',
          this.transitionStart
        ),
        transitionEnd: navigation.addListener(
          'transitionEnd',
          this.transitionEnd
        ),
      };
    }

    transitionStart({ data: { closing } }: any) {
      rendererData.startTransition(
        closing,
        navigatorId,
        rendererData.nestingDepth
      );
    }

    transitionEnd = ({ data: { closing } }: any) => {
      rendererData.endTransition(
        closing,
        navigatorId,
        rendererData.nestingDepth
      );
    };

    componentWillUnmount() {
      Object.values(this.subscriptions).forEach(unsubscribe => unsubscribe());
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
            <AnimationContext.Consumer>
              {this.onRenderAnimationContext}
            </AnimationContext.Consumer>
            <Component {...this.props} />
          </View>
        </SharedElementSceneContext.Provider>
      );
    }

    private onRenderAnimationContext = (
      value: StackCardInterpolationProps | undefined
    ) => {
      this.sceneData.setAnimimationContextValue(value);
      return null;
    };

    componentDidUpdate() {
      this.sceneData.navigation = this.props.navigation;
    }

    private onSetRef = (ref: any) => {
      this.sceneData.setAncestor(nodeFromRef(ref));
    };

    private onWillFocus = () => {
      const { navigation, route } = this.props;

      //console.log('onWillFocus: ', navigation.state, activeRoute);
      if (isActiveRoute(navigation, route)) {
        rendererData.updateSceneState(this.sceneData, route, 'willFocus');
        InteractionManager.runAfterInteractions(() => {
          rendererData.updateSceneState(this.sceneData, route, 'didFocus');
        });
      }
    };

    private onWillBlur = () => {
      const { route } = this.props;

      //console.log('onWillBlur: ', navigation.state, activeRoute);
      rendererData.updateSceneState(this.sceneData, route, 'willBlur');
    };
  }

  hoistNonReactStatics(SharedElementSceneView, Component);
  return SharedElementSceneView;
}

const isActiveRoute = (
  navigation: StackNavigationProp<any>,
  route: Route<any>
): boolean => {
  const state = navigation.dangerouslyGetState();
  const activeRoute = getActiveRoute(state);
  return route.name === activeRoute.name;
};

export default createSharedElementScene;
