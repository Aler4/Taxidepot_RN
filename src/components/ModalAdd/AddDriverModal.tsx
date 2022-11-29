import React, {useCallback, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ModalInput} from './ModalInput';
import { StatusDropDown, TLabel } from "../StatusDropDown";
import { DateInput } from '../DateInput';

type TAddDriver = {
  first_name: string;
  last_name: string;
  date_birth: number;
  status: {
    title: string;
    code: string;
  };
};
type TModalProps = {
  statuses: TLabel[];
};

export const AddDriverModal: React.FC<TModalProps> = ({statuses}) => {
  let initDriver: TAddDriver = {
    first_name: '',
    last_name: '',
    date_birth: Date.now(),
    status: {title: 'Заблокирован', code: ''},
  };
  const [driver, setDriver] = useState<TAddDriver>(initDriver);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const getValue = useCallback(
    (key: string, value: string | number) => {
      setDriver({...driver, [key]: value});
    },
    [driver, setDriver],
  );
  return (
    <Modal visible={isVisible}>
      <ModalInput
        title={"Ім'я"}
        updateData={getValue.bind(null, 'first_name')}
      />
      <ModalInput
        title={'Прізвище'}
        updateData={getValue.bind(null, 'last_name')}
      />
      <DateInput />
      <StatusDropDown title={'Статус'} init_value={'Активный'} labels={statuses} />
      <View>
        <TouchableOpacity>
          <Text>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
