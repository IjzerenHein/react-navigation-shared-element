import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StackAnimationTypes } from "react-native-screens";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

export default function createComponent(name: StackAnimationTypes) {
  const Stack = createSharedElementNativeStackNavigator({
    ...options,
    name,
  });
  return () => (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: name }}>
        <Stack.Screen name={name} component={MainScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
