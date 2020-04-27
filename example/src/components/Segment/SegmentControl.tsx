import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Segment } from "./Segment";

type Props = {
  style?: ViewStyle;
  selectedIndex: number;
  onValueChange: (index: number) => any;
  children: React.ChildrenArray<React.ReactElement<typeof Segment>>;
};

export const SegmentControl = (props: Props) => {
  const { style, children, selectedIndex, onValueChange } = props;
  const childCount = React.Children.count(children);
  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (segment, index) => {
        return React.cloneElement(segment, {
          key: `segment${index}`,
          active: selectedIndex === index,
          location: !index
            ? "start"
            : index === childCount - 1
            ? "end"
            : "middle",
          onPress: () => onValueChange(index)
        });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
