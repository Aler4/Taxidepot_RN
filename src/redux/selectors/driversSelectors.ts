import { IState } from "../types";

export const driversSelector = (state: IState) => state.drivers.drivers;
export const driverStatusSelector = (state: IState) =>
  state.drivers.driver_statuses.map(el => ({
    value: el.title,
    code: el.code,
  }));

export const driversLoadSelector = (state: IState) =>
  state.drivers.driversIsLoad;
