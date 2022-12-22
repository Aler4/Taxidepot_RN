import {TDriver, TStatus} from '../types';

export const UPLOAD_DRIVERS = 'UPLOAD_DRIVERS';
export const UPLOAD_DRIVER_STATUSES = 'UPLOAD_DRIVER_STATUSES';
export const UPDATE_DRIVERS_LOADER = 'UPDATE_DRIVERS_LOADER';
export const REQUEST_DRIVERS = 'REQUEST_DRIVERS';
export const ADD_DRIVER = 'ADD_DRIVER';
export const REQUEST_DRIVER_STATUSES = 'REQUEST_DRIVER_STATUSES';
export const DELETE_DRIVER = 'DELETE_DRIVER';
export const UPDATE_DRIVER = 'UPDATE_DRIVER';

export const uploadDrivers = (data: TDriver[]) => ({
  data,
  type: UPLOAD_DRIVERS,
});

export const updateDriversLoad = (data: boolean) => ({
  data,
  type: UPDATE_DRIVERS_LOADER,
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
export const deleteDriver = (id: number) => ({id, type: DELETE_DRIVER});
export const addDriver = (body: TDriver) => ({body, type: ADD_DRIVER});
export const requestDrivers = () => ({type: REQUEST_DRIVERS});
export const requestDriverStatuses = () => ({type: REQUEST_DRIVERS});
