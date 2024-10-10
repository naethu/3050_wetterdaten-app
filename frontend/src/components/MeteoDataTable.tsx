import React from 'react';
import { Table } from '@mui/material';
import { MeteoData as MeteoDataType } from '../types/meteodata'; // Umbenennung des Imports, um Konflikte zu vermeiden

interface MeteoDataTableProps {
    data: MeteoDataType | null; // Verwende den umbenannten Typ
}

const MeteoDataTable: React.FC<MeteoDataTableProps> = ({ data }) => {
    if (!data) {
        return <div>Bitte klicken Sie auf einen Punkt auf der Karte, um die Daten anzuzeigen.</div>; // Hinweis, wenn keine Daten vorhanden sind
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>Datum</th>
                <th>Standort</th>
                <th>Standortname</th>
                <th>Lat</th>
                <th>Lng</th>
                <th>Rain Duration</th>
                <th>Str Glo</th>
                <th>Temperatur</th>
                <th>Max. Temperatur (h1)</th>
                <th>Druck</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{new Date(data.Datum).toLocaleDateString()}</td> {/* Datum formatieren */}
                <td>{data.Standort}</td>
                <td>{data.Standortname}</td>
                <td>{data.WGS84_lat}</td>
                <td>{data.WGS84_lng}</td>
                <td>{data.RainDur}</td>
                <td>{data.StrGlo}</td>
                <td>{data.T}</td>
                <td>{data.T_max_h1}</td>
                <td>{data.p}</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default MeteoDataTable;
