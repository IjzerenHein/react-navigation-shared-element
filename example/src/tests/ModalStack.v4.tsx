import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";

import { MasterScreen, DetailScreen, createScreen } from "../screens";

const ModalStackNavigator = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "ModalStack"),
    Detail: createScreen(DetailScreen, undefined, undefined, { modal: "full" })
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true
    }
  },
  {
    name: "ModalStack",
    debug: true
  }
);

export default createAppContainer(ModalStackNavigator);
