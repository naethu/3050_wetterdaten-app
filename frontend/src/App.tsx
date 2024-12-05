import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import MapPage from "./components/MapPage";
import WeatherChart from "./components/WeatherChart";
import { Container } from "@mui/material";
import { MeteoData } from "./types/meteodata";
import MeteoDataTable from "./components/MeteoDataTable.tsx";

const App: React.FC = () => {
  const locations: MeteoData[] = [
    {
      WGS84_lat: 47.3952,
      WGS84_lng: 8.5261,
      Standortname: "Zürich Rosengartenstrasse",
      Datum: 0,
      Standort: "",
      RainDur: 0,
      StrGlo: 0,
      T: 0,
      T_max_h1: 0,
      p: 0,
    },
    {
      WGS84_lat: 47.371,
      WGS84_lng: 8.5235,
      Standortname: "Zürich Schimmelstrasse",
      Datum: 0,
      Standort: "",
      RainDur: 0,
      StrGlo: 0,
      T: 0,
      T_max_h1: 0,
      p: 0,
    },
    {
      WGS84_lat: 47.3868,
      WGS84_lng: 8.5398,
      Standortname: "Zürich Stampfenbachstrasse",
      Datum: 0,
      Standort: "",
      RainDur: 0,
      StrGlo: 0,
      T: 0,
      T_max_h1: 0,
      p: 0,
    },
  ];

  return (
    <Router>
      <AppBar />
      <Container maxWidth="lg">
        <Routes>
          {/* Setze MapPage als Startseite */}
          <Route path="/" element={<MapPage data={locations} />} />
          <Route path="/map" element={<MapPage data={locations} />} />
          <Route path="/table" element={<MeteoDataTable />} />
          <Route path="/weather" element={<WeatherChart data={locations} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
