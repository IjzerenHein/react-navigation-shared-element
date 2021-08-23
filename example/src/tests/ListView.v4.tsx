import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, ListScreen, DetailPagerScreen } from "../screens";

const name = "ListView";

const StackNavigator = createSharedElementStackNavigator(
  {
    List: createScreen(ListScreen, name),
    Detail: DetailPagerScreen,
  },
  undefined,
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
