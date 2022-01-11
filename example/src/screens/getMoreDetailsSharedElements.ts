import type { SharedElementsComponentConfig } from "react-navigation-shared-element";

export const getMoreDetailSharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  let item = undefined;
  if (!showing && route.name == otherRoute.name) {
    item = otherRoute.params.item;
  } else {
    item = route.params.item;
  }
  return [
    { id: `${item.id}.image` },
    { id: `${item.id}.title`, animation: "fade" },
    { id: "close", animation: "fade" },
  ];
};
