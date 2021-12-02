import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

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

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: SafeAreaMainScreen,
    Detail: SafeAreaDetailScreen,
  },
  undefined,
  options
);

export default createAppContainer(StackNavigator);
