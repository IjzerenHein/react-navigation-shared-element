import * as React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "./Colors";
import { Icon } from "./Icon";
import { SegmentControl, Segment } from "./Segment";

type Props = {
  children: any;
};

export const Tests = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [test, setTest] = React.useState<any>(undefined);
  const [tabIndex, setTabIndex] = React.useState(1);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={test ? "dark-content" : "light-content"}
      />
      {test && (tabIndex === 0 ? <test.props.ComponentV4 /> : undefined)}
      {test && (tabIndex === 1 ? <test.props.Component /> : undefined)}
      {test && (tabIndex === 2 ? <test.props.ComponentNative /> : undefined)}
      {!test && (
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={styles.title}>react-navigation-shared-element</Text>
          <SegmentControl
            style={styles.segments}
            selectedIndex={tabIndex}
            onValueChange={(index) => setTabIndex(index)}
          >
            <Segment label="Stack (v4)" />
            <Segment label="Stack" />
            <Segment label="Native Stack" />
          </SegmentControl>
        </View>
      )}
      {!test && (
        <ScrollView style={styles.content}>
          {React.Children.map(props.children, (test) => {
            if (tabIndex === 0 && test.props.ComponentV4 === null)
              return undefined;
            if (tabIndex === 1 && test.props.Component === null)
              return undefined;
            if (tabIndex === 2 && test.props.ComponentNative === null)
              return undefined;
            return React.cloneElement(test, {
              v4: tabIndex === 0,
              native: tabIndex === 2,
              onPress: (Component: React.ComponentType<any>) => setTest(test),
            });
          })}
        </ScrollView>
      )}
      <View
        style={[
          styles.back,
          test ? { justifyContent: "center" } : { marginTop: insets.top - 5 },
        ]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={styles.backContainer}
          activeOpacity={0.5}
          disabled={!test}
          onPress={() => setTest(undefined)}
        >
          <Icon style={styles.backIcon} name="ios-home" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.blue,
    paddingBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.white,
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    paddingLeft: 10,
  },
  backContainer: {
    height: 32,
    width: 32,
    backgroundColor: Colors.blue,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    color: "white",
    fontSize: 20,
  },
  segments: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
