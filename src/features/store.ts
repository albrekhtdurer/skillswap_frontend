import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { citiesSlice } from "./cities/citiesSlice";

const rootReducer = combineSlices(citiesSlice);

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
