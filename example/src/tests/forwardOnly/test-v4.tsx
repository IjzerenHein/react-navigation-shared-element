import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator,
  SharedElementsComponentConfig,
} from "react-navigation-shared-element/stack-v4";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import { getDetailSharedElements } from "../../screens/getDetailSharedElements";
import * as options from "./options";

const sharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  // Only return the shared-elements when showing this route
  if (!showing) return;
  return getDetailSharedElements(route, otherRoute, showing);
};

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, options.name),
    Detail: createScreen(DetailScreen, undefined, sharedElements),
  },
  undefined,
  options
);

export default createAppContainer(StackNavigator);
