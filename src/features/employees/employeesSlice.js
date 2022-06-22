import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
};

export const getEmployees = createAsyncThunk(
  "employees/fetchByCount",
  async (count) => {
    const res = await axios.get(`https://randomuser.me/api/?results=${count}`);
    return res.data.results;
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter((_) => _.login.uuid !== action.payload);
    },
    getEmployee: (state, action) => {
      return state.value.find((_) => _.login.uuid === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { add, remove, getEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
