import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TDriver} from '../redux/types';
import DropShadow from 'react-native-drop-shadow';
import {CardRow} from './CardRow';
import {formatDate, TDate, makeCompare} from '../helpers';
import {DeleteBtn} from './DeleteBtn';
import {LinkBtn} from './LinkBtn';
import {StatusDropDown, TLabel} from './StatusDropDown';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {ScreenStackParams } from '../AppNavigator/TabNavigator';


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
  const nav = useNavigation<NavigationProp<ScreenStackParams>>();

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
        <View>
          <StatusDropDown
            init_value={driver.status.title}
            labels={status_list}
            title={'Статус: '}
            card={true}
            updateCard={updateCardData.bind(null, 'status')}
          />
        </View>

        <View style={styles.actionContainer}>
          <DeleteBtn handler={deleteHandler} />
          <LinkBtn
            title={'Авто'}
            route={() =>
              nav.navigate('Cars', {
                screen: 'Personal',
                params: {id: driver.id},
              })
            }
          />
        </View>
      </View>
    </DropShadow>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 15,
    width: 340,
    marginHorizontal: 15,
    borderRadius: 8,
    paddingTop: 5,
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
