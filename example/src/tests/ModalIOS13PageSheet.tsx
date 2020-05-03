import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const name = "ModalIOS13PageSheet";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true
});

const ModalDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  modal: "sheet"
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={() => ({
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS
      })}
    >
      <Stack.Screen name={name} component={MasterScreen} />
      <Stack.Screen name="Detail" component={ModalDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
