import React, {useCallback, useState} from 'react';
import {Text, TextInput, View} from 'react-native';

type TInputProps = {
  title: string;
  updateData: (data: string | number) => void;
};

export const ModalInput: React.FC<TInputProps> = props => {
  const [value, setValue] = useState<string | number>();

  return (
    <View>
      <Text>{props.title}</Text>
      <TextInput
        maxLength={12}
        autoCapitalize={'characters'}
        value={value}
        onChangeText={setValue}
        onEndEditing={() => props.updateData(value)}
      />
    </View>
  );
};
