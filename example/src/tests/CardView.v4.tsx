import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/build/v4";

import { createScreen, CardScreen, DetailScreen } from "../screens";

const name = "CardView";

const StackNavigator = createSharedElementStackNavigator(
  {
    List: createScreen(CardScreen, name),
    Detail: DetailScreen,
  },
  undefined,
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
