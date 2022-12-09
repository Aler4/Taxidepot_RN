import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  carsSelector,
  carStatusSelector,
  carLoadSelector,
} from '../../redux/selectors';
import {deleteCar, requestCars} from '../../redux/actions';
import {LoadView, CarCard, AddCarModal} from '../../components';

type TProps = {
  route: {params: {id: number}};
};

export const PersonalCars: React.FC<TProps> = ({route}) => {
  const dispatch = useDispatch();
  let data = route.params;
  let [id, setId] = useState<number>(0);
  let cars = useSelector(carsSelector);
  const carsIsLoad = useSelector(carLoadSelector);
  let statuses = useSelector(carStatusSelector);
  let listItems = statuses.map(el => ({
    value: el.title,
    code: el.code,
  }));
  const [modalState, setModalState] = useState<boolean>(false);

  const deleteCard = useCallback((id: number) => {
    return Alert.alert('Delete', 'Do you want delete this car?', [
      {
        text: 'CANCEL',
        onPress: () => null,
      },
      {
        text: 'DELETE',
        onPress: () => dispatch(deleteCar(id)),
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
    dispatch(requestCars());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.id) {
      return setId(data.id);
    }
  }, [cars, data, id]);

  const cards = useMemo(() => {
    let car = id !== 0 ? cars.filter(el => el.driver_id === id) : cars;
    return car;
  }, [cars, id]);

  if (carsIsLoad) {
    return <LoadView />;
  }
  return (
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
