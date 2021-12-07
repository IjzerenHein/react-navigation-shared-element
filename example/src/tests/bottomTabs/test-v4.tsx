import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { TabBarIcon } from "../../components";
import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const StackNavigator1 = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "BottomStack1"),
    Detail: DetailScreen,
  },
  undefined,
  {
    ...options,
    name: "BottomStack1",
  }
);

const StackNavigator2 = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "BottomStack2"),
    Detail: DetailScreen,
  },
  undefined,
  {
    ...options,
    name: "BottomStack2",
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
