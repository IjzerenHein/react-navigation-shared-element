import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainScreen, DetailScreen } from "../screens";

const name = "WrongIds";

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
          return [
            { id: "unknownId1" },
            { id: "unknownId2", animation: "move" },
            { id: "unknownId3", animation: "fade" },
          ];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
