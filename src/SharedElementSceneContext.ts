import * as React from "react";

import SharedElementSceneData from "./SharedElementSceneData";

const SharedElementSceneContext =
  React.createContext<SharedElementSceneData | null>(null);

export default SharedElementSceneContext;
