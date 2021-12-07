import { createAppContainer } from "react-navigation";
import { createSharedElementStackNavigator } from "react-navigation-shared-element/stack-v4";
import { TransitionPresets } from "react-navigation-stack";

import { createScreen, MainScreen, DetailScreen } from "../../screens";
import * as options from "./options";

type TransitionPresetName =
  | "SlideFromRightIOS"
  | "ModalSlideFromBottomIOS"
  | "ModalPresentationIOS"
  | "FadeFromBottomAndroid"
  | "RevealFromBottomAndroid"
  | "ScaleFromCenterAndroid"
  | "DefaultTransition"
  | "ModalTransition";

export default function createComponent(name: TransitionPresetName) {
  const StackNavigator = createSharedElementStackNavigator(
    {
      Main: createScreen(MainScreen, name),
      Detail: DetailScreen,
    },
    {
      defaultNavigationOptions: {
        ...TransitionPresets[name],
      },
    },
    options
  );

  return createAppContainer(StackNavigator);
}
