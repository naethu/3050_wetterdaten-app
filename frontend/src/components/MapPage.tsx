import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MeteoData } from "../types/MeteoData.ts";
import "./MapPage.css";

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

const MapPage: React.FC<MapComponentProps> = ({ data }) => {
  const position: [number, number] = [47.384358, 8.524004];

  return (
    <div className="map-container">
      <div className="map-container-inner">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
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
      </div>
    </div>
  );
};

export default MapPage;
