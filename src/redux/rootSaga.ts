import {all} from '@redux-saga/core/effects';
import { watchaAdding, watchRequests } from "./depotReducer/sagas";

export default function* rootSaga() {
  yield all([watchRequests(), watchaAdding()]);
};
