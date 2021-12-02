import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, ListScreen, DetailPagerScreen } from "../../screens";
import * as options from "./options";

const StackNavigator = createSharedElementStackNavigator(
  {
    List: createScreen(ListScreen, options.name),
    Detail: DetailPagerScreen,
  },
  undefined,
  options
);

export default createAppContainer(StackNavigator);
