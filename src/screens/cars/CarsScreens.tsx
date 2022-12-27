import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersonalCars} from './PersonalCars';
import {Cars} from './Cars';
import {useDispatch, useSelector} from 'react-redux';
import { carLoadSelector, carsSelector, carStatusSelector } from "../../redux/selectors";
import {requestCars} from '../../redux/actions';
import { LoadView, TLabel } from "../../components";
const Stack = createNativeStackNavigator();
import {RouteProp} from "@react-navigation/native";
import { TCar } from "../../redux/types";



export const CarsScreens: React.FC = () => {
  const dispatch = useDispatch();
  let cars = useSelector(carsSelector);
  const statuses = useSelector(carStatusSelector);
  useEffect(() => {
    dispatch(requestCars());
  }, []);

  if (cars.length === 0) {
    return <LoadView />;
  }
  return (
    <Stack.Navigator initialRouteName={'AllCars'}>
      <Stack.Screen
        name={'AllCars'}
        initialParams={{statuses: statuses}}
        component={Cars}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Personal'}
        component={PersonalCars}
        initialParams={{statuses: statuses}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export type CarsStackParams = {
  Personal: {statuses: TLabel[]; id?: number};
  AllCars: {statuses: TLabel[]};
};

export type AllCarsProps = RouteProp<CarsStackParams, 'AllCars'>;
export type PersonalCarsProps = RouteProp<CarsStackParams, 'Personal'>;
