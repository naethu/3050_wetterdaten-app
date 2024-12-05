import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MapIcon from "@mui/icons-material/Map";
import "./AppBar.css"; // Importiere die CSS-Datei

const pages = ["Map", "Table", "Weather"];

function CustomAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MapIcon className="appbar-map-icon" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="appbar-title"
          >
            Weather App
          </Typography>

          <Box className="appbar-box">
            {pages.map((page) => (
              <Button
                key={page}
                className="appbar-button"
                href={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;
