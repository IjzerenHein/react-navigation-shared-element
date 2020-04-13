import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const SimpleStackNavigator = createSharedElementStackNavigator(
  {
    Master: createScreen(MasterScreen, "SimpleStack"),
    Detail: DetailScreen
  },
  undefined,
  {
    name: "SimpleStack",
    debug: true
  }
);

export default createAppContainer(SimpleStackNavigator);
