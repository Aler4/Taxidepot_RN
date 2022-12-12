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
  card?: boolean;
};

export const StatusDropDown: React.FC<TStatusProps> = props => {
  console.log(props.init_value);
  const [selectedValue, setSelectedValue] = useState(props.init_value);
  console.log(selectedValue);
  const [items, setItems] = useState(props.labels);
  const [title, setTitle] = useState(props.title);


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
    <View style={props.card ? styles.cardStyle : styles.modalStyle}>
      <Text style={props.card ? styles.cardTitle : styles.modalTitle}>{title}</Text>
      <View style={props.card ? null : styles.inputContainer}>
        <Picker
          dropdownIconColor={props.card ? '#FFFFFF' : '#8E91A0'}
          style={props.card ? styles.cardInput : styles.modalInput}
          prompt={'Status'}
          mode={'dialog'}
          selectedValue={selectedValue}
          onValueChange={item => sendValue(item)}>
          {pickers}
        </Picker>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardInput: {
    fontFamily: 'gilroy',
    fontSize: 16,
    fontWeight: '500',
    width: 200,
    lineHeight: 1,
    textAlignVertical: 'top',
  },
  modalInput: {
    fontFamily: 'gilroy',
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    lineHeight: 1,
    textAlignVertical: 'center',
  },
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 15,
  },
  modalStyle: {
    paddingHorizontal: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C5C6CE',
  },
  cardTitle: {
    fontFamily: 'gilroy',
    paddingRight: 10,
    color: '#292D45',
    fontSize: 14,
    opacity: 0.9,
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontFamily: 'gilroy',
    color: '#292D45',
    paddingBottom: 5,
  },
});
