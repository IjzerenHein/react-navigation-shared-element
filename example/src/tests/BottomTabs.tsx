import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen } from "../screens";

const name = "BottomTabs";

const BottomTab = createBottomTabNavigator();

const Stack1 = createSharedElementStackNavigator({
  name,
  debug: true
});

const Stack2 = createSharedElementStackNavigator({
  name,
  debug: true
});

const Stack1Screen = () => (
  <Stack1.Navigator>
    <Stack1.Screen name={name} component={MasterScreen} />
    <Stack1.Screen name="Detail" component={DetailScreen} />
  </Stack1.Navigator>
);

const Stack2Screen = () => (
  <Stack2.Navigator>
    <Stack2.Screen name={name} component={MasterScreen} />
    <Stack2.Screen name="Detail" component={DetailScreen} />
  </Stack2.Navigator>
);

export default () => (
  <NavigationContainer>
    <BottomTab.Navigator>
      <BottomTab.Screen name="Tab1" component={Stack1Screen} />
      <BottomTab.Screen name="Tab2" component={Stack2Screen} />
    </BottomTab.Navigator>
  </NavigationContainer>
);
