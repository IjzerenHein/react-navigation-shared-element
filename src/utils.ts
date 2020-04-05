import {
  SharedElementConfig,
  SharedElementsConfig,
  SharedElementStrictConfig,
  SharedElementsStrictConfig,
  Route
} from "./types";

export function normalizeSharedElementConfig(
  sharedElementConfig: SharedElementConfig
): SharedElementStrictConfig {
  if (typeof sharedElementConfig === "string") {
    return {
      id: sharedElementConfig,
      otherId: sharedElementConfig,
      animation: "move"
    };
  } else {
    const { id, otherId, animation, ...other } = sharedElementConfig;
    return {
      id,
      otherId: otherId || id,
      animation: animation || "move",
      ...other
    };
  }
}

export function normalizeSharedElementsConfig(
  sharedElementsConfig: SharedElementsConfig | undefined
): SharedElementsStrictConfig | null {
  if (!sharedElementsConfig || !sharedElementsConfig.length) return null;
  return sharedElementsConfig.map(normalizeSharedElementConfig);
}

export function getActiveRouteState(route: any): Route {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  } else {
    return getActiveRouteState(route.routes[route.index]);
  }
}
