import {
  SharedElementNode,
  SharedElementTransitionAnimation,
  SharedElementTransitionResize,
  SharedElementTransitionAlign,
  SharedElementTransitionProps,
} from 'react-native-shared-element';

export {
  SharedElementNode,
  SharedElementTransitionAnimation,
  SharedElementTransitionProps,
};

export type SharedElementEventSubscription = {
  remove(): void;
};

export type SharedElementAnimationConfig = {
  animation: SharedElementTransitionAnimation;
  resize?: SharedElementTransitionResize;
  align?: SharedElementTransitionAlign;
};

export type SharedElementItemConfig = {
  readonly id: string;
  readonly sourceId: string;
  readonly animation: SharedElementAnimationConfig;
};

export type SharedElementConfig = SharedElementItemConfig[];

export type SharedElementAnimatedValue = any;

export type NavigationSpringConfig = {
  damping: number;
  mass: number;
  stiffness: number;
  restSpeedThreshold: number;
  restDisplacementThreshold: number;
  overshootClamping: boolean;
};

export type NavigationTimingConfig = {
  duration: number;
  easing: any; // Animated.EasingFunction;
};

export type NavigationTransitionSpec =
  | { timing: 'spring'; config: NavigationSpringConfig }
  | { timing: 'timing'; config: NavigationTimingConfig };

export type NavigationLegacyTransitionSpec = {
  timing: any;
  duration?: number;
  easing?: any;
};
