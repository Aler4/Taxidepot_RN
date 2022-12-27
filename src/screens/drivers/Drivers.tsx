import {FC, useCallback, useEffect, useState} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Alert, RefreshControl } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { driversLoadSelector, driversSelector, driverStatusSelector } from "../../redux/selectors";
import {TDriver} from '../../redux/types';
import { AddDriverModal, DriverCard, LoadView, OpenModalBtn } from "../../components";
import {deleteDriver, requestCars, requestDrivers, updateDriver } from "../../redux/actions";
import {useRoute} from '@react-navigation/native';
import {AllDriversProps} from './DriversScreens';

export const Drivers: FC = () => {
  let {params} = useRoute<AllDriversProps>();
  const statuses = params.statuses;
  const drivers = useSelector(driversSelector);
  const load = useSelector(driversLoadSelector);

  const dispatch = useDispatch();
  const [modalState, setModalState] = useState<boolean>(false);
  const showModal = useCallback((value: boolean) => {
    setModalState(value);
  }, []);

  const delHandler = (id: number) => {
    dispatch(deleteDriver(id));
    dispatch(requestDrivers());
    dispatch(requestCars());
  };

  const deleteCard = useCallback((id: number) => {
    return Alert.alert('Delete', 'Do you want delete this car?', [
      {
        text: 'CANCEL',
        onPress: () => null,
      },
      {
        text: 'DELETE',
        onPress: () => delHandler(id),
        style: 'destructive',
      },
    ]);
  }, []);
  const updateCard = useCallback(
    (data: TDriver, id: number) => {
      delete data.id;
      delete data.date_created;
      dispatch(updateDriver(data, id));
    },
    [dispatch],
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#14e0e0', '#9deaf9']}
            refreshing={load}
            onRefresh={() => dispatch(requestDrivers())}

        />}
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={drivers}
        renderItem={({item}) => (
          <DriverCard
            driver={item}
            status_list={statuses}
            delCard={deleteCard}
            updateCard={updateCard}
          />
        )}
      />
      <OpenModalBtn
        title={'Додати водія'}
        hendler={() => setModalState(!modalState)}
      />
      <AddDriverModal
        statuses={statuses}
        visible={modalState}
        changeVisible={showModal}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  list: {
    justifyContent: 'center',
  },
  addBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#14e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  addBtnText: {
    fontSize: 20,
    color: '#fff',
  },
});
