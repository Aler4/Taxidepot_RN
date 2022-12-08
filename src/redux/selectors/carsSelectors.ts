import {ICarState} from '../types';

export const carsSelector = (state: ICarState) => state.cars;
export const carLoadSelector = (state: ICarState) => state.carsIsLoad;
export const carStatusSelector = (state: ICarState) => state.car_statuses;
