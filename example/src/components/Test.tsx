import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "./Icon";

interface TestProps {
  title: string;
  Component: React.ComponentType<any> | null;
  onPress?: () => any;
}

export const Test = (props: TestProps) => {
  const { title, onPress, Component } = props;
  if (!Component) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>{title.toUpperCase()}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
      <Icon style={styles.icon} name="ios-arrow-forward" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginStart: 20
  },
  icon: {
    fontSize: 19,
    marginEnd: 20
  },
  sectionHeader: {
    marginTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  sectionText: {
    fontSize: 13,
    flex: 1,
    marginStart: 20,
    opacity: 0.5
  }
});
