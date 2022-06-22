import { useNavigate } from "react-router-dom";
import { Groups } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Groups fontSize="large" sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          CONTACTS
        </Typography>
        <Button color="inherit" onClick={() => navigate("/new")}>
          + Create Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}
