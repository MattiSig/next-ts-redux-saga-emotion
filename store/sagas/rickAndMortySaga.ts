import { call, put, takeLatest } from "redux-saga/effects";
import {
  getEpisodeRequest,
  getEpisodeFailure,
  getEpisodeSuccess,
  getEpisodesRequest,
  getEpisodesFailure,
  getEpisodesSuccess,
} from "../slices/rickAndMortySlice";

export function* getEpisodeSaga(action) {
  try {
    const response = yield call(
      fetch,
      `https://rickandmortyapi.com/api/episode/${action.payload}`
    );
    const data = yield response.json();

    yield put(getEpisodeSuccess(data));
  } catch {
    yield put(getEpisodeFailure("error"));
  }
}

export function* getEpisodesSaga() {
  try {
    const response = yield call(
      fetch,
      `https://rickandmortyapi.com/api/episode`
    );
    const data = yield response.json();

    yield put(getEpisodesSuccess(data));
  } catch {
    yield put(getEpisodesFailure("error"));
  }
}

export function* rickAndMortySaga() {
  yield takeLatest("rickAndMorty/getEpisodeRequest", getEpisodeSaga);
  yield takeLatest("rickAndMorty/getEpisodesRequest", getEpisodesSaga);
}
