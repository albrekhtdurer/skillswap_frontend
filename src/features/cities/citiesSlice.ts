import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICity } from "../../entities/types";
import { api } from "../../api";

type TCitiesState = {
  cities: ICity[];
  loading: boolean;
  status: "idle" | "pending" | "rejected" | "fulfilled";
  error: string | undefined;
};

const initialState: TCitiesState = {
  cities: [],
  loading: false,
  status: "idle",
  error: undefined,
};

export const getCities = createAsyncThunk("cities/getCities", api.getCities);

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  selectors: {
    citiesSelector: (state) => state.cities,
    citiesLoadingSelector: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = undefined;
        console.log(state.status);
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.error.message;
        console.log(state.status);
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfilled";
        state.cities = action.payload;
      });
  },
});

export const { citiesSelector, citiesLoadingSelector } = citiesSlice.selectors;
