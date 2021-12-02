import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

type TransitionPresetName =
  | "SlideFromRightIOS"
  | "ModalSlideFromBottomIOS"
  | "ModalPresentationIOS"
  | "FadeFromBottomAndroid"
  | "RevealFromBottomAndroid"
  | "ScaleFromCenterAndroid"
  | "BottomSheetAndroid"
  | "ModalFadeTransition"
  | "DefaultTransition"
  | "ModalTransition";

export default function createComponent(name: TransitionPresetName) {
  const Stack = createSharedElementStackNavigator({
    ...options,
    name,
  });
  return () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets[name],
        }}
      >
        <Stack.Screen name={name} component={MainScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
