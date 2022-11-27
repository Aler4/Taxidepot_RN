import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TDriver} from '../redux/depotReducer/types';
import DropShadow from 'react-native-drop-shadow';
import {CardRow} from './CardRow';
import { formatDate } from "../helpers/formatDate";
import { DeleteBtn } from "./DeleteBtn";
import { LinkBtn } from "./LinkBtn";

interface IDriverProps {
  driver: TDriver;
}

export const DriverCard: React.FC<IDriverProps> = ({driver}) => {
  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={`${driver.id}`} />
        <CardRow
          title={'ФІО: '}
          info={`${driver.first_name} ${driver.last_name}`}
        />
        <CardRow title={'Дата реєстрації: '} info={`${formatDate(driver.date_created)}`} />
        <CardRow title={'Дата народження: '} info={`${formatDate(driver.date_birth)}`} />
        <CardRow title={'Статус: '} info={driver.status.title} />

        <View style={styles.actionContainer}>
          <DeleteBtn />
          <LinkBtn icon_name={'car'} />
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
