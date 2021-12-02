import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const RootStack = createSharedElementNativeStackNavigator(options);
const NestedStack = createSharedElementNativeStackNavigator(options);

const NestedStackScreen = () => (
  <NestedStack.Navigator>
    <NestedStack.Screen name="Main" component={MainScreen} />
    <NestedStack.Screen name="Detail" component={DetailScreen} />
  </NestedStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name={options.name} component={NestedStackScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
