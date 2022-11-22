import {createStore, applyMiddleware} from 'redux';
import {depotReducer} from './depotReducer/reducer';
import thunk from 'redux-thunk';

export const store = createStore(depotReducer, applyMiddleware(thunk));
