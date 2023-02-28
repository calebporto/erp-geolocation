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

class Spot_For_View_(BaseModel):
    id: Optional[int]
    code: Optional[str]
    address: Optional[str]
    latitude: Optional[str]
    longitude: Optional[str]
    image_link: Optional[str]
    include_date: Optional[date]
    reference: Optional[str]
    district: Optional[str]
    city: Optional[str]
    zone: Optional[str]
    state: Optional[str]
    country: Optional[str]
    format: Optional[str]
    measure: Optional[str]

class Spot_Commercial_For_View_(BaseModel):
    id: Optional[int]
    spot_id: Optional[int]
    impacto: Optional[str]
    valor_tabela_comm: Optional[str]
    valor_negociado_comm: Optional[str]
    producao: Optional[str]
    observacoes: Optional[str]
    outros: Optional[str]

class Spot_Private_For_View_(BaseModel):
    id: Optional[int]
    spot_id: Optional[int]
    empresa: Optional[str]
    valor_negociado_int: Optional[str]
    custo_liq: Optional[str]
    medida_int: Optional[str]
    observacoes: Optional[str]
    outros: Optional[str]