export type TAction = {
  type: string;
  data: TDriver[] | TCar[] | boolean | TStatus;
};
export type TCarReducer = (state: ICarState, action: TAction) => ICarState;
export type TDriverReducer = (
  state: IDriverState,
  action: TAction,
) => IDriverState;

export type TDriver = {
  first_name: string;
  last_name: string;
  id?: number;
  date_birth: number;
  date_created?: number;
  status: {
    title: string;
    code: string;
  };
};

export type TCar = {
  id?: number;
  driver?: string;
  model: string;
  mark: string;
  year: number | string;
  number: string;
  driver_id: number | string;
  status: {
    title: string;
    code: string;
  };
};
export type TStatus = {
  title: string;
  code: string;
};

export type TAddAction = {
  body?: TCar | TDriver;
  id?: number;
  cars?: TCar[];
  drivers?: TDriver[];
  type: string;
};

export interface ICarState {
  carsIsLoad: boolean;
  cars: TCar[] | [];
  car_statuses: TStatus[] | [];
}
export interface IDriverState {
  driversIsLoad: boolean;
  drivers: TDriver[] | [];
  driver_statuses: TStatus[] | [];
}
export interface IState {
  drivers: {
    driversIsLoad: boolean;
    drivers: TDriver[] | [];
    driver_statuses: TStatus[] | [];
  };
  cars: {
    carsIsLoad: boolean;
    cars: TCar[] | [];
    car_statuses: TStatus[] | [];
  };
}
