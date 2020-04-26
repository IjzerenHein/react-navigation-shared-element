import * as React from "react";
import { StyleSheet, Image, FlatList } from "react-native";
// @ts-ignore
import TouchableScale from "react-native-touchable-scale";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { items, Item } from "../data";

interface Props {
  navigation: NavigationStackProp<any>;
  routeName: string;
}

export class ListScreen extends React.Component<Props> {
  static defaultProps = {
    routeName: "Detail"
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={items}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }

  private renderItem = (event: any) => {
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
