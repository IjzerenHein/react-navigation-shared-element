# React Navigation Shared Element <!-- omit in toc -->

React Navigation bindings for [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) 💫

## Compatibility <!-- omit in toc -->

*This library is currently undergoing development to support the latest react-navigation & stack versions.*

Supported are:

- [X] react-navigation 4 & 3
- [X] react-navigation-stack 2 
- [X] react-navigation-stack 1 [(use react-navigation-shared-element@1)](https://github.com/IjzerenHein/react-navigation-shared-element/tree/v1)

Under development:

  🚧 [react-navigation 5 (see navigation-v5 branch if you want to test)](https://github.com/IjzerenHein/react-navigation-shared-element/tree/navigation-v5)

Unlikely to be supported:

- [ ] [react-native-screens/createNativeStackNavigator](https://github.com/IjzerenHein/react-navigation-shared-element/issues/14)


## Index <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [createSharedElementStackNavigator](#createsharedelementstacknavigator)
    - [Debugging shared element transitions](#debugging-shared-element-transitions)
  - [SharedElement](#sharedelement)
  - [sharedElements config](#sharedelements-config)
- [Demo App](#demo-app)
- [Videos](#videos)
- [License](#license)

## Installation

Open a Terminal in your project's folder and run,

```sh
$ yarn add react-navigation-shared-element react-native-shared-element
```

Enure that [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) is also linked into your project.

Finally, make sure that the compatible react-navigation dependencies are installed:

```sh
$ yarn add react-navigation@4 react-navigation-stack@2
```

> react-navigation@5 is not supported yet, so don't bother..

## Usage

In order to enable shared element transitions, the following steps need to be performed

- Create a stack-navigator using `createSharedElementStackNavigator`
- Wrap your component with `<SharedElement>` and provide a unique `id`
- Define a static `sharedElements` config on the Screen that you want to animate

```jsx
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const stackNavigator = createSharedElementStackNavigator(
  {
    List: ListScreen,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'List',
  }
);

const AppContainer = createAppContainer(stackNavigator);
```

```jsx
// ListScreen.js
import { SharedElement } from 'react-navigation-shared-element';

class ListScreen extends React.Component {
  renderItem(item) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.push('Detail', { item })}>
        <SharedElement id={`item.${item.id}.photo`}>
          <Image source={item.photoUrl} />
        </SharedElement>
      </TouchableOpacity>
    );
  }
}
```

```jsx
// DetailScreen.js
const DetailScreen = (props) => {
  const item = props.navigation.getParam('item');
  return (
    <SharedElement id={`item.${item.id}.photo`}>
      <Image source={item.photoUrl} />
    </SharedElement>
  );
};

DetailScreen.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam('item');
  return [`item.${item.id}.photo`];
};
```

## Documentation

### createSharedElementStackNavigator

The `createSharedElementStackNavigator` function wraps an existing stack-navigator and enables shared element transitions for it.

It performs the following actions

- Creates a top-level renderer to host the shared element transitions
- Wraps each route with a shared element scene
- Detect route changes and trigger shared element transitions

**Arguments**

| Argument              | Type     | Description                                                             |
| --------------------- | -------- | ----------------------------------------------------------------------- |
| `routeConfig`         | `object` | Routes-config                                                           |
| `stackConfig`         | `object` | Optional stack navigator config                                         |
| `sharedElementConfig` | `object` | Optional [shared element config](#debugging-shared-element-transitions) |

#### Debugging shared element transitions

When transitions aren't working as expected, you can enable debug-mode
to log scene transitions and shared-element id's to the console. The
log output is useful for understanding scene changes and for reporting issues.

```jsx
const stackNavigator1 = createSharedElementStackNavigator(
  { ... }, // routeConfig
  { ... } // stackConfig
  {
    name: 'MyStackNav',
    debug: true
  }
);
```


### SharedElement

The `<SharedElement>` component accepts a single child and a _"shared"_ id. The child is the element that is made available for doing shared element transitions. It can be any component, like a `<View>`, `<Text>` or `<Image>`. In case the wrapped view is an `<Image>`, special handling is performed to deal with image loading and resizing.

This component is synonymous for the `<SharedElement>` component as defined in `react-native-shared-element`. Instead of a `node` it uses an `id` to create a higher lever API which automatically ties in with the scenes created by `createSharedElementStackNavigator`.

**Props**

| Property        | Type      | Description                                                                          |
| --------------- | --------- | ------------------------------------------------------------------------------------ |
| `children`      | `element` | A single child component, which must map to a real view in the native view hierarchy |
| `id`            | `string`  | Unique id of the shared element                                                      |
| `View props...` |           | Other props supported by View                                                        |

### sharedElements config

In order to trigger shared element transitions between screens, a static `sharedElements` config needs to be defined on one of the two screens. For
each screen transition, both screens are evaluated and checked whether they have a `sharedElements` config. The screen that is being shown is **evaluated first**, followed by the screen that is being hidden. If `undefined` is returned, evaluation continues at the other screen.

The `sharedElements` function receives 3 arguments

| Argument          | Type             | Description                                                                                                                                            |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `navigation`      | `NavigationProp` | Navigation prop of the current screen. You can use this to get the params of the screen using `getParam`, or the route-name using `state.routeName`    |
| `otherNavigation` | `NavigationProp` | The navigation-prop of the other screen. You can use this to get the params of that screen using `getParam`, or the route-name using `state.routeName` |
| `showing`         | `boolean`        | `true` when this screen is being shown, and `false` when this screen is being hidden.                                                                  |  |

The return value should be either `undefined` or an array of shared-element configs or identifiers. Specifying a string-identifier is shorthand for `{id: 'myid'}`.

**Basic example**

```js
class DetailScreen extends Component {
  static sharedElements = (navigation, otherNavigation, showing) => {
    // Transition element `item.${item.id}.photo` when either
    // showing or hiding this screen (coming from any route)
    const item = navigation.getParam('item');
    return [`item.${item.id}.photo`];
  }

  render() {...}
}
```

**Only transition when coming from a specific route**

If you only want to show a transition when pushing from a particular screen, then use the route-name and `showing` argument.

```js
class DetailScreen extends Component {
  static sharedElements = (navigation, otherNavigation, showing) => {
    if ((otherNavigation.state.routeName === 'List') && showing) {
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
  static sharedElements = (navigation, otherNavigation, showing) => {
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

| Field       | Type                                    | Description                                                                                                                                                      |
| ----------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | `string`                                | Id that corresponds to the `id` specified in the `<SharedElement>` component                                                                                     |
| `otherId`   | `string`                                | Optional id that corresponds to the `id` specified in the other screen.                                                                                          |
| `animation` | `move` \| `fade`                        | Type of animation to perform (default = `move`), [see SharedElementAnimation](https://github.com/IjzerenHein/react-native-shared-element#sharedelementanimation) |
| `resize`    | `auto` \| `stretch` \| `clip` \| `none` | Resize behavior of the transition (default = `auto`), [see SharedElementResize](https://github.com/IjzerenHein/react-native-shared-element#sharedelementresize)  |
| `align`     | `auto` \| `top-left` \| `...`           | Align behavior of the transition (default = `auto`), [see SharedElementAlign](https://github.com/IjzerenHein/react-native-shared-element#sharedelementalign)     |  |

## Demo App

- [./example](./example)
- [react-navigation-shared-element-demo](https://github.com/IjzerenHein/react-navigation-shared-element-demo)

## Videos

- [Airbnb Shared Transition - “Can it be done in React Native?”](https://www.youtube.com/watch?v=83GNiMp-qq0)

## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
