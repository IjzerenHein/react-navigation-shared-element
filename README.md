# React Navigation Shared Element <!-- omit in toc -->

React Navigation bindings for [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) 💫

## react-navigation 5 <!-- omit in toc -->

**This is the development branch for `react-navigation@5`.**

*If you wish to use an earlier version of react-navigation, [please checkout the master branch](https://github.com/IjzerenHein/react-navigation-shared-element).*


## Index <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [createSharedElementStackNavigator](#createsharedelementstacknavigator)
  - [SharedElement](#sharedelement)
  - [sharedElementsConfig](#sharedelementsconfig)
- [Demo App](#demo-app)
- [Videos](#videos)
- [License](#license)

## Installation

Open a Terminal in your project's folder and run,

```sh
$ yarn add react-navigation-shared-element@next react-native-shared-element
```

Ensure that [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) is also linked into your project.

Finally, make sure that the compatible react-navigation dependencies are installed:

```sh
$ yarn add @react-navigation/native@^5.0.9 @react-navigation/stack@^5.1.1
```

## Usage

In order to enable shared element transitions, the following steps need to be performed

- Create a stack-navigator using `createSharedElementStackNavigator`
- Wrap your component with `<SharedElement>` and provide a unique `id`
- Define a `sharedElementsConfig` config on the Screen that you want to animate

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [`item.${item.id}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

```jsx
// ListScreen.js
import { SharedElement } from 'react-navigation-shared-element';

class ListScreen extends React.Component {
  renderItem(item) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.push('Detail', { item })}>
        <SharedElement id={`itemPhoto.${item.id}`}>
          <Image source={item.photoUrl} />
        </SharedElement>
      </TouchableOpacity>
    );
  }
}
```

```jsx
// DetailScreen.js
const DetailScreen = props => {
  const { item } = props.route.params;
  return (
    <SharedElement id={`item.${item.id}.photo`}>
      <Image source={item.photoUrl} />
    </SharedElement>
  );
};
```

## Documentation

### createSharedElementStackNavigator

The `createSharedElementStackNavigator` function wraps an existing stack-navigator and enables shared element transitions for it.

It performs the following actions

- Creates a top-level renderer to host the shared element transitions
- Wraps each route with a shared element scene
- Detects route changes and trigger shared element transitions

### SharedElement

The `<SharedElement>` component accepts a single child and a _"shared"_ id. The child is the element that is made available for doing shared element transitions. It can be any component, like a `<View>`, `<Text>` or `<Image>`. In case the wrapped view is an `<Image>`, special handling is performed to deal with image loading and resizing.

This component is synonymous for the `<SharedElement>` component as defined in `react-native-shared-element`. Instead of a `node` it uses an `id` to create a higher lever API which automatically ties in with the scenes created by `createSharedElementStackNavigator`.

**Props**

| Property        | Type      | Description                                                                          |
| --------------- | --------- | ------------------------------------------------------------------------------------ |
| `children`      | `element` | A single child component, which must map to a real view in the native view hierarchy |
| `id`            | `string`  | Unique id of the shared element                                                      |
| `View props...` |           | Other props supported by View                                                        |

### sharedElementsConfig

In order to trigger shared element transitions between screens, a `sharedElementsConfig` function needs to be defined on one of the two screens. For
each screen transition, both screens are evaluated and checked whether they have a `sharedElementsConfig`. The screen that is being shown is **evaluated first**, followed by the screen that is being hidden. If `undefined` is returned, evaluation continues at the other screen.

The `sharedElements` function receives 3 arguments

| Argument     | Type      | Description                                                                                                                                      |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `route`      | `Route`   | Route prop of the current screen. You can use this to get the params of the screen using `route.params`, or the route-name using `route.name`    |
| `otherRoute` | `Route`   | The route prop of the other screen. You can use this to get the params of that screen using `route.params`, or the route-name using `route.name` |
| `showing`    | `boolean` | `true` when this screen is being shown, and `false` when this screen is being hidden.                                                            |  |

The return value should be either `undefined` or an array of shared-element configs or identifiers. Specifying a string-identifier is shorthand for `{id: 'myid'}`.

**Basic example**

```js
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [`item.${item.id}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**Only transition when coming from a specific route**

If you only want to show a transition when pushing from a particular screen, then use the route-name and `showing` argument.

```js
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  sharedElementsConfig={(route, otherRoute, showing) => {
    if (otherRoute.name === 'List' && showing) {
      const { item } = route.params;
      return [`item.${item.id}.photo`];
    }
  }}
/>
```

**Customize the animation**

If the source- and target elements are visually distinct, the consider using a cross-fade animation.

```js
<Stack.Screen
  name="Detail"
  component={DetailScreen}
  sharedElementsConfig={(route, otherRoute, showing) => {
    const { item } = route.params;
    return [
      {
        id: `item.${item.id}.photo`,
        animation: 'fade',
        // resize: 'clip'
        // align: ''left-top'
      },
    ];
  }}
/>
```

**TypeScript**

The `createSharedElementStackNavigator` has a generic parameter which allows you to statically type the screens and route params just like with `createStackNavigator`:

```tsx
type SharedStackParams = {
  List: undefined;
  Details: {
    id: number;
    src: string;
  };
};

const { Navigator, Screen } = createSharedElementStackNavigator<SharedStackParams>();

export default () => (
  <Navigator initialRouteName="List">
    <Screen name="List" component={ListScreen} />
    <Screen
      name="Details"
      component={DetailsScreen}
      initialParams={{ id: 0, src: 'unknown' }} {/* route params are statically typed */}
    />
  </Navigator>
);
```

**Static shared elements config**

A `sharedElements` function can also be defined on the component itself, instead of the `Screen`, but this is no longer considered good practice.

```js
class DetailScreen extends Component {
  static sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [`item.${item.id}.photo`];;
  }

  render() {...}
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

- [react-navigation-shared-element-demo](https://github.com/IjzerenHein/react-navigation-shared-element-demo)

## Videos

- [Airbnb Shared Transition - “Can it be done in React Native?”](https://www.youtube.com/watch?v=83GNiMp-qq0)

## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
