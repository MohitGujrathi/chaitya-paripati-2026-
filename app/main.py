from fastapi import FastAPI, Query
import pandas as pd
from pathlib import Path

app = FastAPI(
    title="Passenger Search API",
    version="1.0"
)

EXCEL_FILE = Path("data/passengers.xlsx")


@app.get("/")
def home():
    return {
        "message": "Passenger Search API is running"
    }


@app.get("/passengers")
def get_passengers():
    df = pd.read_excel(EXCEL_FILE)

    return df.fillna("").to_dict(orient="records")


@app.get("/search")
def search_passenger(
    name: str | None = Query(None),
    mobile: str | None = Query(None),
    pnr: str | None = Query(None)
):

    df = pd.read_excel(EXCEL_FILE)

    result = df

    if name:
        result = result[
            result["Name"]
            .astype(str)
            .str.contains(name, case=False, na=False)
        ]

    if mobile:
        result = result[
            result["Mobile"]
            .astype(str)
            .str.contains(mobile, na=False)
        ]

    if pnr:
        result = result[
            result["PNR"]
            .astype(str)
            .str.contains(pnr, na=False)
        ]

    return result.fillna("").to_dict(orient="records")