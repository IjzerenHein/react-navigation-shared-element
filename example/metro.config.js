// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

const resolvers = {
  "react-navigation-shared-element": "..",
  "@react-navigation/core": "../node_modules",
  "@react-navigation/native": "../node_modules",
  "@react-navigation/elements": "../node_modules",
  "@react-navigation/stack": "../node_modules",
  "@react-navigation/native-stack": "../node_modules",
  "@react-navigation/routers": "../node_modules",
  "@react-navigation/bottom-tabs": "../node_modules",
  "@react-navigation/material-top-tabs": "../node_modules",
  // react-navigation@4
  "react-navigation": "../node_modules",
  "react-navigation-stack": "../node_modules",
  "react-navigation-tabs": "../node_modules",
};

// Add custom resolver and watch-folders because
// Metro doesn't work well with the link to the library.
defaultConfig.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (_, name) => path.resolve(resolvers[name] || "./node_modules", name),
  }
);
defaultConfig.watchFolders.push(path.resolve("./node_modules"));
defaultConfig.watchFolders.push(path.resolve(".."));

module.exports = defaultConfig;
