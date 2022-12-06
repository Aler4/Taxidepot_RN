// import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

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
  const [value, setValue] = useState(props.init_value);
  const [items, setItems] = useState(props.labels);

  const sendValue = val => {
    let item = items.filter(el => el.code === val)[0];
    if (props.updateDate) {
      props.updateDate({title: value, code: item.code});
    }
    if (props.updateCard) {
      props.updateCard({title: item.value, code: item.code});
    }
  };
  const pickers = items.map(el => (
    <Picker.Item key={el.code} label={el.value} value={el.code} />
  ));
  const changeValue = (val) => {
    setValue(val);
    sendValue(val);
  }

  return (
    <View style={styles.row}>
      <Text>{`${props.title}: `}</Text>
      {/*<DropDownPicker*/}
      {/*  open={open}*/}
      {/*  value={value}*/}
      {/*  items={items}*/}
      {/*  setOpen={setOpen}*/}
      {/*  setValue={setValue}*/}
      {/*  setItems={setItems}*/}
      {/*  showArrowIcon={false}*/}
      {/*  style={styles.input}*/}
      {/*  listItemContainerStyle={styles.list}*/}
      {/*  dropDownContainerStyle={styles.listContainer}*/}
      {/*  onLayout={() => sendValue(value)}*/}
      {/*  onChangeValue={() => sendValue(value)}*/}
      {/*/>*/}
      <Picker
        style={styles.input}
        mode={'dialog'}
        selectedValue={value}
        onValueChange={changeValue}>
        {pickers}
      </Picker>
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
