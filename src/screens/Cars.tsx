import React, {useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { carsSelector, carStatusSelector, loadSelector } from "../redux/depotReducer/selector";
import {CarCard} from '../components/CarCard';
import {TCar} from '../redux/depotReducer/types';
import {requestCars} from '../redux/depotReducer/action';

export const Cars: React.FC<TCar[]> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCars());
  }, [dispatch]);

  const cars = useSelector(carsSelector);
  const isLoad = useSelector(loadSelector);

  let statuses = useSelector(carStatusSelector);
  let listItems = statuses.map(el => ({
    label: el.title,
    value: el.title,
  }));
  return isLoad ? (<Text>Loading...</Text>) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
        data={cars}
        renderItem={({item}) => <CarCard car={item} status_list={listItems} />}
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
});
