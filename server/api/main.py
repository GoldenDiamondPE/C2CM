import uvicorn
from fastapi import FastAPI #used to create the API
from fastapi.middleware.cors import CORSMiddleware #used to allow request from other websites
from data import Jobs #data format
from model import generate_report #function to generate report

#creates the FASTAPI app instance
app = FastAPI()



# List of websites that are allowed to access this API.
origins = [
    "http://localhost:5173",
    "coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net"]

app.add_middleware(
    CORSMiddleware,
    # Allow requests from the websites listed above.
    allow_origins=origins,
    # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.).
    allow_methods=["*"],
    # Allow all request headers.
    allow_headers=["*"],
)

#when a POST request is made to the /report endpoint, this function will be called. 
#has to include a list of "jobs" in the request body and returns a report
@app.post("/report")
def get_report(jobs: list[Jobs]):
    report = generate_report(jobs)
    return {"report": report}

