import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type TLabel = {
  label: string;
  value: string;
};

type TStatusProps = {
  init_value: string;
  labels: TLabel[];
  title: string;
};

export const StatusDropDown: React.FC<TStatusProps> = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.init_value);
  const [items, setItems] = useState(props.labels);
  console.log(props.labels);

  return (
    <View style={styles.row}>
      <Text>{`${props.title}: `}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        showArrowIcon={false}
        style={styles.input}
        listItemContainerStyle={styles.list}
        dropDownContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: 200,
    lineHeight: 1,
    textAlignVertical: 'top',
  },
  list: {
    display: 'flex',
    height: 20,
    borderBottomWidth: 0,
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    width: 200,
    borderWidth: 0,
  },
});
