import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const StackNavigator1 = createSharedElementStackNavigator(
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

StackNavigator1.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const StackNavigator2 = createSharedElementStackNavigator(
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
