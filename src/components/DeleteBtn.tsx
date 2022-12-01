import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';

type TProps = {
  handler: () => void;
}

export const DeleteBtn: React.FC<TProps> = ({handler}) => {
  return (
    <TouchableOpacity style={styles.deleteBtn} onPress={handler}>
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
