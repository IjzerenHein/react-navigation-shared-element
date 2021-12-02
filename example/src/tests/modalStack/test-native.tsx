import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element/build/native-stack";

import { MainScreen, DetailScreen, createScreen } from "../../screens";
import * as options from "./options";

const Stack = createSharedElementNativeStackNavigator(options);

const ModalDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  modal: "full",
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        presentation: "modal",
      })}
    >
      <Stack.Screen name={options.name} component={MainScreen} />
      <Stack.Screen name="Detail" component={ModalDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
