from flask_login import UserMixin
from app import db, login_manager

@login_manager.user_loader
def get_user(user_id):
    return User.query.filter_by(alternative_id=user_id).first()

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    alternative_id = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    is_collaborator = db.Column(db.Boolean, nullable=False, default=False)
    worksheet_content_user_id = db.relationship("Worksheet_Content")
    proposal_user_id = db.relationship("Proposal")

    def __init__(self, alternative_id, name, email, password, is_admin, is_collaborator):
        self.name = name
        self.alternative_id = alternative_id
        self.email = email
        self.hash = password
        self.is_admin = is_admin
        self.is_collaborator = is_collaborator

    def get_id(self):
        return str(self.alternative_id)

class Worksheet_Content(db.Model):
    __tablename__ = 'worksheet_content'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='SET NULL'))
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255))
    person = db.Column(db.String(255))
    content = db.Column(db.JSON, nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
    image_id = db.Column(db.String(255), nullable=False, unique=True)

    def __init__(self, title, company, person, content, creation_date, image_id):
        self.title = title
        self.company = company
        self.person = person
        self.content = content
        self.creation_date = creation_date
        self.image_id = image_id

class Spot(db.Model):
    __tablename__ = 'spot'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    code = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    image_link = db.Column(db.String(255), nullable=False)
    include_date = db.Column(db.Date, nullable=False)
    reference = db.Column(db.String(255))
    district = db.Column(db.String(255))
    city = db.Column(db.String(255))
    zone = db.Column(db.String(255))
    state = db.Column(db.String(255))
    country = db.Column(db.String(255))
    format = db.Column(db.String(255))
    measure = db.Column(db.String(255))
    commercial_spot_id = db.relationship("Spot_Commercial_Info", cascade='all, delete')
    private_spot_id = db.relationship("Spot_Private_Info", cascade='all, delete')

    def __init__(self, code, address, latitude, longitude, image_link, include_date, reference, district, city, zone, state, country, format, measure):
        self.code = code
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
        self.image_link = image_link
        self.include_date = include_date
        self.reference = reference
        self.district = district
        self.city = city
        self.zone = zone
        self.state = state
        self.country = country
        self.format = format
        self.measure = measure
    
class Spot_Commercial_Info(db.Model):
    __tablename__ = 'spot_commercial_info'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(Spot.id, ondelete='CASCADE'), nullable=False, unique=True)
    impacto = db.Column(db.String(255))
    valor_tabela_comm = db.Column(db.String(255))
    valor_negociado_comm = db.Column(db.String(255))
    producao = db.Column(db.String(255))
    observacoes = db.Column(db.String(255))
    outros = db.Column(db.JSON(255))
    
    def __init__(self, spot_id, impacto, valor_tabela_comm, valor_negociado_comm, producao, observacoes, outros):
        self.spot_id = spot_id
        self.impacto = impacto
        self.valor_tabela_comm = valor_tabela_comm
        self.valor_negociado_comm = valor_negociado_comm
        self.producao = producao
        self.observacoes = observacoes
        self.outros = outros

class Spot_Private_Info(db.Model):
    __tablename__ = 'spot_private_info'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(Spot.id, ondelete='CASCADE'), nullable=False, unique=True)
    empresa = db.Column(db.String(255))
    valor_negociado_int = db.Column(db.String(255))
    custo_liq = db.Column(db.String(255))
    medida_int = db.Column(db.String(255))
    observacoes = db.Column(db.String(255))
    outros = db.Column(db.JSON)
    
    def __init__(self, spot_id, empresa, medida_int, valor_negociado_int, custo_liq, observacoes, outros):
        self.spot_id = spot_id
        self.empresa = empresa
        self.medida_int = medida_int
        self.valor_negociado_int = valor_negociado_int
        self.custo_liq = custo_liq
        self.observacoes = observacoes
        self.outros = outros

class Person(db.Model):
    __tablename__ = 'person'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    site = db.Column(db.String(255))
    person_name = db.Column(db.String(255))
    email1 = db.Column(db.String(255))
    email2 = db.Column(db.String(255))
    tel1 = db.Column(db.String(255))
    tel2 = db.Column(db.String(255))
    relation_level = db.Column(db.Integer)
    person_type = db.Column(db.Integer) # 1 = Fornecedor. 2 = Cliente

    def __init__(self, name, site, person_name, email1, email2, tel1, tel2, relation_level, person_type):
        self.name = name
        self.site = site
        self.person_name = person_name
        self.email1 = email1
        self.email2 = email2
        self.tel1 = tel1
        self.tel2 = tel2
        self.relation_level = relation_level
        self.person_type = person_type

class Proposal(db.Model):
    __tablename__ = 'proposal'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='SET NULL'))
    proposal_date = db.Column(db.Date, nullable=False)
    client = db.Column(db.String(255), nullable=False)
    clientPerson = db.Column(db.String(255))
    campaign = db.Column(db.String(255))
    agencyName = db.Column(db.String(255))
    agencyTax = db.Column(db.Float)
    employeeName = db.Column(db.String(255), nullable=False)
    items = db.Column(db.JSON, nullable=False)
    total = db.Column(db.Float, nullable=False)
    taxTotal = db.Column(db.Float, nullable=False)
    status = db.Column(db.Integer, nullable=False)
    file_id = db.Column(db.String(255), unique=True, nullable=False)

    def __init__(
        self,
        user_id, 
        proposal_date, 
        client,
        clientPerson,
        campaign,
        agencyName,
        agencyTax,
        employeeName,
        items,
        total,
        taxTotal,
        status,
        file_id
    ):
        self.user_id = user_id
        self.proposal_date = proposal_date
        self.client = client
        self.clientPerson = clientPerson
        self.campaign = campaign
        self.agencyName = agencyName
        self.agencyTax = agencyTax
        self.employeeName = employeeName
        self.items = items
        self.total = total
        self.taxTotal = taxTotal
        self.status = status
        self.file_id = file_id
