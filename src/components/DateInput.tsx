import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDate, TDate} from '../helpers/formatDate';

type TDateProps = {
  title: string;
  dataUpdate: (data: TDate) => void;
  field: any,
  form: any,

};

export const DateInput: React.FC<TDateProps> = (props) => {

  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const [date, setDate] = useState<TDate>(value);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    let res: string = '';
    if (date) {
      let day: string =
        (date as unknown as Date).getDate() < 10
          ? `0${(date as unknown as Date).getDate()}`
          : `${(date as unknown as Date).getDate()}`;
      let month: string =
        (date as unknown as Date).getMonth() < 10
          ? `0${(date as unknown as Date).getMonth()}`
          : `${(date as unknown as Date).getMonth()}`;
      let year: number = (date as unknown as Date).getFullYear();
      res = `${day}.${month}.${year}`;
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={() => onChange(name)(formatDate(date))}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
          onPressIn={showDatePicker}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date(1970, 0, 12)}
        maximumDate={new Date(2004, 11, 30)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    padding: 10,
  },
  title: {
    marginBottom: 10,
  },
});
