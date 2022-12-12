import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersonalCars} from './PersonalCars';
import {Cars} from './Cars';
import {useDispatch, useSelector} from 'react-redux';
import {carsSelector} from '../../redux/selectors';
import {requestCars} from '../../redux/actions';
import { LoadView } from "../../components";
const Stack = createNativeStackNavigator();

export const CarsScreens: React.FC = () => {
  const dispatch = useDispatch();
  let cars = useSelector(carsSelector);
  useEffect(() => {
    dispatch(requestCars());
  }, []);

  useEffect(() => {
    console.log(cars);
  }, [cars]);
  if (cars.length === 0) {
    return <LoadView />;
  }
  return (
    <Stack.Navigator initialRouteName={'AllCars'}>
      <Stack.Screen
        name={'AllCars'}
        initialParams={{items: cars}}
        component={Cars}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Personal'}
        component={PersonalCars}
        initialParams={{items: cars}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
