# PRERELEASE v3 

> This documentation is for the new v3 release which unifies the 4.x and 5.x APIs of react-navigation in a single codebase. You can install it using `yarn add react-navigation-shared-element@prerelease`.

# React Navigation Shared Element <!-- omit in toc -->

React Navigation bindings for [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element) 💫

![react-navigation-shared-element-gif-iOS](rnse-ios.gif)
![react-navigation-shared-element-gif-Android](rnse-android.gif)

## Documentation

- [Shared element for React Navigation 5.x](./docs/Navigation5.md)
- [Shared element for React Navigation 4.x](./docs/Navigation4.md)
- [Migration guide](./docs/Migration.md)

## Compatibility <!-- omit in toc -->

The following versions or react-navigation and the stack navigator are supported.

| Version                                                                       | React-Navigation | Comments                                                                                                                                                              |
| ----------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.x                                                                           | 4 & 5            | Import from `react-navigation-shared-element/v4` to use it with 4.x. In this version the `sharedElements` function was changed to use `route` instead of `navigator`. |
| [2.x](https://github.com/IjzerenHein/react-navigation-shared-element/tree/v2) | 3 & 4            | This version is compatible with `react-navigation-stack@2`.                                                                                                           |
| [1.x](https://github.com/IjzerenHein/react-navigation-shared-element/tree/v1) | 3 & 4            | This version is compatible with `react-navigation-stack@1`.                                                                                                           |

Unlikely to be supported:

- [ ] [react-native-screens/createNativeStackNavigator](https://github.com/IjzerenHein/react-navigation-shared-element/issues/14)



## Demo App

- [./example](./example)
- [react-navigation-shared-element-demo](https://github.com/IjzerenHein/react-navigation-shared-element-demo)

## Videos

- [Snapchat Shared Transitions - “Can it be done in React Native?” (with react-navigation v5)](https://www.youtube.com/watch?v=NJZfRXs7nZs)
- [Airbnb Shared Transition - “Can it be done in React Native?” (with react-navigation v4)](https://www.youtube.com/watch?v=83GNiMp-qq0)

## License

React navigation shared element library is licensed under [The MIT License](./LICENSE.md).
