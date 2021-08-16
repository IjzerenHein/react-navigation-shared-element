import * as React from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import BackOnly from "./tests/BackOnly";
import BackOnlyV4 from "./tests/BackOnly.v4";
import BottomTabs from "./tests/BottomTabs";
import BottomTabsV4 from "./tests/BottomTabs.v4";
import BottomTabs2 from "./tests/BottomTabs2";
import BottomTabs2V4 from "./tests/BottomTabs2.v4";
import DefaultStack from "./tests/DefaultStack";
import DefaultStackV4 from "./tests/DefaultStack.v4";
import FadeFromBottomAndroid from "./tests/FadeFromBottomAndroid";
import FadeFromBottomAndroidV4 from "./tests/FadeFromBottomAndroid.v4";
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
import OverlappingElements from "./tests/OverlappingElements";
import OverlappingElementsV4 from "./tests/OverlappingElements.v4";
import PagerView from "./tests/PagerView";
import PagerViewV4 from "./tests/PagerView.v4";
import RevealFromBottomAndroid from "./tests/RevealFromBottomAndroid";
import RevealFromBottomAndroidV4 from "./tests/RevealFromBottomAndroid.v4";
import ScaleFromCenterAndroid from "./tests/ScaleFromCenterAndroid";
import ScaleFromCenterAndroidV4 from "./tests/ScaleFromCenterAndroid.v4";
import SlideFromRightIOS from "./tests/SlideFromRightIOS";
import SlideFromRightIOSV4 from "./tests/SlideFromRightIOS.v4";
import TextInputStackV4 from "./tests/TextInputStack.v4";

if (Platform.OS === "android") {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor("transparent");
}

// As of react-native-screens@2.14.0, enableScreens causes
// a fade-in of the image when navigating to a screen.
// And as of react-native-screens@3, enableScreens is enabled by default.
// Therefore, explicitly disable screens on Android until this issue
// has been resolved.
enableScreens(Platform.OS !== "android");

export default () => (
  <SafeAreaProvider>
    <Tests>
      <Test
        title="DefaultStack"
        ComponentV4={DefaultStackV4}
        Component={DefaultStack}
      />
      <Test
        title="SlideFromRightIOS"
        ComponentV4={SlideFromRightIOSV4}
        Component={SlideFromRightIOS}
      />
      <Test
        title="ScaleFromCenterAndroid"
        ComponentV4={ScaleFromCenterAndroidV4}
        Component={ScaleFromCenterAndroid}
      />
      <Test
        title="RevealFromBottomAndroid"
        ComponentV4={RevealFromBottomAndroidV4}
        Component={RevealFromBottomAndroid}
      />
      <Test
        title="FadeFromBottomAndroid"
        ComponentV4={FadeFromBottomAndroidV4}
        Component={FadeFromBottomAndroid}
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
      <Test title="PagerView" ComponentV4={PagerViewV4} Component={PagerView} />
      <Test
        title="OverlappingElements"
        ComponentV4={OverlappingElementsV4}
        Component={OverlappingElements}
      />
      <Test title="TextInput" ComponentV4={TextInputStackV4} />
    </Tests>
  </SafeAreaProvider>
);
