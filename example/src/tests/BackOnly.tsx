import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen } from "../screens";
import { getDetailSharedElements } from "../screens/getDetailSharedElements";

const name = "BackOnly";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={MainScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route, otherRoute, showing) => {
          // Only return the shared-elements when hiding this route
          if (showing) return;
          return getDetailSharedElements(route, otherRoute, showing);
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
