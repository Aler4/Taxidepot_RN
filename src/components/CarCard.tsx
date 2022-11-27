import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {TCar} from '../redux/depotReducer/types';
import {CardRow} from './CardRow';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';

interface CarProps {
  car: TCar;
}

export const CarCard: React.FC<CarProps> = ({car}) => {
  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={car.mark} />
        <CardRow title={'Автомобіль: '} info={car.mark} />
        <CardRow title={'Модель: '} info={car.model} />
        <CardRow title={'Номер: '} info={car.number} />
        <CardRow title={'Рік: '} info={car.year.toString()} />
        <CardRow title={'Статус: '} info={car.status.title} />

        <View style={styles.actionContainer}>
          <DeleteBtn />
          <LinkBtn icon_name={'account'} />
        </View>
      </View>
    </DropShadow>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 15,
    width: 340,
    marginHorizontal: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  actionContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
