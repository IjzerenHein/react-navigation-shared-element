import { Animated } from 'react-native';
import {
  NavigationTransitionSpec,
  NavigationLegacyTransitionSpec,
} from './types';

export function fromLegacyNavigationTransitionSpec(
  spec: NavigationLegacyTransitionSpec
): NavigationTransitionSpec {
  const { timing, ...other } = spec;
  if (timing === Animated.timing) {
    return {
      timing: 'timing',
      // @ts-ignore
      config: other,
    };
  } else if (spec.timing === Animated.spring) {
    return {
      timing: 'spring',
      // @ts-ignore
      config: other,
    };
  } else {
    throw new Error('Invalid transitionSpec');
  }
}
