import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  SharedElement,
  SharedElementsComponentConfig
} from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { Icon } from "../components";

interface Props {
  navigation: NavigationStackProp<any>;
  modal: boolean;
}

export const DetailScreen = ({ navigation, modal }: Props) => (
  <>
    <View style={styles.container}>
      <SharedElement id="image" style={StyleSheet.absoluteFill}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/theboys.jpg")}
        />
      </SharedElement>
      <SharedElement id="text">
        <Text style={styles.text}>The Boys</Text>
      </SharedElement>
      {modal ? (
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Icon style={styles.icon} name="ios-close" />
          </TouchableOpacity>
        </View>
      ) : (
        undefined
      )}
    </View>
  </>
);

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
) => [{ id: "image" }, { id: "text", animation: "fade" }];
DetailScreen.sharedElements = sharedElements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    position: "absolute",
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
