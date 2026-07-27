from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import Query

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
        request=request,
        name="index.html"
    )



@app.get("/search")
def search(q: str = Query("")):

    df = pd.read_excel(EXCEL_FILE).fillna("")

    if not q:
        return []

    q = str(q).strip().lower()

    result = df[
        df.astype(str)
          .apply(lambda row: row.str.lower().str.contains(q))
          .any(axis=1)
    ]

    return result.to_dict(orient="records")