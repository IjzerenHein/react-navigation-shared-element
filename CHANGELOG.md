## [0.4.4](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.4.3...v0.4.4) (2019-09-03)


### Bug Fixes

* fixed no or stale transition when switching route (goBack) too fast ([f154a93](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/f154a93))



## [0.4.3](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.4.2...v0.4.3) (2019-09-02)


### Bug Fixes

* fixed animation/resize/align fields & typing information ([df11a0f](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/df11a0f))



## [0.4.2](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.4.1...v0.4.2) (2019-09-02)


### Bug Fixes

* fixed `onTransitionStart` exception ([5adb650](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/5adb650))



## [0.4.1](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.4.0...v0.4.1) (2019-09-01)



# [0.4.0](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.3.3...v0.4.0) (2019-09-01)


### Bug Fixes

* fixed `navigation.setParams` not working ([c0a5f6a](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/c0a5f6a))


### Features

* added new API which supports pop as well ([9c4136d](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/9c4136d))


### BREAKING CHANGES

* The old API where the shared elements could be passed as props has been dropped. Instead you should define a static variable called `sharedElements` on your Screen component. That variable can be either a function or a static array. See the README for more details



## [0.3.3](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.3.2...v0.3.3) (2019-08-30)


### Bug Fixes

* fixed transitions not triggering in release builds ([56b11d3](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/56b11d3))



## [0.3.2](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.3.1...v0.3.2) (2019-08-30)


### Bug Fixes

* fixed funky transition stuff from happening when popping a route ([4567dc6](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/4567dc6))
* fixed routeConfigs that used {screen: Component} style config ([00c74a5](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/00c74a5))



## [0.3.1](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.3.0...v0.3.1) (2019-08-29)


### Features

* added support for nested stack navigators ([69ddd7a](https://github.com/IjzerenHein/react-navigation-sharedelement/commit/69ddd7a))



# [0.3.0](https://github.com/IjzerenHein/react-navigation-sharedelement/compare/v0.2.1...v0.3.0) (2019-08-29)


### Initial release
