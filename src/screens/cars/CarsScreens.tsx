import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersonalCars} from './PersonalCars';
import {Cars} from './Cars';
import {useDispatch, useSelector} from 'react-redux';
import {carsSelector} from '../../redux/selectors';
import {requestCars} from '../../redux/actions';
const Stack = createNativeStackNavigator();

export const CarsScreens: React.FC = () => {
  const dispatch = useDispatch();
  let cars = useSelector(carsSelector);
  const [cards, setCards] = useState(cars);
  useEffect(() => {
    dispatch(requestCars());
  }, [dispatch]);

  useEffect(() => {
    setCards(cars);
  }, [cars]);
  return (
    <Stack.Navigator initialRouteName={'AllCars'}>
      <Stack.Screen
        name={'AllCars'}
        initialParams={{items: cards}}
        component={Cars}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Personal'}
        component={PersonalCars}
        initialParams={{items: cards}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
