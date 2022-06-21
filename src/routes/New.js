import { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Male,
  Female,
  HomeOutlined,
  PhoneIphoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";

export default function New() {
  const [gender, setGender] = useState("");

  return (
    <Box sx={{ padding: "1em", backgroundColor: "#fff" }}>
      <h1>New Contact</h1>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{ p: 5, display: "inline-block", border: "1px dashed grey" }}
          >
            <Button>Photo</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="First Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Last Name" />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Street Number" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField fullWidth label="Street Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="City" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="State" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Zip" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Country" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Time Zone" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone Number" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" sx={{ mr: 2 }}>
            Create
          </Button>
          <Button variant="text">Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
