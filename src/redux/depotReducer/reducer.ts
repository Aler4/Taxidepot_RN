import {TAction, IState, TDriver, TCar} from './types';
import {UPDATE_LOADER, UPLOAD_CARS, UPLOAD_DRIVERS} from './action';

const initialState: IState = {
  isLoad: false,
  cars: [],
  drivers: [],
};

export const depotReducer = (state = initialState, action: TAction): IState => {
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
    case UPLOAD_DRIVERS:
      console.log('as action' + action.data);
      return {
        ...state,
        drivers: action.data as TDriver[],
      };
    default:
      return state;
  }
};
