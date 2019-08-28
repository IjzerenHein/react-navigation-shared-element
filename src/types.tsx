import {
  SharedElementNode,
  SharedElementAnimation,
  SharedElementResize,
  SharedElementAlign,
  SharedElementTransitionProps,
} from 'react-native-shared-element';

export {
  SharedElementNode,
  SharedElementAnimation,
  SharedElementTransitionProps,
};

export type SharedElementEventSubscription = {
  remove(): void;
};

export type SharedElementAnimationConfig = {
  animation: SharedElementAnimation;
  resize?: SharedElementResize;
  align?: SharedElementAlign;
};

export type SharedElementConfig = {
  readonly id: string;
  readonly sourceId: string;
  readonly animation: SharedElementAnimationConfig;
  readonly debug?: boolean;
};

export type SharedElementsConfig = SharedElementConfig[];

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
