import React from "react";
import { VegaLite } from "react-vega";
import type { VisualizationSpec } from "react-vega";
import { MeteoData } from "../types/meteodata";

interface WeatherChartProps {
  data: MeteoData[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  // Wenn keine Daten vorhanden sind
  if (!data || data.length === 0) {
    return <div>Keine Wetterdaten verfügbar</div>;
  }

  // Transformiere die Daten
  const transformedData = data.map((entry) => ({
    lat: entry.WGS84_lat,
    lng: entry.WGS84_lng,
    temp: entry.T,
    date: entry.Datum,
    location: entry.Standortname,
  }));

  const spec: VisualizationSpec = {
    description: "Wetterdaten Visualisierung",
    mark: "line",
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        title: "Datum",
        axis: {
          format: "%Y-%m-%d", // Datum als Jahr-Monat-Tag
        },
      },
      y: {
        field: "temp",
        type: "quantitative",
        title: "Temperatur (°C)",
        axis: {
          format: ".1f", // Zeigt Temperatur mit einer Dezimalstelle
        },
      },
      color: {
        field: "location",
        type: "nominal",
        title: "Standort",
      },
      tooltip: [
        { field: "location", type: "nominal", title: "Standort" },
        { field: "temp", type: "quantitative", title: "Temperatur (°C)" },
        { field: "date", type: "temporal", title: "Datum" },
      ],
    },
    data: { values: transformedData },
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <VegaLite spec={spec} />
    </div>
  );
};

export default WeatherChart;
