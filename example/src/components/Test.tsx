import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

import { Icon } from "./Icon";
import { Colors } from "./Colors";

interface TestProps {
  title: string;
  ComponentV4: React.ComponentType<any> | null;
  Component?: React.ComponentType<any> | null;
  onPress?: () => any;
  v4?: boolean;
}

function onPressInvalidTest() {
  Alert.alert(
    "No test available",
    "Please help out by creating a PR for this test-case."
  );
}

export const Test = (props: TestProps) => {
  const { title, onPress, Component, ComponentV4, v4 } = props;
  const isValid = (v4 && ComponentV4) || (!v4 && Component);
  if (!Component && !ComponentV4) {
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
      onPress={isValid ? onPress : onPressInvalidTest}
    >
      <Text style={[styles.text, !isValid && styles.textInvalid]}>{title}</Text>
      <Icon
        style={[styles.icon, !isValid && styles.iconInvalid]}
        name="ios-arrow-forward"
      />
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
  textInvalid: {
    color: Colors.gray
  },
  icon: {
    fontSize: 19,
    marginEnd: 20
  },
  iconInvalid: {
    color: Colors.gray
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
