from sqlalchemy import Column, Date, Integer, String, create_engine, select
from sqlalchemy.orm import declarative_base, Session
from datetime import date, timedelta
from sqlalchemy.dialects.mysql import JSON
from dotenv import load_dotenv
load_dotenv()
import os
import boto3

'''
Função para apagar os registros com mais de 30 dias de criados.
'''
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

Base = declarative_base()

class Worksheet_Content(Base):
    __tablename__ = 'worksheet_content'
    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String(255), nullable=False)
    company = Column(String(255))
    person = Column(String(255))
    content = Column(JSON, nullable=False)
    creation_date = Column(Date, nullable=False)
    image_id = Column(String(255), nullable=False, unique=True)

    def __init__(self, title, company, person, content, creation_date, image_id):
        self.title = title
        self.company = company
        self.person = person
        self.content = content
        self.creation_date = creation_date
        self.image_id = image_id

engine = create_engine(os.environ['SQLALCHEMY_DATABASE_URI'], echo=True, future=True)
session = Session(engine)

antique = select(Worksheet_Content).where(Worksheet_Content.creation_date < date.today() - timedelta(30))
result = session.scalars(antique).all()
for item in result:
    book_pdf = f'pdf/{item.image_id}.pdf'
    book_pptx = f'pptx/{item.image_id}.pptx'
    s3.delete_object(Bucket=os.environ['AWS_BUCKET_NAME'], Key=book_pdf)
    s3.delete_object(Bucket=os.environ['AWS_BUCKET_NAME'], Key=book_pptx)
    session.delete(item)
session.commit()