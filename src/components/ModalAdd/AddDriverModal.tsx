import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {ModalInput} from './ModalInput';
import {StatusDropDown, TLabel} from '../StatusDropDown';
import {DateInput} from '../DateInput';
import {TDate} from '../../helpers/formatDate';
import {useDispatch} from 'react-redux';
import {Cars} from '../../screens/Cars';
import {addDriver} from '../../redux/depotReducer/action';

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
  visible: boolean;
  changeVisible: (value: boolean) => void;
};

type TData = string | number | {value: string; code: string} | TDate;

export const AddDriverModal: React.FC<TModalProps> = ({
  statuses,
  visible,
  changeVisible,
}) => {
  let initDriver: TAddDriver = {
    first_name: '',
    last_name: '',
    date_birth: 0,
    status: {title: 'Заблокирован', code: ''},
  };

  const dispath = useDispatch();
  const [driver, setDriver] = useState<TAddDriver>(initDriver);

  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const getValue = useCallback(
    (key: string, value: TData) => {
      setDriver({...driver, [key]: value});
    },
    [driver, setDriver],
  );

  const addHandler = () => {
    console.log(driver);
    dispath(addDriver(driver));
    changeVisible(!visible);
  };

  return (
    <Modal visible={isVisible} style={styles.container}>
      <ModalInput
        title={"Ім'я"}
        updateData={getValue.bind(null, 'first_name')}
      />
      <ModalInput
        title={'Прізвище'}
        updateData={getValue.bind(null, 'last_name')}
      />
      <DateInput
        title={'Дата народженя'}
        dataUpdate={getValue.bind(null, 'date_birth')}
      />
      <View style={styles.status}>
        <StatusDropDown
          title={'Статус'}
          init_value={'Активный'}
          labels={statuses}
          updateDate={getValue.bind(null, 'status')}
        />
      </View>

      <View style={styles.btnsContainer}>
        <TouchableOpacity onPress={() => changeVisible(!visible)}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addHandler}>
          <Text>Accepted</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  status: {
    paddingLeft: 120,
  },

  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 60,
  },

})
