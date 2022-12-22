import React, {useEffect, useState} from 'react';
import {View, Modal, StyleSheet, SafeAreaView, Text} from 'react-native';
import {ModalInput} from './ModalInput';
import {StatusDropDown, TLabel} from '../StatusDropDown';
import {DateInput} from './DateInput';
import {useDispatch, useSelector} from 'react-redux';
import {TDriver} from '../../redux/types';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {ModalBtn} from './ModalBtn';
import {addDriver, requestDrivers} from '../../redux/actions';
import {LoadView} from '../LoadView';
import {driversLoadSelector} from '../../redux/selectors';

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
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const addHandler = (value: TDriver) => {
    dispath(addDriver(value));
    setLoad(true)
    dispath(requestDrivers());
    setTimeout(() => {
      setLoad(false);
      changeVisible(!visible);

    }, 1);
  };

  useEffect(() => {
    console.log(load);
  },[load])

  const driverValidationSchema = yup.object().shape({
    first_name: yup.string().required("Ім'я обов'язкове"),
    last_name: yup.string().required("Прізвище обов'язкове"),
    // date_birth: yup.date().required('Оберіть дату'),
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
          onSubmit={(values: TDriver) => addHandler(values)}>
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
      {load ? (
        <View style={styles.loadView}>
          <LoadView size={35} />
        </View>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    position: 'relative',
  },
  status: {
    paddingLeft: 120,
  },
  loadView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 60,
  },
});
