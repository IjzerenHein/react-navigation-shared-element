import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const NestedStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "NestedStack"),
    Detail: DetailScreen,
  },
  {},
  {
    name: "NestedStack",
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
  },
  {},
  {
    name: "RootStack",
    debug: true,
  }
);

export default createAppContainer(RootStackNavigator);
