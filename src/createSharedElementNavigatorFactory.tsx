import {
  createNavigatorFactory,
  RouteConfig,
  StackNavigationState,
} from "@react-navigation/native";
import {
  CardAnimationContext,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";

import createSharedElementScene from "./createSharedElementScene";
import {
  SharedElementSceneComponent,
  SharedElementsComponentConfig,
} from "./types";

export function createSharedElementNavigatorFactory<
  ParamList extends Record<string, object | undefined>
>(rendererDataProxy, emitter, navigatorId, debug) {
  return function (sharedElementNavigatorComponent) {
    const navigatorFactory = createNavigatorFactory<
      StackNavigationState,
      StackNavigationOptions,
      StackNavigationEventMap,
      typeof sharedElementNavigatorComponent
    >(sharedElementNavigatorComponent);

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
  };
}
