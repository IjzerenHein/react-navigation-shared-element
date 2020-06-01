import { StackNavigationState } from "@react-navigation/native";
import { StackView } from "@react-navigation/stack";
import {
  StackDescriptorMap,
  StackNavigationConfig,
  StackNavigationHelpers,
} from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";

import { useSharedElementFocusEvents } from "./SharedElementFocusEvents";
import SharedElementRendererContext from "./SharedElementRendererContext";
import SharedElementRendererData from "./SharedElementRendererData";
import { SharedElementRendererProxy } from "./SharedElementRendererProxy";
import SharedElementRendererView from "./SharedElementRendererView";
import { EventEmitter } from "./utils/EventEmitter";

type SharedElementViewProps = StackNavigationConfig & {
  state: StackNavigationState;
  navigation: StackNavigationHelpers;
  descriptors: StackDescriptorMap;
} & {
  debug?: boolean;
  rendererDataProxy: SharedElementRendererProxy;
  emitter: EventEmitter;
};

export function SharedElementStackView({
  state,
  descriptors,
  navigation,
  debug,
  rendererDataProxy,
  emitter,
  ...rest
}: SharedElementViewProps) {
  const rendererDataRef = React.useRef<SharedElementRendererData | null>(null);

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
