import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../entities/types";

type TAuthState = {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: TAuthState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectAuthLoading: (state) => state.loading,
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setCurrentUser,
  clearCurrentUser,
} = authSlice.actions;
export const { selectCurrentUser, selectIsAuthenticated, selectAuthLoading } =
  authSlice.selectors;
