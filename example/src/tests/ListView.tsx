import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { ListScreen, DetailScreen } from "../screens";
import { FastIOSTransitionSpec } from "../transitions";

const name = "ListView";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        // FastIOSTransitionSpec should be removed once this PR is merged:
        // https://github.com/react-navigation/react-navigation/pull/8028
        transitionSpec: {
          open: FastIOSTransitionSpec,
          close: FastIOSTransitionSpec
        }
      }}
    >
      <Stack.Screen name={name} component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
