import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator,
  SharedElementsComponentConfig,
} from "react-navigation-shared-element/build/v4";

import { defaultItem } from "../data";
import { createScreen, MainScreen, DetailScreen } from "../screens";

const name = "BackOnly";

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
    { id: "logo", animation: "fade" },
    { id: "gradient", animation: "fade" },
    { id: `${item.id}.title`, animation: "fade" },
    { id: `${item.id}.description`, animation: "fade" },
    { id: "close", animation: "fade" },
  ];
};

const StackNavigator = createSharedElementStackNavigator(
  {
    Main: createScreen(MainScreen, name),
    Detail: createScreen(DetailScreen, undefined, sharedElements),
  },
  undefined,
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
