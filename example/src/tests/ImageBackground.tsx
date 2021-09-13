import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreenImageBackground } from "../screens";

const name = "DefaultStack";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={MainScreen} />
      <Stack.Screen name="Detail" component={DetailScreenImageBackground} />
    </Stack.Navigator>
  </NavigationContainer>
);
