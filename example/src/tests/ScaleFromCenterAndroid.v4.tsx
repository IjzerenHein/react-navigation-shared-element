import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { TransitionPresets } from "react-navigation-stack";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const name = "ScaleFromCenterAndroid";

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, name),
    Detail: DetailScreen,
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets[name],
    },
  },
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
