import {TDriver, TStatus, IDriverState, TDriverReducer} from '../types';
import {
  UPDATE_DRIVERS_LOADER,
  UPLOAD_DRIVER_STATUSES,
  UPLOAD_DRIVERS,
} from '../actions';

const initialState: IDriverState = {
  driversIsLoad: false,
  drivers: [],
  driver_statuses: [],
};

export const driversReducer: TDriverReducer = (
  state = initialState,
  action,
): IDriverState => {
  switch (action.type) {
    case UPDATE_DRIVERS_LOADER:
      return {
        ...state,
        driversIsLoad: action.data as boolean,
      };
    case UPLOAD_DRIVERS:
      return {
        ...state,
        drivers: action.data as TDriver[],
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
