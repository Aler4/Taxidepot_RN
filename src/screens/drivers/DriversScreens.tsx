import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drivers} from './Drivers';
import {CarOwner} from './CarOwner';
import {useDispatch, useSelector} from 'react-redux';
import { driversLoadSelector, driversSelector } from "../../redux/selectors";
import {requestDrivers } from "../../redux/actions";
import { LoadView } from "../../components";
const Stack = createNativeStackNavigator();

export const DriversScreens: React.FC = () => {
  const dispatch = useDispatch();
  let drivers = useSelector(driversSelector);
  let load = useSelector(driversLoadSelector);

  useEffect(() => {
    dispatch(requestDrivers());
  }, [dispatch]);

  if (drivers.length === 0 || load) {
    return <LoadView />;
  }
  return (
    <Stack.Navigator initialRouteName={'AllDrivers'}>
      <Stack.Screen
        name={'AllDrivers'}
        component={Drivers}
        initialParams={{items: drivers}}
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
        initialParams={{items: drivers}}
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
