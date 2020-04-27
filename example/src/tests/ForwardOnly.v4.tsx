import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator4,
  SharedElementsComponentConfig
} from "react-navigation-shared-element";

import { defaultItem } from "../data";
import { createScreen, MasterScreen, DetailScreen } from "../screens";

const sharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  // Only return the shared-elements when showing this route
  if (!showing) return;
  const item = route.params.item || defaultItem;
  return [
    { id: `${item.id}.image` },
    { id: `${item.id}.title`, animation: "fade" },
    { id: "close", animation: "fade-in" }
  ];
};

const ForwardOnlyStackNavigator = createSharedElementStackNavigator4(
  {
    Master: createScreen(MasterScreen, "ForwardOnly"),
    Detail: createScreen(DetailScreen, undefined, sharedElements)
  },
  undefined,
  {
    name: "SimpleStack",
    debug: true
  }
);

export default createAppContainer(ForwardOnlyStackNavigator);
