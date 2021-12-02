import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element/build/native-stack";

import { MainScreen, DetailScreen } from "../../screens";
import { getDetailSharedElements } from "../../screens/getDetailSharedElements";
import * as options from "./options";

const Stack = createSharedElementNativeStackNavigator(options);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={options.name} component={MainScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route, otherRoute, showing) => {
          // Only return the shared-elements when showing this route
          if (!showing) return;
          return getDetailSharedElements(route, otherRoute, showing);
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
