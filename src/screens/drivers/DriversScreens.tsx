import { FC, useEffect, useState } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drivers} from './Drivers';
import {CarOwner} from './CarOwner';
import {useDispatch, useSelector} from 'react-redux';
import { driversLoadSelector, driversSelector } from "../../redux/selectors";
import {requestDrivers} from '../../redux/actions';
import {LoadView} from '../../components';
import {requestDriverStatuses} from '../../redux/actions/driversActions';
import {TDriver} from '../../redux/types';
import {RouteProp} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const DriversScreens: FC = () => {
  const dispatch = useDispatch();
  let drivers = useSelector(driversSelector);
  const load = useSelector(driversLoadSelector);
  const [cards, setCard] = useState(drivers);

  useEffect(() => {
    dispatch(requestDrivers());
    dispatch(requestDriverStatuses());
    setCard(drivers)
  }, []);

  useEffect(() => {
    if (drivers.length !== 0) {
      setCard(drivers);
    }
  },[drivers])

  if (cards.length === 0) {
    return <LoadView />;
  }
  return (
    <Stack.Navigator initialRouteName={'AllDrivers'}>
      <Stack.Screen
        name={'AllDrivers'}
        component={Drivers}
        initialParams={{items: cards}}
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
        initialParams={{items: cards}}
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
export type CarsStackParams = {
  Owner: {items: TDriver[]; id?: number};
  AllDrivers: {items: TDriver[]};
};

export type AllDriversProps = RouteProp<CarsStackParams, 'AllDrivers'>;
export type OwnerCarsProps = RouteProp<CarsStackParams, 'Owner'>;
