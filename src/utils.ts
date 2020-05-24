import {
  SharedElementConfig,
  SharedElementsConfig,
  SharedElementStrictConfig,
  SharedElementsStrictConfig,
} from "./types";

export function normalizeSharedElementConfig(
  sharedElementConfig: SharedElementConfig
): SharedElementStrictConfig {
  if (typeof sharedElementConfig === "string") {
    return {
      id: sharedElementConfig,
      otherId: sharedElementConfig,
      animation: "move",
    };
  } else {
    const { id, otherId, animation, ...other } = sharedElementConfig;
    return {
      id,
      otherId: otherId || id,
      animation: animation || "move",
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
