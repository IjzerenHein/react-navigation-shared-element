import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen, createScreen } from "../screens";

const name = "OverlappingElements";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Detail1Screen = createScreen(DetailScreen, undefined, undefined, {
  overlappingElements: true,
  onPress: ({ navigation, item }: any) => {
    navigation.push("Detail2", {
      item,
    });
  },
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={MainScreen} />
      <Stack.Screen name="Detail" component={Detail1Screen} />
    </Stack.Navigator>
  </NavigationContainer>
);
