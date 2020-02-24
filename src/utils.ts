import {
  SharedElementConfig,
  SharedElementsConfig,
  SharedElementStrictConfig,
  SharedElementsStrictConfig,
} from './types';
import { Route, NavigationState } from '@react-navigation/native';

export function normalizeSharedElementConfig(
  sharedElementConfig: SharedElementConfig
): SharedElementStrictConfig {
  if (typeof sharedElementConfig === 'string') {
    return {
      id: sharedElementConfig,
      otherId: sharedElementConfig,
      animation: 'move',
    };
  } else {
    const { id, otherId, animation, ...other } = sharedElementConfig;
    return {
      id,
      otherId: otherId || id,
      animation: animation || 'move',
      ...other,
    };
  }
}

export function normalizeSharedElementsConfig(
  sharedElementsConfig: SharedElementsConfig | undefined
): SharedElementsStrictConfig | null {
  if (!sharedElementsConfig || !sharedElementsConfig.length) return null;
  return sharedElementsConfig.map(normalizeSharedElementConfig);
}

function isValidNavigationState(
  state: Partial<NavigationState>
): state is NavigationState {
  return 'index' in state && 'routes' in state;
}

// Gets the current screen from navigation state
export function getActiveRoute(state: NavigationState): Route<any> {
  const route = state.routes[state.index];

  if (route.state && isValidNavigationState(route.state)) {
    // Dive into nested navigators
    return getActiveRoute(route.state);
  }

  return route;
}
