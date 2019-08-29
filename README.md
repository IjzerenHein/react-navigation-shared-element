# React Navigation Shared Element <!-- omit in toc -->

Experimental [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) bindings for React Navigation 💫

This library is under development and is subject to API changes. At the moment only the stack navigator is supported.
As [react-navigation](https://reactnavigation.org) is alo undergoing development and possible API changes, this library provides a testing ground and working API for the v3 branch of react-navigation.
It was written as a separate library which does not require any changes to react-navigation itself.
As time progresses, the goal is to support the latest react-navigation version, a cleaner API, support `appear` and `disappear` transitions, and have the 
[native extensions](https://github.com/IjzerenHein/react-native-shared-element) land in [Expo](https://expo.io/).

## Index <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [createSharedElementStackNavigator](#createsharedelementstacknavigator)
  - [SharedElement](#sharedelement)
  - [Trigger shared element transitions](#trigger-shared-element-transitions)
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
- When pushing a route, provide a `sharedElements` config

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
    return (
      <TouchableOpacity onPress={() => this.onPressItem(item)}>
        <SharedElement id={`itemPhoto.${item.id}`}>
          <Image source={...} />
        </SharedElement>
      </TouchableOpacity>
    )
  }

  onPressItem(item) {
    const { navigation } = this.props;
    navigation.push('Detail', {
      sharedElements: [
        `item.${item.id}.photo`
      ]
    });
  }
}
```

```jsx
// DetailScreen.js
class DetailScreen extends React.Component {
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <SharedElement id={`item.${item.id}.photo`}>
        <Image source={...} />
      </SharedElement>
    );
  }
}
```

## Documentation

### createSharedElementStackNavigator

The `createSharedElementStackNavigator` function wraps an existing stack-navigator and makes shared element transitions possible on it. 

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

The `<SharedElement>` component accepts a single child and a "shared" id. The child is the element that is then available for doing shared element transitions with.
The `id` is the unique screen id by which the element an be identified.

This component is synonymous for the `<SharedElement>` component as defined in `react-native-shared-element`. Instead of a `node` it uses an `id` to create a higher
lever API which automatically ties in with the scenes created by `createSharedElementTransitioner`.

**Props**

| Property        | Type      | Description                                                                          |
| --------------- | --------- | ------------------------------------------------------------------------------------ |
| `children`      | `element` | A single child component, which must map to a real view in the native view hierarchy |
| `id`            | `string`  | Unique id of the shared element                                                      |
| `View props...` |           | Other props supported by View                                                        |

### Trigger shared element transitions

In order to trigger a shared element transition, a `sharedElements` config needs to be provided to `navigate` or `push`.

**Example**

```js
navigation.push({
  item,
  sharedElements: [
    `item.${item.id}.photo`,
    {id: `item.${item.id}.name`, animation: 'fade'}
  ]
})
```

> The order of the shared-elements is important as it defines in which order the transitions are rendered onto the screen.

**Full example**

```js
navigation.push({
  item,
  sharedElements: [
    `item.${item.id}.photo`, // <-- is synonymous for:
    // {
    //   id: `item.${item.id}.photo`
    //   sourceId: `item.${item.id}.photo`,
    //   animation: 'move',
    //   resize: 'auto',
    //   align: 'auto'
    // }
    {id: `item.${item.id}.name`, animation: 'fade'} // <-- is synonymous for:
    // {
    //   id: `item.${item.id}.name`
    //   sourceId: `item.${item.id}.name`,
    //   animation: 'fade',
    //   resize: 'auto',
    //   align: 'auto'
    // }
  ]
})
```

The following fields can be defined for each shared-element config

| Field       | Type                           | Description                                                                                                                                                      |
| ----------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | `string`                       | Id that corresponds to the `id` specified in the `<SharedElement>` component                                                                                     |
| `sourceId`  | `string`                       | Alternative id to use for the source element. This field an be used to create transitions between elements with different `id`s                                  |
| `animation` | `move | fade`                  | Type of animation to perform (default = `move`), [see SharedElementAnimation](https://github.com/IjzerenHein/react-native-shared-element#sharedelementanimation) |
| `resize`    | `auto | stretch | clip | none` | Resize behavior of the transition (default = `auto`), [see SharedElementResize](https://github.com/IjzerenHein/react-native-shared-element#sharedelementresize)  |
| `align`     | `auto | top-left | ...`        | Align behavior of the transition (default = `auto`), [see SharedElementAlign](https://github.com/IjzerenHein/react-native-shared-element#sharedelementalign)     |  |


## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
