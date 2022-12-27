import {IState} from '../types';

export const carsSelector = (state: IState) => state.cars.cars;
export const carLoadSelector = (state: IState) => state.cars.carsIsLoad;
export const carStatusSelector = (state: IState) =>
  state.cars.car_statuses.map(el => ({
    value: el.title,
    code: el.code,
  }));
