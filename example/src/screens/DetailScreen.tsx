import * as React from "react";
import { NavigationStackProp } from "react-navigation-stack";

import { Item, defaultItem } from "../data";
import { DetailComponent } from "./DetailComponent";
import { getDetailSharedElements } from "./getDetailSharedElements";

type Props = {
  navigation: NavigationStackProp<any>;
  route: any; // v5
  modal: "none" | "full" | "sheet";
};

export const DetailScreen = (props: Props) => {
  const { navigation, route, modal } = props;
  const params = route?.params || navigation?.state?.params;
  const item: Item = params?.item || defaultItem;
  return <DetailComponent item={item} navigation={navigation} modal={modal} />;
};

DetailScreen.navigationOptions = {
  title: "Boys will be boys",
};

// Add the `sharedElements` function to the component, which
// should return a list of shared-elements to transition.
// The `sharedElements` function is called whenever you navigate
// to or from this screen. You can use the provided navigation
// states or trigger or disable animations.
DetailScreen.sharedElements = getDetailSharedElements;
