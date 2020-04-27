import * as React from "react";
import { View, TextInput } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { createAppContainer } from "react-navigation";
import {
  SharedElement,
  createSharedElementStackNavigator4
} from "react-navigation-shared-element";
import { HeaderBackButton } from "react-navigation-stack";

const SearchInput = props => (
  <TextInput
    {...props}
    placeholder="Search"
    style={{
      width: "80%",
      height: 40,
      padding: 3,
      borderWidth: 1,
      borderColor: "red"
    }}
  />
);

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <SharedElement id="searchBar" style={{ padding: 15 }}>
        <SearchInput onFocus={() => navigation.navigate("Search")} />
      </SharedElement>
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  const { top: topInsect } = useSafeArea();
  return (
    <View style={{ flexDirection: "row", marginTop: topInsect + 5 }}>
      <HeaderBackButton
        onPress={() => {
          // buggy if we just goBack
          navigation.goBack();

          // Hide keyboard and setTimeout to
          // wait for the keyboard to close
          // Keyboard.dismiss();
          // setTimeout(() => navigation.goBack(), 500);
        }}
      />
      <SharedElement id="searchBar" style={{ flex: 1 }}>
        <SearchInput autoFocus />
      </SharedElement>
    </View>
  );
};

SearchScreen.navigationOptions = { headerShown: false };
SearchScreen.sharedElements = () => [{ id: "searchBar" }];

const TextInputStackNavigator = createSharedElementStackNavigator4(
  {
    Home: HomeScreen,
    Search: SearchScreen
  },
  undefined,
  {
    name: "TextInputStack",
    debug: true
  }
);

export default createAppContainer(TextInputStackNavigator);
