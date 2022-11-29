import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const DateInput = () => {
  const [date, setDate] = useState('');
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
    return date !== '' ? `${(date as unknown as Date).getDate()} ${(date as unknown as Date).getMonth()} ${(date as unknown as Date).getFullYear()}` : '';
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={getDate()}
        placeholder="Date..."
        onPressIn={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        // date={date}
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
