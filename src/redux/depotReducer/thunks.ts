import {getApi} from '../../services/getApi';
import {loadCars, updateLoad, uploadDrivers} from './action';
import {TCar, TDriver} from './types';

export const getDrivers = () => {
  return (
    dispatch: (arg0: {data: TDriver[] | boolean; type: string}) => any,
  ) => {
    dispatch(updateLoad(true));
    (() =>
      getApi('driver')
        .then(response => response.json())
        .then(response => dispatch(uploadDrivers(response.data)))
        .then(() => dispatch(updateLoad(false))))();
  };
};

export const getCars = () => {
  return (dispatch: (arg0: {data: TCar[] | boolean; type: string}) => any) => {
    dispatch(updateLoad(true));
    (() =>
      getApi('car')
        .then(response => response.json())
        .then(response => dispatch(loadCars(response.data)))
        .then(() => dispatch(updateLoad(false))))();
  };
};
