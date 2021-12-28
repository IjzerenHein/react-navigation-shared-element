import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

import { Colors } from "./Colors";
import { Icon } from "./Icon";

type Props = {
  title: string;
  ComponentV4?: React.ComponentType<any> | null;
  Component?: React.ComponentType<any> | null;
  ComponentNative?: React.ComponentType<any> | null;
  issue?:
    | string
    | {
        v4?: string;
        v6?: string;
        native?: string;
      };
  onPress?: () => any;
  v4?: boolean;
  native?: boolean;
};

function onPressInvalidTest(_Component?: React.ComponentType<any> | null) {
  Alert.alert(
    "No test available",
    "Please help out by creating a PR for this test-case."
  );
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
  const issueText =
    typeof issue === "string"
      ? issue
      : v4 && issue?.v4
      ? issue.v4
      : native && issue?.native
      ? issue?.native
      : !v4 && !native && issue?.v6
      ? issue?.v6
      : undefined;
  const issueEnv =
    typeof issue === "string"
      ? "All stacks"
      : v4 && issue?.v4
      ? "Stack (v4)"
      : native && issue?.native
      ? "Native Stack (v6)"
      : !v4 && !native && issue?.v6
      ? "Stack (v5/6)"
      : undefined;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={isValid ? onPress : () => onPressInvalidTest(ActiveComponent)}
    >
      <Text style={[styles.text, !isValid && styles.textInvalid]}>{title}</Text>
      {issueText ? (
        <TouchableOpacity
          onPress={() => Alert.alert(`Issue on: ${issueEnv}`, issueText)}
        >
          <Icon name="information-circle" color={Colors.red} size={26} />
        </TouchableOpacity>
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
});
