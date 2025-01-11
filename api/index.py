import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_data():
    json_file_path = os.path.join(os.path.dirname(__file__), "data", "meteodaten_2023_daily.json")
    with open(json_file_path, "r") as file:
        data = json.load(file)
    return data


data_cache = None


def get_cached_data():
    global data_cache
    if data_cache is None:
        data_cache = load_data()
    return data_cache


@app.get("/api/py/data")
async def get_meteodaten():
    try:
        data = get_cached_data()
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/api/py/stations")
def get_all_stations():
    try:
        data = get_cached_data()
        stations_info = {}

        for item in data:
            if "Standortname" in item and "WGS84_lat" in item and "WGS84_lng" in item:
                station_name = item["Standortname"]
                if station_name not in stations_info:
                    stations_info[station_name] = {
                        "WGS84_lat": item["WGS84_lat"],
                        "WGS84_lng": item["WGS84_lng"]
                    }
        stations = [{"Standortname": station, **coords} for station, coords in stations_info.items()]
        return {"stations": stations}
    except Exception as e:
        return {"error": str(e)}
