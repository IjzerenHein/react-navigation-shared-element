import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen } from "../screens";

const name = "SimpleStack";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true
});

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={name} component={MasterScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
