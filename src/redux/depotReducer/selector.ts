import {IState} from '../types';

export const driversSelector = (state: IState) => state.drivers;
export const driverStatusSelector = (state: IState) => state.driver_statuses;

export const loadSelector = (state: IState) => state.isLoad;
export const carStatusSelector = (state: IState) => state.car_statuses;
export const carsSelector = (state: IState) => state.cars;

