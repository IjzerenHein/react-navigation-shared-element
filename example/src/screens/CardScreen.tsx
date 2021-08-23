import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import { items, Item } from "../data";
import { CardItem } from "./CardItem";

type Props = {
  navigation: NavigationStackProp<any>;
  routeName: string;
};

export class CardScreen extends React.Component<Props> {
  render() {
    return (
      <FlatList
        style={styles.container}
        data={items}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }

  private renderItem = (event: any) => {
    const { navigation, routeName } = this.props;
    const item: Item = event.item;
    return (
      <CardItem item={item} navigation={navigation} routeName={routeName} />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
