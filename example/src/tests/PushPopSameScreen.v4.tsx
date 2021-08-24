import { createAppContainer } from "react-navigation";
import {
  createSharedElementStackNavigator,
  SharedElementsComponentConfig,
} from "react-navigation-shared-element/build/v4";

import { Item, items } from "../data";
import { createScreen, DetailScreen } from "../screens";

const sameIdItems = items.map((item) => ({ ...item, id: "sameId" }));

const name = "PushPopSameScreen";

const sharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  const item = route.params.item;
  return [
    { id: `${item.id}.image`, animation: "fade" },
    { id: `${item.id}.logo` },
    { id: `${item.id}.gradient`, animation: "fade" },
    { id: `${item.id}.title`, animation: "fade" },
    { id: `${item.id}.description`, animation: "fade" },
    { id: "close" },
  ];
};

const StackNavigator = createSharedElementStackNavigator(
  {
    Detail: createScreen(DetailScreen, undefined, sharedElements, {
      onPress: (event: any) => {
        const item: Item = event.item;
        const itemIdx = sameIdItems.indexOf(item);
        const nextItem =
          sameIdItems[itemIdx < sameIdItems.length - 2 ? itemIdx + 1 : 0];
        event.navigation.push("Detail", {
          item: nextItem,
        });
      },
    }),
  },
  {
    initialRouteParams: {
      item: sameIdItems[0],
    },
  },
  {
    name,
    debug: true,
  }
);

export default createAppContainer(StackNavigator);
