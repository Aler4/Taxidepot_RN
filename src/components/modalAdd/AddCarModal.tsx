import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {StatusDropDown, ModalInput, TLabel, DateInput} from '../';
import {TDate} from '../../helpers/';
import {useDispatch} from 'react-redux';
import {addCar} from '../../redux/depotReducer/action';
import {TCar} from '../../redux/types';
import {Formik, Field} from 'formik';

type TModalProps = {
  statuses: TLabel[];
  visible: boolean;
  changeVisible: (value: boolean) => void;
};

type TData = string | number | {value: string; code: string} | TDate;

export const AddCarModal: React.FC<TModalProps> = ({
  statuses,
  visible,
  changeVisible,
}) => {
  // let initCar: TCar = {
  //   model: '',
  //   mark: '',
  //   year: 2007,
  //   number: '',
  //   driver_id: 0,
  //   status: {
  //     title: '',
  //     code: '',
  //   },
  // };

  const dispath = useDispatch();
  // const [car, setCar] = useState<TCar>(initCar);

  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // const getValue = useCallback(
  //   (key: string, value: TData) => {
  //     if (key == 'year' || key == 'driver_id') {
  //       value = +(value as string);
  //     }
  //     setCar({...car, [key]: value});
  //     console.log(typeof value);
  //   },
  //   [car, setCar],
  // );

  const addHandler = val => {
    dispath(addCar(val));
    changeVisible(!visible);
  };

  return (
    <Modal visible={isVisible} style={styles.container}>
      <Formik
        initialValues={{
          model: '',
          mark: '',
          year: 2007,
          number: '',
          driver_id: 0,
          status: {
            title: '',
            code: '',
          },
        }}
        onSubmit={values => addHandler(values)}>
        {(formik) => (
          <>
            <Field component={ModalInput} name="mark" title={'Марка'} />
            <Field component={ModalInput} name="model" title={'Модель'} />
            <Field
              component={ModalInput}
              name="year"
              title={'Рік'}
              keyboardType="numeric"
            />
            <Field component={ModalInput} title={'Номер авто'} name="number" />

            <Field component={ModalInput} title={'Ід водія'} name="driver_id" />

            <Field component={StatusDropDown} formik={formik}  labels={statuses}  title={'Статус'} name="status" />
            {/*<Button*/}
            {/*  onPress={handleSubmit}*/}
            {/*  title="SIGN UP"*/}
            {/*  */}
            {/*/>*/}
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
      {/*<ModalInput title={'Марка'} updateData={getValue.bind(null, 'mark')} />*/}
      {/*<ModalInput title={'Модель'} updateData={getValue.bind(null, 'model')} />*/}
      {/*<ModalInput title={'Рік'} updateData={getValue.bind(null, 'year')} />*/}
      {/*<ModalInput*/}
      {/*  title={'Номер авто'}*/}
      {/*  updateData={getValue.bind(null, 'number')}*/}
      {/*/>*/}
      {/*<ModalInput*/}
      {/*  title={'Ід водія'}*/}
      {/*  updateData={getValue.bind(null, 'driver_id')}*/}
      {/*/>*/}
      {/*<View style={styles.status}>*/}
      {/*  <StatusDropDown*/}
      {/*    title={'Статус'}*/}
      {/*    init_value={'Стандарт'}*/}
      {/*    labels={statuses}*/}
      {/*    updateDate={getValue.bind(null, 'status')}*/}
      {/*  />*/}
      {/*</View>*/}
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
    borderWidth: 0,
  },

  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 60,
  },
});
