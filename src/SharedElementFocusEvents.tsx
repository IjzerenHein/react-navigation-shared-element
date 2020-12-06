import {
  NavigationContext,
  StackNavigationState,
} from "@react-navigation/native";
import * as React from "react";

import { EventEmitter } from "./utils/EventEmitter";

/**
 * A variation of useFocusEvents that uses a custom emitter
 * and emits events using useLayoutEffect instead of useEffect.
 * This enables shared element to respond to focus events in
 * a timely manner.
 * https://github.com/react-navigation/react-navigation/blob/master/packages/core/src/useFocusEvents.tsx
 */
export function useSharedElementFocusEvents<
  ParamList extends Record<string, object | undefined>
>({
  state,
  emitter,
}: {
  state: StackNavigationState<ParamList>;
  emitter: EventEmitter;
}) {
  const navigation = React.useContext(NavigationContext);
  const lastFocusedKeyRef = React.useRef<string | undefined>();

  const currentFocusedKey = state.routes[state.index].key;

  // When the parent screen changes its focus state, we also need to change child's focus
  // Coz the child screen can't be focused if the parent screen is out of focus
  React.useLayoutEffect(
    () =>
      navigation?.addListener("focus", () => {
        lastFocusedKeyRef.current = currentFocusedKey;
        emitter.emit("focus", currentFocusedKey);
      }),
    [currentFocusedKey, emitter, navigation]
  );

  React.useLayoutEffect(
    () =>
      navigation?.addListener("blur", () => {
        lastFocusedKeyRef.current = undefined;
        emitter.emit("blur", currentFocusedKey);
      }),
    [currentFocusedKey, emitter, navigation]
  );

  React.useLayoutEffect(() => {
    const lastFocusedKey = lastFocusedKeyRef.current;

    lastFocusedKeyRef.current = currentFocusedKey;

    // We wouldn't have `lastFocusedKey` on initial mount
    // Fire focus event for the current route on mount if there's no parent navigator
    if (lastFocusedKey === undefined && !navigation) {
      emitter.emit("focus", currentFocusedKey);
    }

    // We should only emit events when the focused key changed and navigator is focused
    // When navigator is not focused, screens inside shouldn't receive focused status either
    if (
      lastFocusedKey === currentFocusedKey ||
      !(navigation ? navigation.isFocused() : true)
    ) {
      return;
    }

    if (lastFocusedKey === undefined) {
      // Only fire events after initial mount
      return;
    }

    emitter.emit("blur", lastFocusedKey);
    emitter.emit("focus", currentFocusedKey);
  }, [currentFocusedKey, emitter, navigation]);
}
