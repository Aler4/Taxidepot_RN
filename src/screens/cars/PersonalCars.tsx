import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Alert, RefreshControl } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { carLoadSelector, carsSelector } from "../../redux/selectors";
import {deleteCar, requestCars} from '../../redux/actions';
import {CarCard, AddCarModal, OpenModalBtn} from '../../components';
import {PersonalCarsProps} from './CarsScreens';
import {useRoute} from '@react-navigation/native';

export const PersonalCars: FC = () => {
  const dispatch = useDispatch();
  const {params} = useRoute<PersonalCarsProps>();
  const [id, setId] = useState<number>(0);
  const cars = useSelector(carsSelector);
  const statuses = params.statuses;
  const [modalState, setModalState] = useState<boolean>(false);
  const load = useSelector(carLoadSelector);
  const showModal = useCallback(
    (value: boolean) => {
      setModalState(value);
    },
    [setModalState],
  );

  const delHandler = useCallback(
    (id: number) => {
      dispatch(deleteCar(id));
      dispatch(requestCars());
    },
    [dispatch],
  );

  const deleteCard = useCallback(
    (id: number) => {
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
    },
    [delHandler],
  );

  const cards = useMemo(() => {
    let car = id !== 0 ? cars.filter(el => el.driver_id === id) : cars;
    return car;
  }, [cars, id]);

  useEffect(() => {
    if (params && params.id) {
      return setId(params.id);
    }
  }, [cars, params, id]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#14e0e0', '#9deaf9']}
            refreshing={load}
            onRefresh={() => dispatch(requestCars())}

          />}
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={cards}
        renderItem={({item}) => (
          <CarCard car={item} status_list={statuses} delCard={deleteCard} />
        )}
      />

      <OpenModalBtn
        title={'Додати авто'}
        hendler={() => setModalState(!modalState)}
      />
      <AddCarModal
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
