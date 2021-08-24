import * as React from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { TouchableScale } from "../components";
import { Item } from "../data";

type Props = {
  navigation: NavigationStackProp<any>; // v4
  routeName: string;
  item: Item;
};

export function CardItem(props: Props) {
  const { item, navigation, routeName = "Detail" } = props;
  return (
    <TouchableScale
      onPress={() =>
        navigation.navigate(routeName, {
          item,
        })
      }
    >
      <View style={styles.container}>
        <SharedElement id={`${item.id}.card`} style={StyleSheet.absoluteFill}>
          <View style={styles.card} />
        </SharedElement>
        <SharedElement id={`${item.id}.image`} style={styles.imageContainer}>
          <Image style={styles.image} source={item.image} />
        </SharedElement>
        <SharedElement id={`${item.id}.title`} style={styles.textContainer}>
          <Text style={styles.text}>{`${item.title}`}</Text>
        </SharedElement>
      </View>
    </TouchableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
      },
    }),
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 24,
    color: "black",
    marginLeft: 20,
    marginVertical: 5,
  },
});
