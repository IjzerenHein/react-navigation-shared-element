import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";
import { TransitionPresets } from "react-navigation-stack";

import { MainScreen, DetailScreen, createScreen } from "../screens";

const ModalIOS13PageSheetStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "ModalIOS13PageSheet"),
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
    name: "ModalIOS13PageSheet",
    debug: true,
  }
);

export default createAppContainer(ModalIOS13PageSheetStackNavigator);
