import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { TabBarIcon } from "../components";
import { createScreen, MasterScreen, DetailScreen } from "../screens";

const ChildStack = createSharedElementStackNavigator(
  {
    Master: createScreen(MasterScreen, "BottomTabs2"),
  },
  {
    headerMode: "none",
  },
  {
    name: "BottomTabs2",
    debug: true,
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
      title: "Stack 1",
      tabBarIcon: TabBarIcon,
    },
  },
  Tab2: {
    // @ts-ignore
    screen: MasterScreen,
    navigationOptions: {
      title: "Stack 2",
      tabBarIcon: TabBarIcon,
    },
  },
});

const MainStack = createSharedElementStackNavigator(
  {
    Master: TabNavigator,
    Detail: DetailScreen,
  },
  undefined,
  {
    name: "MainStack",
    debug: true,
  }
);

export default createAppContainer(MainStack);
