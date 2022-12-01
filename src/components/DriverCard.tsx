import React, { useCallback, useState } from "react";
import {StyleSheet, View} from 'react-native';
import {TDriver, TStatus} from '../redux/depotReducer/types';
import DropShadow from 'react-native-drop-shadow';
import {CardRow} from './CardRow';
import {formatDate} from '../helpers/formatDate';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';
import {StatusDropDown, TLabel} from './StatusDropDown';

interface IDriverProps {
  driver: TDriver;
  status_list: TLabel[];
  delCard: (id: number) => void;
  updateCard: (data: TDriver) => void;
}
type TValue = string | number | {title: string, code: string}

export const DriverCard: React.FC<IDriverProps> = ({
  driver,
  status_list,
  delCard,
  updateCard,
}) => {

  const [cardData, setCardData] = useState<TDriver>(driver)
  const deleteHandler = useCallback(() => {
    delCard(driver.id as number);
  }, [driver.id]);

  const updateCardData = useCallback(
    (data: TDriver, key: string, value: TValue) => {
      setCardData({...data, [key]: value});
      updateCard(cardData);
  }, [cardData, updateCard]);
  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <CardRow title={'Ід: '} info={`${driver.id}`} />
        <CardRow
          title={"Ім'я: "}
          info={`${driver.first_name}`}
          editable={true}
          updateHandler={updateCardData.bind(null, cardData, 'first_name')}
        />
        <CardRow
          title={'Прізвище: '}
          info={`${driver.last_name}`}
          editable={true}
          updateHandler={updateCardData.bind(null, cardData, 'last_name')}

        />
        <CardRow
          title={'Дата реєстрації: '}
          info={`${formatDate(driver.date_created)}`}
        />
        <CardRow
          title={'Дата народження: '}
          info={`${formatDate(driver.date_birth)}`}
          editable={true}
          updateHandler={updateCardData.bind(null, cardData, 'date_birth')}
        />
        <StatusDropDown
          init_value={driver.status.title}
          labels={status_list}
          title={'Статус'}
          updateCard={updateCardData.bind(null, cardData, 'status')}
        />

        <View style={styles.actionContainer}>
          <DeleteBtn handler={deleteHandler} />
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
