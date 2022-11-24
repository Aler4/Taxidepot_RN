import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TDriver} from '../redux/depotReducer/types';
import DropShadow from 'react-native-drop-shadow';
interface IDriverProps {
  driver: TDriver;
}

export const DriverCard: React.FC<IDriverProps> = ({driver}) => {
  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.card}>
        <Text>{driver.id}</Text>
        <Text>
          {driver.first_name} {driver.last_name}
        </Text>
        <Text>{driver.date_created}</Text>
        <Text>{driver.date_birth}</Text>
        <Text>{driver.status.title}</Text>
        <View>
          <TouchableOpacity>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Cars</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DropShadow>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 15,
    width: 340,
    marginHorizontal: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
