import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../screens";

const SimpleStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "OverlappingElements"),
    Detail: createScreen(DetailScreen, undefined, undefined, {
      overlappingElements: true,
    }),
  },
  undefined,
  {
    name: "OverlappingElements",
    debug: true,
  }
);

export default createAppContainer(SimpleStackNavigator);
