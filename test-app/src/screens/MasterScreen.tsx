import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
// @ts-ignore
import TouchableScale from "react-native-touchable-scale";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp<any>;
  routeName: string;
}

export class MasterScreen extends React.Component<Props> {
  static defaultProps = {
    routeName: "Detail"
  };

  render() {
    // Wrap the component that you want to transition in <SharedElement>
    return (
      <>
        <TouchableScale
          style={styles.flex}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={this.onPress}
        >
          <View style={styles.container}>
            <SharedElement id="image">
              <Image
                style={styles.image}
                source={require("../../assets/theboys.jpg")}
              />
            </SharedElement>
            <SharedElement id="text">
              <Text style={styles.text}>The Boys</Text>
            </SharedElement>
            <Text style={styles.caption}>tap me</Text>
          </View>
        </TouchableScale>
      </>
    );
  }

  onPress = () => {
    const { navigation, routeName } = this.props;
    navigation.navigate(routeName);
  };
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 40
  },
  caption: {
    fontSize: 20,
    opacity: 0.5
  },
  image: {
    width: 200,
    height: 160,
    resizeMode: "contain"
  }
});
