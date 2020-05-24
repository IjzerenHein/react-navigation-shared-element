import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  RouteConfig,
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
} from "@react-navigation/native";
import {
  CardAnimationContext,
  StackView,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
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
import createSharedElementScene from "./createSharedElementScene";
import {
  SharedElementSceneComponent,
  SharedElementsComponentConfig,
} from "./types";
import { EventEmitter } from "./utils/EventEmitter";

let _navigatorId = 1;

export default function createSharedElementStackNavigator<
  ParamList extends Record<string, object | undefined>
>(options?: { name?: string; debug?: boolean }) {
  // Verify that no other options than 'name' or 'debug' are provided.
  // This might indicate that the user is still using navigation 4 but
  // didn't rename to `createSharedElementStackNavigator4`.
  if (
    options &&
    Object.keys(options).filter((key) => key !== "name" && key !== "debug")
      .length > 0
  ) {
    throw new Error(
      `Invalid options specified to 'createSharedElementStackNavigator'. If you are using react-navigation 4, please use 'createSharedElementStackNavigator4'`
    );
  }

  const navigatorId =
    options && options.name ? options.name : `stack${_navigatorId}`;
  _navigatorId++;
  const debug = options?.debug || false;

  const rendererDataProxy = new SharedElementRendererProxy();

  const emitter = new EventEmitter();

  type Props = DefaultNavigatorOptions<StackNavigationOptions> &
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
    const { state, descriptors, navigation } = useNavigationBuilder<
      StackNavigationState,
      StackRouterOptions,
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

    if (debug) {
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
              <StackView
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
    "component" | "children"
  > & {
    component: SharedElementSceneComponent;
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
                CardAnimationContext,
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
