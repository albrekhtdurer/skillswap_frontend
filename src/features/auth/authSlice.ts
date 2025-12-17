import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import type {
  ILoginCredentials,
  IApiUser,
  IRegData,
} from "../../entities/types";
import { authApi } from "../../api/auth";
import { getUserFavourites } from "../../shared/lib/favourites";

type TAuthState = {
  currentUser: IApiUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginError: string | null;
  registerError: string | null;
  authChecked: boolean;
  favourites: number[];
};

const initialState: TAuthState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  loginError: null,
  registerError: null,
  authChecked: false,
  favourites: [],
};

type TLoginResult = {
  user: IApiUser;
  token: string;
};

export const setAuthChecked = createAction<boolean>("auth/setAuthChecked");

export const loginUser = createAsyncThunk<
  TLoginResult,
  ILoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials: ILoginCredentials, { rejectWithValue }) => {
  try {
    const result = await authApi.login(credentials);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Неизвестная ошибка авторизации");
  }
});

export const fetchUserData = createAsyncThunk<
  TLoginResult,
  void,
  { rejectValue: string }
>("auth/fetchUserData", async (_, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return rejectWithValue("Токен не найден");
    }

    const userData = await authApi.getUser(token);
    return {
      user: userData,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка при получении данных пользователя");
  } finally {
    dispatch(setAuthChecked(true));
  }
});

export const registerUser = createAsyncThunk<
  TLoginResult,
  IRegData,
  { rejectValue: string }
>("auth/register", async (data: IRegData, { rejectWithValue }) => {
  try {
    const result = await authApi.registerUser(
      data.form,
      data.avatar,
      data.images,
    );
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка при регистрации пользователя");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loginError = null;
      state.favourites = [];
    },
    clearError: (state) => {
      state.error = null;
      state.loginError = null;
      state.registerError = null;
    },
    setCurrentUser: (state, action: PayloadAction<IApiUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    setCurrentUserFavourites: (state, action: PayloadAction<number[]>) => {
      state.favourites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAuthChecked, (state, action) => {
        state.authChecked = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.loginError = null;
        state.favourites = getUserFavourites(action.payload.user.id.toString());
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload || "Ошибка авторизации";
        state.isAuthenticated = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.favourites = getUserFavourites(action.payload.user.id.toString());
        state.authChecked = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Ошибка при получении данных пользователя";
        state.authChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.registerError = null;
        state.authChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload || "Ошибка регистрации";
        state.isAuthenticated = false;
      });
  },
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectAuthLoading: (state) => state.loading,
    selectAuthError: (state) => state.error,
    selectAuthChecked: (state) => state.authChecked,
    selectCurrentUserFavourites: (state) => state.favourites,
    selectLoginError: (state) => state.loginError,
    selectRegisterError: (state) => state.registerError,
  },
});

export const { logout, clearError, setCurrentUser, setCurrentUserFavourites } =
  authSlice.actions;
export const {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthChecked,
  selectCurrentUserFavourites,
  selectLoginError,
  selectRegisterError,
} = authSlice.selectors;
