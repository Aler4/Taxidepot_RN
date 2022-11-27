import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const DeleteBtn: React.FC = () => {
  return (
    <TouchableOpacity style={styles.deleteBtn}>
      <Icon name="delete" color={'#a50606'} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efa2a2',
  },
});
