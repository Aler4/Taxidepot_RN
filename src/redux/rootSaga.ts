import {all} from '@redux-saga/core/effects';
// import { watchAdding, watchDeleting, watchRequests, watchUpdate } from "./depotReducer/sagas";
import {watchCars, watchDrivers} from './sagas';

export default function* rootSaga() {
  yield all([watchCars(), watchDrivers()]);
}
