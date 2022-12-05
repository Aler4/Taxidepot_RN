import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TDriver} from '../redux/depotReducer/types';
import DropShadow from 'react-native-drop-shadow';
import {CardRow} from './CardRow';
import {formatDate, TDate} from '../helpers/formatDate';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';
import {StatusDropDown, TLabel} from './StatusDropDown';
import {makeCompare} from '../helpers/compareData';
import {useNavigation} from '@react-navigation/native';

interface IDriverProps {
  driver: TDriver;
  status_list: TLabel[];
  delCard: (id: number) => void;
  updateCard: (data: TDriver, id: number) => void;
}
export type TValue = string | number | {title: string; code: string} | null;

export const DriverCard: React.FC<IDriverProps> = ({
  driver,
  status_list,
  delCard,
  updateCard,
}) => {
  const [cardData, setCardData] = useState<TDriver>({...driver});
  const nav = useNavigation();

  const deleteHandler = useCallback(() => {
    delCard(driver.id as number);
  }, [delCard, driver.id]);

  const updateCardData = useCallback(
    (key: string, value: TValue | TDate) => {
      if (key == 'date_birth' && value) {
        value = formatDate(value.toString());
      }
      setCardData({...cardData, [key]: value});
    },
    [cardData, setCardData],
  );

  useEffect(() => {
    makeCompare(driver, cardData) &&
      updateCard(cardData, cardData.id as number);
  }, [cardData, driver, updateCard]);

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={`${driver.id}`} />
        <CardRow
          title={"Ім'я: "}
          info={`${driver.first_name}`}
          editable={true}
          updateHandler={updateCardData.bind(null, 'first_name')}
        />
        <CardRow
          title={'Прізвище: '}
          info={`${driver.last_name}`}
          editable={true}
          updateHandler={updateCardData.bind(null, 'last_name')}
        />
        <CardRow
          title={'Дата реєстрації: '}
          info={`${formatDate(driver.date_created)}`}
        />
        <CardRow
          title={'Дата народження: '}
          info={`${formatDate(driver.date_birth)}`}
          length={10}
          editable={true}
          updateHandler={updateCardData.bind(null, 'date_birth')}
        />
        <StatusDropDown
          init_value={driver.status.title}
          labels={status_list}
          title={'Статус'}
          updateCard={updateCardData.bind(null, 'status')}
        />

        <View style={styles.actionContainer}>
          <DeleteBtn handler={deleteHandler} />
          <LinkBtn icon_name={'car'} route={() => nav.navigate('Cars', {id: driver.id})} />
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
