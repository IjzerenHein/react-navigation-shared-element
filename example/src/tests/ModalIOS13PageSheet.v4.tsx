import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { TransitionPresets } from "react-navigation-stack";

import { MainScreen, DetailScreen, createScreen } from "../screens";

const name = "ModalIOS13PageSheet";

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, name),
    Detail: createScreen(DetailScreen, undefined, undefined, {
      modal: "sheet",
    }),
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    },
  },
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
