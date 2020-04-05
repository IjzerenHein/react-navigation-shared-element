import * as React from "react";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import BottomTabs from "./tests/BottomTabs";
import ModalStack from "./tests/ModalStack";
import NestedStack from "./tests/NestedStack";
import SimpleStack from "./tests/SimpleStack";

enableScreens();

export default () => (
  <Tests>
    <Test title="SimpleStack" Component={SimpleStack} />
    <Test title="NestedStack" Component={NestedStack} />
    <Test title="ModalStack" Component={ModalStack} />
    <Test title="BottomTabs" Component={BottomTabs} />
  </Tests>
);
