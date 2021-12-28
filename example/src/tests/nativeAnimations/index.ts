import * as React from "react";
import { Platform } from "react-native";

import { Test } from "../../components";
import createComponent from "./test-native";

const nativeAnimations: React.ComponentProps<typeof Test>[] = [
  {
    title: "Animation: default",
    Component: null,
    ComponentV4: null,
    ComponentNative: createComponent("default"),
  },
  {
    title: "Animation: fade",
    Component: null,
    ComponentV4: null,
    ComponentNative: createComponent("fade"),
  },
  {
    title: "Animation: fade_from_bottom",
    Component: null,
    ComponentV4: null,
    ComponentNative: createComponent("fade_from_bottom"),
  },
  {
    title: "Animation: flip (modal)",
    Component: null,
    ComponentV4: null,
    ComponentNative:
      Platform.OS === "ios"
        ? createComponent("flip", { presentation: "modal" })
        : null,
    issue: "TODO",
  },
  {
    title: "Animation: none",
    Component: null,
    ComponentV4: null,
    ComponentNative: createComponent("none"),
  },
  {
    title: "Animation: simple_push",
    Component: null,
    ComponentV4: null,
    ComponentNative:
      Platform.OS === "ios" ? createComponent("simple_push") : null,
  },
  {
    title: "Animation: slide_from_bottom (modal)",
    Component: null,
    ComponentV4: null,
    ComponentNative: createComponent("slide_from_bottom", {
      presentation: "modal",
    }),
    issue: "TODO",
  },
  {
    title: "Animation: slide_from_right",
    Component: null,
    ComponentV4: null,
    ComponentNative: createComponent("slide_from_right"),
  },
  {
    title: "Animation: slide_from_left",
    Component: null,
    ComponentV4: null,
    ComponentNative:
      Platform.OS === "android" ? createComponent("slide_from_left") : null,
  },
];

export default nativeAnimations;
