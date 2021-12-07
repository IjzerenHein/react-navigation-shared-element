import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const NestedStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
  },
  undefined,
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
    Detail: createScreen(DetailScreen, undefined, undefined, { modal: "full" }),
  },
  {
    headerMode: "none",
  },
  {
    ...options,
    name: "RootStack",
  }
);

export default createAppContainer(RootStackNavigator);
