import React, { useState } from "react";

import { Grid, Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import Fuse from "fuse.js";

import EmployeeCard from "../components/EmployeeCard";
import mockData from "../mock.json";

export default function Home() {
  const [data, setData] = useState(mockData.results);
  const [searchStr, setSearchStr] = useState("");

  const searcher = new Fuse(mockData.results, {
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

  const searchHandle = (e) => {
    const searchStr = e.target.value;
    setSearchStr(searchStr);

    const result = searcher.search(searchStr);
    let newData =
      searchStr.length && result.length
        ? result.map((_) => _.item)
        : mockData.results;
    setData(newData);
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
