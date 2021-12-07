import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

import { Colors } from "./Colors";
import { Icon } from "./Icon";

type Issue = "android" | "ios" | "v4" | "v5" | "v6" | "native";

type Props = {
  title: string;
  ComponentV4?: React.ComponentType<any> | null;
  Component?: React.ComponentType<any> | null;
  ComponentNative?: React.ComponentType<any> | null;
  issue?: boolean | Issue[];
  onPress?: () => any;
  v4?: boolean;
  native?: boolean;
};

function onPressInvalidTest(Component?: React.ComponentType<any> | null) {
  if (Component === null) {
    Alert.alert(
      "Not supported",
      "This test is not supported by this stack-navigator"
    );
  } else {
    Alert.alert(
      "No test available",
      "Please help out by creating a PR for this test-case."
    );
  }
}

export const Test = (props: Props) => {
  const {
    title,
    onPress,
    Component,
    ComponentNative,
    ComponentV4,
    v4,
    native,
    issue,
  } = props;
  const ActiveComponent = v4
    ? ComponentV4
    : native
    ? ComponentNative
    : Component;
  const isValid = !!ActiveComponent;
  const hasIssue =
    issue === true ||
    (Array.isArray(issue) &&
      ((v4 && issue.includes("v4")) ||
        (!v4 && (issue.includes("v5") || issue.includes("v6")))));
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={isValid ? onPress : () => onPressInvalidTest(ActiveComponent)}
    >
      <Text style={[styles.text, !isValid && styles.textInvalid]}>{title}</Text>
      {hasIssue ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>
            {`issue${Array.isArray(issue) ? ": " + issue.join(",") : ""}`}
          </Text>
        </View>
      ) : undefined}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginStart: 20,
  },
  textInvalid: {
    color: Colors.gray,
  },
  icon: {
    fontSize: 19,
    marginStart: 6,
    marginEnd: 20,
  },
  iconInvalid: {
    color: Colors.gray,
  },
  sectionHeader: {
    marginTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionText: {
    fontSize: 13,
    flex: 1,
    marginStart: 20,
    opacity: 0.5,
  },
  badgeContainer: {
    backgroundColor: Colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
});
