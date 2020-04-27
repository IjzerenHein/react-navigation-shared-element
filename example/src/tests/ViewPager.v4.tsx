import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator4 } from "react-navigation-shared-element";

import { createScreen, ListScreen, ViewPagerScreen } from "../screens";
import { FastIOSTransitionSpec } from "../transitions";

const StackNavigator = createSharedElementStackNavigator4(
  {
    List: createScreen(ListScreen, "ViewPager"),
    Detail: ViewPagerScreen
  },
  {
    // FastIOSTransitionSpec should be removed once this PR is merged:
    // https://github.com/react-navigation/react-navigation/pull/8028
    defaultNavigationOptions: {
      transitionSpec: {
        open: FastIOSTransitionSpec,
        close: FastIOSTransitionSpec
      }
    }
  },
  {
    name: "ViewPager",
    debug: true
  }
);

export default createAppContainer(StackNavigator);
