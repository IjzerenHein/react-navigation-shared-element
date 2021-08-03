import * as React from "react";

import { ISharedElementRendererData } from "./SharedElementRendererData";

const SharedElementRendererContext =
  React.createContext<ISharedElementRendererData | null>(null);

export default SharedElementRendererContext;
