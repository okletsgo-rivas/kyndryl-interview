import React, { useState } from "react";

import { Grid, Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import Fuse from "fuse.js";

import EmployeeCard from "../components/EmployeeCard";

import { useSelector } from "react-redux";

export default function Home() {
  const employees = useSelector((state) => state.employees.value);
  const [searchStr, setSearchStr] = useState("");

  const searcher = new Fuse(employees, {
    includeScore: true,
    threshold: 0.5,
    keys: [
      "location.city",
      "location.country",
      "location.postcode",
      "location.state",
      "location.street.name",
      "gender",
      "dob.date",
    ],
  });

  const filterEmployees = () => {
    const result = searcher.search(searchStr);
    return searchStr.length && result.length
      ? result.map((_) => _.item)
      : employees;
  };

  return (
    <Box sx={{ padding: "1em", backgroundColor: "#fff" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="filled"
            label="Search Contacts"
            helperText="Search by place, gender, year of birth, and month of birth"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
        </Grid>
        {filterEmployees().map((userData) => (
          <Grid item xs={12} md={6} key={userData.login.uuid}>
            <EmployeeCard userData={userData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
