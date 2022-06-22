import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./muiTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Header from "./Header";

export default function Wrapper() {
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
