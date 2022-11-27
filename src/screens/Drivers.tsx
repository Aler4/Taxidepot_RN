import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {driversSelector, loadSelector} from '../redux/depotReducer/selector';
import {TDriver} from '../redux/depotReducer/types';
import {DriverCard} from '../components/DriverCard';
import {requestDrivers} from '../redux/depotReducer/action';

export const Drivers: React.FC<TDriver[]> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestDrivers());
  }, []);

  const drivers = useSelector(driversSelector);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
        data={drivers}
        renderItem={({item}) => <DriverCard driver={item} />}
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
