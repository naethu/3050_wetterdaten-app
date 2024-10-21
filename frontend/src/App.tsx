import React from "react";
import MapComponent from "./components/MapComponent";
import MeteoDataTable from "./components/MeteoDataTable";
import { Container, Typography } from "@mui/material";
import { MeteoData } from "./types/meteodata";

const App: React.FC = () => {

    const locations: MeteoData[] = [
        { WGS84_lat: 47.3952, WGS84_lng: 8.5261, Standortname: "Zürich Rosengartenstrasse", Datum: 0, Standort: "", RainDur: 0, StrGlo: 0, T: 0, T_max_h1: 0, p: 0 },
        { WGS84_lat: 47.371, WGS84_lng: 8.5235, Standortname: "Zürich Schimmelstrasse", Datum: 0, Standort: "", RainDur: 0, StrGlo: 0, T: 0, T_max_h1: 0, p: 0 },
        { WGS84_lat: 47.3868, WGS84_lng: 8.5398, Standortname: "Zürich Stampfenbachstrasse", Datum: 0, Standort: "", RainDur: 0, StrGlo: 0, T: 0, T_max_h1: 0, p: 0 },
    ];

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
                Leaflet Karte
            </Typography>
            <MapComponent data={locations} />
            <Typography variant="h3" align="center" gutterBottom>
                MUI-Tabelle
            </Typography>
            <MeteoDataTable />
        </Container>
    );
};

export default App;
