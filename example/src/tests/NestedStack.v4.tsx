import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const NestedStackNavigator = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "NestedStack"),
    Detail: DetailScreen
  },
  {},
  {
    name: "NestedStack",
    debug: true
  }
);

const RootStackNavigator = createSharedElementStackNavigator4(
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
    debug: true
  }
);

export default createAppContainer(RootStackNavigator);
