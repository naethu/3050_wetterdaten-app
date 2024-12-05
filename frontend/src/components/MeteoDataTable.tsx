import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MeteoData } from "../types/meteodata";
import "./MeteoDataTable.css";

const MeteoDataTable: React.FC = () => {
  const [data, setData] = useState<MeteoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    // Call fetchData asynchronously
    fetchData();

    // Cleanup function (if needed)
    return () => {
      setData([]);
      setLoading(true);
      setError(null);
    };
  }, []); // Empty dependency array to run only once when component mounts

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="table-container">
      <div className="table-container-inner">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Datum</TableCell>
                <TableCell>Standort</TableCell>
                <TableCell>Standortname</TableCell>
                <TableCell>Temperatur (°C)</TableCell>
                <TableCell>Max. Temperatur (°C)</TableCell>
                <TableCell>Druck (hPa)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={`${row.WGS84_lat}-${row.WGS84_lng}-${row.Datum}`}
                >
                  <TableCell>
                    {new Date(row.Datum).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.Standort}</TableCell>
                  <TableCell>{row.Standortname}</TableCell>
                  <TableCell>{row.T}</TableCell>
                  <TableCell>{row.T_max_h1}</TableCell>
                  <TableCell>{row.p}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MeteoDataTable;
