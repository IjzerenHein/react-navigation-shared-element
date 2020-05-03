import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const name = "NestedStack";

const RootStack = createSharedElementStackNavigator({
  name,
  debug: true
});

const NestedStack = createSharedElementStackNavigator({
  name,
  debug: true
});

const ModalDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  modal: "full"
});

const NestedStackScreen = () => (
  <NestedStack.Navigator>
    <NestedStack.Screen name={name} component={MasterScreen} />
  </NestedStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name={name} component={NestedStackScreen} />
      <RootStack.Screen name="Detail" component={ModalDetailScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
