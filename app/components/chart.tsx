"use client";

import React from "react";
import {VegaLite, VisualizationSpec} from "react-vega";
import {MeteoData} from "../types/MeteoData";

interface WeatherChartProps {
    data: MeteoData[];
}

const Chart: React.FC<WeatherChartProps> = ({data}) => {
    if (!data || data.length === 0) {
        return <div>Keine Wetterdaten verfügbar</div>;
    }

    const transformedData = data.map((entry) => ({
        date: new Date(entry.Datum),
        location: entry.Standortname,
        tempMax: entry.T_max_h1,
    }));

    const uniqueDataMap = new Map();
    transformedData.forEach((entry) => {
        const key = `${entry.date.toISOString()}-${entry.location}-${entry.tempMax}`;
        if (!uniqueDataMap.has(key)) {
            uniqueDataMap.set(key, entry);
        }
    });

    const cleanedData = Array.from(uniqueDataMap.values());

    const spec: VisualizationSpec = {
        description: "Maximale Temperaturen pro Standort über das Jahr",
        width: 800,
        height: 500,
        mark: "line",
        encoding: {
            x: {field: "date", type: "temporal", title: "Datum"},
            y: {
                field: "tempMax",
                type: "quantitative",
                title: "Maximale Temperatur (°C)",
            },
            color: {field: "location", type: "nominal", title: "Standort"},
        },
        data: {values: cleanedData},
    };

    return <VegaLite spec={spec}/>;
};

export default Chart;
