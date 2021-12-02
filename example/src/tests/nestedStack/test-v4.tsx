import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const NestedStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
    Detail: DetailScreen,
  },
  {},
  options
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
    ...options,
    name: "RootStack",
  }
);

export default createAppContainer(RootStackNavigator);
