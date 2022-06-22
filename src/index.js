import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { getEmployees } from "./features/employees/employeesSlice";

import reportWebVitals from "./reportWebVitals";

import "./index.css";
import Wrapper from "./components/layout/Wrapper";
import Home from "./routes/Home";
import New from "./routes/New";
import EmployeeView from "./routes/Employee";

store.dispatch(getEmployees(10));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Home />} />
            <Route path="new" element={<New />} />
            <Route path="employee/:uuid" element={<EmployeeView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
