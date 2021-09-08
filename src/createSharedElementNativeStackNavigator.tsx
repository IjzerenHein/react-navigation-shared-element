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
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import type {
  NativeStackNavigationEventMap,
  NativeStackNavigationConfig,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import NativeStackView from "@react-navigation/native-stack/src/views/NativeStackView";
import { CardAnimationContext } from "@react-navigation/stack";
import * as React from "react";

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

export default function createSharedElementNativeStackNavigator<
  ParamList extends ParamListBase
>(options?: { name?: string; debug?: boolean }) {
  const navigatorId =
    options && options.name ? options.name : `stack${_navigatorId}`;
  _navigatorId++;
  const debug = options?.debug || false;

  const rendererDataProxy = new SharedElementRendererProxy();

  const emitter = new EventEmitter();

  type Props = React.ComponentProps<
    ReturnType<typeof createNativeStackNavigator>["Navigator"]
  > &
    StackRouterOptions &
    NativeStackNavigationConfig;

  function SharedElementStackNavigator({
    initialRouteName,
    children,
    screenListeners,
    screenOptions,
    ...rest
  }: Props) {
    const { state, descriptors, navigation } = useNavigationBuilder<
      StackNavigationState<ParamListBase>,
      StackRouterOptions,
      StackActionHelpers<ParamListBase>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >(StackRouter, {
      initialRouteName,
      children,
      screenListeners,
      screenOptions,
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
              <NativeStackView
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
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap,
    typeof SharedElementStackNavigator
  >(SharedElementStackNavigator);

  const { Navigator, Screen } = navigatorFactory<ParamList>();

  type ScreenProps<RouteName extends keyof ParamList> = Omit<
    RouteConfig<
      ParamList,
      RouteName,
      StackNavigationState<ParamList>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >,
    "component" | "children"
  > & {
    component: SharedElementSceneComponent<any>;
    sharedElements?: SharedElementsComponentConfig;
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
