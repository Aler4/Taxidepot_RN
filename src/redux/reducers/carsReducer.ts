import { TCar, TStatus, ICarState, TCarReducer } from "../types";
import {
  UPDATE_CARS,
  UPDATE_CARS_LOADER,
  UPLOAD_CAR_STATUSES,
  UPLOAD_CARS,
} from '../actions';

const initialState: ICarState = {
  carsIsLoad: false,
  cars: [],
  car_statuses: [],
};

export const carsReducer: TCarReducer = (
  state = initialState,
  action,
): ICarState => {
  switch (action.type) {
    case UPDATE_CARS_LOADER:
      return {
        ...state,
        carsIsLoad: action.data as boolean,
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
    case UPLOAD_CAR_STATUSES:
      return {
        ...state,
        car_statuses: action.data as unknown as TStatus[],
      };
    default:
      return state;
  }
};
