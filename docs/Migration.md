# Migration Guide <!-- omit in toc -->

- [2.x -> 3.x](#2x---3x)
  - [createSharedElementStackNavigator](#createsharedelementstacknavigator)
  - [Route arguments in `sharedElements` function](#route-arguments-in-sharedelements-function)
- [3.0.0 (prerelease) -> 3.x](#300-prerelease---3x)
- [5.0.0-alpha1 -> 3.x](#500-alpha1---3x)

# 2.x -> 3.x

## createSharedElementStackNavigator

As of version 3.x, `react-navigation-shared-element` supports both the react-navigation 4 and 5 APIs. React navigation 5.x is considered the new default API and 4.x can be accessed using a version specific import.

**Before**

```jsx
// react-navigation-shared-element@1..2
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const stackNavigator = createSharedElementStackNavigator(
  ...
);
```

**After**

```jsx
// react-navigation-shared-element@3
import { createSharedElementStackNavigator } from 'react-navigation-shared-element/build/v4';

const stackNavigator = createSharedElementStackNavigator(
  ...
);
```


## Route arguments in `sharedElements` function

The `sharedElements` funtion has been updated to use `route` rather than the `navigation` prop.

**Before**

```jsx
// react-navigation-shared-element@1..2
class DetailScreen extends React.Component {
  static sharedElements = (navigation, otherNavigation, showing) => {
    if (otherNavigation.state.routeName === 'List') {
      const item = navigation.getParam('item');
      return [...];
    }
  };
}
```

**After**

```jsx
// react-navigation-shared-element@3
class DetailScreen extends React.Component {
  static sharedElements = (route, otherRoute, showing) => {
    if (otherRoute.name === 'List') {
      const { item } = route.params;
      return [...];
    }
  };
}
```

> To help migration, the `route` arguments are wrapped with a special [SharedElementCompatRouteProxy](../src/SharedElementCompatRouteProxy.ts) class which provides backwards compatibility support for `state` and `getParam`. This is a temporary solution and will be removed in the next major release. Is is strongly recommended to upgrade to the new `route` syntax.


# 3.0.0 (prerelease) -> 3.x

If you've been using the early 3.0.0 (prerelease) version with React Navigation 4, then you'll need to change the import and function name.

**Before**

```jsx
import { createSharedElementNavigator4 } from 'react-navigation-shared-element';
```

**After**

```jsx
import { createSharedElementNavigator } from 'react-navigation-shared-element/build/v4';
```


# 5.0.0-alpha1 -> 3.x

If you've been using the early 5.0.0-alpha1 version, then you'll need to rename the `sharedElementsConfig` Screen prop to `sharedElements`. That's it!

**Before**

```jsx
// react-navigation-shared-element@5.0.0-alpha1
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  sharedElementsConfig={(route, otherRoute, showing) => {...}}
/>
```

**After**

```jsx
// react-navigation-shared-element@3
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  sharedElements={(route, otherRoute, showing) => {...}}
/>
```
