import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen, createScreen } from "../../screens";
import * as options from "./options";

const RootStack = createSharedElementStackNavigator(options);
const NestedStack = createSharedElementStackNavigator(options);

const ModalDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  modal: "full",
});

const NestedStackScreen = () => (
  <NestedStack.Navigator>
    <NestedStack.Screen name="Main" component={MainScreen} />
  </NestedStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name={options.name} component={NestedStackScreen} />
      <RootStack.Screen name="Detail" component={ModalDetailScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
