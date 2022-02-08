from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from starlette.requests import Request
from starlette.responses import Response
import uvicorn
import requests

import plot_reflectivity

origins = ["http://localhost:7777"]

middleware = [Middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )
]

app = FastAPI()
app = FastAPI(middleware=middleware)

# EXCEPTION HANDLER
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        return Response("Internal server error", status_code=500)

app.middleware('http')(catch_exceptions_middleware)

# MAIN ENDPOINT 
@app.get("/")
def main_page():
    return "RADAR SERVICE"

userHistoryService = "http://localhost:8000"

# GET REFLECTIVITY GRAPHS
@app.get("/radar/plot")
def plot(radar_id, date, hour):
    print('radar_id:{0}, date:{1}, hour:{2}'.format(radar_id, date, hour))
    report_date = date.split('-')
    plot_file = plot_reflectivity.nexrad_plot_reflectivity(radar_id, int(report_date[0]), int(report_date[1]), int(report_date[2]), int(hour))
    if plot_file:
        data = {
            "searchId":1,
            "userId":"2",
            "airport":radar_id,
            "dateSearched": date,
            "hour": hour,
            "createDate": datetime.now(),
            "plotted_image": plot_file
        }
        requests.post(userHistoryService+'/search/addsearchhistory', data = data)
        return plot_file
    else:
        raise HTTPException(status_code=404, detail="Item not found")

def start():
    print('RADAR SERVICE')
    uvicorn.run(app, host="127.0.0.1", port=8000)

if __name__ == '__main__':
    start()