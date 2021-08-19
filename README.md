# React Navigation Shared Element <!-- omit in toc -->

React Navigation bindings for [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) 💫

![react-navigation-shared-element-gif-iOS](rnse-ios.gif)
![react-navigation-shared-element-gif-Android](rnse-android.gif)

## Documentation

- [Shared element for the React Navigation 5/6 API](./docs/API.md)
- [Shared element for the React Navigation 4 API](./docs/Navigation4.md)
- [Migration guide](./docs/Migration.md)

## Compatibility <!-- omit in toc -->

The following versions or react-navigation and the stack navigator are supported.

| Version                                                                       | React-Navigation | Comments                                                                                                                                                              |
| ----------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.x                                                                           | 4, 5 & 6             | Import from `react-navigation-shared-element/build/v4` to use it with 4.x. |
| [2.x](https://github.com/IjzerenHein/react-navigation-shared-element/tree/v2) | 3 & 4            | This version is compatible with `react-navigation-stack@2`.                                                                                                           |
| [1.x](https://github.com/IjzerenHein/react-navigation-shared-element/tree/v1) | 3 & 4            | This version is compatible with `react-navigation-stack@1`.                                                                                                           |

Not supported:

- [ ] [react-native-screens/createNativeStackNavigator](https://github.com/IjzerenHein/react-navigation-shared-element/issues/14)

## Known issues

Navigating to a screen on Android causes the target element to blink when unhiding. This problem needs to be investigated further, but can be worked around by [disabling `react-native-screens` explicitly](./example/src/App.tsx#L50-L55).

```jsx
import { Platform } from 'react-native';

// As of react-native-screens@2.14.0, enableScreens causes a fade-in of the image when navigating to a screen.
// And as of react-native-screens@3, enableScreens is enabled by default.
// Disable screens on Android until this issue has been resolved.
enableScreens(Platform.OS !== "android");
```

## Demo App

- [./example](./example)
- [react-navigation-shared-element-demo](https://github.com/IjzerenHein/react-navigation-shared-element-demo)

## Videos

- [Snapchat Shared Transitions - “Can it be done in React Native?” (with react-navigation v5)](https://www.youtube.com/watch?v=NJZfRXs7nZs)
- [Airbnb Shared Transition - “Can it be done in React Native?” (with react-navigation v4)](https://www.youtube.com/watch?v=83GNiMp-qq0)

## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
