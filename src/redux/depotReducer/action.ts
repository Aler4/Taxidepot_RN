import {TCar, TDriver} from './types';

export const UPLOAD_DRIVERS = 'UPLOAD_DRIVERS';
export const UPLOAD_CARS = 'UPLOAD_CARS';
export const UPDATE_LOADER = 'UPDATE_LOADER';

export const uploadDrivers = (data: TDriver[]) => ({
  data,
  type: UPLOAD_DRIVERS,
});
export const loadCars = (data: TCar[]) => ({data, type: UPLOAD_CARS});
export const updateLoad = (data: boolean) => ({data, type: UPDATE_LOADER});
