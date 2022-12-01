import DropDownPicker from 'react-native-dropdown-picker';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { updateCar } from "../redux/depotReducer/action";

export type TLabel = {
  label: string;
  value: string;
  code: string;
};

type TStatusProps = {
  init_value: string;
  labels: TLabel[];
  title: string;
  updateDate?: (data: {title: string; code: string}) => void;
  updateCard?: (data: {title: string; code: string}) => void;

};

export const StatusDropDown: React.FC<TStatusProps> = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.init_value);
  const [items, setItems] = useState(props.labels);

  const sendValue = (val: string) => {
    let item = items.filter(el => el.value === val)[0];
    if (props.updateDate) {
      props.updateDate({title: item.value, code: item.code});
    }
    if (props.updateCard) {
      console.log({title: item.value, code: item.code})
      props.updateCard({title: item.value, code: item.code});
    }
  };

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
        // onLayout={() => sendValue(value)}
        onChangeValue={() => sendValue(value)}
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
