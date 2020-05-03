import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const name = "ModalStack";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true
});

const ModalDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  modal: "full"
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name={name} component={MasterScreen} />
      <Stack.Screen name="Detail" component={ModalDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
