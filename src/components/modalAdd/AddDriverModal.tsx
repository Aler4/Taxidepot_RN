import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ModalInput} from './ModalInput';
import {StatusDropDown, TLabel} from '../StatusDropDown';
import {DateInput} from './DateInput';
import {TDate} from '../../helpers';
import {useDispatch} from 'react-redux';
import {addDriver} from '../../redux/depotReducer/action';
import {TDriver} from '../../redux/types';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {ModalBtn} from './ModalBtn';

type TModalProps = {
  statuses: TLabel[];
  visible: boolean;
  changeVisible: (value: boolean) => void;
};

export const AddDriverModal: React.FC<TModalProps> = ({
  statuses,
  visible,
  changeVisible,
}) => {
  const dispath = useDispatch();

  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const addHandler = (value: TDriver) => {
    dispath(addDriver(value));
    changeVisible(!visible);
  };

  const driverValidationSchema = yup.object().shape({
    first_name: yup.string().required("Ім'я обов'язкове"),
    last_name: yup
      .string()
      // .min(20, ({min, value}) => `${min - value.length} characters to go`)
      .required("Прізвище обов'язкове"),
    date_birth: yup.date().required('Оберіть дату'),
  });

  return (
    <Modal visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            date_birth: 0,
            status: {title: 'Активный', code: 'active'},
          }}
          validationSchema={driverValidationSchema}
          onSubmit={(values: TDriver) => console.log(values)}>
          {formik => (
            <>
              <Field component={ModalInput} name="first_name" title={"Ім'я"} />
              <Field
                component={ModalInput}
                name="last_name"
                title={'Прізвище'}
              />
              <Field
                component={DateInput}
                formik={formik}
                name={'date_birth'}
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
                <ModalBtn
                  role={'dismiss'}
                  title={'Назад'}
                  handler={() => changeVisible(!visible)}
                />
                <ModalBtn
                  role={'add'}
                  title={'Додати'}
                  valid={formik.isValid}
                  handler={formik.handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
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
