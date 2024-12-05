import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { MeteoData } from "../types/MeteoData";
import "./MeteoDataTable.css";

const MeteoDataTable: React.FC = () => {
  const [data, setData] = useState<MeteoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paginationModel = { page: 0, pageSize: 10 };

  const columns: GridColDef[] = [
    { field: "Datum", headerName: "Datum", width: 180 },
    { field: "Standort", headerName: "Standort", width: 180 },
    { field: "Standortname", headerName: "Standortname", width: 200 },
    { field: "T", headerName: "Temperatur (°C)", width: 180 },
    { field: "T_max_h1", headerName: "Max. Temperatur (°C)", width: 180 },
    { field: "p", headerName: "Druck (hPa)", width: 180 },
  ];

  const rows: GridRowsProp = data.map((row) => ({
    id: `${row.WGS84_lat}-${row.WGS84_lng}-${row.Datum}`,
    Datum: new Date(row.Datum).toLocaleDateString(),
    Standort: row.Standort,
    Standortname: row.Standortname,
    T: row.T,
    T_max_h1: row.T_max_h1,
    p: row.p,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000");
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        const data: MeteoData[] = await response.json();
        setData(data);
      } catch {
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
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper className="paper-container">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 25, 100]}
        checkboxSelection
        className="data-grid"
      />
    </Paper>
  );
};

export default MeteoDataTable;
