import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

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
  formik?: any;
};

export const StatusDropDown: React.FC<TStatusProps> = props => {
  console.log(props.init_value);
  const [selectedValue, setSelectedValue] = useState(props.init_value);
  console.log(selectedValue);
  const [items, setItems] = useState(props.labels);
  const [title, setTitle] = useState(props.title.toUpperCase());

  const sendValue = (val: string) => {
    setSelectedValue(val);
    let item = items.filter(el => el.code === val)[0];
    if (props.updateDate) {
      props.updateDate({title: item.value, code: item.code});
    }

    if (props.updateCard) {
      props.updateCard({title: item.value, code: item.code});
    }

    if (props.formik) {
      props.formik.setFieldValue('status', {
        title: item.value,
        code: item.code,
      });
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

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Picker
        dropdownIconColor={'#FFFFFF'}
        style={styles.input}
        prompt={'Status'}
        mode={'dialog'}
        selectedValue={
          props.formik ? props.formik.values.status : selectedValue
        }
        onValueChange={item => sendValue(item)}>
        {pickers}
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    fontFamily: 'gilroy',
    fontSize: 16,
    fontWeight: '500',
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
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 15,
  },
  listContainer: {
    width: 200,
    borderWidth: 0,
  },
  title: {
    fontFamily: 'gilroy',
    paddingRight: 10,
    color: '#292D45',
    fontSize: 14,
    // opacity: 0.9,
  },
});
