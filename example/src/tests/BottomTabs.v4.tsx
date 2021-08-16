import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { TabBarIcon } from "../components";
import { createScreen, MainScreen, DetailScreen } from "../screens";

const StackNavigator1 = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "BottomStack1"),
    Detail: DetailScreen,
  },
  undefined,
  {
    name: "BottomStack1",
    debug: true,
  }
);

const StackNavigator2 = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "BottomStack2"),
    Detail: DetailScreen,
  },
  undefined,
  {
    name: "BottomStack2",
    debug: true,
  }
);

const TabNavigator = createBottomTabNavigator({
  Tab1: {
    screen: StackNavigator1,
    navigationOptions: {
      title: "Stack 1",
      tabBarIcon: TabBarIcon,
    },
  },
  Tab2: {
    screen: StackNavigator2,
    navigationOptions: {
      title: "Stack 2",
      tabBarIcon: TabBarIcon,
    },
  },
});

export default createAppContainer(TabNavigator);
