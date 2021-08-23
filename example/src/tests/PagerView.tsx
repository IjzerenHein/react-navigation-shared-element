import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { ListScreen, PagerViewScreen } from "../screens";

const name = "PagerView";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={ListScreen} />
      <Stack.Screen name="Detail" component={PagerViewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
