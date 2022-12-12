import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDate, TDate} from '../helpers/formatDate';

type TDateProps = {
  title: string;
  // dataUpdate: (data: TDate) => void;
  formik: any;
};

export const DateInput: React.FC<TDateProps> = ({title, formik}) => {
  const [date, setDate] = useState<string>('');
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
    console.log(formatDate(date));
    console.log(date);
    return res;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={getDate()}
          onPressIn={showDatePicker}
          onContentSizeChange={() =>
            formik.setFieldValue('date_birth', +(formatDate(date) as Date))
          }
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
    padding: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    padding: 10,
  },
});
