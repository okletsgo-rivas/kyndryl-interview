import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://randomuser.me/api/",
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (count) => `?results=${count}`,
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;
