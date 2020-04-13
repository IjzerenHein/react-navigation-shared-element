import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { TransitionPresets } from "react-navigation-stack";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const ModalStackNavigator = createSharedElementStackNavigator(
  {
    Master: createScreen(MasterScreen, "ModalStack"),
    Detail: createScreen(DetailScreen, undefined, undefined, { modal: "sheet" })
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
    name: "ModalStack",
    debug: true
  }
);

export default createAppContainer(ModalStackNavigator);
