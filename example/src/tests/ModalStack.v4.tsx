import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { MainScreen, DetailScreen, createScreen } from "../screens";

const ModalStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "ModalStack"),
    Detail: createScreen(DetailScreen, undefined, undefined, { modal: "full" }),
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
    },
  },
  {
    name: "ModalStack",
    debug: true,
  }
);

export default createAppContainer(ModalStackNavigator);
