import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const NestedStackNavigator = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "NestedStack2")
  },
  undefined,
  {
    name: "NestedStack2",
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
    },
    Detail: createScreen(DetailScreen, undefined, undefined, { modal: "full" })
  },
  {
    headerMode: "none"
  },
  {
    name: "RootStack",
    debug: true
  }
);

export default createAppContainer(RootStackNavigator);
