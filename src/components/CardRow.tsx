import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface RowProps {
  title: string;
  info: string;
}

export const CardRow: React.FC<RowProps> = props => {
  let [isEdit, setIsEdit] = useState<boolean>(false);
  let [value, setValue] = useState<string | number | undefined>(props.info);
  return (
    <View style={styles.row} onTouchStart={() => setIsEdit(!isEdit)}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={isEdit ? [styles.info,styles.hidden] : [styles.info,styles.visible]}>{value}</Text>
      <TextInput style={isEdit ? styles.visible : styles.hidden} value={value} onChangeText={setValue} readonly={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
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
    display: 'none',
  }
});
