import * as React from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Tests, Test } from "./components";
import BackOnly from "./tests/BackOnly";
import BackOnlyV4 from "./tests/BackOnly.v4";
import BottomTabs from "./tests/BottomTabs";
import BottomTabsV4 from "./tests/BottomTabs.v4";
import BottomTabs2 from "./tests/BottomTabs2";
import BottomTabs2V4 from "./tests/BottomTabs2.v4";
import CardView from "./tests/CardView";
import CardViewV4 from "./tests/CardView.v4";
import DefaultStack from "./tests/DefaultStack";
import DefaultStackV4 from "./tests/DefaultStack.v4";
import FadeFromBottomAndroid from "./tests/FadeFromBottomAndroid";
import FadeFromBottomAndroidV4 from "./tests/FadeFromBottomAndroid.v4";
import ForwardOnly from "./tests/ForwardOnly";
import ForwardOnlyV4 from "./tests/ForwardOnly.v4";
import ImageBackground from "./tests/ImageBackground";
import ImageBackgroundV4 from "./tests/ImageBackground.v4";
import ListView from "./tests/ListView";
import ListViewV4 from "./tests/ListView.v4";
import MaterialTopTabs from "./tests/MaterialTopTabs";
import MaterialTopTabsV4 from "./tests/MaterialTopTabs.v4";
import ModalIOS13PageSheet from "./tests/ModalIOS13PageSheet";
import ModalIOS13PageSheetV4 from "./tests/ModalIOS13PageSheet.v4";
import ModalSlideFromBottomIOS from "./tests/ModalSlideFromBottomIOS";
import ModalSlideFromBottomIOSV4 from "./tests/ModalSlideFromBottomIOS.v4";
import ModalStack from "./tests/ModalStack";
import ModalStackV4 from "./tests/ModalStack.v4";
import NestedStack from "./tests/NestedStack";
import NestedStackV4 from "./tests/NestedStack.v4";
import NestedStack2 from "./tests/NestedStack2";
import NestedStack2V4 from "./tests/NestedStack2.v4";
import PushPopSameScreen2 from "./tests/PushPopSameScreen2";
import PushPopSameScreen from "./tests/PushPopSameScreen";
import PushPopSameScreenV4 from "./tests/PushPopSameScreen.v4";
import RevealFromBottomAndroid from "./tests/RevealFromBottomAndroid";
import RevealFromBottomAndroidV4 from "./tests/RevealFromBottomAndroid.v4";
import SafeAreaView from "./tests/SafeAreaView";
import SafeAreaViewV4 from "./tests/SafeAreaView.v4";
import ScaleFromCenterAndroid from "./tests/ScaleFromCenterAndroid";
import ScaleFromCenterAndroidV4 from "./tests/ScaleFromCenterAndroid.v4";
import SlideFromRightIOS from "./tests/SlideFromRightIOS";
import SlideFromRightIOSV4 from "./tests/SlideFromRightIOS.v4";
import TextInputStackV4 from "./tests/TextInputStack.v4";
import WrongIds from "./tests/WrongIds";
import WrongIdsV4 from "./tests/WrongIds.v4";

if (Platform.OS === "android") {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor("transparent");
}

export default () => (
  <SafeAreaProvider>
    <Tests>
      <Test
        title="DefaultStack"
        ComponentV4={DefaultStackV4}
        Component={DefaultStack}
      />
      <Test title="CardView" ComponentV4={CardViewV4} Component={CardView} />
      <Test title="ListView" ComponentV4={ListViewV4} Component={ListView} />
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
        title="PushPopSameScreen - v2"
        ComponentV4={PushPopSameScreen2}
        Component={PushPopSameScreen2}
        issue={["v4"]}
      />
      <Test
        title="PushPopSameScreen"
        ComponentV4={PushPopSameScreen}
        Component={PushPopSameScreenV4}
        issue={["v4"]}
      />
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
        title="ModalSlideFromBottomIOS"
        ComponentV4={ModalSlideFromBottomIOSV4}
        Component={ModalSlideFromBottomIOS}
      />
      <Test
        title="ModalIOS13PageSheet"
        ComponentV4={ModalIOS13PageSheetV4}
        Component={ModalIOS13PageSheet}
        issue
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
      <Test
        title="SafeAreaView"
        ComponentV4={SafeAreaViewV4}
        Component={SafeAreaView}
        issue
      />
      <Test title="WrongIds" ComponentV4={WrongIdsV4} Component={WrongIds} />
      <Test
        title="ImageBackground"
        ComponentV4={ImageBackgroundV4}
        Component={ImageBackground}
        issue
      />
      <Test title="TextInput" ComponentV4={TextInputStackV4} />
    </Tests>
  </SafeAreaProvider>
);
