import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import { MainScreen, DetailScreen } from "../screens";

enableScreens();

const SimpleStackNavigator = createSharedElementStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        title: "SimpleStack"
      }
    },
    Detail: DetailScreen
  },
  {},
  {
    name: "SimpleStackNavigator"
  }
);

export default createAppContainer(SimpleStackNavigator);
