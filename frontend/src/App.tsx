import React from "react";
import MapComponent from "./components/MapComponent";
import MeteoDataTable from "./components/MeteoDataTable";

const App: React.FC = () => {
    return (
        <div>
            <h1>Meine Leaflet Karte</h1>
            <MapComponent />
            <h1>Meine MUI-Tabelle</h1>
            <MeteoDataTable />
        </div>
    );
};

export default App;
