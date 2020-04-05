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

export const ModalScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.icon} name="ios-close" />
      </TouchableOpacity>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.rightIcon} />
    </View>
    <View style={styles.content}>
      <SharedElement id="image" style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/theboys.jpg")}
        />
      </SharedElement>
      <SharedElement id="text">
        <Text style={styles.text}>The Boys</Text>
      </SharedElement>
    </View>
  </View>
);

ModalScreen.navigationOptions = {
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
ModalScreen.sharedElements = sharedElements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333"
  },
  header: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  icon: {
    width: 40,
    fontSize: 40,
    color: "white"
  },
  rightIcon: {
    width: 40
  },
  title: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150
  },
  image: {
    resizeMode: "cover",
    width: 300,
    height: 300,
    borderRadius: 150
  },
  text: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 20
  }
});
