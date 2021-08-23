import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  SharedElement,
  SharedElementsComponentConfig,
} from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { Icon } from "../components";
import { Item, defaultItem } from "../data";

type Props = {
  navigation: NavigationStackProp<any>;
  route: any; // v5
  modal: "none" | "full" | "sheet";
  onPress?: ({ navigation, item }: { navigation: any; item: Item }) => void;
};

export const DetailScreen = (props: Props) => {
  const { navigation, route, modal, onPress } = props;
  const params = route?.params || navigation?.state?.params;
  const item: Item = params?.item || defaultItem;
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={0.5}
          disabled={!onPress}
          onPress={onPress ? () => onPress({ navigation, item }) : undefined}
        >
          <SharedElement
            id={`${item.id}.image`}
            style={StyleSheet.absoluteFill}
          >
            <Image
              style={styles.image}
              resizeMode="cover"
              source={item.image}
            />
          </SharedElement>
        </TouchableOpacity>

        <SharedElement id="logo" style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
        </SharedElement>

        <View style={styles.content}>
          <SharedElement id="gradient" style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.9)"]}
              style={StyleSheet.absoluteFill}
            />
          </SharedElement>
          <SharedElement id={`${item.id}.title`}>
            <Text style={styles.title}>{item.title}</Text>
          </SharedElement>

          <SharedElement id={`${item.id}.description`}>
            <Text style={styles.description}>{item.description}</Text>
          </SharedElement>
        </View>

        {modal !== "none" ? (
          <View
            style={[
              styles.header,
              modal === "sheet" ? styles.sheetHeader : undefined,
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
        ) : undefined}
      </View>
    </>
  );
};

DetailScreen.defaultProps = {
  modal: "none",
};

DetailScreen.navigationOptions = {
  title: "Boys will be boys",
};

// Add the `sharedElements` function to the component, which
// should return a list of shared-elements to transition.
// The `sharedElements` function is called whenever you navigate
// to or from this screen. You can use the provided navigation
// states or trigger or disable animations.
const sharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
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
DetailScreen.sharedElements = sharedElements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    position: "absolute",
    right: 16,
    top: 32,
  },
  sheetHeader: {
    right: 16,
    top: 16,
  },
  icon: {
    fontSize: 40,
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    position: "absolute",
    left: 4,
    top: 12,
    height: 60,
    width: 160,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  title: {
    marginTop: 20,
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },
  description: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
