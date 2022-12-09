import {combineReducers} from 'redux';
import {carsReducer, driversReducer} from './reducers';

export const reducers = combineReducers({
  cars: carsReducer,
  drivers: driversReducer,
});
