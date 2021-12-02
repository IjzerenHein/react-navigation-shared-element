import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element";

import { CardScreen, DetailPagerScreen } from "../../screens";
import * as options from "./options";

const Stack = createSharedElementNativeStackNavigator(options);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={options.name} component={CardScreen} />
      <Stack.Screen name="Detail" component={DetailPagerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
