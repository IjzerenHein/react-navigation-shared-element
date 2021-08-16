import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const NestedStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "NestedStack2"),
  },
  undefined,
  {
    name: "NestedStack2",
    debug: true,
  }
);

const RootStackNavigator = createSharedElementStackNavigator(
  {
    Nested: {
      screen: NestedStackNavigator,
      navigationOptions: {
        title: "RootStack",
      },
    },
    Detail: createScreen(DetailScreen, undefined, undefined, { modal: "full" }),
  },
  {
    headerMode: "none",
  },
  {
    name: "RootStack",
    debug: true,
  }
);

export default createAppContainer(RootStackNavigator);
