import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator5 } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen } from "../screens";

const Stack = createSharedElementStackNavigator5({
  name: "SimpleStack",
  debug: true
});

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SimpleStack" component={MasterScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
