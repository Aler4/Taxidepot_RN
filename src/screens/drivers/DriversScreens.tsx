import {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drivers} from './Drivers';
import {CarOwner} from './CarOwner';
import {useDispatch, useSelector} from 'react-redux';
import {
  driversSelector,
  driverStatusSelector,
} from '../../redux/selectors';
import {requestDrivers} from '../../redux/actions';
import { LoadView, TLabel } from "../../components";
import {requestDriverStatuses} from '../../redux/actions/driversActions';
import {RouteProp} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const DriversScreens: FC = () => {
  const dispatch = useDispatch();
  const statuses = useSelector(driverStatusSelector);
  const drivers = useSelector(driversSelector);

  useEffect(() => {
    dispatch(requestDrivers());
    dispatch(requestDriverStatuses());
  }, []);

  if (drivers.length === 0) {
    return <LoadView />;
  }
  return (
    <Stack.Navigator initialRouteName={'AllDrivers'}>
      <Stack.Screen
        name={'AllDrivers'}
        component={Drivers}
        initialParams={{statuses: statuses}}
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
        initialParams={{statuses: statuses}}
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
  Owner: {statuses: TLabel[]; id?: number};
  AllDrivers: {statuses: TLabel[]};
};

export type AllDriversProps = RouteProp<CarsStackParams, 'AllDrivers'>;
export type OwnerCarsProps = RouteProp<CarsStackParams, 'Owner'>;
