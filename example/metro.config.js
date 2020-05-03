/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path");

const resolvers = {
  "react-navigation-shared-element": "..",
  "@react-navigation/core": "../node_modules",
  "@react-navigation/native": "../node_modules",
  "@react-navigation/stack": "../node_modules",
  "@react-navigation/routers": "../node_modules",
  "@react-navigation/bottom-tabs": "../node_modules",
  "@react-navigation/material-top-tabs": "../node_modules"
};

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },

  // Add custom resolver and watch-folders because
  // Metro doesn't work well with the link to the library.
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (_, name) =>
          path.resolve(resolvers[name] || "./node_modules", name)
      }
    )
  },
  watchFolders: [path.resolve("./node_modules"), path.resolve("..")]
};
