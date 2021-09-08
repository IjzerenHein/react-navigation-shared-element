import {
  useNavigationBuilder,
  createNavigatorFactory,
  RouteConfig,
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
  StackActionHelpers,
  ParamListBase,
  StackActions,
  EventArg,
} from "@react-navigation/native";
import {
  CardAnimationContext,
  StackView,
  StackNavigationOptions,
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import type {
  StackNavigationConfig,
  StackNavigationEventMap,
} from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { Platform } from "react-native";

import { useSharedElementFocusEvents } from "./SharedElementFocusEvents";
import SharedElementRendererContext from "./SharedElementRendererContext";
import SharedElementRendererData from "./SharedElementRendererData";
import { SharedElementRendererProxy } from "./SharedElementRendererProxy";
import SharedElementRendererView from "./SharedElementRendererView";
import SharedElementSceneData from "./SharedElementSceneData";
import createSharedElementScene from "./createSharedElementScene";
import {
  SharedElementSceneComponent,
  SharedElementsComponentConfig,
} from "./types";
import { EventEmitter } from "./utils/EventEmitter";

let _navigatorId = 1;

function CaptureProgressComponent(props: {
  sceneData: SharedElementSceneData;
}): React.ReactElement<any, any> {
  // Although react-navigation@6 supports the `useCardAnimation()` hook,
  // v5 unfornately does not. So use the legacy method for greater
  // backwards compatibility.
  return (
    <CardAnimationContext.Consumer>
      {(value: StackCardInterpolationProps | undefined) => {
        props.sceneData.setAnimValue(value?.current?.progress);
        return null;
      }}
    </CardAnimationContext.Consumer>
  );
}

export default function createSharedElementStackNavigator<
  ParamList extends ParamListBase
>(options?: { name?: string; debug?: boolean }) {
  // Verify that no other options than 'name' or 'debug' are provided.
  // This might indicate that the user is still using navigation 4 but
  // didn't change the import to `react-navigation-shared-element/build/v4`.
  if (
    options &&
    Object.keys(options).filter((key) => key !== "name" && key !== "debug")
      .length > 0
  ) {
    throw new Error(
      `Invalid options specified to 'createSharedElementStackNavigator'. If you are using react-navigation 4, please import from 'react-navigation-shared-element/build/v4'`
    );
  }

  const navigatorId =
    options && options.name ? options.name : `stack${_navigatorId}`;
  _navigatorId++;
  const debug = options?.debug || false;

  const rendererDataProxy = new SharedElementRendererProxy();

  const emitter = new EventEmitter();

  type Props = React.ComponentProps<
    ReturnType<typeof createStackNavigator>["Navigator"]
  > &
    StackRouterOptions &
    StackNavigationConfig;

  function SharedElementStackNavigator({
    initialRouteName,
    children,
    screenOptions,
    ...rest
  }: Props) {
    const defaultOptions = {
      gestureEnabled: Platform.OS === "ios",
      animationEnabled: Platform.OS !== "web",
    };
    const { state, descriptors, navigation, NavigationContent } =
      useNavigationBuilder<
        StackNavigationState<ParamListBase>,
        StackRouterOptions,
        StackActionHelpers<ParamListBase>,
        StackNavigationOptions,
        StackNavigationEventMap
      >(StackRouter, {
        initialRouteName,
        children,
        screenOptions:
          typeof screenOptions === "function"
            ? (...args) => ({
                ...defaultOptions,
                ...screenOptions(...args),
              })
            : {
                ...defaultOptions,
                ...screenOptions,
              },
      });

    const rendererDataRef = React.useRef<SharedElementRendererData | null>(
      null
    );

    React.useEffect(
      () =>
        navigation.addListener?.("tabPress", (e) => {
          const isFocused = navigation.isFocused();

          // Run the operation in the next frame so we're sure all listeners have been run
          // This is necessary to know if preventDefault() has been called
          requestAnimationFrame(() => {
            if (
              state.index > 0 &&
              isFocused &&
              !(e as EventArg<"tabPress", true>).defaultPrevented
            ) {
              // When user taps on already focused tab and we're inside the tab,
              // reset the stack to replicate native behaviour
              navigation.dispatch({
                ...StackActions.popToTop(),
                target: state.key,
              });
            }
          });
        }),
      [navigation, state.index, state.key]
    );

    if (debug) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useLayoutEffect(() => {
        rendererDataProxy.addDebugRef();
        return function cleanup() {
          rendererDataProxy.releaseDebugRef();
        };
      }, []);
    }

    useSharedElementFocusEvents({ state, emitter });

    return (
      <SharedElementRendererContext.Consumer>
        {(rendererData) => {
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
              <NavigationContent>
                <StackView
                  detachInactiveScreens={Platform.OS !== "android"}
                  {...rest}
                  state={state}
                  descriptors={descriptors}
                  navigation={navigation}
                />
                {rendererDataRef.current ? (
                  <SharedElementRendererView
                    rendererData={rendererDataRef.current}
                  />
                ) : undefined}
              </NavigationContent>
            </SharedElementRendererContext.Provider>
          );
        }}
      </SharedElementRendererContext.Consumer>
    );
  }

  const navigatorFactory = createNavigatorFactory<
    StackNavigationState<ParamList>,
    StackNavigationOptions,
    StackNavigationEventMap,
    typeof SharedElementStackNavigator
  >(SharedElementStackNavigator);

  const { Navigator, Screen } = navigatorFactory<ParamList>();

  type ScreenProps<RouteName extends keyof ParamList> = Omit<
    RouteConfig<
      ParamList,
      RouteName,
      StackNavigationState<ParamList>,
      StackNavigationOptions,
      StackNavigationEventMap
    >,
    "component" | "children"
  > & {
    component: SharedElementSceneComponent<any>;
    sharedElements?: SharedElementsComponentConfig;

    /**
     * @deprecated
     * The `sharedElementsConfig` prop has been renamed, use `sharedElements` instead.
     */
    sharedElementsConfig?: SharedElementsComponentConfig;
  };

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
    const { children, ...restProps } = props;
    const wrappedComponentsCache = React.useRef<Map<string, any>>(new Map());
    const screenChildrenProps = getSharedElementsChildrenProps(children);

    return (
      <Navigator {...restProps}>
        {screenChildrenProps.map(
          ({
            component,
            name,
            sharedElements,
            sharedElementsConfig,
            ...restChildrenProps
          }) => {
            sharedElements = sharedElements || sharedElementsConfig;

            // Show warning when deprecated `sharedElementsConfig` prop was used
            if (sharedElementsConfig) {
              console.warn(
                "The `sharedElementsConfig` prop has been renamed, use `sharedElements` instead."
              );
            }

            // Check whether this component was previously already wrapped
            let wrappedComponent = wrappedComponentsCache.current.get(name);
            if (
              !wrappedComponent ||
              wrappedComponent.config.Component !== component
            ) {
              // Wrap the component
              wrappedComponent = createSharedElementScene(
                component,
                sharedElements,
                rendererDataProxy,
                emitter,
                CaptureProgressComponent,
                navigatorId,
                debug
              );
              wrappedComponentsCache.current.set(name, wrappedComponent);
            } else {
              // Shared elements function might have been changed, so update it
              wrappedComponent.config.sharedElements = sharedElements;
            }

            return (
              <Screen
                key={name}
                name={name}
                component={wrappedComponent}
                {...restChildrenProps}
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
