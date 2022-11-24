import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {AppTabs} from './src/AppNavigator/TabNavigator';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
