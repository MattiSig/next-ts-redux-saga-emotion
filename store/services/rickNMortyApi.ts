import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: (page) => {
        if (!page) return "/character";
        return `/character/?page=${page}`;
      },
    }),
    getCharacter: builder.query({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = api;
export const { reducerPath } = api;
export const {
  endpoints: { getCharacters, getCharacter },
} = api;
