import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { MainScreen, DetailScreen, createScreen } from "../../screens";
import * as options from "./options";

const ModalStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
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
  options
);

export default createAppContainer(ModalStackNavigator);
