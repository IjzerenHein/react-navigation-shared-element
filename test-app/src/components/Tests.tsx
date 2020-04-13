import * as React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

import { Colors } from "./Colors";
import { Icon } from "./Icon";

interface TestsProps {
  children: any;
}

export const Tests = (props: TestsProps) => {
  const [test, setTest] = React.useState<any>(undefined);
  if (test) {
    return (
      <View style={styles.container}>
        <test.props.Component />
        <View style={styles.back} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.backContainer}
            activeOpacity={0.5}
            onPress={() => setTest(undefined)}
          >
            <Icon style={styles.backIcon} name="ios-home" />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>react-navigation-shared-element</Text>
        </View>
        <ScrollView style={styles.content}>
          {React.Children.map(props.children, test =>
            React.cloneElement(test, {
              onPress: (Component: React.ComponentType<any>) => setTest(test)
            })
          )}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 80,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.blue,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: Colors.white
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingLeft: 10
  },
  backContainer: {
    height: 32,
    width: 32,
    backgroundColor: Colors.blue,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  backIcon: {
    color: "white",
    fontSize: 20
  }
});
