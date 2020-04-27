import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import BackOnly from "./tests/BackOnly";
import BackOnlyV4 from "./tests/BackOnly.v4";
import BottomTabsV4 from "./tests/BottomTabs.v4";
import BottomTabs2V4 from "./tests/BottomTabs2.v4";
import ForwardOnly from "./tests/ForwardOnly";
import ForwardOnlyV4 from "./tests/ForwardOnly.v4";
import ListViewStackV4 from "./tests/ListViewStack.v4";
import MaterialTopTabsV4 from "./tests/MaterialTopTabs.v4";
import ModalIOS13PageSheetV4 from "./tests/ModalIOS13PageSheet.v4";
import ModalStackV4 from "./tests/ModalStack.v4";
import NestedStackV4 from "./tests/NestedStack.v4";
import NestedStack2V4 from "./tests/NestedStack2.v4";
import SimpleStack from "./tests/SimpleStack";
import SimpleStackV4 from "./tests/SimpleStack.v4";
import TextInputStackV4 from "./tests/TextInputStack.v4";
import ViewPagerV4 from "./tests/ViewPager.v4";

enableScreens();

export default () => (
  <SafeAreaProvider>
    <Tests>
      <Test
        title="SimpleStack"
        ComponentV4={SimpleStackV4}
        Component={SimpleStack}
      />
      <Test
        title="ForwardOnly"
        ComponentV4={ForwardOnlyV4}
        Component={ForwardOnly}
      />
      <Test title="BackOnly" ComponentV4={BackOnlyV4} Component={BackOnly} />
      <Test title="NestedStack" ComponentV4={NestedStackV4} />
      <Test title="NestedStack2" ComponentV4={NestedStack2V4} />
      <Test title="ModalStack" ComponentV4={ModalStackV4} />
      <Test title="ModalIOS13PageSheet" ComponentV4={ModalIOS13PageSheetV4} />
      <Test title="BottomTabs" ComponentV4={BottomTabsV4} />
      <Test title="BottomTabs2" ComponentV4={BottomTabs2V4} />
      <Test title="MaterialTopTabs" ComponentV4={MaterialTopTabsV4} />
      <Test title="ListView" ComponentV4={ListViewStackV4} />
      <Test title="ViewPager" ComponentV4={ViewPagerV4} />
      <Test title="TextInput" ComponentV4={TextInputStackV4} />
    </Tests>
  </SafeAreaProvider>
);
