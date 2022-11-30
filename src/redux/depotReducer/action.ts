import {TCar, TDriver, TStatus} from './types';

export const UPLOAD_DRIVERS = 'UPLOAD_DRIVERS';
export const UPLOAD_DRIVER_STATUSES = 'UPLOAD_DRIVER_STATUSES';
export const UPLOAD_CARS = 'UPLOAD_CARS';
export const UPLOAD_CAR_STATUSES = 'UPLOAD_CAR_STATUSES';
export const UPDATE_LOADER = 'UPDATE_LOADER';
export const REQUEST_DRIVERS = 'REQUEST_DRIVERS';
export const REQUEST_CARS = 'REQUEST_CARS';
export const ADD_DRIVER = 'ADD_DRIVER';
export const ADD_CAR = 'ADD_CAR';

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

export const addDriver = (body: TDriver) => ({body, type: ADD_DRIVER});
export const addCar = (body: TCar) => ({body, type: ADD_CAR});
export const requestDrivers = () => ({type: REQUEST_DRIVERS});
export const requestCars = () => ({type: REQUEST_CARS});
