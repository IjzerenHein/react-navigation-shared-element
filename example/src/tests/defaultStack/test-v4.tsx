import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
    Detail: DetailScreen,
  },
  undefined,
  options
);

export default createAppContainer(StackNavigator);
