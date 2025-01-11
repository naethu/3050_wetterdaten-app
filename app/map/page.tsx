"use client";

import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Station {
    Standortname: string;
    WGS84_lat: number;
    WGS84_lng: number;
}

const defaults = {
    zoom: 13,
};

const Map: React.FC = () => {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("/api/py/stations");
                if (!response.ok) {
                    throw new Error("Failed to fetch stations");
                }
                const data = await response.json();
                setStations(data.stations);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };
        fetchStations();
    }, []);

    return (
        <div>
            <MapContainer
                center={[47.384358, 8.524004]}
                zoom={defaults.zoom}
                scrollWheelZoom={false}
                style={{height: "480px", width: "100%"}}  // Set a fixed height for the map
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stations.map((station) => (
                    <Marker
                        key={station.Standortname}
                        position={[station.WGS84_lat, station.WGS84_lng] as LatLngExpression}
                    >
                        <Popup>{station.Standortname}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default function Page() {
    return (
        <div className="flex justify-center w-full px-4">
            <div className="w-full max-w-screen-lg my-5">
                <h2 className="text-center text-xl font-semibold mb-4">Karte mit Standorten der Wetterstationen aus der
                    API</h2>
                <div className="w-full">
                    <Map/>
                </div>
            </div>
        </div>
    );
}
