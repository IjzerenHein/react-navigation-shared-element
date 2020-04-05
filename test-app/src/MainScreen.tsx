import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import TouchableScale from "react-native-touchable-scale";

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

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: "react-navigation-shared-element"
  };

  render() {
    const { modal } = this.props;

    // Wrap the component that you want to transition in <SharedElement>
    return (
      <React.Fragment>
        <TouchableScale
          style={styles.flex}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={modal ? this.onPressModal : this.onPress}
        >
          <View style={styles.container}>
            <SharedElement id="image">
              <Image
                style={styles.image}
                source={require("../assets/theboys.jpg")}
              />
            </SharedElement>
            <SharedElement id="text">
              <Text style={styles.text}>The Boys</Text>
            </SharedElement>
            <Text style={styles.caption}>tap me</Text>
          </View>
        </TouchableScale>
      </React.Fragment>
    );
  }

  onPress = () => {
    this.props.navigation.navigate("Detail");
  };

  onPressModal = () => {
    this.props.navigation.navigate("Modal");
  };
}
