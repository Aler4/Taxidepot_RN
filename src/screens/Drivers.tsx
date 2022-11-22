import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {driversSelector, loadSelector} from '../redux/depotReducer/selector';
import {TDriver} from '../redux/depotReducer/types';
import {DriverCard} from '../components/DriverCard';
import {getDrivers} from '../redux/depotReducer/thunks';

export const Drivers: React.FC<TDriver[]> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getDrivers());
    console.log();
  }, []);

  const drivers = useSelector(driversSelector);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={drivers}
          renderItem={({item}) => <DriverCard driver={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
