import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const SimpleStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "SimpleStack"),
    Detail: DetailScreen,
  },
  undefined,
  {
    name: "SimpleStack",
    debug: true,
  }
);

export default createAppContainer(SimpleStackNavigator);
