import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";

import { createScreen, CardScreen, DetailPagerScreen } from "../../screens";
import * as options from "./options";

const StackNavigator = createSharedElementStackNavigator(
  {
    List: createScreen(CardScreen, options.name),
    Detail: DetailPagerScreen,
  },
  undefined,
  options
);

export default createAppContainer(StackNavigator);
