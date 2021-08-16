import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { TransitionPresets } from "react-navigation-stack";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const SimpleStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "ModalSlideFromBottomIOS"),
    Detail: DetailScreen,
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.ModalSlideFromBottomIOS,
    },
  },
  {
    name: "ModalSlideFromBottomIOS",
    debug: true,
  }
);

export default createAppContainer(SimpleStackNavigator);
