import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

type TInputProps = {
  title: string;
  updateData: (data: string | number) => void;
};

export const ModalInput: React.FC<TInputProps> = props => {
  const [value, setValue] = useState<string | number>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.textInput}
        maxLength={12}
        autoCapitalize={'characters'}
        value={value}
        onChangeText={setValue}
        onEndEditing={() => props.updateData(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    padding: 10,
  },
  container: {
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  title: {
    marginBottom: 10,
  },
})
