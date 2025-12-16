import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TRegForm = {
  email: string | null;
  password: string | null;
  name: string | null;
  birthDate: string | null;
  gender: "male" | "female" | "not specified" | null;
  location: string | null;
  categoryWantToLearn: number[] | null;
  subcategoryWantToLearn: number[] | null;
  skillCanTeach: {
    name: string | null;
    category: number | null;
    subcategory: number | null;
    description: string | null;
  };
};

type TFormsSliceState = {
  reg: TRegForm;
};

const initialState: TFormsSliceState = {
  reg: {
    email: null,
    password: null,
    name: null,
    birthDate: null,
    gender: null,
    location: null,
    categoryWantToLearn: null,
    subcategoryWantToLearn: null,
    skillCanTeach: {
      name: null,
      category: null,
      subcategory: null,
      description: null,
    },
  },
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setRegFormState: (state, action: PayloadAction<Partial<TRegForm>>) => {
      state.reg = { ...state.reg, ...action.payload };
    },
    reset: (state) => {
      state.reg = JSON.parse(JSON.stringify(initialState.reg));
    },
  },
});

export const { setRegFormState, reset } = formsSlice.actions;
