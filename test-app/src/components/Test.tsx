import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Icon } from "./Icon";

interface TestProps {
  title: string;
  Component: React.ComponentType<any>;
  onPress?: () => any;
}

export const Test = (props: TestProps) => {
  const { title, onPress } = props;
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
  }
});
