import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const StackNavigator1 = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "BottomStack1"),
    Detail: DetailScreen
  },
  undefined,
  {
    name: "BottomStack1",
    debug: true
  }
);

const StackNavigator2 = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "BottomStack2"),
    Detail: DetailScreen
  },
  undefined,
  {
    name: "BottomStack2",
    debug: true
  }
);

const TabNavigator = createBottomTabNavigator({
  Tab1: {
    // @ts-ignore
    screen: StackNavigator1,
    navigationOptions: {
      title: "Stack 1"
    }
  },
  Tab2: {
    // @ts-ignore
    screen: StackNavigator2,
    navigationOptions: {
      title: "Stack 2"
    }
  }
});

export default createAppContainer(TabNavigator);
