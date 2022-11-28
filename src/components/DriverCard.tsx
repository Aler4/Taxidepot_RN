import React from 'react';
import {StyleSheet, View} from 'react-native';
import { TDriver, TStatus } from "../redux/depotReducer/types";
import DropShadow from 'react-native-drop-shadow';
import {CardRow} from './CardRow';
import {formatDate} from '../helpers/formatDate';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';
import { StatusDropDown, TLabel } from "./StatusDropDown";


interface IDriverProps {
  driver: TDriver;
  status_list: TLabel[];
}

export const DriverCard: React.FC<IDriverProps> = ({driver, status_list}) => {
  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={`${driver.id}`} />
        <CardRow
          title={'ФІО: '}
          info={`${driver.first_name} ${driver.last_name}`}
          editable={true}
        />
        <CardRow
          title={'Дата реєстрації: '}
          info={`${formatDate(driver.date_created)}`}
        />
        <CardRow
          title={'Дата народження: '}
          info={`${formatDate(driver.date_birth)}`}
          editable={true}
        />
        <StatusDropDown
          init_value={driver.status.title}
          labels={status_list}
          title={'Статус'}
        />

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
