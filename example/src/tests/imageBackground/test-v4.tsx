import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";

import {
  createScreen,
  MainScreen,
  DetailScreenImageBackground,
} from "../../screens";
import * as options from "./options";

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
    Detail: DetailScreenImageBackground,
  },
  undefined,
  options
);

export default createAppContainer(StackNavigator);
