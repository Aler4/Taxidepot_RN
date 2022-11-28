import {IState} from './types';

export const driversSelector = (state: IState) => state.drivers;
export const carsSelector = (state: IState) => state.cars;
export const loadSelector = (state: IState) => state.isLoad;
export const driverStatusSelector = (state: IState) => state.driver_statuses;
export const carStatusSelector = (state: IState) => state.car_statuses;
