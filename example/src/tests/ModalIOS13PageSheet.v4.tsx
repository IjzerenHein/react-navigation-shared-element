import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";
import { TransitionPresets } from "react-navigation-stack";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const ModalIOS13PageSheetStackNavigator = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "ModalIOS13PageSheet"),
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
    name: "ModalIOS13PageSheet",
    debug: true
  }
);

export default createAppContainer(ModalIOS13PageSheetStackNavigator);
