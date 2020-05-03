import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen } from "../screens";

const name = "BottomTabs2";

const BottomTab = createBottomTabNavigator();

const Stack = createSharedElementStackNavigator({
  name,
  debug: true
});

const TabScreen = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen name="Tab1" component={MasterScreen} />
    <BottomTab.Screen name="Tab2" component={MasterScreen} />
  </BottomTab.Navigator>
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={TabScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
