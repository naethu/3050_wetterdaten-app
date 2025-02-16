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
import { Style, Icon, Text, Fill, Stroke } from "ol/style";

interface Station {
    Standortname: string;
    WGS84_lat: number;
    WGS84_lng: number;
}

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("/api/py/stations");
                if (!response.ok) {
                    console.error("Netzwerkfehler");
                }
                const data = await response.json();
                setStations(data.stations);
            } catch (error) {
                console.error("Error beim Abrufen der Stationen:", error);
            }
        };
        void fetchStations();
    }, []);

    useEffect(() => {
        if (mapRef.current && stations.length > 0) {
            const avgLat = stations.reduce((sum, station) => sum + station.WGS84_lat, 0) / stations.length;
            const avgLng = stations.reduce((sum, station) => sum + station.WGS84_lng, 0) / stations.length;
            const map = new OlMap({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([avgLng, avgLat]),
                    zoom: 13,
                }),
            });

            const vectorSource = new VectorSource();
            stations.forEach((station) => {
                const coordinates = fromLonLat([station.WGS84_lng, station.WGS84_lat]);

                const marker = new Feature({
                    geometry: new Point(coordinates),
                    name: station.Standortname,
                });

                marker.setStyle(
                    new Style({
                        image: new Icon({
                            src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                            scale: 1,
                        }),
                        text: new Text({
                            text: station.Standortname,
                            scale: 1.5,
                            offsetY: -30,
                            fill: new Fill({
                                color: "#000",
                            }),
                            stroke: new Stroke({
                                color: "#fff",
                                width: 3,
                            }),
                        }),
                    })
                );

                vectorSource.addFeature(marker);
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });
            map.addLayer(vectorLayer);
            map.render();
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
