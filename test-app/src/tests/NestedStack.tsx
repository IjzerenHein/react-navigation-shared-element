import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const NestedStackNavigator = createSharedElementStackNavigator(
  {
    Master: createScreen(MasterScreen, "NestedStack"),
    Detail: DetailScreen
  },
  {},
  {
    name: "NestedStack",
    verbose: true
  }
);

const RootStackNavigator = createSharedElementStackNavigator(
  {
    Nested: {
      // @ts-ignore
      screen: NestedStackNavigator,
      navigationOptions: {
        title: "RootStack"
      }
    }
  },
  {},
  {
    name: "RootStack",
    verbose: true
  }
);

export default createAppContainer(RootStackNavigator);
