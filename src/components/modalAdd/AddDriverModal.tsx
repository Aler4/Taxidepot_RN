import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {ModalInput} from './ModalInput';
import {StatusDropDown, TLabel} from '../StatusDropDown';
import {DateInput} from '../DateInput';
import {TDate} from '../../helpers/formatDate';
import {useDispatch} from 'react-redux';
import {addDriver} from '../../redux/depotReducer/action';
import {TDriver} from '../../redux/types';
import {Field, Formik} from 'formik';

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
  let initDriver: TDriver = {
    first_name: '',
    last_name: '',
    date_birth: 0,
    status: {title: 'Заблокирован', code: ''},
  };

  const dispath = useDispatch();
  const [driver, setDriver] = useState<TDriver>(initDriver);

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

  const addHandler = value => {
    dispath(addDriver(value));
    changeVisible(!visible);
  };

  return (
    <Modal visible={isVisible} style={styles.container}>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          date_birth: 0,
          status: {title: 'Активный', code: 'active'},
        }}
        onSubmit={(values: TDriver) => addHandler(values)}>
        {formik => (
          <>
            <Field component={ModalInput} name="first_name" title={"Ім'я"} />
            <Field component={ModalInput} name="last_name" title={'Прізвище'} />
            <Field
              component={DateInput}
              formik={formik}
              title={'Дата народженя'}
            />

            <Field
              component={StatusDropDown}
              formik={formik}
              init_value={'Активный'}
              labels={statuses}
              title={'Статус'}
              name="status"
            />
            <View style={styles.btnsContainer}>
              <TouchableOpacity onPress={() => changeVisible(!visible)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={formik.handleSubmit}>
                <Text>Accepted</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
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
});
