import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element/native-stack";

import { MainScreen, DetailScreen, createScreen } from "../../screens";
import * as options from "./options";

const Stack = createSharedElementNativeStackNavigator(options);

const ModalDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  modal: "sheet",
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      // Set react navigation 5 mode to modal
      // @ts-ignore:type {...} is not assignable to type
      mode="modal"
      screenOptions={() => ({
        headerShown: false,
        presentation: "modal",
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      })}
    >
      <Stack.Screen name={options.name} component={MainScreen} />
      <Stack.Screen name="Detail" component={ModalDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
