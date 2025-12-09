import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import type { IUser } from "../../entities/types";

type TUsersState = {
  users: IUser[];
  loading: boolean;
  error: string | undefined;
  selectedUserId: number | null;
};

const initialState: TUsersState = {
  users: [],
  loading: false,
  error: undefined,
  selectedUserId: null,
};

export const getUsers = createAsyncThunk<IUser[], void>(
  "users/getUsers",
  async () => api.getAllUsers(),
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    }, //для просмотра детальной информации
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
    },
  },
  selectors: {
    usersSelector: (state) => state.users,
    usersLoadingSelector: (state) => state.loading,
    selectedUserSelector: (state) => {
      return state.users.find((user) => user.id === state.selectedUserId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        console.log("Загрузка пользователей...");
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Ошибка загрузки пользователей:", action.error.message);
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        console.log(`Пользователи загружены: ${action.payload.length} записей`);
      });
  },
});

export const { selectUser, clearSelectedUser } = usersSlice.actions;
export const { usersSelector, usersLoadingSelector, selectedUserSelector } =
  usersSlice.selectors;
