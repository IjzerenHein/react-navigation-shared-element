import type { SharedElementsComponentConfig } from "react-navigation-shared-element";

import { defaultItem } from "../data";

export const getDetailSharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  const item = route.params.item || defaultItem;
  return [
    { id: `${item.id}.image` },
    { id: `${item.id}.logo`, animation: "fade" },
    { id: `${item.id}.gradient`, animation: "fade" },
    { id: `${item.id}.title`, animation: "fade" },
    { id: `${item.id}.description`, animation: "fade" },
    { id: "close", animation: "fade" },
  ];
};
