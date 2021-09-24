import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreenImageBackground } from "../screens";

const name = "SimpleStack";

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, name),
    Detail: DetailScreenImageBackground,
  },
  undefined,
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
