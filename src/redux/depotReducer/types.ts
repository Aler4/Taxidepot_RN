export type TAction = {
  type: string;
  data: TDriver[] | TCar[] | boolean | TStatus;
};
export type TReducer = (state: IState, action: TAction) => IState;

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
  year: number;
  number: string;
  driver_id: number;
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
export interface IState {
  isLoad: boolean;
  cars: TCar[] | [];
  drivers: TDriver[] | [];
  driver_statuses: TStatus[] | [];
  car_statuses: TStatus[] | [];
}
