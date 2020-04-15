import * as React from "react";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import BottomTabs from "./tests/BottomTabs";
import BottomTabs2 from "./tests/BottomTabs2";
import ListViewStack from "./tests/ListViewStack";
import MaterialTopTabs from "./tests/MaterialTopTabs";
import ModalIOS13PageSheet from "./tests/ModalIOS13PageSheet";
import ModalStack from "./tests/ModalStack";
import NestedStack from "./tests/NestedStack";
import NestedStack2 from "./tests/NestedStack2";
import SimpleStack from "./tests/SimpleStack";
import TextInputStack from "./tests/TextInputStack";

enableScreens();

export default () => (
  <Tests>
    <Test title="SimpleStack" Component={SimpleStack} />
    <Test title="NestedStack" Component={NestedStack} />
    <Test title="NestedStack2" Component={NestedStack2} />
    <Test title="ModalStack" Component={ModalStack} />
    <Test title="ModalIOS13PageSheet" Component={ModalIOS13PageSheet} />
    <Test title="BottomTabs" Component={BottomTabs} />
    <Test title="BottomTabs2" Component={BottomTabs2} />
    <Test title="MaterialTopTabs" Component={MaterialTopTabs} />
    <Test title="ListView" Component={ListViewStack} />
    <Test title="TextInput" Component={TextInputStack} />
  </Tests>
);
