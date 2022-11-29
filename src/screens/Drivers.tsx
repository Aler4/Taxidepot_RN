import React, {useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import {
  driversSelector,
  driverStatusSelector,
  loadSelector,
} from '../redux/depotReducer/selector';
import {TDriver} from '../redux/depotReducer/types';
import {DriverCard} from '../components/DriverCard';
import {requestDrivers} from '../redux/depotReducer/action';
import { AddDriverModal } from '../components/ModalAdd/AddDriverModal';

export const Drivers: React.FC<TDriver[]> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestDrivers());
  }, [dispatch]);

  const isLoad = useSelector(loadSelector);
  const drivers = useSelector(driversSelector);
  const statuses = useSelector(driverStatusSelector);
  let listItems = statuses.map(el => ({
    label: el.title,
    value: el.title,
  }));
  return isLoad ? (
    <Text>Load...</Text>
  ) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
        data={drivers}
        renderItem={({item}) => (
          <DriverCard driver={item} status_list={listItems} />
        )}
      />
      <TouchableOpacity>
        <Text>+</Text>
      </TouchableOpacity>
      <AddDriverModal statuses={listItems} />
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
