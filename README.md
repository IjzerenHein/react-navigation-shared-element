# React Navigation Shared Element

Experimental [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) bindings for React Navigation

# Work in progress, docs may not be up to date

## Installation

Open a Terminal in your project's folder and run,

```sh
yarn add react-navigation-sharedelement
```

Make sure to also link the native [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) code.

## Usage

```jsx
import { createSharedElementRenderer,createSharedElementScene } from 'react-navigation-sharedelement';

const stackNavigator = createStackNavigator(
  {
    List: createSharedElementScene(ListScreen),
    Detail: createSharedElementScene(DetailScreen)
  },
  {
    initialRouteName: "List"
  }
);

const AppContainer = createAppContainer(
  createSharedElementRenderer(stackNavigator)
);
```

```jsx
// ListScreen.js
import { SharedElement } from 'react-navigation-sharedelement';

class ListScreen extends React.Component {
  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.push('Detail', {sharedElements: [`itemPhoto.${item.id}`]})}
        <SharedElement id={`itemPhoto.${item.id}`}>
          <Image source={...} />
        </SharedElement>
      </TouchableOpacity>
    )
  }
}
```

```jsx
// DetailScreen.js
class DetailScreen extends React.Component {
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <SharedElement id={`itemPhoto.${item.id}`}>
        <Image source={...} />
      </SharedElement>
    );
  }
}
```

## Development workflow

To setup the development environment, open a Terminal in the repo directory and run the following:

```sh
yarn bootstrap
```

While developing, you can run the example app with [Expo](https://expo.io/) to test your changes:

```sh
yarn example start
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

## Docs


TODO
