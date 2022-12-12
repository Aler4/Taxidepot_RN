import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {StatusDropDown, ModalInput, TLabel} from '../';
import {useDispatch} from 'react-redux';
import {addCar} from '../../redux/depotReducer/action';
import {TCar} from '../../redux/types';
import {Formik, Field} from 'formik';
import { getCars } from "../../redux/depotReducer/thunks";
import { requestCars } from "../../redux/actions";

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
            <Field component={ModalInput} title={'Номер авто'} name="number" />

            <Field component={ModalInput} title={'Ід водія'} name="driver_id" />

            <Field
              component={StatusDropDown}
              formik={formik}
              init_value={'Стандарт'}
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
    borderWidth: 0,
  },

  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 60,
  },
});
