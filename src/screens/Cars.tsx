import React, {useEffect} from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { carsSelector, } from '../redux/depotReducer/selector';
import {CarCard} from '../components/CarCard';
import {TCar} from '../redux/depotReducer/types';
import {requestCars} from '../redux/depotReducer/action';

export const Cars: React.FC<TCar[]> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCars());
  }, []);

  const cars = useSelector(carsSelector);
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id.toString()}
          data={cars}
          renderItem={({item}) => <CarCard car={item} />}
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
