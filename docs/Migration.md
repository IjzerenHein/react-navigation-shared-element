# Migration Guide <!-- omit in toc -->

- [2.x -> 3.x](#2x---3x)
  - [createSharedElementStackNavigator4](#createsharedelementstacknavigator4)
  - [Route arguments in `sharedElement` function](#route-arguments-in-sharedelement-function)
- [5.0.0-alpha1 -> 3.x](#500-alpha1---3x)

# 2.x -> 3.x

## createSharedElementStackNavigator4

As of version 3.x, `react-navigation-shared-element` supports both react-navigation 4 and 5. React navigation 5.x is considered the new default API and 4.x can be accessed using a version specific export.

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
import { createSharedElementStackNavigator4 } from 'react-navigation-shared-element';

const stackNavigator = createSharedElementStackNavigator4(
  ...
);
```


## Route arguments in `sharedElement` function

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
