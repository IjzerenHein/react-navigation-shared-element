import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator,
  SharedElementsComponentConfig
} from "react-navigation-shared-element";

import { defaultItem } from "../data";
import { createScreen, MasterScreen, DetailScreen } from "../screens";

const sharedElements: SharedElementsComponentConfig = (
  navigation,
  otherNavigation,
  showing
) => {
  // Only return the shared-elements when showing this route
  if (!showing) return;
  const item = navigation.getParam("item") || defaultItem;
  return [
    { id: `${item.id}.image` },
    { id: `${item.id}.title`, animation: "fade" },
    { id: "close", animation: "fade-in" }
  ];
};

const ForwardOnlyStackNavigator = createSharedElementStackNavigator(
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
