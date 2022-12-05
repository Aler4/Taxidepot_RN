import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface ILinkProps {
  icon_name: string;
  route: () => void;
}

export const LinkBtn: React.FC<ILinkProps> = (props) => {
  return (
    <TouchableOpacity style={styles.linkBtn} onPress={props.route}>
      <Icon name={props.icon_name} color={'black'} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkBtn: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#777171',
  },
});
