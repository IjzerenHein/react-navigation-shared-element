import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { ListScreen, DetailPagerScreen } from "../screens";

const name = "ListView";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailPagerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
