import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  driversSelector,
  driverStatusSelector,
  loadSelector,
} from '../redux/depotReducer/selector';
import {TDriver} from '../redux/types';
import {
  deleteDriver,
  requestCars,
  requestDrivers,
  updateDriver,
} from '../redux/depotReducer/action';
import {AddDriverModal, DriverCard, LoadView} from '../components';

export const Drivers: React.FC<TDriver[]> = () => {
  const isLoad = useSelector(loadSelector);
  const drivers = useSelector(driversSelector);
  const statuses = useSelector(driverStatusSelector);
  let listItems = statuses.map(el => ({
    value: el.title,
    code: el.code,
  }));
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState<boolean>(false);
  const showModal = useCallback((value: boolean) => {
    setModalState(value);
  }, []);

  const deleteCard = useCallback(
    (id: number) => {
      dispatch(deleteDriver(id));
    },
    [dispatch, drivers],
  );
  const updateCard = useCallback(
    (data: TDriver, id: number) => {
      delete data.id;
      delete data.date_created;
      dispatch(updateDriver(data, id));
    },
    [dispatch],
  );
  useEffect(() => {
    dispatch(requestDrivers());
    dispatch(requestCars());
  }, [dispatch]);

  if (isLoad) {
    return <LoadView />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={drivers}
        renderItem={({item}) => (
          <DriverCard
            driver={item}
            status_list={listItems}
            delCard={deleteCard}
            updateCard={updateCard}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalState(!modalState)}>
        <Text style={styles.addBtnText}>Add driver</Text>
      </TouchableOpacity>
      <AddDriverModal
        statuses={listItems}
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
