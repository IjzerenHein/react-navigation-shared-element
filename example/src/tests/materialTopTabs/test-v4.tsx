import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const StackNavigator1 = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "TopStack1"),
    Detail: DetailScreen,
  },
  undefined,
  {
    ...options,
    name: "TopStack1",
  }
);

const StackNavigator2 = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "TopStack2"),
    Detail: DetailScreen,
  },
  undefined,
  {
    ...options,
    name: "TopStack2",
  }
);

const TabNavigator = createMaterialTopTabNavigator({
  Tab1: {
    screen: StackNavigator1,
    navigationOptions: {
      title: "Stack 1",
    },
  },
  Tab2: {
    screen: StackNavigator2,
    navigationOptions: {
      title: "Stack 2",
    },
  },
});

export default createAppContainer(TabNavigator);
