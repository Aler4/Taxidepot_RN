import { IDriverState, IState } from "../types";

export const driversSelector = (state: IState) => state.drivers.drivers;
export const driverStatusSelector = (state: IState) => state.drivers.driver_statuses;

export const driversLoadSelector = (state: IState) => state.drivers.driversIsLoad;
