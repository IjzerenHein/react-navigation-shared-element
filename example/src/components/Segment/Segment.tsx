import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Colors } from "../Colors";

type Props = {
  label: string;
  active: boolean;
  location: "start" | "middle" | "end";
  onPress?: () => any;
};

export const Segment = (props: Props) => {
  const { label, active, location, onPress } = props;
  return (
    <View
      style={[
        styles.container,
        location !== "middle" ? styles[location] : undefined,
        active ? styles.active : undefined
      ]}
    >
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Text
          style={[styles.text, active ? styles.activeText : undefined]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Segment.defaultProps = {
  location: "middle",
  active: false,
  badgeVisible: false,
  badgeColor: Colors.blue
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 32,
    borderColor: Colors.white,
    borderWidth: 1,
    borderEndWidth: 0
  },
  start: {
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8
  },
  end: {
    borderEndWidth: 1,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    marginHorizontal: 4
  },
  active: {
    backgroundColor: Colors.white
  },
  activeText: {
    color: Colors.blue
  }
});
