import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Drivers } from "./Drivers";
import { CarOwner } from "./CarOwner";
const Stack = createNativeStackNavigator();

export const DriversScreens: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AllDrivers'}>
      <Stack.Screen
        name={'AllDrivers'}
        component={Drivers}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'red',
          },
        }}
      />
      <Stack.Screen
        name={'Owner'}
        component={CarOwner}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'red',
          },
        }}
      />
    </Stack.Navigator>
  );
};
