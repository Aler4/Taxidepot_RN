import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Drivers} from '../screens/Drivers';
import {Cars} from '../screens/Cars';

const Tabs = createMaterialBottomTabNavigator();

export const AppTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Drivers"
      activeColor="#f0edf6"
      inactiveColor="#000"
      // labeled={false}
      shifting={true}
      barStyle={{backgroundColor: '#524284'}}>
      <Tabs.Screen name="Drivers" component={Drivers} />
      <Tabs.Screen name="Cars" component={Cars} />
    </Tabs.Navigator>
  );
};
