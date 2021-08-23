import * as React from "react";
import { StyleSheet, View } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { SharedElementsComponentConfig } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";

import { Item, items } from "../data";
import { DetailComponent } from "./DetailComponent";
import { getDetailSharedElements } from "./getDetailSharedElements";

type Props = {
  navigation: NavigationStackProp<any>;
  route: any;
};

export class DetailPagerScreen extends React.Component<Props> {
  static sharedElements: SharedElementsComponentConfig =
    getDetailSharedElements;

  render() {
    const { navigation, route } = this.props;
    const params = route?.params || navigation?.state?.params;
    const initialItem: Item = params?.item;
    const initialIndex = items.indexOf(initialItem);
    return (
      <PagerView
        style={styles.container}
        initialPage={initialIndex}
        onPageSelected={this.onPageSelected}
      >
        {items.map((item) => this.renderItem(item))}
      </PagerView>
    );
  }

  private renderItem(item: Item) {
    return (
      <View key={item.id} style={styles.container}>
        <DetailComponent
          item={item}
          navigation={this.props.navigation}
          modal="none"
        />
      </View>
    );
  }

  private onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    const { position } = e.nativeEvent;
    const { navigation } = this.props;
    navigation.setParams({
      item: items[position],
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
