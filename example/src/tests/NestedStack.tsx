import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen } from "../screens";

const name = "NestedStack";

const RootStack = createSharedElementStackNavigator({
  name,
  debug: true
});

const NestedStack = createSharedElementStackNavigator({
  name,
  debug: true
});

const NestedStackScreen = () => (
  <NestedStack.Navigator>
    <NestedStack.Screen name={name} component={MasterScreen} />
    <NestedStack.Screen name="Detail" component={DetailScreen} />
  </NestedStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name={name} component={NestedStackScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
