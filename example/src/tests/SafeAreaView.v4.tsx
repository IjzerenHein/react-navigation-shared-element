import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const name = "SafeAreaView";

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

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: SafeAreaMainScreen,
    Detail: SafeAreDetailScreen,
  },
  undefined,
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
