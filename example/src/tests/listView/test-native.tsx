import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element/build/native-stack";

import { ListScreen, DetailPagerScreen } from "../../screens";
import * as options from "./options";

const Stack = createSharedElementNativeStackNavigator(options);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={options.name} component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailPagerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
