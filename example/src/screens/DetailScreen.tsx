import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  SharedElement,
  SharedElementsComponentConfig
} from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { Icon } from "../components";
import { defaultItem } from "../data";

interface Props {
  navigation: NavigationStackProp<any>;
  modal: "none" | "full" | "sheet";
}

export const DetailScreen = ({ navigation, modal }: Props) => {
  const item = navigation.getParam("item") || defaultItem;
  return (
    <>
      <View style={styles.container}>
        <SharedElement id={`${item.id}.image`} style={StyleSheet.absoluteFill}>
          <Image style={styles.image} resizeMode="cover" source={item.image} />
        </SharedElement>
        <SharedElement id={`${item.id}.title`}>
          <Text style={styles.text}>{item.title}</Text>
        </SharedElement>
        {modal !== "none" ? (
          <View
            style={[
              styles.header,
              modal === "sheet" ? styles.sheetHeader : undefined
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <SharedElement id="close">
                <Icon style={styles.icon} name="ios-close" />
              </SharedElement>
            </TouchableOpacity>
          </View>
        ) : (
          undefined
        )}
      </View>
    </>
  );
};

DetailScreen.defaultProps = {
  modal: "none"
};

DetailScreen.navigationOptions = {
  title: "Boys will be boys"
};

// Add the `sharedElements` function to the component, which
// should return a list of shared-elements to transition.
// The `sharedElements` function is called whenever you navigate
// to or from this screen. You can use the provided navigation
// states or trigger or disable animations.
const sharedElements: SharedElementsComponentConfig = (
  navigation,
  otherNavigation,
  showing
) => {
  const item = navigation.getParam("item") || defaultItem;
  return [
    { id: `${item.id}.image` },
    { id: `${item.id}.title`, animation: "fade" },
    { id: "close", animation: "fade-in" }
  ];
};
DetailScreen.sharedElements = sharedElements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    position: "absolute",
    left: 16,
    top: 32
  },
  sheetHeader: {
    left: 16,
    top: 16
  },
  icon: {
    fontSize: 40,
    color: "white"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  text: {
    marginTop: 20,
    color: "white",
    fontSize: 60,
    fontWeight: "bold"
  }
});
