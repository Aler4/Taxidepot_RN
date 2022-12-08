import React, {useMemo, useState } from "react";
import {StyleSheet, Text, View} from 'react-native';
import { Picker } from "@react-native-picker/picker";

export type TLabel = {
  value: string;
  code: string;
};

type TStatusProps = {
  init_value?: string;
  labels: TLabel[];
  title: string;
  updateDate?: (data: {title: string; code: string}) => void;
  updateCard?: (data: {title: string; code: string}) => void;

};

export const StatusDropDown: React.FC<TStatusProps> = props => {
  console.log(props.init_value);
  const [selectedValue, setSelectedValue] = useState(props.init_value);
  console.log(selectedValue)
  const [items, setItems] = useState(props.labels);

  const sendValue = (val: string) => {
    setSelectedValue(val)
    let item = items.filter(el => el.code === val)[0];
    if (props.updateDate) {
      props.updateDate({title: item.value, code: item.code});
    }
    if (props.updateCard) {
      props.updateCard({title: item.value, code: item.code});
    }
  };
  const pickers = useMemo(() => {
    if (props.init_value) {
      let index: number = items.findIndex(el => el.value == props.init_value);
      [items[0], items[index]] = [items[index], items[0]];
    }
    return items.map(el => (
      <Picker.Item key={el.value} label={el.value} value={el.code} />
    ));
  }, [items, props.init_value]);

  console.log(pickers)
  return (
    <View style={styles.row}>
      <Text>{`${props.title}: `}</Text>
      <Picker
        style={styles.input}
        prompt={'Status'}
        mode={'dialog'}
        selectedValue={selectedValue}
        onValueChange={item => sendValue(item)}>
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
