import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { carLoadSelector, carStatusSelector } from "../../redux/selectors";
import {deleteCar, requestCars} from '../../redux/actions';
import {LoadView, CarCard, AddCarModal, OpenModalBtn} from '../../components';
import {TCar} from '../../redux/types';

type TProps = {
  route: {params: {id?: number; items: TCar[]}};
};

export const Cars: React.FC<TProps> = ({route}) => {
  let data = route.params;
  const dispatch = useDispatch();
  const [items, setItems] = useState(data.items);
  let statuses = useSelector(carStatusSelector);
  let load = useSelector(carLoadSelector);
  let listItems = statuses.map(el => ({
    value: el.title,
    code: el.code,
  }));
  const [modalState, setModalState] = useState<boolean>(false);

  const delHandler = (id: number) => {
    dispatch(deleteCar(items, id));
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
      },
    ]);
  }, []);

  const showModal = useCallback(
    (value: boolean) => {
      setModalState(value);
    },
    [setModalState],
  );

  useEffect(() => {
    setItems(data.items);
  }, []);

  if (load) {
    return <LoadView />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={items}
        renderItem={({item}) => (
          <CarCard car={item} status_list={listItems} delCard={deleteCard} />
        )}
      />
      <OpenModalBtn
        title={'Додати авто'}
        hendler={() => setModalState(!modalState)}
      />

      <AddCarModal
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
