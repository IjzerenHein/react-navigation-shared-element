import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createSharedElementNativeStackNavigator } from "react-navigation-shared-element/native-stack";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const Stack = createSharedElementNativeStackNavigator(options);

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

const SafeAreaDetailScreen = createScreen(
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
      <Stack.Screen name={options.name} component={SafeAreaMainScreen} />
      <Stack.Screen name="Detail" component={SafeAreaDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
