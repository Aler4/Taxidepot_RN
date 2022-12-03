import {IState, TDriver, TCar, TStatus, TReducer} from './types';
import {
  UPDATE_CARS,
  UPDATE_LOADER,
  UPLOAD_CAR_STATUSES,
  UPLOAD_CARS,
  UPLOAD_DRIVER_STATUSES,
  UPLOAD_DRIVERS,
} from './action';

const initialState: IState = {
  isLoad: false,
  cars: [],
  drivers: [],
  driver_statuses: [],
  car_statuses: [],
};

export const depotReducer: TReducer = (
  state = initialState,
  action,
): IState => {
  switch (action.type) {
    case UPDATE_LOADER:
      return {
        ...state,
        isLoad: action.data as boolean,
      };
    case UPLOAD_CARS:
      return {
        ...state,
        cars: action.data as TCar[],
      };
    case UPDATE_CARS:
      return {
        ...state,
        cars: action.data as TCar[],
      };
    case UPLOAD_DRIVERS:
      return {
        ...state,
        drivers: action.data as TDriver[],
      };
    case UPLOAD_CAR_STATUSES:
      return {
        ...state,
        car_statuses: action.data as unknown as TStatus[],
      };
    case UPLOAD_DRIVER_STATUSES:
      return {
        ...state,
        driver_statuses: action.data as unknown as TStatus[],
      };
    default:
      return state;
  }
};
