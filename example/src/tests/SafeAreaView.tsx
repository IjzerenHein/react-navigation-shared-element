import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const name = "SafeAreaView";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

const SafeAreaMainScreen = createScreen(
  MainScreen,
  undefined,
  undefined,
  undefined,
  (props: any) => (
    <SafeAreaView style={{ flex: 1 }}>
      <MainScreen {...props} />
    </SafeAreaView>
  )
);

const SafeAreDetailScreen = createScreen(
  DetailScreen,
  undefined,
  undefined,
  undefined,
  (props: any) => (
    <SafeAreaView style={{ flex: 1 }}>
      <DetailScreen {...props} />
    </SafeAreaView>
  )
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={SafeAreaMainScreen} />
      <Stack.Screen name="Detail" component={SafeAreDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
