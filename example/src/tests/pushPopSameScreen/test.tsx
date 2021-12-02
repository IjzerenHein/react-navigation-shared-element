import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { Item, items } from "../../data";
import { createScreen, DetailScreen } from "../../screens";
import * as options from "./options";

const sameIdItems = items.map((item) => ({ ...item, id: "sameId" }));

const Stack = createSharedElementStackNavigator(options);

const PressableDetailScreen = createScreen(DetailScreen, undefined, undefined, {
  onPress: (event: any) => {
    const item: Item = event.item;
    const itemIdx = sameIdItems.indexOf(item);
    const nextItem =
      sameIdItems[itemIdx < sameIdItems.length - 2 ? itemIdx + 1 : 0];
    event.navigation.push("Detail", {
      item: nextItem,
    });
  },
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Detail"
        component={PressableDetailScreen}
        initialParams={{ item: sameIdItems[0] }}
        sharedElements={(route, otherRoute, showing) => {
          const item = route.params.item;
          return [
            { id: `${item.id}.image`, animation: "fade" },
            { id: `${item.id}.logo` },
            { id: `${item.id}.gradient`, animation: "fade" },
            { id: `${item.id}.title`, animation: "fade" },
            { id: `${item.id}.description`, animation: "fade" },
            { id: "close" },
          ];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
