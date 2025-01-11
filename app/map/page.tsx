"use client";

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

interface Station {
    Standortname: string;
    WGS84_lat: number;
    WGS84_lng: number;
}

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null); // Reference to the map container
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

    useEffect(() => {
        // Ensure mapRef.current is not null before proceeding
        if (mapRef.current) {
            // Create the map
            const map = new OlMap({
                target: mapRef.current!, // Non-null assertion to ensure mapRef.current is not null
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([8.524004, 47.384358]), // Longitude, Latitude
                    zoom: 13,
                }),
            });

            // Add station markers
            const vectorSource = new VectorSource();
            stations.forEach((station) => {
                const marker = new Feature({
                    geometry: new Point(fromLonLat([station.WGS84_lng, station.WGS84_lat])),
                    name: station.Standortname,
                });
                marker.setStyle(
                    new Style({
                        image: new Icon({
                            src: "https://openlayers.org/en/v6.5.0/examples/data/icon.png", // Marker icon
                            scale: 0.05,
                        }),
                    })
                );
                vectorSource.addFeature(marker);
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });

            map.addLayer(vectorLayer);

            // Clean up map on unmount
            return () => {
                // @ts-ignore
                map.setTarget(null);
            };
        }
    }, [stations]);

    return (
        <div
            ref={mapRef}
            style={{ height: "480px", width: "100%" }}
        />
    );
};

export default function Page() {
    return (
        <div className="flex justify-center w-full px-4">
            <div className="w-full max-w-screen-lg my-5">
                <h2 className="text-center text-xl font-semibold mb-4">
                    Karte mit Standorten der Wetterstationen aus der API
                </h2>
                <div className="w-full">
                    <Map />
                </div>
            </div>
        </div>
    );
}
