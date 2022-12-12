import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {TCar} from '../redux/types';
import {CardRow} from './CardRow';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';
import {StatusDropDown, TLabel} from './StatusDropDown';
import { useNavigation } from "@react-navigation/native";

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
  const nav = useNavigation()
  const [cardData, setCardData] = useState(car);
  useEffect(() => {
    setCardData(car)
  },[car]);
  const deleteHandler = useCallback(() => {
    delCard(car.id as number);
  }, [car.id, delCard]);

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={cardData.id as number} />
        <CardRow title={'Власник: '} info={cardData.driver as string} />
        <CardRow title={'Автомобіль: '} info={cardData.mark} />
        <CardRow title={'Модель: '} info={cardData.model} />
        <CardRow title={'Номер: '} info={cardData.number} />
        <CardRow title={'Рік: '} info={cardData.year.toString()} length={4} />
        <CardRow title={'Статус: '} info={car.status.title} />

        <View style={styles.actionContainer}>
          <DeleteBtn handler={deleteHandler} />
          <LinkBtn title={'Водій'} route={() => nav.navigate('Drivers', {
                screen: 'Owner',
                params: {id: cardData.driver_id},
          })} />
        </View>
      </View>
    </DropShadow>
  );
};
const styles = StyleSheet.create({
  card: {
    paddingTop: 5,
    backgroundColor: '#fff',
    marginVertical: 15,
    width: 340,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  actionContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
