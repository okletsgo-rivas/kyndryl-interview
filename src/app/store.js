import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "../features/employees/employeesSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
