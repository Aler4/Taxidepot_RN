import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StatusDropDown, ModalInput, TLabel, ModalBtn} from '../';
import {useDispatch} from 'react-redux';
import {addCar} from '../../redux/depotReducer/action';
import {TCar} from '../../redux/types';
import {Formik, Field} from 'formik';
import {requestCars} from '../../redux/actions';
import * as yup from 'yup';

type TModalProps = {
  statuses: TLabel[];
  visible: boolean;
  changeVisible: (value: boolean) => void;
};

export const AddCarModal: React.FC<TModalProps> = ({
  statuses,
  visible,
  changeVisible,
}) => {
  const dispath = useDispatch();

  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const addHandler = (val: TCar) => {
    dispath(addCar(val));
    dispath(requestCars());
    changeVisible(!visible);
  };

  const carValidation = yup.object().shape({
    model: yup.string().required("Обов'язкове поле"),
    mark: yup.string().required("Обов'язкове поле"),
    number: yup
      .string()
      .required("Обов'язкове поле")
      .min(8, 'мінімальна довжина 8 символів'),
    year: yup.string().required("Обов'язкове поле"),
    driver_id: yup.string().required("Обов'язкове поле"),
  });

  return (
    <Modal visible={isVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{
              model: '',
              mark: '',
              year: '',
              number: '',
              driver_id: '',
              status: {
                title: 'Стандарт',
                code: 'standard',
              },
            }}
            validationSchema={carValidation}
            onSubmit={(values: TCar) => addHandler(values)}>
            {formik => (
              <>
                <Field component={ModalInput} name="mark" title={'Марка'} />
                <Field component={ModalInput} name="model" title={'Модель'} />
                <Field
                  component={ModalInput}
                  name="year"
                  title={'Рік'}
                  keyboardType="numeric"
                />
                <Field
                  component={ModalInput}
                  title={'Номер авто'}
                  name="number"
                />

                <Field
                  component={ModalInput}
                  title={'Ід водія'}
                  name="driver_id"
                />

                <Field
                  component={StatusDropDown}
                  formik={formik}
                  init_value={'Стандарт'}
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
                    valid={formik.isValid}
                    role={'add'}
                    title={'Додати'}
                    handler={formik.handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
  status: {
    paddingLeft: 120,
    borderWidth: 0,
  },

  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 60,
  },
});
