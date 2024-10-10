from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_file_path = os.path.join(os.path.dirname(__file__), '../data/meteodaten_2023_daily.json')

@app.get("/meteodaten", response_class=JSONResponse)
async def get_meteodaten():
    try:
        with open(data_file_path, 'r') as file:
            data = json.load(file)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)