import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { MeteoData } from '../types/meteodata'; // Importiere MeteoData

interface OlMapProps {
    setSelectedData: (data: MeteoData | null) => void;
}

const OlMap: React.FC<OlMapProps> = ({ setSelectedData }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [coordinates, setCoordinates] = useState<MeteoData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/meteodaten');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: MeteoData[] = await response.json();
                setCoordinates(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (mapRef.current && coordinates.length > 0) {
            const vectorSource = new VectorSource();

            coordinates.forEach((item) => {
                const marker = new Feature({
                    geometry: new Point(fromLonLat([item.WGS84_lng, item.WGS84_lat])),
                });

                marker.setStyle(new Style({
                    image: new Icon({
                        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                        scale: 1,
                    }),
                }));

                marker.setProperties(item);
                vectorSource.addFeature(marker);
            });

            const map = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    new VectorLayer({
                        source: vectorSource,
                    }),
                ],
                view: new View({
                    center: fromLonLat([8.53, 47.36667]),
                    zoom: 12,
                }),
            });

            map.on('singleclick', (event: MapBrowserEvent<MouseEvent>) => {
                map.forEachFeatureAtPixel(event.pixel, (feature) => {
                    if (feature) {
                        const properties = feature.getProperties() as MeteoData;
                        setSelectedData(properties); // Nur setSelectedData aufrufen
                    }
                });
            });

            return () => {
                map.setTarget(undefined);
            };
        }
    }, [coordinates, setSelectedData]);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '80vh' }} />
    );
};

export default OlMap;
