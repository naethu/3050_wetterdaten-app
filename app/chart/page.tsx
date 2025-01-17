"use client";

import React, {useEffect, useState} from "react";
import {MeteoData} from "../types/MeteoData";
import WeatherChart from "../components/chart";
import CircularProgress from "@mui/material/CircularProgress";

const WeatherDataPage: React.FC = () => {
    const [data, setData] = useState<MeteoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/py/data");
                if (!response.ok) {
                    console.error("Netzwerkfehler");
                }
                const data: MeteoData[] = await response.json();

                const updatedData = data.map((entry) => ({
                    ...entry,
                    Datum: new Date(entry.Datum),
                }));
                setData(updatedData);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Fehler beim Laden der Daten:", error.message);
                    setError("Fehler beim Laden der Daten: ${error.message}");
                } else {
                    console.error("Unbekannter Fehler:", error);
                    setError("Unbekannter Fehler aufgetreten");
                }
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(e.target.value));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const filterData = (data: MeteoData[]) => {
        let filteredData = data;

        if (month !== null) {
            filteredData = filteredData.filter(
                (entry) => new Date(entry.Datum).getMonth() === month,
            );
        }

        if (location) {
            filteredData = filteredData.filter((entry) =>
                entry.Standortname.toLowerCase().includes(location.toLowerCase()),
            );
        }

        return filteredData;
    };

    const filteredData = filterData(data);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <div>Fehler: {error}</div>;
    }

    return (
        <div className="flex justify-center w-full px-4">
            <div className="w-full max-w-screen-lg my-5">
                <h2 className="text-center text-xl font-semibold mb-4">
                    zeitliche Analyse der Wetterdaten
                </h2>
                <div className="mb-4">
                    <label className="text-sm font-medium">Monat:</label>
                    <select
                        onChange={handleMonthChange}
                        className="ml-2 text-sm"
                    >
                        <option value="">Alle Monate</option>
                        {[...Array(12)].map((_, index) => (
                            <option value={index} key={index}>
                                {new Date(0, index).toLocaleString("default", {
                                    month: "long",
                                })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium">Standort:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Nach Standort filtern"
                        className="ml-2 text-sm p-1 border rounded"
                    />
                </div>
            </div>
            <div className="w-full">
                <WeatherChart data={filteredData}/>
            </div>
        </div>
    );
};

export default WeatherDataPage;
