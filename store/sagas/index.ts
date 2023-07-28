import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { rickAndMortySaga } from "./rickAndMortySaga";

export function* rootSaga() {
  yield all([rickAndMortySaga()]);
}
