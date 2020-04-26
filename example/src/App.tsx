import * as React from "react";
import { enableScreens } from "react-native-screens";

import { Tests, Test } from "./components";
import BackOnly from "./tests/BackOnly.v4";
import BottomTabs from "./tests/BottomTabs.v4";
import BottomTabs2 from "./tests/BottomTabs2.v4";
import ForwardOnly from "./tests/ForwardOnly.v4";
import ListViewStack from "./tests/ListViewStack.v4";
import MaterialTopTabs from "./tests/MaterialTopTabs.v4";
import ModalIOS13PageSheet from "./tests/ModalIOS13PageSheet.v4";
import ModalStack from "./tests/ModalStack.v4";
import NestedStack from "./tests/NestedStack.v4";
import NestedStack2 from "./tests/NestedStack2.v4";
import SimpleStack from "./tests/SimpleStack";
import SimpleStackV4 from "./tests/SimpleStack.v4";
import TextInputStack from "./tests/TextInputStack.v4";
import ViewPager from "./tests/ViewPager.v4";

enableScreens();

export default () => (
  <Tests>
    <Test title="SimpleStack" Component={SimpleStackV4} />
    <Test title="ForwardOnly" Component={ForwardOnly} />
    <Test title="BackOnly" Component={BackOnly} />
    <Test title="NestedStack" Component={NestedStack} />
    <Test title="NestedStack2" Component={NestedStack2} />
    <Test title="ModalStack" Component={ModalStack} />
    <Test title="ModalIOS13PageSheet" Component={ModalIOS13PageSheet} />
    <Test title="BottomTabs" Component={BottomTabs} />
    <Test title="BottomTabs2" Component={BottomTabs2} />
    <Test title="MaterialTopTabs" Component={MaterialTopTabs} />
    <Test title="ListView" Component={ListViewStack} />
    <Test title="ViewPager" Component={ViewPager} />
    <Test title="TextInput" Component={TextInputStack} />
  </Tests>
);
