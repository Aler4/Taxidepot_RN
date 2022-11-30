import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { carsSelector, carStatusSelector, loadSelector } from "../redux/depotReducer/selector";
import {CarCard} from '../components/CarCard';
import {TCar} from '../redux/depotReducer/types';
import {requestCars} from '../redux/depotReducer/action';
import {AddCarModal} from '../components/ModalAdd/AddCarModal';

export const Cars: React.FC<TCar[]> = () => {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState<boolean>(false);
  const showModal = useCallback(
    (value: boolean) => {
      setModalState(value);
    },
    [setModalState],
  );

  useEffect(() => {
    dispatch(requestCars());
  }, [dispatch]);
  const cars = useSelector(carsSelector);
  const isLoad = useSelector(loadSelector);

  let statuses = useSelector(carStatusSelector);
  let listItems = statuses.map(el => ({
    label: el.title,
    value: el.title,
    code: el.code,
  }));
  return isLoad ? (<Text>Loading...</Text>) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
        data={cars}
        renderItem={({item}) => <CarCard car={item} status_list={listItems} />}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setModalState(!modalState)}>
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
  }
});
