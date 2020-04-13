import * as React from "react";
import { StyleSheet, Image, FlatList } from "react-native";
// @ts-ignore
import TouchableScale from "react-native-touchable-scale";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

type Item = {
  id: string;
  title: string;
  image: any;
};

const ITEMS: Item[] = [
  {
    id: "homelander",
    title: "Homelander",
    image: require("../../assets/homelander.png")
  },
  {
    id: "atrain",
    title: "A train",
    image: require("../../assets/atrain.jpg")
  },
  {
    id: "blacknoir",
    title: "Black Noir",
    image: require("../../assets/blacknoir.png")
  },
  {
    id: "queenmaeve",
    title: "Queen Maeve",
    image: require("../../assets/queenmaeve.jpg")
  },
  {
    id: "thedeep",
    title: "The Deep",
    image: require("../../assets/thedeep.jpeg")
  },
  {
    id: "starlight",
    title: "Starlight",
    image: require("../../assets/starlight.jpg")
  }
];

interface Props {
  navigation: NavigationStackProp<any>;
  routeName: string;
}

export class ListScreen extends React.Component<Props> {
  static defaultProps = {
    routeName: "Detail"
  };

  renderItem = (event: any) => {
    const { navigation, routeName } = this.props;
    const item: Item = event.item;
    // Wrap the component that you want to transition in <SharedElement>
    return (
      <TouchableScale
        style={styles.item}
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={() => {
          navigation.navigate(routeName, {
            item
          });
        }}
      >
        <SharedElement id={`${item.id}.image`}>
          <Image style={styles.image} source={item.image} />
        </SharedElement>
      </TouchableScale>
    );
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={ITEMS}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: 200
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  }
});
