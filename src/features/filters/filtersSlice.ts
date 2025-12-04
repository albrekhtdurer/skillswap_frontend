import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Filters } from "../../entities/types";

type TFiltersState = {
  filters: Filters;
};

const initialState: TFiltersState = {
  filters: { mode: "all", gender: "no_matter", skillIds: [], cityIds: [] },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    reset: () => initialState,
  },
  selectors: {
    isNotEmptySelector: (state) =>
      state.filters.cityIds.length > 0 ||
      state.filters.skillIds.length > 0 ||
      state.filters.mode !== initialState.filters.mode ||
      state.filters.gender !== initialState.filters.gender,
    filtersCounterSelector: (state) =>
      state.filters.cityIds.length +
      state.filters.skillIds.length +
      (state.filters.mode !== initialState.filters.mode ? 1 : 0) +
      (state.filters.gender !== initialState.filters.gender ? 1 : 0),
  },
});

export const { setFilters, reset } = filtersSlice.actions;
export const { isNotEmptySelector, filtersCounterSelector } =
  filtersSlice.selectors;
export default filtersSlice.reducer;
