import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import { TouchableScale } from "../components";
import { Item, defaultItem } from "../data";
import { DetailComponentImageBackground } from "./DetailComponentImageBackground";
import { getDetailSharedElements } from "./getDetailSharedElements";

type Props = {
  navigation: NavigationStackProp<any>;
  route: any; // v5
  modal: "none" | "full" | "sheet";
  onPress?: ({
    navigation,
    item,
  }: {
    navigation: NavigationStackProp<any>;
    item: Item;
  }) => void;
};

export const DetailScreenImageBackground = (props: Props) => {
  const { navigation, route, modal, onPress } = props;
  const params = route?.params || navigation?.state?.params;
  const item: Item = params?.item || defaultItem;
  const content = (
    <DetailComponentImageBackground
      item={item}
      navigation={navigation}
      modal={modal}
    />
  );
  return onPress ? (
    <TouchableScale
      onPress={() => onPress({ navigation, item })}
      style={StyleSheet.absoluteFill}
    >
      {content}
    </TouchableScale>
  ) : (
    content
  );
};

DetailScreenImageBackground.navigationOptions = {
  title: "Boys will be boys",
};

// Add the `sharedElements` function to the component, which
// should return a list of shared-elements to transition.
// The `sharedElements` function is called whenever you navigate
// to or from this screen. You can use the provided navigation
// states or trigger or disable animations.
DetailScreenImageBackground.sharedElements = getDetailSharedElements;
