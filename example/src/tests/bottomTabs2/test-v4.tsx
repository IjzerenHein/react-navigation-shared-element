import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { TabBarIcon } from "../../components";
import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const ChildStack = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "BottomTabs2"),
  },
  {
    headerMode: "none",
  },
  options
);

// In order to ensure that Tab1 works correctly, it is wrapped
// with a shared-element stack navigator. This is a workaround that
// ensures that the screen is wrapped in a shared-element scene.
// In the example below, Tab2 is not wrapped and therefore doesn't
// perform shared-element transitions.
const TabNavigator = createBottomTabNavigator({
  Tab1: {
    screen: ChildStack,
    navigationOptions: {
      title: "Stack 1",
      tabBarIcon: TabBarIcon,
    },
  },
  Tab2: {
    screen: MainScreen,
    navigationOptions: {
      title: "Stack 2",
      tabBarIcon: TabBarIcon,
    },
  },
});

const MainStack = createSharedElementStackNavigator(
  {
    Main: TabNavigator,
    Detail: DetailScreen,
  },
  undefined,
  {
    ...options,
    name: "MainStack",
  }
);

export default createAppContainer(MainStack);
