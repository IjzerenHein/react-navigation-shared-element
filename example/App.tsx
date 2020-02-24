import 'react-native-gesture-handler';

import React from 'react';
import SharedElementStack from './src/SharedElementStack';
import ImageStack from './src/ImageStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <ImageStack />
      </NavigationContainer>
    </>
  );
};

export default App;
