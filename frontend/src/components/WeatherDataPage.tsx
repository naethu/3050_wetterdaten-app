import React, { useState, useEffect } from "react";
import { MeteoData } from "../types/MeteoData.ts";
import WeatherChart from "./WeatherChart";
import "./WeatherDataPage.css";

const WeatherDataPage: React.FC = () => {
  const [data, setData] = useState<MeteoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000");
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        const data: MeteoData[] = await response.json();
        setData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Fehler beim Laden der Daten:", error.message);
          setError(`Fehler beim Laden der Daten: ${error.message}`);
        } else {
          console.error("Unbekannter Fehler:", error);
          setError("Unbekannter Fehler aufgetreten");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    return <div>Lädt...</div>;
  }

  if (error) {
    return <div>Fehler: {error}</div>;
  }

  return (
    <div className="chart-container">
      <div className="chart-container-inner">
        <div>
          <label>
            Monat:
            <select onChange={handleMonthChange}>
              <option value="">Alle Monate</option>
              {[...Array(12)].map((_, index) => (
                <option value={index} key={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Standort:
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Nach Standort filtern"
            />
          </label>
        </div>

        <WeatherChart data={filteredData} />
      </div>
    </div>
  );
};

export default WeatherDataPage;
