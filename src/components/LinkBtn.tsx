import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ILinkProps {
  title: string;
  route: () => void;
}

export const LinkBtn: React.FC<ILinkProps> = (props) => {
  return (
    <TouchableOpacity style={styles.linkBtn} onPress={props.route}>
      <Text style={styles.linkBtnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkBtn: {
    width: 83,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#737DF9',
  },
  linkBtnText: {
    fontFamily: 'gilroy',
    fontWeight: '500',
    color: '#FFFFFF',
  }
});
