from app.models.tables import Spot, Spot_Commercial_Info, Spot_Private_Info, Worksheet_Content as Flask_Worksheet_Content
from sqlalchemy import Column, Date, Integer, String, create_engine
from app.providers.s3_services import upload_file_to_s3
from sqlalchemy.orm import declarative_base, Session
from pptx.enum.text import PP_PARAGRAPH_ALIGNMENT
from sqlalchemy.dialects.mysql import JSON
from reportlab.lib.pagesizes import mm
from PIL import UnidentifiedImageError, ImageFile
from reportlab.pdfgen import canvas
from pptx.dml.color import RGBColor
from secrets import token_urlsafe
from flask import flash, redirect
from reportlab.lib import colors
from pptx import Presentation
from datetime import date
from pptx.util import Mm
from json import dumps
from worker import conn
from io import BytesIO
from PIL import Image
from rq import Queue
import pandas as pd
from app import db
import requests
import os

Base = declarative_base()

class Worksheet_Content(Base):
    __tablename__ = 'worksheet_content'
    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer)
    title = Column(String(255), nullable=False)
    company = Column(String(255))
    person = Column(String(255))
    content = Column(JSON, nullable=False)
    creation_date = Column(Date, nullable=False)
    image_id = Column(String(255), nullable=False, unique=True)

    def __init__(self, user_id, title, company, person, content, creation_date, image_id):
        self.title = title
        self.user_id = user_id
        self.company = company
        self.person = person
        self.content = content
        self.creation_date = creation_date
        self.image_id = image_id

engine = create_engine(os.environ['SQLALCHEMY_DATABASE_URI'], echo=False, future=True)
session = Session(engine)


ALLOWED_EXTENSIONS = {'xlsx'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def image_id_generator():
    image_id = token_urlsafe(40)
    image_id_db = Flask_Worksheet_Content.query.filter(Flask_Worksheet_Content.image_id == image_id).first()
    if image_id_db:
        image_id_generator()
    return image_id

def flash_dif_languages(lang, es, en, pt):
    if lang == 'es-ar' or lang == 'es':
        return flash(es)
    elif lang == 'en':
        return flash(en)
    else:
        return flash(pt)

def is_in_the_column(coluna, lista):
    for item in lista:
        if coluna.replace(' ', '') in item:
            return True
    return False

def file_validator(arquivo, lang):
    messages = []
    if not arquivo or arquivo.filename == '':
        if lang == 'es' or lang == 'es-ar':
            messages.append('ningun archivo fue cargado.')
        elif lang == 'en':
            messages.append('no files were uploaded.')
        else:
            messages.append('Nenhum arquivo foi enviado.')
        return False, messages
    elif not allowed_file(arquivo.filename):
        if lang == 'es' or lang == 'es-ar':
            messages.append('Formato de archivo no soportado. Debe cargar archivos ".xlsx".')
        elif lang == 'en':
            messages.append('Unsupported file format. You must upload ".xlsx" files.')
        else:
            messages.append('Formato de arquivo não suportado. Você deve enviar arquivos ".xlsx".')
        return False, messages
    return True, messages

def pdf_generator(capa, content, image_id, lang, user_id, is_worker):
    try:
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        colunas = content['colunas']
        linhas = content['conteudo']

        endereco_column = None
        latitude_column = None
        longitude_column = None
        codigo_column = None
        foto_column = None
        other_columns = []

        for coluna in colunas:
            if coluna.lower().rsplit(' ')[0] == 'endereco' or coluna.lower().rsplit(' ')[0] == 'endereço' or coluna.lower().rsplit(' ')[0] == 'direccion' or coluna.lower().rsplit(' ')[0] == 'dirección' or coluna.lower().rsplit(' ')[0] == 'ubicacion' or coluna.lower().rsplit(' ')[0] == 'ubicación' or coluna.lower().rsplit(' ')[0] == 'address':
                endereco_column = coluna
            elif coluna.lower().rsplit(' ')[0] == 'latitude' or coluna.lower().rsplit(' ')[0] == 'latitud':
                latitude_column = coluna
            elif coluna.lower().rsplit(' ')[0] == 'longitude' or coluna.lower().rsplit(' ')[0] == 'longitud':
                longitude_column = coluna
            elif coluna.lower().rsplit(' ')[0] == 'cod.' or coluna.lower().rsplit(' ')[0] == 'codigo' or coluna.lower().rsplit(' ')[0] == 'código' or coluna.lower().rsplit(' ')[0] == 'code' or coluna.lower().rsplit(' ')[0] == 'cod' or coluna.lower().rsplit(' ')[0] == 'cód' or coluna.lower().rsplit(' ')[0] == 'cód.':
                codigo_column = coluna
            elif coluna.lower().rsplit(' ')[0] == 'foto' or coluna.lower().rsplit(' ')[0] == 'imagem' or coluna.lower().rsplit(' ')[0] == 'imagen' or coluna.lower().rsplit(' ')[0] == 'fotografia' or coluna.lower().rsplit(' ')[0] == 'fotografía' or coluna.lower().rsplit(' ')[0] == 'image' or coluna.lower().rsplit(' ')[0] == 'picture' or coluna.lower().rsplit(' ')[0] == 'photo':
                foto_column = coluna
            else:
                other_columns.append(coluna)
        
        for coluna in [endereco_column, latitude_column, longitude_column, codigo_column, foto_column]:
            if coluna == None:
                if lang == 'es' or lang == 'es-ar':
                    message = f'No se generó el libro {capa["nome"]}. Motivo: Falta la columna obligatoria.'
                elif lang == 'en':
                    message = f'The book {capa["nome"]} was not generated. Reason: Missing required column.'
                else:
                    message = f'O book {capa["nome"]} não foi gerado. Motivo: Ausência de coluna obrigatória.'
                send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})
                print(f'Erro ao gerar o book {capa["nome"]}. Motivo: ausência de coluna obrigatória.')
                return False

        # Gerando PDF
        pdf_buffer = BytesIO()
        pdf = canvas.Canvas(pdf_buffer, (400*mm, 220*mm))
        # Gerando PPTX
        apresentacao = Presentation()
        apresentacao.slide_height = Mm(220)
        apresentacao.slide_width = Mm(400)

        # Capa
        
        if not capa['nome']:
            message = f'O book não foi gerado. Motivo: Você deve fornecer um nome para o book.'
            send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})
            print(f'Erro ao gerar o book. Motivo: Nome para o book não foi fornecido.')
            return False
        else:
            # PDF
            pdf.drawImage('app/static/media/pdf_provider_images/capa_template.jpg', 0, 0, 400*mm, 220*mm)
            pdf.setFont('Helvetica', 10*mm)
            
            # Inicializando slide da capa
            slide = apresentacao.slides.add_slide(apresentacao.slide_layouts[6])
            capa_template = slide.shapes.add_picture('app/static/media/pdf_provider_images/capa_template.jpg', Mm(0), Mm(0), height=Mm(220), width=Mm(400))
            
            if not capa['cliente'] and not capa['pessoa']:
                pdf.drawString(105*mm,25*mm, capa['nome'])

                capa_nome = slide.shapes.add_textbox(Mm(102), Mm(185), Mm(200), Mm(10))
                capa_nome_text_frame = capa_nome.text_frame
                capa_nome_text_frame.clear()
                capa_nome_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                capa_nome_text = capa_nome_text_frame.paragraphs[0].add_run()
                capa_nome_text.text = capa['nome']
                capa_nome_text.font.name = 'Helvetica'
                capa_nome_text.font.size = Mm(10)
                
            else:
                if capa['cliente'] and capa['pessoa']:
                    texto = f'A\C {capa["pessoa"]} - {capa["cliente"]}'
                    if len(texto) > 48:
                        pdf.drawString(105*mm,55*mm, capa['nome'])
                        
                        capa_nome = slide.shapes.add_textbox(Mm(102), Mm(155), Mm(200), Mm(10))
                        capa_nome_text_frame = capa_nome.text_frame
                        capa_nome_text_frame.clear()
                        capa_nome_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        capa_nome_text = capa_nome_text_frame.paragraphs[0].add_run()
                        capa_nome_text.text = capa['nome']
                        capa_nome_text.font.name = 'Helvetica'
                        capa_nome_text.font.size = Mm(10)

                        pdf.drawString(105*mm,40*mm, texto[0:48])

                        texto_pptx1 = slide.shapes.add_textbox(Mm(102), Mm(170), Mm(200), Mm(10))
                        texto_pptx1_text_frame = texto_pptx1.text_frame
                        texto_pptx1_text_frame.clear()
                        texto_pptx1_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        texto_pptx1_text = texto_pptx1_text_frame.paragraphs[0].add_run()
                        texto_pptx1_text.text = texto[0:48]
                        texto_pptx1_text.font.name = 'Helvetica'
                        texto_pptx1_text.font.size = Mm(10)

                        pdf.drawString(105*mm,25*mm, texto[48:len(texto)])

                        texto_pptx2 = slide.shapes.add_textbox(Mm(102), Mm(185), Mm(200), Mm(10))
                        texto_pptx2_text_frame = texto_pptx2.text_frame
                        texto_pptx2_text_frame.clear()
                        texto_pptx2_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        texto_pptx2_text = texto_pptx2_text_frame.paragraphs[0].add_run()
                        texto_pptx2_text.text = texto[48:len(texto)]
                        texto_pptx2_text.font.name = 'Helvetica'
                        texto_pptx2_text.font.size = Mm(10)

                    else:
                        pdf.drawString(105*mm,40*mm, capa['nome'])
                        
                        capa_nome = slide.shapes.add_textbox(Mm(102), Mm(170), Mm(200), Mm(10))
                        capa_nome_text_frame = capa_nome.text_frame
                        capa_nome_text_frame.clear()
                        capa_nome_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        capa_nome_text = capa_nome_text_frame.paragraphs[0].add_run()
                        capa_nome_text.text = capa['nome']
                        capa_nome_text.font.name = 'Helvetica'
                        capa_nome_text.font.size = Mm(10)

                        pdf.drawString(105*mm,25*mm, texto)

                        texto_pptx1 = slide.shapes.add_textbox(Mm(102), Mm(185), Mm(200), Mm(10))
                        texto_pptx1_text_frame = texto_pptx1.text_frame
                        texto_pptx1_text_frame.clear()
                        texto_pptx1_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        texto_pptx1_text = texto_pptx1_text_frame.paragraphs[0].add_run()
                        texto_pptx1_text.text = texto
                        texto_pptx1_text.font.name = 'Helvetica'
                        texto_pptx1_text.font.size = Mm(10)

                else:
                    pdf.drawString(105*mm,40*mm, capa['nome'])

                    capa_nome = slide.shapes.add_textbox(Mm(102), Mm(170), Mm(200), Mm(10))
                    capa_nome_text_frame = capa_nome.text_frame
                    capa_nome_text_frame.clear()
                    capa_nome_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                    capa_nome_text = capa_nome_text_frame.paragraphs[0].add_run()
                    capa_nome_text.text = capa['nome']
                    capa_nome_text.font.name = 'Helvetica'
                    capa_nome_text.font.size = Mm(10)
                    if capa['cliente'] and not capa['pessoa']:
                        texto = f'{capa["cliente"]}'
                        pdf.drawString(105*mm,25*mm, texto)

                        texto_pptx1 = slide.shapes.add_textbox(Mm(102), Mm(185), Mm(200), Mm(10))
                        texto_pptx1_text_frame = texto_pptx1.text_frame
                        texto_pptx1_text_frame.clear()
                        texto_pptx1_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        texto_pptx1_text = texto_pptx1_text_frame.paragraphs[0].add_run()
                        texto_pptx1_text.text = texto
                        texto_pptx1_text.font.name = 'Helvetica'
                        texto_pptx1_text.font.size = Mm(10)

                    elif capa['pessoa'] and not capa['cliente']:
                        texto = f'A\C {capa["pessoa"]}'
                        pdf.drawString(105*mm,25*mm, texto)

                        texto_pptx1 = slide.shapes.add_textbox(Mm(102), Mm(185), Mm(200), Mm(10))
                        texto_pptx1_text_frame = texto_pptx1.text_frame
                        texto_pptx1_text_frame.clear()
                        texto_pptx1_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                        texto_pptx1_text = texto_pptx1_text_frame.paragraphs[0].add_run()
                        texto_pptx1_text.text = texto
                        texto_pptx1_text.font.name = 'Helvetica'
                        texto_pptx1_text.font.size = Mm(10)

        pdf.showPage()

        for i, linha in enumerate(linhas):
            print('gerando pdf')
            foto_link = str(linha[foto_column])
            print(f'1 {foto_link}')
            valid_image = True
            if str(foto_link) == 'nan':
                valid_image = False
            elif not 'http' in str(foto_link):
                valid_image = False
            elif foto_link[len(foto_link) - 4:len(foto_link)] not in ['.png', '.jpg', 'jpeg']:
                valid_image = False
            with open(f'app/static/media/pdf_provider_images/temp_image{i}.png', 'wb') as nova_imagem:
                imagem = requests.get(foto_link, stream=True, headers={'User-Agent': 'Chrome/108.0.5359.124'})
                if not imagem.ok:
                    valid_image = False
                else:
                    for dado in imagem.iter_content():
                        nova_imagem.write(dado)
            if valid_image == True:
                imagem_pil = Image.open(f'app/static/media/pdf_provider_images/temp_image{i}.png')
                size = imagem_pil.size
                new_image = None
                if size[0] > 1280:
                    new_image = imagem_pil.resize((1280, 768))
                    new_image = new_image.convert('RGB')
                else:
                    new_image = imagem_pil.convert('RGB')
                new_image.save(f'app/static/media/pdf_provider_images/temp_image{i}.jpg', 'JPEG')


            coordenadas = f'{linha[latitude_column]}  {linha[longitude_column]}'

            # Inicializando PPT
            slide = apresentacao.slides.add_slide(apresentacao.slide_layouts[6])
            
            # Template de fundo PDF
            pdf.drawImage('app/static/media/pdf_provider_images/template_pdf.jpg', 0, 0, 400*mm, 220*mm)

            # Template de fundo PPTX
            template_fundo = slide.shapes.add_picture('app/static/media/pdf_provider_images/template_pdf.jpg', Mm(0), Mm(0), height=Mm(220), width=Mm(400))

            # Endereço PDF
            pdf.setFont('Helvetica-Bold', 7*mm)
            pdf.setFillColor(colors.white)
            pdf.drawCentredString(200*mm,207*mm, linha[endereco_column])

            # Endereço PPTX
            endereco = slide.shapes.add_textbox(Mm(0), Mm(5), Mm(420), Mm(5))
            endereco_text_frame = endereco.text_frame
            endereco_text_frame.clear()
            endereco_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.CENTER
            endereco_text = endereco_text_frame.paragraphs[0].add_run()
            endereco_text.text = linha[endereco_column]
            endereco_text.font.name = 'Helvetica'
            endereco_text.font.bold = True
            endereco_text.font.size = Mm(7)
            endereco_text.font.color.rgb = RGBColor(255,255,255)

            if valid_image == True:
                # Imagem PDF
                pdf.drawImage(f'app/static/media/pdf_provider_images/temp_image{i}.jpg', 3*mm, 18.19*mm, 305*mm, 180*mm)

                #Imagem PPTX
                imagem = slide.shapes.add_picture(f'app/static/media/pdf_provider_images/temp_image{i}.jpg', Mm(3), Mm(21.81), height=Mm(180), width=Mm(310))
            else:
                # Imagem invalida PDF
                pdf.setFont('Helvetica-Bold', 5*mm)
                pdf.setFillColor(colors.black)
                pdf.drawString(48*mm, 80*mm, 'Link inválido ou bloqueado pelo provedor.')

                # Imagem Inválida PPTX
                invalid_img_pptx = slide.shapes.add_textbox(Mm(47), Mm(125), Mm(30), Mm(5))
                invalid_img_text_frame = invalid_img_pptx.text_frame
                invalid_img_text_frame.clear()
                invalid_img_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                invalid_img_text = invalid_img_text_frame.paragraphs[0].add_run()
                invalid_img_text.text = 'Link inválido ou bloqueado pelo provedor.'
                invalid_img_text.font.name = 'Helvetica'
                invalid_img_text.font.bold = True
                invalid_img_text.font.size = Mm(5)

            # Coordenadas PDF
            pdf.setFont('Helvetica-Bold', 5*mm)
            pdf.setFillColor(colors.black)
            pdf.drawString(4*mm, 10*mm, 'Coordenadas:')
            
            pdf.setFont('Helvetica', 5*mm)
            pdf.drawString(41.5*mm, 10*mm, coordenadas)

            # Coordenadas PPTX
            coordenadas_pptx = slide.shapes.add_textbox(Mm(3), Mm(205), Mm(30), Mm(5))
            coordenadas_text_frame = coordenadas_pptx.text_frame
            coordenadas_text_frame.clear()
            coordenadas_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
            coordenadas_text = coordenadas_text_frame.paragraphs[0].add_run()
            coordenadas_text.text = 'Coordenadas:'
            coordenadas_text.font.name = 'Helvetica'
            coordenadas_text.font.bold = True
            coordenadas_text.font.size = Mm(5)

            coordenadas_content = slide.shapes.add_textbox(Mm(40.5), Mm(205), Mm(50), Mm(6))
            coordenadas_content_text_frame = coordenadas_content.text_frame
            coordenadas_content_text_frame.clear()
            coordenadas_content_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
            coordenadas_content_text = coordenadas_content_text_frame.paragraphs[0].add_run()
            coordenadas_content_text.text = coordenadas
            coordenadas_content_text.font.name = 'Helvetica'
            coordenadas_content_text.font.size = Mm(5)
            
            # Código PDF
            pdf.setFont('Helvetica-Bold', 5*mm)
            pdf.drawString(180*mm, 10*mm, 'Código:')
            
            pdf.setFont('Helvetica', 5*mm)
            pdf.drawString(202*mm, 10*mm, linha[codigo_column])

            # Código PPTX
            codigo = slide.shapes.add_textbox(Mm(180), Mm(205), Mm(30), Mm(5))
            codigo_text_frame = codigo.text_frame
            codigo_text_frame.clear()
            codigo_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
            codigo_text = codigo_text_frame.paragraphs[0].add_run()
            codigo_text.text = 'Codigo:'
            codigo_text.font.name = 'Helvetica'
            codigo_text.font.bold = True
            codigo_text.font.size = Mm(5)

            codigo_content = slide.shapes.add_textbox(Mm(202), Mm(205), Mm(50), Mm(6))
            codigo_content_text_frame = codigo_content.text_frame
            codigo_content_text_frame.clear()
            codigo_content_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
            codigo_content_text = codigo_content_text_frame.paragraphs[0].add_run()
            codigo_content_text.text = linha[codigo_column]
            codigo_content_text.font.name = 'Helvetica'
            codigo_content_text.font.size = Mm(5)

            eixo_y_pdf = 194
            eixo_y_pptx = 20

            for coluna in other_columns:
                titulo = str(coluna)
                if titulo == 'nan':
                    titulo = ''
                
                conteudo = str(linha[coluna])
                if conteudo == 'nan':
                    conteudo = ''
                # Outras Colunas PDF
                pdf.setFont('Helvetica-Bold', 5*mm)
                pdf.drawString(312*mm, eixo_y_pdf*mm, titulo)
                
                pdf.setFont('Helvetica', 5*mm)
                pdf.drawString(312*mm, (eixo_y_pdf - 7) * mm, conteudo)
                eixo_y_pdf -= 19

                # Outras colunas PPTX
                outros = slide.shapes.add_textbox(Mm(315), Mm(eixo_y_pptx), Mm(30), Mm(6))
                outros_text_frame = outros.text_frame
                outros_text_frame.clear()
                outros_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                outros_text_frame.paragraphs[0].word_wrap = True
                outros_text = outros_text_frame.paragraphs[0].add_run()
                outros_text.text = titulo
                outros_text.font.name = 'Helvetica'
                outros_text.font.bold = True
                outros_text.font.size = Mm(5)

                outros_content = slide.shapes.add_textbox(Mm(315), Mm(eixo_y_pptx + 7), Mm(30), Mm(6))
                outros_content_text_frame = outros_content.text_frame
                outros_content_text_frame.clear()
                outros_content_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.LEFT
                outros_content_text_frame.paragraphs[0].word_wrap = True
                outros_content_text = outros_content_text_frame.paragraphs[0].add_run()
                outros_content_text.text = conteudo
                outros_content_text.font.name = 'Helvetica'
                outros_content_text.font.size = Mm(5)
                eixo_y_pptx += 19
            
            # Página PDF
            pdf.setFont('Helvetica-Bold', 8*mm)
            pdf.setFillColor(colors.white)
            pdf.drawCentredString(387*mm, 6.5*mm, str(pdf.getPageNumber()))

            # Página PPTX
            pagina = slide.shapes.add_textbox(Mm(380), Mm(203.5), Mm(10), Mm(10))
            pagina_text_frame = pagina.text_frame
            pagina_text_frame.clear()
            pagina_text_frame.paragraphs[0].alignment = PP_PARAGRAPH_ALIGNMENT.CENTER
            pagina_text = pagina_text_frame.paragraphs[0].add_run()
            pagina_text.text = str(pdf.getPageNumber())
            pagina_text.font.name = 'Helvetica'
            pagina_text.font.bold = True
            pagina_text.font.size = Mm(8)
            pagina_text.font.color.rgb = RGBColor(255,255,255)
            
            pdf.showPage()
            
        pdf.save()

        #Gravando pdf
        with pdf_buffer as pdf_file:
            pdf_upload = upload_file_to_s3(pdf_file.getvalue(), f'pdf/{image_id}.pdf', 'application/pdf')
            if pdf_upload == False:
                message = 'Falha ao salvar o arquivo PDF. Apague o book e tente novamente.'
                send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})
        pdf_buffer.close()
        
        # Gravando pptx
        pptx_buffer = BytesIO()
        apresentacao.save(pptx_buffer)
        with pptx_buffer as pptx_file:
            pptx_upload = upload_file_to_s3(pptx_file.getvalue(), f'pptx/{image_id}.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
            if pptx_upload == False:
                message = 'Falha ao salvar o arquivo PPTX. Apague o book e tente novamente.'
                send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})
        pptx_buffer.close()

        if is_worker == True:
            session.add(Worksheet_Content(
                user_id,
                capa['nome'].title(),
                capa['cliente'],
                capa['pessoa'],
                dumps(content),
                date.today(),
                image_id
            ))
            session.commit()
        message = f'Book {capa["nome"].title()} cadastrado e seus arquivos PDF e PPTX gerados com sucesso.'
        send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})
        print('terminando de gerar pdf')
            
    except UnidentifiedImageError as error:
        print(str(error))
        message = f'Falha ao gerar o Book {capa["nome"]}. Motivo: Link de imagem inválido. Você deve fornecer um link de imagem .jpg, .jpeg ou .png. Links de telas de Google Maps ou Street View não são aceitas.'
        send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})
    except Exception as error:
        print(str(error))
        message = f'Falha ao gerar o Boook {capa["nome"]}. Motivo: Erro no servidor.'
        send_message = requests.get(f'{os.environ["APP_URL"]}/flash-message-generate?message={message}&user={user_id}', headers={'Secret-Key': os.environ['SECRET_KEY']})

def points_register(arquivo, lang):
    try:
        tabela = pd.ExcelFile(arquivo)
        planilhas_count = len(tabela.sheet_names)
        messages = []
        if planilhas_count != 1:
            if lang == 'es' or lang == 'es-ar':
                messages.append('Su hoja de trabajo tiene dos pestañas y solo se procesó la primera.')
            elif lang == 'en':
                messages.append('Your worksheet has two tabs, and only the first one was processed.')
            else:
                messages.append('Sua planilha possui duas abas, e somente a primeira foi processada.')
        planilha = pd.read_excel(arquivo, sheet_name=tabela.sheet_names[0]).to_dict('records')
        colunas = pd.read_excel(arquivo, sheet_name=tabela.sheet_names[0])
        code_col, address_col, latitude_col, longitude_col, image_col = None, None, None, None, None
        reference_col, district_col, county_col, zone_col, state_col, country_col, format_col, measure_col = None, None, None, None, None, None, None, None
        impacto_col, valor_tab_comm, valor_negociado_comm, producao_col, observacoes_col, outros_comm_col = None, None, None, None, None, None
        empresa_col, measure_int_col, valor_negociado_int, custo_liq_col, observacoes_int_col, outros_int_col = None, None, None, None, None, None

        for i, coluna in enumerate(colunas):
            if is_in_the_column(coluna.lower(), ['cod', 'cod.', 'cód', 'cód.', 'código', 'codigo', 'code']):
                code_col = coluna
            elif is_in_the_column(coluna.lower(), ['endereço', 'endereco', 'direccion', 'dirección', 'ubicacion', 'ubicación', 'address']):
                address_col = coluna
            elif is_in_the_column(coluna.lower(), ['latitude', 'latitud', 'latitúd']):
                latitude_col = coluna
            elif is_in_the_column(coluna.lower(), ['longitude', 'longitud', 'longitúd']):
                longitude_col = coluna
            elif is_in_the_column(coluna.lower(), ['foto', 'imagem', 'imagen', 'fotografia', 'fotografía', 'image', 'photo', 'picture']):
                image_col = coluna
            elif coluna.lower() in ['referencia', 'referência', 'reference']:
                reference_col = coluna
            elif coluna.lower() in ['bairro', 'distrito', 'barrio', 'district']:
                district_col = coluna
            elif coluna.lower() in ['cidade', 'ciudad', 'city', 'county']:
                county_col = coluna
            elif coluna.lower() in ['zona', 'zone', 'regiao', 'região', 'región', 'region']:
                zone_col = coluna
            elif coluna.lower() in ['estado', 'provincia', 'state']:
                state_col = coluna
            elif coluna.lower() in ['país', 'pais', 'country']:
                country_col = coluna
            elif coluna.lower() in ['formato', 'format']:
                format_col = coluna
            elif coluna.lower() in ['medida', 'tamanho', 'tamaño', 'tamano', 'measure', 'size']:
                measure_col = coluna
            elif coluna.lower() in ['impacto', 'fluxo passantes', 'impact']:
                impacto_col = coluna
            elif coluna.lower() in ['valor tabela', 'valor de la tabla', 'average media value']:
                valor_tab_comm = coluna
            elif coluna.lower() in ['valor negociado', 'valor negociado', 'our media value']:
                valor_negociado_comm = coluna
            elif coluna.lower() in ['produção', 'producao', 'produccion', 'producción', 'production']:
                producao_col = coluna
            elif coluna.lower() in ['observações', 'observacoes', 'comentarios', 'comments']:
                observacoes_col = coluna
            elif coluna.lower() in ['empresa', 'company']:
                empresa_col = coluna
            elif coluna.lower() in ['medida interna', 'internal measurement']:
                measure_int_col = coluna
            elif coluna.lower() in ['valor negociado interno', 'valor negociado interno', 'internal negotiated value']:
                valor_negociado_int = coluna
            elif coluna.lower() in ['custo líquido', 'custo liquido', 'preço líquido', 'preco liquido', 'preço liquido', 'preco líquido', 'costo neto', 'net cost']:
                custo_liq_col = coluna
            elif coluna.lower() in ['comentários internos', 'comentarios internos', 'internal comments']:
                observacoes_int_col = coluna
            else:
                continue
        if not code_col or not address_col or not latitude_col or not longitude_col or not image_col:
            if lang == 'es' or lang == 'es-ar':
                messages.append('No se reconoció alguna columna obligatoria. Las columnas obligatorias son: Código, Dirección, Latitud, Longitud y Foto.')
                return False, messages
            elif lang == 'en':
                messages.append('Some mandatory column was not recognized. The mandatory columns are: Code, Address, Latitude, Longitude and Photo.')
                return False, messages
            else:
                messages.append('Alguma coluna obrigatória não foi reconhecida. As colunas obrigatórias são: Código, Endereço, Latitude, Longitude e Foto.')
                return False, messages
        for linha in planilha:
            new_spot = Spot(
                linha[code_col],
                linha[address_col],
                linha[latitude_col],
                linha[longitude_col],
                linha[image_col],
                date.today(),
                linha[reference_col] if reference_col and str(linha[reference_col]) != 'nan' else None,
                linha[district_col] if district_col and str(linha[district_col]) != 'nan' else None,
                linha[county_col] if county_col and str(linha[county_col]) != 'nan' else None,
                linha[zone_col] if zone_col and str(linha[zone_col]) != 'nan' else None,
                linha[state_col] if state_col and str(linha[state_col]) != 'nan' else None,
                linha[country_col] if country_col and str(linha[country_col]) != 'nan' else None,
                linha[format_col] if format_col and str(linha[format_col]) != 'nan' else None,
                linha[measure_col] if measure_col and str(linha[measure_col]) != 'nan' else None
            )
            new_spot_com = Spot_Commercial_Info(
                None,
                linha[impacto_col] if impacto_col and str(linha[impacto_col]) != 'nan' else None,
                linha[valor_tab_comm] if valor_tab_comm and str(linha[valor_tab_comm]) != 'nan' else None,
                linha[valor_negociado_comm] if valor_negociado_comm and str(linha[valor_negociado_comm]) != 'nan' else None,
                linha[producao_col] if producao_col and str(linha[producao_col]) != 'nan' else None,
                linha[observacoes_col] if observacoes_col and str(linha[observacoes_col]) != 'nan' else None,
                outros_comm_col
            )
            new_spot_int = Spot_Private_Info(
                None,
                linha[empresa_col] if empresa_col and str(linha[empresa_col]) != 'nan' else None,
                linha[measure_int_col] if measure_int_col and str(linha[measure_int_col]) != 'nan' else None,
                linha[valor_negociado_int] if valor_negociado_int and str(linha[valor_negociado_int]) != 'nan' else None,
                linha[custo_liq_col] if custo_liq_col and str(linha[custo_liq_col]) != 'nan' else None,
                linha[observacoes_int_col] if observacoes_int_col and str(linha[observacoes_int_col]) != 'nan' else None,
                outros_int_col
            )
            db.session.add(new_spot)
            db.session.flush()
            db.session.refresh(new_spot)

            new_spot_com.spot_id = new_spot.id
            db.session.add(new_spot_com)
            
            new_spot_int.spot_id = new_spot.id
            db.session.add(new_spot_int)
        db.session.commit()
        if lang == 'es' or lang == 'es-ar':
            messages.append('Los puntos se han registrado con éxito.')
        elif lang == 'en':
            messages.append('Points have been registered successfully.')
        else:
            messages.append('Os pontos foram cadastrados com sucesso.')
        return True, messages
    except Exception as error:
        print(f'erro = {str(error)}')
        return False, ['Erro no servidor. Tente novamente mais tarde.']

def book_register(arquivo, dados_capa, colunas, lang, user_id):
    messages = []
    if len(colunas) > 15:
        if lang == 'es' or lang == 'es-ar':
            messages.append('El libro no se generó porque tiene más de 15 columnas.')
            return False, messages
        elif lang == 'en':
            messages.append('The book was not generated because it has more than 15 columns.')
            return False, messages
        else:
            messages.append('O book não foi gerado porque tem mais de 15 colunas.')
            return False, messages
    tabela = pd.ExcelFile(arquivo)
    planilhas = tabela.sheet_names # Pega o nome de todas as abas da tabela
    for i, planilha in enumerate(planilhas):
        if i > 0:
            continue
        
        # Verifica se as colunas Endereço e Foto estão presentes
        endereco_check = False
        foto_check = False
        latitude_check = False
        longitude_check = False
        codigo_check = False
        for i, coluna in enumerate(colunas):
            if 'endereço' in str(coluna).lower() or 'endereco' in str(coluna).lower() or 'direccion' in str(coluna).lower() or 'dirección' in str(coluna).lower() or 'address' in str(coluna).lower():
                endereco_check = True
            elif 'foto' in str(coluna).lower() or 'imagem' in str(coluna).lower() or 'imagen' in str(coluna).lower() or 'fotografia' in str(coluna).lower() or 'fotografía' in str(coluna).lower() or 'image' in str(coluna).lower() or 'picture' in str(coluna).lower() or 'photo' in str(coluna).lower():
                foto_check = True
            elif 'latitude' in str(coluna).lower() or 'latitud' in str(coluna).lower():
                latitude_check = True
            elif 'longitude' in str(coluna).lower() or 'longitud' in str(coluna).lower():
                longitude_check = True
            elif 'codigo' in str(coluna).lower() or 'código' in str(coluna).lower() or 'cod' == str(coluna).lower() or 'cód' == str(coluna).lower() or 'code' in str(coluna).lower() or 'cod.' in str(coluna).lower() or 'cód.' in str(coluna).lower():
                codigo_check = True
            
        if not foto_check or not endereco_check or not latitude_check or not longitude_check or not codigo_check:
            if lang == 'es' or lang == 'es-ar':
                messages.append('Alguna columna requerida no fue reconocida. Las columnas obligatorias son "Código", "Dirección", "Latitud", "Longitud" y "Foto".')
                return False, messages
            elif lang == 'en':
                messages.append('Some required column was not recognized. Required columns are "Code", "Address", "Latitude", "Longitude" and "Photo".')
                return False, messages
            else:
                messages.append('Alguma coluna obrigatória não foi reconhecida. As colunas obrigatórias são "Código", "Endereço", "Latitude", "Longitude" e "Foto".')
                return False, messages
        
        book = pd.read_excel(arquivo, sheet_name=planilha).to_dict('records')
        for i, linha in enumerate(book):
            nova_linha = {}
            for key, value in linha.items():
                if key in colunas:
                    nova_linha[key] = value
            book[i] = nova_linha
        image_id = image_id_generator()
        capa = {'nome': dados_capa['nome'], 'cliente': dados_capa['cliente'], 'pessoa': dados_capa['pessoa']}
        content = {'colunas': colunas, 'conteudo': book}
        
        # Criando fila rq
        q = Queue(connection=conn)

        result = q.enqueue(pdf_generator, capa, content, image_id, lang, user_id, True, job_timeout='30m')
        if lang == 'es' or lang == 'es-ar':
            messages.append(f'El libro {(dados_capa["nome"]).title()} se está generando. Cuando se complete, aparecerá en "Lista de Books" o notificará en pantalla en caso de error.')
        elif lang == 'en':
            messages.append(f'The book {(dados_capa["nome"]).title()} is being generated. When completed, it will appear in "List of Books" or notify on screen in case of error.')
        else:
            messages.append(f'O book {(dados_capa["nome"]).title()} está sendo gerado. Quando estiver concluído, ele aparecerá em "Lista de Books" ou notificará na tela em caso de erro.')
        return True, messages