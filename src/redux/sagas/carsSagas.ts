import { TAddAction, TCar, TDriver, TStatus } from "../types";
import {
  ADD_CAR,
  DELETE_CAR,
  REQUEST_CARS,
  getCarStatuses,
  loadCars,
  updateCarsLoad,
} from '../actions';
import {addToApi, deleteFromApi, getApi} from '../../services/api';
import {put, call, takeLatest} from '@redux-saga/core/effects';
import {mergeProp} from '../../helpers/mergeProp';

export function* watchCars() {
  yield takeLatest(REQUEST_CARS, getCars);
  yield takeLatest(ADD_CAR, addCar);
  yield takeLatest(DELETE_CAR, deleteCar);
}

function* getCars() {
  try {
    yield put(updateCarsLoad(true));
    const cars: TCar[] = yield call(() =>
      getApi('car')
        .then(response => response.json())
        .then(response => response.data),
    );
    const statuses: TStatus[] = yield call(() =>
      getApi('car-status')
    );
    const drivers: TDriver[] = yield call(() =>
      getApi('driver')
    );

    yield put(getCarStatuses(statuses));
    yield put(loadCars(mergeProp(cars, drivers)));
    yield put(updateCarsLoad(false));
  } catch (e) {
    console.log(e);
  }
}
function* addCar(arg: TAddAction) {
  try {
    yield call(() => addToApi('car', 'post', arg.body));
    yield getCars();
  } catch (e) {
    console.log(e);
  }
}

function* deleteCar(arg: TAddAction) {
  try {
    yield call(() => deleteFromApi('car', arg.id));
    yield getCars();

  } catch (e) {
    console.log(e);
  }
}
