import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SkillCategory } from "../../entities/types";
import { api } from "../../api";

type TCategoriesState = {
  categories: SkillCategory[];
  loading: boolean;
  status: "idle" | "pending" | "rejected" | "fulfilled";
  error: string | undefined;
};

const initialState: TCategoriesState = {
  categories: [],
  loading: false,
  status: "idle",
  error: undefined,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  api.getCategories,
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  selectors: {
    categoriesSelector: (state) => state.categories,
    categoriesLoadingSelector: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = undefined;
        console.log(state.status);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.error.message;
        console.log(state.status);
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfilled";
        state.categories = action.payload;
      });
  },
});

export const { categoriesSelector, categoriesLoadingSelector } =
  categoriesSlice.selectors;
