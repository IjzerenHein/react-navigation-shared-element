import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { createScreen, ListScreen, DetailScreen } from "../screens";

const StackNavigator = createSharedElementStackNavigator(
  {
    List: createScreen(ListScreen, "ListViewStack"),
    Detail: DetailScreen
  },
  undefined,
  {
    name: "ListViewStack",
    debug: true
  }
);

export default createAppContainer(StackNavigator);
