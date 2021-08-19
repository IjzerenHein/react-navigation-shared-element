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

## Things to know

- `react-navigation-shared-element` uses the [JS based Stack Navigator](https://reactnavigation.org/docs/stack-navigator). The [Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator) is not yet supported and it is not yet clear whether this can be supported in the future.
- [React Navigation 6 `Group` components](https://reactnavigation.org/docs/group/) are not yet supported.
- On [detaching inactive screens](https://reactnavigation.org/docs/stack-navigator/#detachinactivescreens) a blink may occur on Android. Because of this `detachInactiveScreens` is set to `false` by default on Android.

## Demo App

- [./example](./example)
- [react-navigation-shared-element-demo](https://github.com/IjzerenHein/react-navigation-shared-element-demo)

## Videos

- [Snapchat Shared Transitions - “Can it be done in React Native?” (with react-navigation v5)](https://www.youtube.com/watch?v=NJZfRXs7nZs)
- [Airbnb Shared Transition - “Can it be done in React Native?” (with react-navigation v4)](https://www.youtube.com/watch?v=83GNiMp-qq0)

## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
