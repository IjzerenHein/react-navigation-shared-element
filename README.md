# React Navigation Shared Element <!-- omit in toc -->

Experimental [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) bindings for React Navigation 💫

This library is under development and is subject to API changes. At the moment only the stack navigator is supported.
As [react-navigation](https://reactnavigation.org) is alo undergoing development and possible API changes, this library provides a testing ground and working API for the v3 branch of react-navigation.
It was written as a separate library which does not require any changes to react-navigation itself.
As time progresses, the goal is to support the latest react-navigation version, support `appear` and `disappear` transitions, and have the 
[native extensions](https://github.com/IjzerenHein/react-native-shared-element) land in [Expo](https://expo.io/).

## Index <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [createSharedElementStackNavigator](#createsharedelementstacknavigator)
  - [SharedElement](#sharedelement)
  - [SharedElementConfig](#sharedelementconfig)
- [License](#license)

## Installation

Open a Terminal in your project's folder and run,

```sh
yarn add react-navigation-sharedelement react-native-shared-element
```

Make sure to also link [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) into your project.

## Usage

In order to enable shared element transitions, the following steps need to be performed

- Wrap stack-navigator with `createSharedElementStackNavigator`
- Wrap your component with `<SharedElement>` and provide a unique `id`
- Define a static `sharedElements` config on the Screen that you want to animate

```jsx
import { createStackNavigator } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-sharedelement';

const stackNavigator = createSharedElementStackNavigator(
  createStackNavigator,
  {
    List: ListScreen,
    Detail: DetailScreen
  },
  {
    initialRouteName: "List"
  }
);

const AppContainer = createAppContainer(stackNavigator);
```

```jsx
// ListScreen.js
import { SharedElement } from 'react-navigation-sharedelement';

class ListScreen extends React.Component {
  renderItem(item) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.push('Detail', {item})}>
        <SharedElement id={`itemPhoto.${item.id}`}>
          <Image source={item.photoUrl} />
        </SharedElement>
      </TouchableOpacity>
    )
  }
}
```

```jsx
// DetailScreen.js
class DetailScreen extends React.Component {
  static sharedElements = (navigation, prevNavigation, show) => {
    const item = navigation.getParam('item');
    return [`item.${item.id}.photo`];
  };

  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <SharedElement id={`item.${item.id}.photo`}>
        <Image source={item.photoUrl} />
      </SharedElement>
    );
  }
}
```

## Documentation

### createSharedElementStackNavigator

The `createSharedElementStackNavigator` function wraps an existing stack-navigator and enables shared element transitions for it. 

It performs the following actions

- Creates a top-level renderer to host the shared element transitions
- Wraps each route with a shared element scene
- Detects route changes and trigger shared element transitions

**Arguments**

| Argument               | Type       | Description                          |
| ---------------------- | ---------- | ------------------------------------ |
| `createStackNavigator` | `function` | The stack-navigator function to wrap |
| `routeConfig`          | `object`   | Routes-config                        |
| `stackNavigatorConfig` | `object`   | Stack navigator config               |

### SharedElement

The `<SharedElement>` component accepts a single child and a *"shared"* id. The child is the element that is made available for doing shared element transitions. It can be any component, like a `<View>`, `<Text>` or `<Image>`. In case the wrapped view is an `<Image>`, special handling is performed to deal with image loading and resizing.

This component is synonymous for the `<SharedElement>` component as defined in `react-native-shared-element`. Instead of a `node` it uses an `id` to create a higher lever API which automatically ties in with the scenes created by `createSharedElementStackNavigator`.

**Props**

| Property        | Type      | Description                                                                          |
| --------------- | --------- | ------------------------------------------------------------------------------------ |
| `children`      | `element` | A single child component, which must map to a real view in the native view hierarchy |
| `id`            | `string`  | Unique id of the shared element                                                      |
| `View props...` |           | Other props supported by View                                                        |

### SharedElementConfig

In order to trigger shared element transitions between screens, a static `sharedElements` config needs to be defined on one of the two screens. For
each screen transition, both screens are evaluated and checked whether they have a `sharedElements` config. The screen that is being shown is **evaluated first**, followed by the screen that is being hidden. If `undefined` is returned, evaluation continues at the other screen.

The `sharedElements` function receives 3 arguments

| Argument         | Type             | Description                                                                                                                                               |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navigation`     | `NavigationProp` | Navigation prop of the current screen.  You can use this to get the params of the screen using `getParam`, or the route-name using `state.routeName`      |
| `prevNavigation` | `NavigationProp` | The navigation-prop of the previous screen. You can use this to get the params of that screen using `getParam`, or the route-name using `state.routeName` |
| `show`           | `boolean`        | `true` when this screen is being shown, and `false` when this screen is being hidden.                                                                     |  |

The return value should be either `undefined` or an array of shared-element configs or identifiers. Specifying a string-identifier is shorthand for `{id: 'myid'}`.


**Basic example**

```js
class DetailScreen extends Component {
  static sharedElements = (navigation, prevNavigation, show) => {
    // Transition element `item.${item.id}.photo` when either
    // showing or hiding this screen
    const item = navigation.getParam('item');
    return [`item.${item.id}.photo`];
  }

  render() {...}
}
```

**Only transition when coming from a specific route**

If you only want to show a transition when transitioning from a particular screen, then check the route-name.

```js
class DetailScreen extends Component {
  static sharedElements = (navigation, prevNavigation, show) => {
    if (prevNavigation.state.routeName === 'List') {
      const item = navigation.getParam('item');
      return [`item.${item.id}.photo`];
    }
  }
  ...
}
```

**Customize the animation**

If the source- and target elements are visually distinct, the consider using a cross-fade animation.

```js
class DetailScreen extends Component {
  static sharedElements = (navigation, prevNavigation, show) => {
    const item = navigation.getParam('item');
    return [{
      id: `item.${item.id}.photo`,
      animation: 'fade'
      // resize: 'clip'
      // align: ''left-top'
    }];
  }
  ...
}
```

The following fields can be specified in a config item

| Field       | Type                           | Description                                                                                                                                                      |
| ----------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | `string`                       | Id that corresponds to the `id` specified in the `<SharedElement>` component                                                                                     |
| `otherId`   | `string`                       | Optional id that corresponds to the `id` specified in the other screen.                                                                                          |
| `animation` | `move | fade`                  | Type of animation to perform (default = `move`), [see SharedElementAnimation](https://github.com/IjzerenHein/react-native-shared-element#sharedelementanimation) |
| `resize`    | `auto | stretch | clip | none` | Resize behavior of the transition (default = `auto`), [see SharedElementResize](https://github.com/IjzerenHein/react-native-shared-element#sharedelementresize)  |
| `align`     | `auto | top-left | ...`        | Align behavior of the transition (default = `auto`), [see SharedElementAlign](https://github.com/IjzerenHein/react-native-shared-element#sharedelementalign)     |  |



## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
