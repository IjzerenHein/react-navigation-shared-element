import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SharedElementRendererView from './SharedElementRendererView';
import SharedElementRendererContext from './SharedElementRendererContext';
import SharedElementRendererData from './SharedElementRendererData';

function createSharedElementRenderer(
  NavigatorView: React.ComponentType<any>
): React.ComponentType<any> {
  class SharedElementRenderer extends React.Component {
    private rendererData: SharedElementRendererData = new SharedElementRendererData();
    render() {
      return (
        <SharedElementRendererContext.Provider value={this.rendererData}>
          <NavigatorView {...this.props} />
          <SharedElementRendererView rendererData={this.rendererData} />
        </SharedElementRendererContext.Provider>
      );
    }
  }
  hoistNonReactStatics(SharedElementRenderer, NavigatorView);
  return SharedElementRenderer;
}

export default createSharedElementRenderer;
