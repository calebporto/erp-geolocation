from datetime import date
from typing import Optional
from pydantic import BaseModel

class Register_Response_(BaseModel):
    status: Optional[bool]
    message: Optional[list[str]]
    data: Optional[str]

class Person_(BaseModel):
    id: Optional[int]
    name: Optional[str]
    site: Optional[str]
    person_name: Optional[str]
    email1: Optional[str]
    email2: Optional[str]
    tel1: Optional[str]
    tel2: Optional[str]
    relation_level: Optional[int]
    person_type: Optional[int]

class Worksheet_For_View_(BaseModel):
    id: Optional[int]
    title: Optional[str]
    creation_date: Optional[date]
    image_id: Optional[str]

class User_For_View_(BaseModel):
    id: Optional[int]
    name: Optional[str]
    email: Optional[str]
    is_admin: Optional[bool]
    is_collaborator: Optional[bool]