import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch} from 'react-redux';
import {AppTabs} from './src/AppNavigator/TabNavigator';
import {store} from './src/redux/store';
import {loadDrivers} from './src/redux/depotReducer/thunks';

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
