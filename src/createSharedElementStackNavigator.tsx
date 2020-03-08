import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
  DefaultNavigatorOptions,
  RouteConfig,
  StackRouterOptions,
  StackNavigationState,
} from '@react-navigation/native';
import {
  CardAnimationContext,
  StackView,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { SharedElementRendererProxy } from './SharedElementRendererProxy';
import SharedElementRendererContext from './SharedElementRendererContext';
import SharedElementRendererView from './SharedElementRendererView';
import SharedElementRendererData from './SharedElementRendererData';
import createSharedElementScene from './createSharedElementScene';
import {
  SharedElementSceneComponent,
  SharedElementsComponentConfig,
} from './types';
import {
  StackNavigationConfig,
  StackNavigationEventMap,
} from '@react-navigation/stack/lib/typescript/src/types';

let _navigatorId = 1;

export default function createSharedElementStackNavigator<
  ParamList extends Record<string, object | undefined>
>(options?: { name?: string }) {
  const navigatorId =
    options && options.name ? options.name : `stack${_navigatorId}`;
  _navigatorId++;

  const rendererDataProxy = new SharedElementRendererProxy();

  type Props = DefaultNavigatorOptions<StackNavigationOptions> &
    StackRouterOptions &
    StackNavigationConfig;

  function SharedElementStackNavigator({
    initialRouteName,
    children,
    screenOptions,
    ...rest
  }: Props) {
    const { state, descriptors, navigation } = useNavigationBuilder<
      StackNavigationState,
      StackRouterOptions,
      StackNavigationOptions,
      StackNavigationEventMap
    >(StackRouter, {
      initialRouteName,
      children,
      screenOptions,
    });

    const rendererDataRef = React.useRef<SharedElementRendererData | null>(
      null
    );

    return (
      <SharedElementRendererContext.Consumer>
        {rendererData => {
          // In case a renderer is already present higher up in the chain
          // then don't bother creating a renderer here, but use that one instead
          if (!rendererData) {
            rendererDataRef.current =
              rendererDataRef.current || new SharedElementRendererData();
            rendererDataProxy.source = rendererDataRef.current;
          } else {
            rendererDataProxy.source = rendererData;
          }
          return (
            <SharedElementRendererContext.Provider value={rendererDataProxy}>
              <StackView
                {...rest}
                state={state}
                navigation={navigation}
                descriptors={descriptors}
              />
              {rendererDataRef.current ? (
                <SharedElementRendererView
                  rendererData={rendererDataRef.current}
                />
              ) : (
                undefined
              )}
            </SharedElementRendererContext.Provider>
          );
        }}
      </SharedElementRendererContext.Consumer>
    );
  }

  const navigatorFactory = createNavigatorFactory<
    StackNavigationState,
    StackNavigationOptions,
    StackNavigationEventMap,
    typeof SharedElementStackNavigator
  >(SharedElementStackNavigator);

  const { Navigator, Screen } = navigatorFactory<ParamList>();

  type ScreenProps<RouteName extends keyof ParamList> = Omit<
    RouteConfig<
      ParamList,
      RouteName,
      StackNavigationState,
      StackNavigationOptions,
      StackNavigationEventMap
    >,
    'component' | 'children'
  > & {
    component: SharedElementSceneComponent;
    sharedElementsConfig?: SharedElementsComponentConfig;
  };

  function wrapComponent(component: SharedElementSceneComponent) {
    return createSharedElementScene(
      component,
      rendererDataProxy,
      CardAnimationContext,
      navigatorId
    );
  }

  // Wrapping Screen to explicitly statically type a "Shared Element" Screen.
  function wrapScreen<RouteName extends keyof ParamList>(
    _: ScreenProps<RouteName>
  ) {
    return null;
  }

  type NavigatorProps = React.ComponentProps<typeof Navigator>;

  function getSharedElementsChildrenProps(children: React.ReactNode) {
    return React.Children.toArray(children).reduce<any[]>((acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === wrapScreen) {
          acc.push(child.props);
        }

        if (child.type === React.Fragment) {
          acc.push(...getSharedElementsChildrenProps(child.props.children));
        }
      }
      return acc;
    }, []);
  }

  // react-navigation only allows the Screen component as direct children
  // of Navigator, this is why we need to wrap the Navigator
  function WrapNavigator(props: NavigatorProps) {
    const { children, ...rest } = props;
    const componentMapRef = React.useRef<Map<any, any>>(new Map());
    const screenChildrenProps = getSharedElementsChildrenProps(children);

    return (
      <Navigator {...rest}>
        {screenChildrenProps.map(
          ({ component, sharedElementsConfig, ...childrenProps }) => {
            if (sharedElementsConfig)
              component.sharedElements = sharedElementsConfig;

            if (!componentMapRef.current.has(component)) {
              componentMapRef.current.set(component, wrapComponent(component));
            }

            const wrappedComponent = componentMapRef.current.get(component);

            return (
              <Screen
                key={childrenProps.name}
                {...childrenProps}
                component={wrappedComponent}
              />
            );
          }
        )}
      </Navigator>
    );
  }

  return {
    Navigator: WrapNavigator,
    Screen: wrapScreen,
  };
}
