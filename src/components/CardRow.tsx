import React, { useEffect, useState } from "react";
import {StyleSheet, Text, TextInput, Pressable} from 'react-native';

import {useEditing} from '../hooks/useEditing';



interface RowProps {
  title: string;
  info: string | number;
  length?: number,
  editable?: boolean;
  updateHandler?: (value: string | number) => void;
}

export const CardRow: React.FC<RowProps> = props => {
  let initValue = typeof props.info === 'number' ? props.info.toString() : props.info;
  const [title, setTitle] = useState(props.title.toUpperCase())
  const [value, setValue] = useState(initValue);
  const [isEdit, setIsEdit] = useState(false);
  const editable = useEditing(isEdit, setIsEdit);

  const startHandler = () => {
    if (props.editable) {
      return editable.startEdit();
    }
    return null;
  };


  const endHandler = () => {
    setValue(value)
    if (props.editable) {
      if (props.updateHandler && value !== initValue) {
        props.updateHandler(value);
      }
      return editable.endEdit();
    }

    return null;
  };

  return (
    <Pressable onLongPress={() => startHandler()} style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={isEdit ? [styles.input, styles.inpAct] : styles.input}
        value={value}
        onChangeText={setValue}
        maxLength={props.length ? props.length : 30}
        onEndEditing={() => endHandler()}
        autoFocus={isEdit}
        editable={isEdit}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    opacity: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  title: {
    fontFamily: 'gilroy',
    paddingRight: 10,
    color: '#292D45',
    fontSize: 14,
    opacity: 0.9,
  },
  info: {
    fontFamily: 'gilroy',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  input: {
    color: '#292D45',
    backgroundColor: 'none',
    lineHeight: 1,
    overflow: 'visible',
    height: 25,
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 12,
    paddingBottom: 0,
    textAlignVertical: 'center',

  },
  inpAct: {
    fontWeight: '500',
    borderBottomWidth: 1,
  },
});
