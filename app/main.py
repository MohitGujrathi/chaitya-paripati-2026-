from fastapi import FastAPI

app = FastAPI(
    title="Passenger Search App",
    version="1.0"
)


@app.get("/")
def home():
    return {
        "message": "Passenger Search API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "OK"
    }