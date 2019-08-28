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
import { createStackNavigator } from 'react-navigation';
import { createSharedElementTransitioner } from 'react-navigation-sharedelement';

const stackNavigator = createSharedElementTransitioner(
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
        `itemPhoto.${item.id}`
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
      <SharedElement id={`itemPhoto.${item.id}`}>
        <Image source={...} />
      </SharedElement>
    );
  }
}
```

## Docs

TODO
