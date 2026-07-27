from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

import pandas as pd
from pathlib import Path


app = FastAPI()


templates = Jinja2Templates(
    directory="app/templates"
)


app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


EXCEL_FILE = Path("data/passengers.xlsx")



@app.get("/")
def home(request: Request):

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request
        }
    )



@app.get("/search")
def search(
    name: str = "",
    mobile: str = "",
    pnr: str = ""
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


    return result.fillna("").to_dict(
        orient="records"
    )