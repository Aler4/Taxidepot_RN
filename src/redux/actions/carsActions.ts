import {TCar, TStatus} from '../types';

export const UPLOAD_CARS = 'UPLOAD_CARS';
export const UPLOAD_CAR_STATUSES = 'UPLOAD_CAR_STATUSES';
export const UPDATE_CARS_LOADER = 'UPDATE_CARS_LOADER';
export const REQUEST_CARS = 'REQUEST_CARS';
export const ADD_CAR = 'ADD_CAR';
export const DELETE_CAR = 'DELETE_CAR';
export const UPDATE_CARS = 'UPDATE_CARS';

export const loadCars = (data: TCar[]) => ({data, type: UPLOAD_CARS});
export const updateCarsLoad = (data: boolean) => ({
  data,
  type: UPDATE_CARS_LOADER,
});
export const getCarStatuses = (data: TStatus[]) => ({
  data,
  type: UPLOAD_CAR_STATUSES,
});

// export const updateCar = (data: TCar[] | []) => ({data, type: UPDATE_CARS});

export const deleteCar = (id: number) => ({id, type: DELETE_CAR});
export const addCar = (body: TCar) => ({body, type: ADD_CAR});
export const requestCars = () => ({type: REQUEST_CARS});
