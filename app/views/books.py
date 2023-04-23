from json import dumps
import os
import time
from flask import Blueprint, Response, flash, redirect, render_template, make_response, request
from flask_login import current_user, login_required
from app.models.basemodels import Person_, Register_Response_, Worksheet_For_View_
from app.models.tables import Person, Worksheet_Content
from app.providers.functions import book_register, file_validator, is_in_the_column
from app.providers.redis_services import get_redis_msg
from app.providers.texts import books_menu_texts, main_pt_texts, main_en_texts, main_es_texts, criar_content_text
import pandas as pd
from app.views.main import s3
from app import app, db

books_bp = Blueprint(
    'books',
    __name__,
    url_prefix='/painel/books'
)

@books_bp.route('/')
@login_required
def books():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')

    if request.args.get('arg') == 'top-menu':
        texts = books_menu_texts
        if lang == 'en':
            return dumps(texts['en'])
        elif lang == 'es' or lang == 'es-ar':
            return dumps(texts['es'])
        else:
            return dumps(texts['pt-br'])


    # Pegar cookie de linguagem para definir texts
    if lang == 'en':
        texts = main_en_texts
    elif lang == 'es' or lang == 'es-ar':
        texts = main_es_texts
    else:
        texts = main_pt_texts

    messages = get_redis_msg(current_user.id)
    if messages:
        for message in messages:
            if len(message) > 2:
                flash(message)
    return render_template('books.html', texts=texts)

@books_bp.route('/criar', methods=['GET', 'POST'])
@login_required
def criar():
    if request.method == 'POST':
        lang = str(request.form.get('lang'))
        arquivo = request.files.get('arquivo')
        request_type = request.form.get('type')
        if request_type == 'retornarColunas':
            tabela = pd.ExcelFile(arquivo)
            planilhas_count = len(tabela.sheet_names)
            message = None
            if planilhas_count != 1:
                if lang == 'en':
                    message = 'Your worksheet more than tabs, and only the first one was processed.'
                elif lang == 'es' or lang == 'es-ar':
                    message = 'Su hoja de trabajo tiene más de una pestaña y solo se procesó la primera.'
                else:
                    message = 'Sua planilha possui mais de uma aba, e somente a primeira foi processada.'
            colunas = pd.read_excel(arquivo, sheet_name=tabela.sheet_names[0], nrows=1)
            code_col, address_col, latitude_col, longitude_col, image_col = None, None, None, None, None
            cidade_col, formato_col, bairro_col, referencia_col = None, None, None, None
            for coluna in colunas:
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
                elif is_in_the_column(coluna.lower(), ['cidade', 'cidade ', 'ciudad', 'ciudad ', 'city', 'city ', 'county', 'county ']):
                    cidade_col = coluna
                elif is_in_the_column(coluna.lower(), ['formato', 'formato ', 'format', 'format ']):
                    formato_col = coluna
                elif is_in_the_column(coluna.lower(), ['bairro', 'bairro ', 'distrito', 'distrito ', 'barrio', 'barrio ', 'district', 'district ']):
                    bairro_col = coluna
                elif is_in_the_column(coluna.lower(), ['referencia', 'referencia ', 'referência', 'referência ', 'reference', 'reference ']):
                    referencia_col = coluna
            if not code_col or not address_col or not latitude_col or not longitude_col or not image_col:
                if lang == 'en':
                    message = 'Some mandatory column was not recognized. The mandatory columns are: Code, Address, Latitude, Longitude and Photo.'
                elif lang == 'es' or lang == 'es-ar':
                    message = 'No se reconoció alguna columna obligatoria. Las columnas obligatorias son: Código, Dirección, Latitud, Longitud y Foto.'
                else:
                    message = 'Alguma coluna obrigatória não foi reconhecida. As colunas obrigatórias são: Código, Endereço, Latitude, Longitude e Foto.'
                return Response(message, 400)
            
            # Colunas que não são obrigatórias mas devem estar no book, mesmo que vazias
            if not cidade_col:
                if lang == 'en':
                    cidade_col = 'City'
                elif lang == 'es' or lang == 'es-ar':
                    cidade_col = 'Ciudad'
                else:
                    cidade_col = 'Cidade'
            if not formato_col:
                if lang == 'en':
                    formato_col = 'Format'
                elif lang == 'es' or lang == 'es-ar':
                    formato_col = 'Formato'
                else:
                    formato_col = 'Formato'
            if not bairro_col:
                if lang == 'en':
                    bairro_col = 'District'
                elif lang == 'es' or lang == 'es-ar':
                    bairro_col = 'Barrio'
                else:
                    bairro_col = 'Bairro'
            if not referencia_col:
                if lang == 'en':
                    referencia_col = 'Reference'
                elif lang == 'es' or lang == 'es-ar':
                    referencia_col = 'Referencia'
                else:
                    referencia_col = 'Referência'
            colunas_dict = {
                'obrigatorias': [code_col, address_col, latitude_col, longitude_col, image_col, bairro_col, referencia_col, cidade_col, formato_col],
                'outras': []
            }
            for coluna in colunas:
                if coluna in colunas_dict['obrigatorias']:
                    continue
                else:
                    colunas_dict['outras'].append(coluna)
            return dumps(
                {
                'colunas': colunas_dict,
                'message': message
                }
            )
        elif request_type == 'gerarBook':
            file_check = file_validator(arquivo, lang)
            if file_check[0] == False:
                response = Register_Response_(
                    status=False,
                    message=file_check[1]
                )
                return response.json()
            book_name = request.form.get('bookName') if request.form.get('bookName') else None
            book_client = request.form.get('client') if request.form.get('client') else None
            book_person = request.form.get('personName') if request.form.get('personName') else None
            columns = str(request.form.get('colunas')).rsplit(',')

            dados_capa = {'nome': book_name, 'cliente': book_client, 'pessoa': book_person}
            book_status, book_messages = book_register(arquivo, dados_capa, columns, lang, current_user.id)

            response = Register_Response_(
                status=book_status,
                message=book_messages
            )
            return response.json()
    else:
        texto = criar_content_text
        lang = request.args.get('lang')
        if lang == 'es-ar' or lang == 'es':
            return dumps(texto['es-ar'])
        elif lang == 'en':
            return dumps(texto['en'])
        else:
            return dumps(texto['pt-br'])

@books_bp.route('/lista', methods=['GET', 'POST'])
@login_required
def lista():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        pass
    else:
        filtro = request.args.get('filter')
        if filtro == 'all':
            books_db = Worksheet_Content.query.filter(Worksheet_Content.user_id == current_user.id).all()
            for i, item in enumerate(books_db):
                book = Worksheet_For_View_(
                    id=item.id,
                    title=item.title,
                    creation_date=item.creation_date,
                    image_id=item.image_id
                )
                books_db[i] = book.dict()
            books = sorted(books_db, key=lambda row:row['creation_date'], reverse=True)
            message_list = []
            messages = get_redis_msg(current_user.id)
            if messages:
                for message in messages:
                    if len(message) > 2:
                        message_list.append(message)
            
            response = {
                'books': books,
                'messages': message_list
            }
            return dumps(response, default=str)
        elif filtro == 'downloadpptx':
            arquivo = request.args.get('arg')
            s3.download_file(os.environ['AWS_BUCKET_NAME'], f'pptx/{arquivo}', 'app/static/media/pptx/temp.pptx')
            with open('app/static/media/pptx/temp.pptx', 'rb') as tempfile:
                dados = tempfile.read()
            return make_response(dados, {'content-type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'})
        elif filtro == 'excluir':
            try:
                id = int(request.args.get('arg'))
                book = Worksheet_Content.query.filter(Worksheet_Content.id == id).first()
                book_pdf = f'pdf/{book.image_id}.pdf'
                book_pptx = f'pptx/{book.image_id}.pptx'
                s3.delete_object(Bucket=os.environ['AWS_BUCKET_NAME'], Key=book_pdf)
                s3.delete_object(Bucket=os.environ['AWS_BUCKET_NAME'], Key=book_pptx)
                db.session.delete(book)
                db.session.commit()
                messages = []
                if lang == 'es' or lang == 'es-ar':
                    messages.append(f'El libro {book.title} se ha eliminado correctamente.')
                elif lang == 'en':
                    messages.append(f'The book {book.title} has been successfully deleted.')
                else:
                    messages.append(f'O book {book.title} foi excluído com sucesso.')
                response = Register_Response_(
                    status=True,
                    message=messages
                )
                return response.json()
            except Exception as error:
                print(str(error))
                response = Register_Response_(
                    status=False,
                    message=['Erro no servidor. Tente novamente.']
                )
                return response.json()

@app.route('/pdfview/<pdf_file>')
def pdfview(pdf_file):
    try:
        s3.download_file(os.environ['AWS_BUCKET_NAME'], f'pdf/{pdf_file}', 'app/static/media/pdf/temp_view.pdf')
        with open('app/static/media/pdf/temp_view.pdf', 'rb') as tempfile:
            dados = tempfile.read()
        return make_response(dados, {'content-type': 'application/pdf'})
    except FileNotFoundError:
        return 'Link inexistente. Contate o servidor. (Erro: Arquivo não encontrado)'
    except:
        return 'Erro no servidor. Estamos trabalhando para corrigir.'