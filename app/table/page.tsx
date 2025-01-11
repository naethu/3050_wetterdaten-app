"use client";

import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {MeteoData} from "../types/MeteoData";

const Table: React.FC = () => {
    const [data, setData] = useState<MeteoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const paginationModel = {page: 0, pageSize: 10};

    const columns: GridColDef[] = [
        {field: "Datum", headerName: "Datum", width: 180},
        {field: "Standortname", headerName: "Standortname", width: 200},
        {field: "T", headerName: "Temperatur (°C)", width: 180},
        {field: "T_max_h1", headerName: "Max. Temperatur (°C)", width: 180},
        {field: "p", headerName: "Druck (hPa)", width: 180},
    ];

    const rows: GridRowsProp = data.map((row) => ({
        id: `${row.WGS84_lat}-${row.WGS84_lng}-${row.Datum}`,
        Datum: new Date(row.Datum).toLocaleDateString(),
        Standortname: row.Standortname,
        T: row.T,
        T_max_h1: row.T_max_h1,
        p: row.p,
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/py/data");
                if (!response.ok) {
                    throw new Error("Netzwerkantwort war nicht ok");
                }
                const data: MeteoData[] = await response.json();
                console.log(data[0]);  // <-- Place this here
                setData(data);
            } catch (error) {
                console.error(error);
                setError("Fehler beim Laden der Daten");
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            setData([]);
            setLoading(true);
            setError(null);
        };
    }, []);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div className="flex justify-center w-full px-4">
            <div className="w-full max-w-screen-lg my-5">
                <h2 className="text-center text-xl font-semibold mb-4">Tabelle aller Wetterdaten aus der
                    API</h2>
                <div className="w-full">
                    <Paper className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{pagination: {paginationModel}}}
                            pageSizeOptions={[10, 25, 100]}
                            checkboxSelection
                            className="data-grid"
                        />
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Table;
