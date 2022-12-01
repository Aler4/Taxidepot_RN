import {all} from '@redux-saga/core/effects';
import { watchAdding, watchDeleting, watchRequests, watchUpdate } from "./depotReducer/sagas";

export default function* rootSaga() {
  yield all([watchRequests(), watchAdding(), watchDeleting(), watchUpdate()]);
};
