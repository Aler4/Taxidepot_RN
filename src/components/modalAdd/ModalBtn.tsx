import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  title: string;
  hendler: () => void;
}

export const ModalBtn: React.FC<IProps> = props => {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={props.hendler}>
      <Icon name={'add'} color={'#8E91A0'} size={32} />
      <Text style={styles.addBtnText}> {props.title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#F4F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  addBtnText: {
    color: '#737DF9',
    fontFamily: 'gilroy',
    fontSize: 16,
    fontWeight: '500',
  },
});
