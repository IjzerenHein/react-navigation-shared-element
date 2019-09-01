import {
  SharedElementAnimationConfig,
  SharedElementConfig,
  SharedElementsConfig,
} from './types';

export function normalizeSharedElementAnimationConfig(
  animationConfig: any
): SharedElementAnimationConfig {
  if (animationConfig === true) {
    return {
      animation: 'move',
    };
  } else if (typeof animationConfig === 'string') {
    return {
      // @ts-ignore
      animation: animationConfig,
    };
  } else {
    return animationConfig;
  }
}

export function normalizeSharedElementConfig(
  sharedElementConfig: any
): SharedElementConfig {
  if (typeof sharedElementConfig === 'string') {
    return {
      id: sharedElementConfig,
      otherId: sharedElementConfig,
      animation: normalizeSharedElementAnimationConfig('move'),
    };
  } else {
    return {
      id: sharedElementConfig.id,
      otherId: sharedElementConfig.otherId || sharedElementConfig.id,
      debug: sharedElementConfig.debug || false,
      animation: normalizeSharedElementAnimationConfig(
        sharedElementConfig.animation || 'move'
      ),
    };
  }
}

export function normalizeSharedElementsConfig(
  sharedElementsConfig: any
): SharedElementsConfig | null {
  if (!sharedElementsConfig) return null;
  if (Array.isArray(sharedElementsConfig)) {
    if (!sharedElementsConfig.length) return null;
    return sharedElementsConfig.map(normalizeSharedElementConfig);
  } else {
    const keys = Object.keys(sharedElementsConfig);
    if (!keys.length) return null;
    return keys.map(id => {
      return {
        id,
        otherId: id,
        animation: normalizeSharedElementAnimationConfig(
          sharedElementsConfig[id]
        ),
      };
    });
  }
}
