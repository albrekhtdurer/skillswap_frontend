import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../entities/types";

type TAuthState = {
  currentUser: IUser | null;
};

const initialState: TAuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;
export const { selectCurrentUser } = authSlice.selectors;
