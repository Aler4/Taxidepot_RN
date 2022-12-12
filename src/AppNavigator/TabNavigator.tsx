import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CarsScreens, DriversScreens} from '../screens';

const Tabs = createBottomTabNavigator();

export const AppTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8E91A0',
        tabBarStyle: {backgroundColor: '#737DF9'},
      }}>
      <Tabs.Screen
        name="Drivers"
        component={DriversScreens}
        options={{
          lazy: true,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={35} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cars"
        component={CarsScreens}
        options={{
          lazy: true,
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="car" color={color} size={35} />,
        }}
      />
    </Tabs.Navigator>
  );
};
