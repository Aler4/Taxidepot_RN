import React from 'react';
import {Text, View} from 'react-native';
import {TCar} from '../redux/depotReducer/types';

interface CarProps {
  car: TCar;
};


export const CarCard: React.FC<CarProps> = ({car}) => {
  return (
    <View>
      <Text>
        {car.mark} {car.model}
      </Text>
      <Text>{car.year}</Text>
      <Text>{car.status.title}</Text>
    </View>
  );
};
