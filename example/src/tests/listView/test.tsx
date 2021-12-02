import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { ListScreen, DetailPagerScreen } from "../../screens";
import * as options from "./options";

const Stack = createSharedElementStackNavigator(options);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={options.name} component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailPagerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
