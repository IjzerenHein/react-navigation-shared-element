import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";
import { TransitionPresets } from "react-navigation-stack";

import { MainScreen, DetailScreen, createScreen } from "../../screens";
import * as options from "./options";

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
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
  options
);

export default createAppContainer(StackNavigator);
