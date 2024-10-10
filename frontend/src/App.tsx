import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import OlMap from './components/OlMap.tsx';
import MeteoDataTable from './components/MeteoDataTable.tsx';
import { MeteoData } from './types/meteodata';

const App = () => {
    const [selectedData, setSelectedData] = useState<MeteoData | null>(null);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>

            <div className="container">
                <div className="map-container" style={{ display: 'flex' }}>
                    <OlMap setSelectedData={setSelectedData} />
                    <div className="table-container">
                        <h2>Tabelle</h2>
                        <MeteoDataTable data={selectedData} /> {/* Übergebe die Daten an die Tabelle */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
