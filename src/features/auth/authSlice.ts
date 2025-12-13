import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { ILoginCredentials, IApiUser } from "../../entities/types";
import { authApi } from "../../api/auth";

type TAuthState = {
  currentUser: IApiUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

type TLoginResult = {
  user: IApiUser;
  token: string;
};

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
>("auth/fetchUserData", async (_, { rejectWithValue }) => {
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
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentUser: (state, action: PayloadAction<IApiUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка авторизации";
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
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Ошибка при получении данных пользователя";
      });
  },
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectAuthLoading: (state) => state.loading,
    selectAuthError: (state) => state.error,
  },
});

export const { logout, clearError, setCurrentUser } = authSlice.actions;
export const {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} = authSlice.selectors;
