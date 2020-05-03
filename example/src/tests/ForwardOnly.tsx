import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { defaultItem } from "../data";
import { MasterScreen, DetailScreen } from "../screens";

const name = "ForwardOnly";

const Stack = createSharedElementStackNavigator({
  name,
  debug: true
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={name} component={MasterScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (!showing) return;
          const item = route.params.item || defaultItem;
          return [
            { id: `${item.id}.image` },
            { id: `${item.id}.title`, animation: "fade" },
            { id: "close", animation: "fade-in" }
          ];
        }}
      />
      }/>
    </Stack.Navigator>
  </NavigationContainer>
);
