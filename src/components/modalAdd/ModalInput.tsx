import React from 'react';
import {StyleSheet, Text, TextInput, View } from "react-native";

type TInputProps = {
  title: string;
  focus?: boolean;
  updateData?: (data: string | number) => void;
  field?: any;
  form?: any;
};

export const ModalInput: React.FC<TInputProps> = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C5C6CE',
    marginBottom: 5,
    padding: 10,
  },
  title: {
    paddingBottom: 5,
    fontFamily: 'gilroy',
    fontSize: 14,
    color: '#292D45',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});
