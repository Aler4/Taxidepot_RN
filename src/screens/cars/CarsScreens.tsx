import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PersonalCars } from "./PersonalCars";
import {Cars} from './Cars';
const Stack = createNativeStackNavigator();

export const CarsScreens: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AllCars'}>
      <Stack.Screen
        name={'AllCars'}
        component={Cars}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'red',
          },
        }}
      />
      <Stack.Screen
        name={'Personal'}
        component={PersonalCars}
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
