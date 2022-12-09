import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {reducers} from './rootReducer';

const sagaMidldleware = createSagaMiddleware();
export const store = createStore(reducers, applyMiddleware(sagaMidldleware));
console.log(store.getState());
sagaMidldleware.run(rootSaga);
