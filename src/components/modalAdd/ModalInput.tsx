import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type TInputProps = {
  title: string;
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
    <>
      <Text>{props.title}</Text>
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
    </>
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
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});
