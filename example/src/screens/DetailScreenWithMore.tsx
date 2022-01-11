import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import { TouchableScale } from "../components";
import { Item, defaultItem, items } from "../data";
import { DetailComponent } from "./DetailComponent";
import { getMoreDetailSharedElements } from "./getMoreDetailsSharedElements";
import { SharedElement } from "react-navigation-shared-element";

type Props = {
  navigation: NavigationStackProp<any>;
  route: any; // v5
  modal: "none" | "full" | "sheet";
  onPress?: ({
    navigation,
    item,
    nextItem,
  }: {
    navigation: NavigationStackProp<any>;
    item?: Item;
    nextItem?: Item;
  }) => void;
};

export const DetailScreenWithMore = (props: Props) => {
  const { navigation, route, modal, onPress } = props;
  const params = route?.params || navigation?.state?.params;
  const item: Item = params?.item || defaultItem;
  const content = (
    <DetailComponent item={item} navigation={navigation} modal={modal} />
  );

  // get 3 items that aren't the item we're viewing now
  const moreItems = items.filter((_i) => _i.id !== item.id).slice(0, 3);
  const moreContent = (
    <View
      style={{
        zIndex: 1000,
        bottom: 20,
        left: 0,
        right: 0,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      {moreItems.map((_i, index) => (
        <TouchableScale
          key={index}
          style={styles.flex}
          onPress={
            onPress ? () => onPress({ navigation, nextItem: _i }) : undefined
          }
        >
          <View style={styles.container}>
            <SharedElement id={`${_i.id}.image`}>
              <Image style={styles.image} source={_i.image} />
            </SharedElement>
            <SharedElement id={`${_i.id}.title`}>
              <Text style={styles.text}>{`${_i.title}`}</Text>
            </SharedElement>
            <Text style={styles.caption}>tap me</Text>
          </View>
        </TouchableScale>
      ))}
    </View>
  );
  return (
    <>
      {moreContent}
      {content}
    </>
  );
};

DetailScreenWithMore.navigationOptions = {
  title: "Boys will be boys",
};

// Add the `sharedElements` function to the component, which
// should return a list of shared-elements to transition.
// The `sharedElements` function is called whenever you navigate
// to or from this screen. You can use the provided navigation
// states or trigger or disable animations.
DetailScreenWithMore.sharedElements = getMoreDetailSharedElements;

const styles = StyleSheet.create({
  flex: {
    width: 100,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
  },
  caption: {
    fontSize: 15,
    opacity: 0.5,
  },
  image: {
    width: 50,
    height: 30,
    resizeMode: "cover",
  },
});
