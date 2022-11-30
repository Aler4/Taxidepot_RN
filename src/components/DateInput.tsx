import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDate, TDate} from '../helpers/formatDate';

type TDateProps = {
  title: string;
  dataUpdate: (data: TDate) => void;
};

export const DateInput: React.FC<TDateProps> = ({title, dataUpdate}) => {
  const [date, setDate] = useState<TDate>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
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
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={getDate()}
          placeholder="Date..."
          onPressIn={showDatePicker}
          onContentSizeChange={() => dataUpdate(formatDate(date))}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
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
