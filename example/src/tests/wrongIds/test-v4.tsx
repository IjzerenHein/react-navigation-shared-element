import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator,
  SharedElementsComponentConfig,
} from "react-navigation-shared-element/build/v4";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const sharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  return [
    { id: "unknownId1" },
    { id: "unknownId2", animation: "move" },
    { id: "unknownId3", animation: "fade" },
  ];
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
