import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./muiTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Header from "./Header";

export default function Wrapper() {
  const [data, setData] = useState([]);

  useEffect(() => {
    //   const fetchData = async () => {
    //     const response = await fetch(`https://randomuser.me/api/?results=10`);
    //     const newData = await response.json();
    //     setData(newData.results);
    //   };
    //   fetchData();
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth="md"
        disableGutters={useMediaQuery(muiTheme.breakpoints.only("xs"))}
      >
        <Header />
        <Outlet></Outlet>
      </Container>
    </ThemeProvider>
  );
}
