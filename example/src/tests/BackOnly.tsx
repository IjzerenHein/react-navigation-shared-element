import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { defaultItem } from "../data";
import { MainScreen, DetailScreen } from "../screens";

const name = "BackOnly";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={MainScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (showing) return;
          const item = route.params.item || defaultItem;
          return [
            { id: `${item.id}.image` },
            { id: "logo", animation: "fade" },
            { id: "gradient", animation: "fade" },
            { id: `${item.id}.title`, animation: "fade" },
            { id: `${item.id}.description`, animation: "fade" },
            { id: "close", animation: "fade" },
          ];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
