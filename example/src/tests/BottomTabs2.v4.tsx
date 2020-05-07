import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { MasterScreen, DetailScreen } from "../screens";

const ChildStack = createSharedElementStackNavigator4(
  {
    Master: MasterScreen
  },
  {
    headerMode: "none"
  },
  {
    name: "ChildStack",
    debug: true
  }
);

// In order to ensure that Tab1 works correctly, it is wrapped
// with a shared-element stack navigator. This is a workaround that
// ensures that the screen is wrapped in a shared-element scene.
// In the example below, Tab2 is not wrapped and therefore doesn't
// perform shared-element transitions.
const TabNavigator = createBottomTabNavigator({
  Tab1: {
    // @ts-ignore
    screen: ChildStack,
    navigationOptions: {
      title: "Stack 1"
    }
  },
  Tab2: {
    // @ts-ignore
    screen: MasterScreen,
    navigationOptions: {
      title: "Stack 2"
    }
  }
});

const MainStack = createSharedElementStackNavigator4(
  {
    Master: TabNavigator,
    Detail: DetailScreen
  },
  undefined,
  {
    name: "MainStack",
    debug: true
  }
);

export default createAppContainer(MainStack);
