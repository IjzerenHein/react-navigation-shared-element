import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { Icon } from "../components";
import { Item } from "../data";

type Props = {
  navigation: NavigationStackProp<any>;
  item: Item;
  modal: "none" | "full" | "sheet";
};

export const DetailComponent = (props: Props) => {
  const { item, navigation, modal = "none" } = props;
  return (
    <View style={styles.container}>
      <SharedElement id={`${item.id}.image`} style={StyleSheet.absoluteFill}>
        <Image style={styles.image} resizeMode="cover" source={item.image} />
      </SharedElement>

      <SharedElement id={`${item.id}.logo`} style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../../assets/logo.png")}
        />
      </SharedElement>

      <View style={styles.content}>
        <SharedElement
          id={`${item.id}.gradient`}
          style={StyleSheet.absoluteFill}
        >
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
  );
};

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
