import * as React from "react";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import { SimpleStack } from "./tests";

enableScreens();

export default () => (
  <Tests>
    <Test title="Simple Stack" Component={SimpleStack} />
  </Tests>
);
