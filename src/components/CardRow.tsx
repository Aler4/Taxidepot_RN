import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Pressable} from 'react-native';

import {useEditing} from '../hooks/useEditing';

interface RowProps {
  title: string;
  info: string | number;
  editable?: boolean;
}

export const CardRow: React.FC<RowProps> = props => {
  let initValue =
    typeof props.info === 'number' ? props.info.toString() : props.info;
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
    if (props.editable) {
      return editable.endEdit();
    }
    return null;
  };

  return (
    <Pressable onLongPress={() => startHandler()} style={styles.row}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={isEdit ? [styles.input, styles.inpAct] : styles.input}
        value={value}
        onChangeText={setValue}
        maxLength={30}
        onEndEditing={() => endHandler()}
        autoFocus={isEdit}
        editable={isEdit}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    opacity: 1,
  },
  title: {
    fontStyle: 'italic',
    opacity: 0.8,
  },
  info: {
    fontFamily: 'GothamPro',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  input: {
    color: 'black',
    backgroundColor: 'none',
    lineHeight: 1,
    overflow: 'visible',
    height: 30,
    paddingTop: 12,
    paddingBottom: 0,
    textAlignVertical: 'center',
  },
  inpAct: {
    fontWeight: '700',
    borderBottomWidth: 1,
  },
});
