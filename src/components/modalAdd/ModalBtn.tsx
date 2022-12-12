import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type TModalBtn = {
  handler: () => void;
  title: string;
  role: string;
  valid?: boolean;
};

export const ModalBtn: React.FC<TModalBtn> = props => {
  const [isValid, setIsValid] = useState(props.valid);

  useEffect(() => {
    console.log(`${props.role}: ${isValid}`);
    setIsValid(props.valid);
  }, [props.valid]);

  const getStyleBtn = useMemo(() => {
    let style = null;
    if (props.role == 'add') {
      if (isValid) {
        style = [styles.acceptBtn, {opacity: 1}];
      } else {
        style = [styles.acceptBtn, {opacity: 0.5}];
      }
    }

    if (props.role == 'dismiss') {
      style = styles.dismissBtn;
    }
    return style;
  }, [props.role, isValid]);
  return (
    <TouchableOpacity
      style={getStyleBtn}
      onPress={props.handler}
      disabled={props.role == 'add' ? !isValid : false}>
      <Text
        style={
          props.role == 'add' ? styles.acceptBtnText : styles.dismissBtnText
        }>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  acceptBtn: {
    backgroundColor: '#737DF9',
    height: 40,
    width: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptBtnText: {
    fontFamily: 'gilroy',
    fontSize: 16,
    color: '#FFF',
  },
  dismissBtn: {
    height: 40,
    width: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissBtnText: {
    fontFamily: 'gilroy',
    fontSize: 16,
    fontWeight: '600',
    color: '#292D45',
  },
});
