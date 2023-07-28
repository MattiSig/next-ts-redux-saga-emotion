import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { api } from "./services/rickNMortyApi";
import { rickAndMortySlice } from "./slices/rickAndMortySlice";
import createSagaMiddleware, { Task } from "redux-saga";
import { rootSaga } from "./sagas";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [rickAndMortySlice.name]: rickAndMortySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([sagaMiddleware, api.middleware]),
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const storeWrapper = createWrapper(makeStore, { debug: true });
