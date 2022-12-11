import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type TProps = {
  handler: () => void;
}

export const DeleteBtn: React.FC<TProps> = ({handler}) => {
  return (
    <TouchableOpacity style={styles.deleteBtn} onPress={handler}>
      <Text style={styles.deleteBtnText}>Видалити</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEBEB',
  },
  deleteBtnText: {
    fontFamily: 'gilroy',
    color: '#F00404',
    fontWeight: '500',

  },
});
