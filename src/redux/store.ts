import {createStore, applyMiddleware} from 'redux';
import {depotReducer} from './depotReducer/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMidldleware = createSagaMiddleware();
export const store = createStore(
  depotReducer,
  applyMiddleware(sagaMidldleware),
);
sagaMidldleware.run(rootSaga);
