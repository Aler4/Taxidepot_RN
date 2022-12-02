import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {TCar} from '../redux/depotReducer/types';
import {CardRow} from './CardRow';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';
import {StatusDropDown, TLabel} from './StatusDropDown';
import {makeCompare} from '../helpers/compareData';
import {TValue} from './DriverCard';

interface CarProps {
  car: TCar;
  status_list: TLabel[];
  delCard: (id: number) => void;
}

export const CarCard: React.FC<CarProps> = ({
  car,
  status_list,
  delCard,
}) => {

  const deleteHandler = useCallback(() => {
    delCard(car.id as number);
  }, [car.id, delCard]);

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={car.id as number} />
        <CardRow title={'Автомобіль: '} info={car.mark} />
        <CardRow title={'Модель: '} info={car.model} />
        <CardRow title={'Номер: '} info={car.number} />
        <CardRow title={'Рік: '} info={car.year.toString()} length={4} />
        <StatusDropDown
          init_value={car.status.title}
          labels={status_list}
          title={'Статус'}
        />

        <View style={styles.actionContainer}>
          <DeleteBtn handler={deleteHandler} />
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
