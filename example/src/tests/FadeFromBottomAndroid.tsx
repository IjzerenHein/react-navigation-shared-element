import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const name = "FadeFromBottomAndroid";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Detail1Screen = createScreen(DetailScreen, undefined, undefined, {
  onPress: ({ navigation, item }: any) => {
    navigation.push("Detail2", {
      item,
    });
  },
});

const Detail2Screen = createScreen(DetailScreen, undefined, undefined, {
  resizeMode: "contain",
});
Detail2Screen.displayName = "Detail2Screen";

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    >
      <Stack.Screen name={name} component={MasterScreen} />
      <Stack.Screen name="Detail" component={Detail1Screen} />
      <Stack.Screen name="Detail2" component={Detail2Screen} />
    </Stack.Navigator>
  </NavigationContainer>
);
