import {IDriverState} from '../types';

export const driversSelector = (state: IDriverState) => state.drivers;
export const driverStatusSelector = (state: IDriverState) => state.driver_statuses;

export const driversLoadSelector = (state: IDriverState) => state.driversIsLoad;
