import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator,
  SharedElementsComponentConfig,
} from "react-navigation-shared-element/build/v4";

import { defaultItem } from "../data";
import { createScreen, MainScreen, DetailScreen } from "../screens";

const sharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  // Only return the shared-elements when hiding this route
  if (showing) return;
  const item = route.params.item || defaultItem;
  return [
    { id: `${item.id}.image` },
    { id: `${item.id}.title`, animation: "fade" },
    { id: "close", animation: "fade-in" },
  ];
};

const BackOnlyStackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, "BackOnly"),
    Detail: createScreen(DetailScreen, undefined, sharedElements),
  },
  undefined,
  {
    name: "SimpleStack",
    debug: true,
  }
);

export default createAppContainer(BackOnlyStackNavigator);
