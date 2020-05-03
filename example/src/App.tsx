import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import BackOnly from "./tests/BackOnly";
import BackOnlyV4 from "./tests/BackOnly.v4";
import BottomTabs from "./tests/BottomTabs";
import BottomTabsV4 from "./tests/BottomTabs.v4";
import BottomTabs2 from "./tests/BottomTabs2";
import BottomTabs2V4 from "./tests/BottomTabs2.v4";
import ForwardOnly from "./tests/ForwardOnly";
import ForwardOnlyV4 from "./tests/ForwardOnly.v4";
import ListView from "./tests/ListView";
import ListViewV4 from "./tests/ListView.v4";
import MaterialTopTabs from "./tests/MaterialTopTabs";
import MaterialTopTabsV4 from "./tests/MaterialTopTabs.v4";
import ModalIOS13PageSheet from "./tests/ModalIOS13PageSheet";
import ModalIOS13PageSheetV4 from "./tests/ModalIOS13PageSheet.v4";
import ModalStack from "./tests/ModalStack";
import ModalStackV4 from "./tests/ModalStack.v4";
import NestedStack from "./tests/NestedStack";
import NestedStackV4 from "./tests/NestedStack.v4";
import NestedStack2 from "./tests/NestedStack2";
import NestedStack2V4 from "./tests/NestedStack2.v4";
import SimpleStack from "./tests/SimpleStack";
import SimpleStackV4 from "./tests/SimpleStack.v4";
import TextInputStackV4 from "./tests/TextInputStack.v4";
import ViewPager from "./tests/ViewPager";
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
      <Test
        title="NestedStack"
        ComponentV4={NestedStackV4}
        Component={NestedStack}
      />
      <Test
        title="NestedStack2"
        ComponentV4={NestedStack2V4}
        Component={NestedStack2}
      />
      <Test
        title="ModalStack"
        ComponentV4={ModalStackV4}
        Component={ModalStack}
      />
      <Test
        title="ModalIOS13PageSheet"
        ComponentV4={ModalIOS13PageSheetV4}
        Component={ModalIOS13PageSheet}
      />
      <Test
        title="BottomTabs"
        ComponentV4={BottomTabsV4}
        Component={BottomTabs}
      />
      <Test
        title="BottomTabs2"
        ComponentV4={BottomTabs2V4}
        Component={BottomTabs2}
      />
      <Test
        title="MaterialTopTabs"
        ComponentV4={MaterialTopTabsV4}
        Component={MaterialTopTabs}
      />
      <Test title="ListView" ComponentV4={ListViewV4} Component={ListView} />
      <Test title="ViewPager" ComponentV4={ViewPagerV4} Component={ViewPager} />
      <Test title="TextInput" ComponentV4={TextInputStackV4} />
    </Tests>
  </SafeAreaProvider>
);
