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
import Overlay from "ol/Overlay";

interface Station {
    Standortname: string;
    WGS84_lat: number;
    WGS84_lng: number;
}

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null); // Reference to the map container
    const [stations, setStations] = useState<Station[]>([]);

    // Fetch stations data from the API
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

    // Create the OpenLayers map when stations data is available
    useEffect(() => {
        if (mapRef.current && stations.length > 0) {
            // Calculate the center of the map (average of latitudes and longitudes)
            const avgLat = stations.reduce((sum, station) => sum + station.WGS84_lat, 0) / stations.length;
            const avgLng = stations.reduce((sum, station) => sum + station.WGS84_lng, 0) / stations.length;

            // Create the map
            const map = new OlMap({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(), // Use OpenStreetMap tiles
                    }),
                ],
                view: new View({
                    center: fromLonLat([avgLng, avgLat]), // Center the map on the average coordinates
                    zoom: 13, // Set zoom level
                }),
            });

            // Create a vector source for the markers
            const vectorSource = new VectorSource();

            // Create a popup overlay
            const popupElement = document.createElement("div");
            popupElement.style.background = "white";
            popupElement.style.padding = "5px";
            popupElement.style.borderRadius = "5px";
            popupElement.style.position = "absolute";
            popupElement.style.pointerEvents = "none";
            popupElement.style.display = "none"; // Initially hide the popup

            const popup = new Overlay({
                element: popupElement,
                positioning: "bottom-center",
                offset: [0, -20], // Adjust the popup's position
            });

            map.addOverlay(popup);

            // Add station markers
            stations.forEach((station) => {
                const coordinates = fromLonLat([station.WGS84_lng, station.WGS84_lat]);

                const marker = new Feature({
                    geometry: new Point(coordinates), // Coordinates are in [lng, lat]
                    name: station.Standortname,
                });

                marker.setStyle(
                    new Style({
                        image: new Icon({
                            src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Google Maps pin
                            scale: 1, // Increase scale to make it more visible
                        }),
                    })
                );

                vectorSource.addFeature(marker); // Add the marker to the vector source

                // Add a click handler for the popup
                // @ts-ignore
                marker.on("click", (event) => {
                    // @ts-ignore
                    const clickedCoordinate = event.coordinate;
                    popup.setPosition(clickedCoordinate); // Position the popup at the marker's location

                    // Set the content of the popup and show it
                    popupElement.innerHTML = `<strong>${station.Standortname}</strong>`;
                    popupElement.style.display = "block"; // Make the popup visible
                });
            });

            // Add vector layer to the map
            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });
            map.addLayer(vectorLayer);

            // Make sure the map is refreshed
            map.render();

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
            style={{ height: "480px", width: "100%" }} // Adjust map size
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
                    <Map /> {/* Render the Map component */}
                </div>
            </div>
        </div>
    );
}
