import {
  useNavigationBuilder,
  DefaultNavigatorOptions,
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
} from "@react-navigation/native";
import {
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  StackNavigationConfig,
  StackNavigationEventMap,
} from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { Platform } from "react-native";

import { useSharedElementFocusEvents } from "./SharedElementFocusEvents";
import { SharedElementRendererProxy } from "./SharedElementRendererProxy";
import { SharedElementStackView } from "./SharedElementStackView";
import { createSharedElementNavigatorFactory } from "./createSharedElementNavigatorFactory";
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
      <SharedElementStackView
        state={state}
        navigation={navigation}
        descriptors={descriptors}
        rendererDataProxy={rendererDataProxy}
        emitter={emitter}
        {...rest}
      />
    );
  }

  return createSharedElementNavigatorFactory<ParamList>(
    rendererDataProxy,
    emitter,
    navigatorId,
    debug
  )(SharedElementStackNavigator);
}
