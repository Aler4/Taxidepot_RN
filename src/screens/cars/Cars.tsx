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
import {LoadView, CarCard, AddCarModal, ModalBtn} from '../../components';
import {TCar} from '../../redux/types';

type TProps = {
  route: {params: {id?: number; items: TCar[]}};
};

export const Cars: React.FC<TProps> = ({route}) => {
  let data = route.params;
  const dispatch = useDispatch();
  let [id, setId] = useState<number>(0);
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
    if (data && data.id) {
      return setId(data.id);
    }
  }, [data.items, data, id]);

  if (carsIsLoad) {
    return <LoadView />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => (item.id as number).toString()}
        data={data.items}
        renderItem={({item}) => (
          <CarCard car={item} status_list={listItems} delCard={deleteCard} />
        )}
      />
      <ModalBtn
        title={'Додати авто'}
        hendler={() => setModalState(!modalState)}
      />
      {/*<TouchableOpacity*/}
      {/*  style={styles.addBtn}*/}
      {/*  onPress={() => setModalState(!modalState)}>*/}
      {/*  <Text style={styles.addBtnText}>Add Car</Text>*/}
      {/*</TouchableOpacity>*/}
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
