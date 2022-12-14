import {TCar, TDriver, TStatus} from '../types';

export const UPLOAD_DRIVERS = 'UPLOAD_DRIVERS';
export const UPLOAD_DRIVER_STATUSES = 'UPLOAD_DRIVER_STATUSES';
export const UPLOAD_CARS = 'UPLOAD_CARS';
export const UPLOAD_CAR_STATUSES = 'UPLOAD_CAR_STATUSES';
export const UPDATE_LOADER = 'UPDATE_LOADER';
export const REQUEST_DRIVERS = 'REQUEST_DRIVERS';
export const REQUEST_CARS = 'REQUEST_CARS';
export const ADD_DRIVER = 'ADD_DRIVER';
export const ADD_CAR = 'ADD_CAR';
export const DELETE_DRIVER = 'DELETE_DRIVER';
export const DELETE_CAR = 'DELETE_CAR';
export const UPDATE_DRIVER = 'UPDATE_DRIVER';
export const UPDATE_CARS = 'UPDATE_CARS';

export const uploadDrivers = (data: TDriver[]) => ({
  data,
  type: UPLOAD_DRIVERS,
});

export const loadCars = (data: TCar[]) => ({data, type: UPLOAD_CARS});
export const updateLoad = (data: boolean) => ({data, type: UPDATE_LOADER});
export const getCarStatuses = (data: TStatus[]) => ({
  data,
  type: UPLOAD_CAR_STATUSES,
});

export const getDriverStatuses = (data: TStatus[]) => ({
  data,
  type: UPLOAD_DRIVER_STATUSES,
});

export const updateDriver = (body: TDriver, id: number) => ({
  body,
  id,
  type: UPDATE_DRIVER,
});
// export const updateCar = (data: TCar[] | []) => ({data, type: UPDATE_CARS});
export const deleteDriver = (items: TDriver[], id: number) => ({id, type: DELETE_DRIVER});
export const deleteCar = (id: number) => ({id, type: DELETE_CAR});
export const addDriver = (body: TDriver) => ({body, type: ADD_DRIVER});
export const addCar = (body: TCar) => ({body, type: ADD_CAR});
export const requestDrivers = () => ({type: REQUEST_DRIVERS});
export const requestCars = () => ({type: REQUEST_CARS});
