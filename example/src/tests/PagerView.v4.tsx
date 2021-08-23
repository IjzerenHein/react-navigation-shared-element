import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, ListScreen, PagerViewScreen } from "../screens";

const name = "PagerView";

const StackNavigator = createSharedElementStackNavigator(
  {
    List: createScreen(ListScreen, name),
    Detail: PagerViewScreen,
  },
  undefined,
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
