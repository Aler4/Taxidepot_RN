import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  carsSelector,
  carStatusSelector,
  loadSelector,
} from '../redux/depotReducer/selector';
import {CarCard} from '../components/CarCard';
import {deleteCar, requestCars} from '../redux/depotReducer/action';
import {AddCarModal} from '../components/ModalAdd/AddCarModal';

type TProps = {
  route: {params: {id: number}};
};

export const Cars: React.FC<TProps> = ({route}) => {
  const dispatch = useDispatch();
  let data = route.params;
  let [id, setId] = useState<number>(0);
  let cars = useSelector(carsSelector)
  const isLoad = useSelector(loadSelector);
  let statuses = useSelector(carStatusSelector);
  let listItems = statuses.map(el => ({
    label: el.title,
    value: el.title,
    code: el.code,
  }));
  const [modalState, setModalState] = useState<boolean>(false);
  const deleteCard = useCallback(
    (id: number) => {
      dispatch(deleteCar(id));
    },
    [dispatch, cars],
  );
  const showModal = useCallback(
    (value: boolean) => {
      setModalState(value);
    },
    [setModalState],
  );
  useEffect(() => {
    dispatch(requestCars());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.id){
      return setId(data.id);
    }
    if (id === data.id){
      return setId(0);
    }
  }, [cars, data, id]);

  const cards = useMemo(() => {
    let car = id !== 0 ? cars.filter(el => el.driver_id === id) : cars;
    return car;
  }, [cars, id]);

  return isLoad ? (
    <Text>Loading...</Text>
  ) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={cards}
        renderItem={({item}) => (
          <CarCard car={item} status_list={listItems} delCard={deleteCard} />
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalState(!modalState)}>
        <Text style={styles.addBtnText}>Add Car</Text>
      </TouchableOpacity>
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
