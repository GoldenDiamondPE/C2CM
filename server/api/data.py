from pydantic import BaseModel # used to define the structure of the input data for the API 

#how the input data for the API should look like

#jobs list dat
class Jobs(BaseModel):
    title: str
    company: str
    required_skills: list[str]

#course list data
class Courses(BaseModel):
    name: str
    skills_covered: list[str]
    prerequisites: list[str] 

#student profile data
class Student_Profile(BaseModel):
    initial_courses: list[str]
    target_jobs: list[str]

#final input data
class ReportRequest(BaseModel):
    student_profile: Student_Profile
    courses: list[Courses]
    jobs: list[Jobs]