export type TAction = {
  type: string;
  data: TDriver[] | TCar[] | boolean;
};

export type TDriver = {
  first_name: string;
  last_name: string;
  id: number;
  date_birth: number;
  status: {
    title: string;
    code: string;
  };
};

export type TCar = {
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

export interface IState {
  isLoad: boolean;
  cars: TCar[] | [];
  drivers: TDriver[] | [];
};
