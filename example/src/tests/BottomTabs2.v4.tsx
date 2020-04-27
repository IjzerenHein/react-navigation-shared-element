import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { MasterScreen, DetailScreen } from "../screens";

const TabNavigator = createBottomTabNavigator({
  Tab1: {
    // @ts-ignore
    screen: MasterScreen,
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
