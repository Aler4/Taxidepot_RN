import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  driverStatusSelector,
  driversLoadSelector,
} from '../../redux/selectors';
import {TDriver} from '../../redux/types';
import {
  deleteDriver,
  requestCars,
  requestDrivers,
  updateDriver,
} from '../../redux/depotReducer/action';
import {
  AddDriverModal,
  DriverCard,
  LoadView,
  OpenModalBtn,
} from '../../components';

type TProps = {
  route: {params: {id?: number; items: TDriver[]}};
};

export const CarOwner: React.FC<TProps> = ({route}) => {
  let params = route.params;
  let [index, setIndex] = useState<number>(0);
  const driversIsLoad = useSelector(driversLoadSelector);
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

  const deleteCard = useCallback((id: number) => {
    return Alert.alert('Delete', 'Do you want delete this car?', [
      {
        text: 'CANCEL',
        onPress: () => null,
      },
      {
        text: 'DELETE',
        onPress: () => dispatch(deleteDriver(id)),
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
  useEffect(() => {
    console.log(params.id)
    if (params && params.id) {
      return setIndex(params.id);
    }
  }, [params.id]);

  const cards = useMemo(() => {
    let driver =
      index !== 0
        ? params.items.filter(el => el.id === index)
        : params.items;
    console.log(driver)
    return driver;
  }, [params,index]);

  if (driversIsLoad) {
    return <LoadView />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={cards}
        renderItem={({item}) => (
          <DriverCard
            driver={item}
            status_list={listItems}
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
