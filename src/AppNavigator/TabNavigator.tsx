import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { CarsScreens, DriversScreens } from "../screens";

const Tabs = createMaterialBottomTabNavigator();

export const AppTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      activeColor="#f0edf6"
      inactiveColor="#000"
      shifting={true}
      keyboardHidesNavigationBar={true}
      barStyle={{backgroundColor: '#524284'}}
      backBehavior={'order'}>
      <Tabs.Screen
        name="Drivers"
        component={DriversScreens}

        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cars"
        component={CarsScreens}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="car" color={color} size={25} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
