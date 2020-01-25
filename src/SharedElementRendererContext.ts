import * as React from 'react';
import SharedElementRendererData from './SharedElementRendererData';

const SharedElementRendererContext = React.createContext<SharedElementRendererData | null>(
  null
);

export default SharedElementRendererContext;
