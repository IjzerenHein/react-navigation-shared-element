import * as React from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Tests, Test } from "./components";
import * as BackOnly from "./tests/backOnly";
import * as BottomTabs from "./tests/bottomTabs";
import * as BottomTabs2 from "./tests/bottomTabs2";
import * as CardView from "./tests/cardView";
import * as DefaultStack from "./tests/defaultStack";
import * as ForwardOnly from "./tests/forwardOnly";
import * as ImageBackground from "./tests/imageBackground";
import * as ListView from "./tests/listView";
import * as MaterialTopTabs from "./tests/materialTopTabs";
import * as ModalIOS13PageSheet from "./tests/modalIOS13PageSheet";
import * as ModalStack from "./tests/modalStack";
import nativeAnimations from "./tests/nativeAnimations";
import * as NestedStack from "./tests/nestedStack";
import * as NestedStack2 from "./tests/nestedStack2";
import * as PushPopSameScreen from "./tests/pushPopSameScreen";
import * as SafeAreaView from "./tests/safeAreaView";
import * as TextInputStack from "./tests/textInputStack";
import transitionPresets from "./tests/transitionPresets";
import * as WrongIds from "./tests/wrongIds";

if (Platform.OS === "android") {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor("transparent");
}

export default () => (
  <SafeAreaProvider>
    <Tests>
      <Test {...DefaultStack} />
      <Test {...CardView} />
      <Test {...ListView} />
      {transitionPresets.map((props) => (
        <Test key={props.title} {...props} />
      ))}
      {nativeAnimations.map((props) => (
        <Test key={props.title} {...props} />
      ))}
      <Test {...ForwardOnly} />
      <Test {...BackOnly} />
      <Test
        {...PushPopSameScreen}
        issue={{ v6: "No transition occurs when navigating back" }}
      />
      <Test {...NestedStack} />
      <Test {...NestedStack2} />
      <Test {...ModalStack} />
      <Test
        {...ModalIOS13PageSheet}
        issue="Modal layout is measured all the way to the top"
      />
      <Test {...BottomTabs} />
      <Test
        {...BottomTabs2}
        issue={{
          v4: "Transition doesn't always happen when navigating forward",
        }}
      />
      <Test {...MaterialTopTabs} />
      <Test
        {...SafeAreaView}
        issue="Layout is measured incorrectly because SafeAreaView applies the layout in the next cycle"
      />
      <Test {...WrongIds} />
      <Test
        {...ImageBackground}
        issue="Image is stretched instead of resized and revealed"
      />
      <Test {...TextInputStack} />
    </Tests>
  </SafeAreaProvider>
);
