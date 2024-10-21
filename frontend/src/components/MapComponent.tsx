import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MeteoData } from "../types/meteodata";

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

interface MapComponentProps {
    data: MeteoData[];
}

// Center of the map
const MapComponent: React.FC<MapComponentProps> = ({ data }) => {

    const position: [number, number] = [47.384358, 8.524004];

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((location) => (
                <Marker
                    key={`${location.WGS84_lat}-${location.WGS84_lng}-${location.Datum}`}
                    position={[location.WGS84_lat, location.WGS84_lng]}
                    icon={markerIcon}
                >
                    <Popup>
                        <span>{location.Standortname}</span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
