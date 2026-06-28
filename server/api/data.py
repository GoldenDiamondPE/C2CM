from pydantic import BaseModel # used to define the structure of the input data for the API 

#how the input data for the API should look like
class Jobs(BaseModel):
    title: str
    company: str
    location: str
    required_skills: list[str]