import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  carsSelector,
  driversSelector,
  loadSelector,
} from '../redux/depotReducer/selector';
import {CarCard} from '../components/CarCard';
import {TCar} from '../redux/depotReducer/types';
import {getCars, getDrivers} from '../redux/depotReducer/thunks';

export const Cars: React.FC<TCar[]> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getCars());
    console.log();
  }, []);

  const cars = useSelector(carsSelector);
  return (
    <SafeAreaView>
      <View>
        <FlatList
          keyExtractor={item => item.number}
          data={cars}
          renderItem={({item}) => <CarCard car={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
