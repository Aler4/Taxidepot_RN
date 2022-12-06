import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Drivers} from '../screens/Drivers';
import {Cars} from '../screens/Cars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { requestCars } from "../redux/depotReducer/action";

const Tabs = createMaterialBottomTabNavigator();

export const AppTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      activeColor="#f0edf6"
      inactiveColor="#000"
      shifting={true}
      barStyle={{backgroundColor: '#524284'}}
      backBehavior={'order'}>
      <Tabs.Screen
        name="Drivers"
        component={Drivers}

        options={{
          tabBarAccessibilityLabel: 'Todo',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cars"
        component={Cars}
        options={{
          tabBarAccessibilityLabel: 'Todo',
          tabBarIcon: ({color}) => (
            <Icon name="car" color={color} size={25} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
