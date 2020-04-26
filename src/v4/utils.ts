import { Route } from "./types";

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
