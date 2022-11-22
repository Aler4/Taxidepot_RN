import React from 'react';
import {Text, View} from 'react-native';
import { TCar, TDriver } from "../redux/depotReducer/types";
interface IDriverProps {
  driver: TDriver;
};


export const DriverCard: React.FC<IDriverProps> = ({driver}) => {
  return (
    <View>
      <Text>
        {driver.first_name} {driver.last_name}
      </Text>
      <Text>{driver.date_birth}</Text>
      <Text>{driver.status.title}</Text>
    </View>
  );
};
