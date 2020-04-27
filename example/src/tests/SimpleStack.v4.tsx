import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";

import { createScreen, MasterScreen, DetailScreen } from "../screens";

const SimpleStackNavigator = createSharedElementStackNavigator4(
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
