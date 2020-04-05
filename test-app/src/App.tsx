import * as React from "react";
import { createAppContainer } from "react-navigation";
import {
  TransitionPresets,
  createStackNavigator
} from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs/src/index";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import { MainScreen } from "./MainScreen";
import { DetailScreen } from "./DetailScreen";
import { ModalScreen } from "./ModalScreen";
import Icon from "./components/Icon";

enableScreens();

export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10
  }
};

//const StackNavigator1 = createSharedElementStackNavigator(
const StackNavigator1 = createStackNavigator(
  {
    Main: MainScreen,
    Detail: DetailScreen
  },
  {
    defaultNavigationOptions: {
      /*onTransitionStart: (a, b, c) => {
        console.log("onTransitionStart: ", a, b, c);
      },
      onTransitionEnd: (a, b, c) => {
        console.log("onTransitionEnd: ", a, b, c);
      },*/
      transitionSpec: {
        open: iosTransitionSpec,
        close: iosTransitionSpec
      }
    }
  },
  {
    name: "StackNavigator1"
  }
);

const StackNavigator2 = createSharedElementStackNavigator(
  {
    Main: {
      screen: props => <MainScreen {...props} modal />
    }
  },
  undefined,
  {
    name: "StackNavigator2"
  }
);

const StackNavigator3_5 = createSharedElementStackNavigator(
  {
    Detail: DetailScreen
  },
  undefined,
  {
    name: "StackNavigator3_5"
  }
);

const StackNavigator3 = createSharedElementStackNavigator(
  {
    Main: MainScreen,
    Detail: StackNavigator3_5
    /*TopTab: {
      screen: createSharedElementStackNavigator({
        Detail: DetailScreen,
      }),
    },*/
  },
  undefined,
  {
    name: "StackNavigator3"
  }
);

const TabNavigator = createBottomTabNavigator({
  Tab1: {
    screen: StackNavigator1,
    navigationOptions: {
      title: "Stack",
      tabBarIcon: props => (
        <Icon name="md-arrow-forward" size={20} color={props.tintColor} />
      )
    }
  },
  Tab2: {
    screen: StackNavigator2,
    navigationOptions: {
      title: "Modal",
      tabBarIcon: props => (
        <Icon name="md-arrow-up" size={20} color={props.tintColor} />
      )
    }
  },
  Tab3: {
    screen: StackNavigator3,
    navigationOptions: {
      title: "Top Tabs",
      tabBarIcon: props => (
        <Icon name="md-keypad" size={20} color={props.tintColor} />
      )
    }
  }
});

const RootModalStackNavigator = createSharedElementStackNavigator(
  {
    Tabs: TabNavigator,
    Modal: ModalScreen
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS
    }
  },
  {
    name: "ModalStack"
  }
);

//export default createAppContainer(RootModalStackNavigator);
export default createAppContainer(StackNavigator1);
