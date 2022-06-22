import { useState, createRef } from "react";

import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";

import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useNavigate } from "react-router-dom";

export default function New() {
  const [profileImage, setProfileImage] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [addressLabel, setAddressLabel] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [mapResults, setMapResults] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const fileInput = createRef(null);
  const reader = new FileReader();
  reader.addEventListener("load", readerHandler);

  const navigate = useNavigate();
  const mapProvider = new OpenStreetMapProvider();

  async function addressHandler(e) {
    setAddressLabel(e.target.value);
    const results = await mapProvider.search({ query: e.target.value });
    setMapResults(results);
  }

  function selectAddress(address) {
    setAddressValue(address);
    setAddressLabel(address.label);
    cancelAddressSearch();
  }

  function fileHandler(e) {
    const file = e.target.files[0];
    reader.readAsDataURL(file);
  }

  function readerHandler(e) {
    setProfileImage(e.target.result);
  }

  function cancelAddressSearch() {
    setTimeout(() => setMapResults([]), 500);
  }

  function validate() {
    return (
      profileImage && fname && lname && gender && addressValue && phone && email
    );
  }

  function submitHandler() {
    const [streetNum, streetName, city, state, postcode, country] =
      addressLabel.split(", ") || [];
    const payload = {
      name: { first: fname, last: lname },
      gender: gender,
      location: {
        street: {
          number: streetNum,
          name: streetName,
        },
        city,
        state,
        country,
        postcode,
        coordinates: {
          latitude: addressValue.x,
          longitude: addressValue.y,
        },
      },
      picture: profileImage,
      phone,
      email,
    };
    console.log(payload);
  }

  return (
    <Box sx={{ padding: "1em", backgroundColor: "#fff" }}>
      <h1>New Contact</h1>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={4}>
          {profileImage ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={profileImage}
                alt="profile portrait"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px dashed grey",
                display: "flex",
                margin: "0 auto",
                backgroundColor: "#eee",
              }}
            >
              <input
                ref={fileInput}
                type="file"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={fileHandler}
              />
              <Button
                sx={{ width: "100%" }}
                onClick={() => fileInput.current.click()}
              >
                Upload Photo
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <br />
          <br />
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <TextField
            fullWidth
            label="Address"
            value={addressLabel}
            onChange={addressHandler}
            onBlur={cancelAddressSearch}
          />
          {mapResults.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                zIndex: 10,
                left: 16,
                right: 0,
                background: "#eee",
              }}
            >
              <List>
                {mapResults.length > 0 &&
                  mapResults.slice(0, 4).map((itm, i) => (
                    <ListItem disablePadding key={"address" + i}>
                      <ListItemButton onClick={() => selectAddress(itm)}>
                        {itm.label}
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Phone Number"
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={submitHandler}
            disabled={!validate()}
          >
            Create
          </Button>
          <Button variant="text" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
