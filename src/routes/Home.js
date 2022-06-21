import React, { useState } from "react";

import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import FuzzySearch from "fuzzy-search";

import EmployeeCard from "../components/EmployeeCard";
import mockData from "../mock.json";

export default function Home() {
  const [data, setData] = useState(mockData.results);
  const [searchStr, setSearchStr] = useState("");
  const searchHandle = (e) => {
    console.log(searchStr);
    // if (searchStr.length) {
    //   const searcher = new FuzzySearch(mockData.results, [
    //     "location",
    //     "gender",
    //     "dob.date",
    //   ]);
    //   setData(searcher.search(searchStr));
    // } else {
    //   setData(mockData.results);
    // }
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
            onChange={searchHandle}
          />
        </Grid>
        {data.map((userData) => (
          <Grid item xs={12} md={6} key={userData.login.uuid}>
            <EmployeeCard userData={userData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
