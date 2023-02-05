from flask_login import current_user, login_required
from app.providers.redis_services import get_redis_msg
from app.providers.texts import main_en_texts, main_es_texts, main_pt_texts, pontos_menu_texts, importar_content_text
from app.providers.functions import allowed_file, book_register, file_validator, flash_dif_languages, is_in_the_column, points_register
from flask import Blueprint, Response, flash, redirect, render_template, request
from app.models.tables import Person, Spot, Spot_Commercial_Info, Spot_Private_Info
from app.models.basemodels import Person_, Register_Response_
from datetime import date
from json import dumps, loads
import pandas as pd
from app import db

pontos_bp = Blueprint(
    'pontos',
    __name__,
    url_prefix='/painel/pontos'
)

@pontos_bp.route('/')
@login_required
def pontos():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')

    if request.args.get('arg') == 'top-menu':
        texts = pontos_menu_texts
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
    print(messages)
    return render_template('pontos.html', texts=texts)

@pontos_bp.route('/importar', methods=['GET', 'POST'])
@login_required
def importar():
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
            planilha = pd.read_excel(arquivo, sheet_name=tabela.sheet_names[0]).to_dict('records')
            colunas = pd.read_excel(arquivo, sheet_name=tabela.sheet_names[0])
            code_col, address_col, latitude_col, longitude_col, image_col = None, None, None, None, None
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
            if not code_col or not address_col or not latitude_col or not longitude_col or not image_col:
                if lang == 'en':
                    message = 'Some mandatory column was not recognized. The mandatory columns are: Code, Address, Latitude, Longitude and Photo.'
                elif lang == 'es' or lang == 'es-ar':
                    message = 'No se reconoció alguna columna obligatoria. Las columnas obligatorias son: Código, Dirección, Latitud, Longitud y Foto.'
                else:
                    message = 'Alguma coluna obrigatória não foi reconhecida. As colunas obrigatórias são: Código, Endereço, Latitude, Longitude e Foto.'
                return Response(message, 400)
            colunas_dict = {
                'obrigatorias': [code_col, address_col, latitude_col, longitude_col, image_col],
                'outras': []
            }
            for coluna in colunas:
                if coluna in colunas_dict['obrigatorias']:
                    continue
                else:
                    colunas_dict['outras'].append(coluna)
            clientes = Person.query.filter(Person.person_type == 2).all()
            for i, cliente in enumerate(clientes):
                data = Person_(
                    id=cliente.id,
                    name=cliente.name,
                    person_name=cliente.person_name
                )
                clientes[i] = data.dict()
            return dumps(
                {
                'colunas': colunas_dict,
                'message': message,
                'clientes': clientes
                }
            )
        elif request_type == 'registrar&book':
            messages = []
            file_check = file_validator(arquivo, lang)
            if file_check[0] == False:
                response = Register_Response_(
                    status=False,
                    message=file_check[1]
                )
                return response.json()
            register_status, register_messages = points_register(arquivo, lang)
            if register_status == False:
                response = Register_Response_(
                    status=False,
                    message=register_messages
                )
                return response.json()
            else:
                for message in register_messages:
                    messages.append(message)
            book_name = request.form.get('bookName') if request.form.get('bookName') else None
            book_client = int(request.form.get('clientId')) if int(request.form.get('clientId')) != -1 else None
            book_person = request.form.get('personName') if request.form.get('personName') else None
            columns = str(request.form.get('colunas')).rsplit(',')
            
            dados_capa = {'nome': book_name, 'cliente': book_client, 'pessoa': book_person}
            book_status, book_messages = book_register(arquivo, dados_capa, columns, lang, current_user.id)
            for message in book_messages:
                messages.append(message)
            if book_status == False:
                response = Register_Response_(
                    status=False,
                    message=messages
                )
                return response.json()
            else:
                response = Register_Response_(
                    status=True,
                    message=messages
                )
                return response.json()
        elif request_type == 'registrar':
            file_check = file_validator(arquivo, lang)
            if file_check[0] == False:
                response = Register_Response_(
                    status=False,
                    message=file_check[1]
                )
                return response.json()
            register_status, register_messages = points_register(arquivo, lang)
            response = Register_Response_(
                status=register_status,
                message=register_messages
            )
            return response.json()
            
    else:
        texto = importar_content_text
        lang = request.args.get('lang')
        if lang == 'es-ar' or lang == 'es':
            return dumps(texto['es-ar'])
        elif lang == 'en':
            return dumps(texto['en'])
        else:
            return dumps(texto['pt-br'])