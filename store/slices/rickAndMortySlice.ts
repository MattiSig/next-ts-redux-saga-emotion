import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  endpoints: {
    getLocations: {
      data: [],
      isLoading: false,
      error: null,
    },
    getLocation: {
      data: {},
      isLoading: false,
      error: null,
    },
    getEpisodes: {
      data: [],
      isLoading: false,
      error: null,
    },
    getEpisode: {
      data: {},
      isLoading: false,
      error: null,
    },
  },
};

export const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState,
  reducers: {
    getLocationsRequest: (state) => {
      state.endpoints.getLocations.isLoading = true;
    },
    getLocationsSuccess: (state, action) => {
      state.endpoints.getLocations.data = action.payload;
      state.endpoints.getLocations.isLoading = false;
    },
    getLocationsFailure: (state, action) => {
      state.endpoints.getLocations.error = action.payload;
      state.endpoints.getLocations.isLoading = false;
    },
    getLocationRequest: (state) => {
      state.endpoints.getLocation.isLoading = true;
    },
    getLocationSuccess: (state, action) => {
      state.endpoints.getLocation.data = action.payload;
      state.endpoints.getLocation.isLoading = false;
    },
    getLocationFailure: (state, action) => {
      state.endpoints.getLocation.error = action.payload;
      state.endpoints.getLocation.isLoading = false;
    },
    getEpisodesRequest: (state) => {
      state.endpoints.getEpisodes.isLoading = true;
    },
    getEpisodesSuccess: (state, action) => {
      state.endpoints.getEpisodes.data = action.payload;
      state.endpoints.getEpisodes.isLoading = false;
    },
    getEpisodesFailure: (state, action) => {
      state.endpoints.getEpisodes.error = action.payload;
      state.endpoints.getEpisodes.isLoading = false;
    },
    getEpisodeRequest: (state) => {
      state.endpoints.getEpisode.isLoading = true;
    },
    getEpisodeSuccess: (state, action) => {
      state.endpoints.getEpisode.data = action.payload;
      state.endpoints.getEpisode.isLoading = false;
    },
    getEpisodeFailure: (state, action) => {
      state.endpoints.getEpisode.error = action.payload;
      state.endpoints.getEpisode.isLoading = false;
    },
  },
  extraReducers: {
    // rehydrating redux store from ssr
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.rickAndMorty,
      };
    },
  },
});

export const {
  getLocationsRequest,
  getLocationsSuccess,
  getLocationsFailure,
  getLocationRequest,
  getLocationSuccess,
  getLocationFailure,
  getEpisodesRequest,
  getEpisodesSuccess,
  getEpisodesFailure,
  getEpisodeRequest,
  getEpisodeSuccess,
  getEpisodeFailure,
} = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
