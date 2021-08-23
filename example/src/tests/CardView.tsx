import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { CardScreen, DetailPagerScreen } from "../screens";

const name = "CardView";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={CardScreen} />
      <Stack.Screen name="Detail" component={DetailPagerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
