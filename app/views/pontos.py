from io import BytesIO
import os
from flask_login import current_user, login_required
from app.providers.db_services import delete_ponto, delete_pontos, edit_pontos, get_point_in_radius, get_pontos
from app.providers.redis_services import get_redis_msg
from app.providers.texts import main_en_texts, main_es_texts, main_pt_texts, pontos_menu_texts, importar_content_text, importar_zip_content_text, visualizar_pontos_content_text
from app.providers.functions import allowed_file, book_register, bookGenerateWithPoints, editar_grupo, file_validator, flash_dif_languages, is_in_the_column, points_register
from flask import Blueprint, Response, flash, redirect, render_template, request
from app.models.tables import Person, Spot, Spot_Commercial_Info, Spot_Private_Info
from app.models.basemodels import Person_, Register_Response_
from datetime import date
from json import dumps, loads
import pandas as pd
from app import db
import zipfile

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
    api_key = os.environ['GOOGLE_MAPS_API_KEY']
    return render_template('pontos.html', texts=texts, api_key=api_key)

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
        
@pontos_bp.route('/importar-zip', methods=['GET', 'POST'])
@login_required
def importar_zip():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        messages = []
        arquivo = request.files.get('arquivo')
        if not arquivo or arquivo.filename[-4::] != '.zip':
            if lang == 'es' or lang == 'es-ar':
                messages.append('Archivo inválido. Su archivo debe estar en formato .zip y no puede contener directorios, solo archivos en formato .xlsx.')
            elif lang == 'en':
                messages.append('Invalid file. Your file must be in .zip format, and cannot contain directories, only files in .xlsx format.')
            else:
                messages.append('Arquivo inválido. Seu arquivo deve ser no formato .zip, e não pode conter diretorios, somente arquivos no formato .xlsx.')
            response = Register_Response_(
                status=False,
                message=messages
            )
            return response.json()
        zip = zipfile.ZipFile(arquivo)
        lista = zip.namelist()
        for item in lista:
            if '/' in item or item[-5::] != '.xlsx':
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Archivo inválido. Su archivo debe estar en formato .zip y no puede contener directorios, solo archivos en formato .xlsx.')
                elif lang == 'en':
                    messages.append('Invalid file. Your file must be in .zip format, and cannot contain directories, only files in .xlsx format.')
                else:
                    messages.append('Arquivo inválido. Seu arquivo deve ser no formato .zip, e não pode conter diretorios, somente arquivos no formato .xlsx.')
                response = Register_Response_(
                    status=False,
                    message=messages
                )
                return response.json()
        
        pais = request.form.get('pais') if request.form.get('pais') else None
        if not pais:
            if lang == 'es' or lang == 'es-ar':
                messages.append('Sellecionar país.')
            elif lang == 'en':
                messages.append('Select the country.')
            else:
                messages.append('Selecione o país.')
            response = Register_Response_(
                status=False,
                message=messages
            )
            return response.json()
        zona = request.form.get('zona') if request.form.get('zona') else None
        cidade = request.form.get('cidade') if request.form.get('cidade') else None
        estado = request.form.get('estado') if request.form.get('estado') else None
        empresa = request.form.get('empresa') if request.form.get('empresa') else None
        custo = request.form.get('custo') if request.form.get('custo') else None
        valorTabela = request.form.get('valorTabela') if request.form.get('valorTabela') else None
        valorNegociado = request.form.get('valorNegociado') if request.form.get('valorNegociado') else None
        formato = request.form.get('formato') if request.form.get('formato') else None
        pattern_columns = {
            'pais': pais,
            'zona': zona,
            'cidade': cidade,
            'estado': estado,
            'empresa': empresa,
            'custo': custo,
            'valorTabela': valorTabela,
            'valorNegociado': valorNegociado,
            'formato': formato
        }
        for nome_planilha in lista:
            planilha = zip.read(nome_planilha)
            abas = pd.ExcelFile(planilha).sheet_names
            if len(abas) != 1:
                if lang == 'es-ar' or lang == 'es':
                    messages.append(f'La hoja de trabajo {nome_planilha} no se puede procesar porque tiene más de una pestaña')
                elif lang == 'en':
                    messages.append(f'Worksheet {nome_planilha} cannot be processed as it has more than one tab.')
                else:
                    messages.append(f'A planilha {nome_planilha} não pode ser processada, pois tem mais de uma aba.')
                continue
            
            colunas = pd.read_excel(planilha, sheet_name=abas[0])
            code_col, address_col, latitude_col, longitude_col, image_col = None, None, None, None, None
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
                else:
                    continue
            if not code_col or not address_col or not latitude_col or not longitude_col or not image_col:
                if lang == 'es-ar' or lang == 'es':
                    messages.append(f'La hoja de trabajo {nome_planilha} no se puede procesar porque falta alguna columna obligatoria.')
                elif lang == 'en':
                    messages.append(f'Worksheet {nome_planilha} cannot be processed as some required column is missing.')
                else:
                    messages.append(f'A planilha {nome_planilha} não pode ser processada, pois falta alguma coluna obrigatória.')
                continue
            
            register_status, register_messages = points_register(planilha, lang, pattern_columns=pattern_columns)
            if register_status == False:
                if lang == 'es-ar' or lang == 'es':
                    messages.append(f'Error al procesar la hoja de cálculo {nome_planilha}. Verifique los datos proporcionados e intente nuevamente.')
                elif lang == 'en':
                    messages.append(f'Error processing worksheet {nome_planilha}. Check the data provided and try again.')
                else:
                    messages.append(f'Erro ao processar a planilha {nome_planilha}. Verifique os dados fornecidos e tente novamente.')
        
        zip.close()
        if lang == 'es-ar' or lang == 'es':
            messages.append(f'Puntos registrados con éxito.')
        elif lang == 'en':
            messages.append(f'Points registered successfully.')
        else:
            messages.append(f'Pontos registrados com sucesso.')
        response = Register_Response_(
            status=True,
            message=messages
        )
        return response.json()
    else:
        texto = importar_zip_content_text
        lang = request.args.get('lang')
        if lang == 'es-ar' or lang == 'es':
            return dumps(texto['es-ar'])
        elif lang == 'en':
            return dumps(texto['en'])
        else:
            return dumps(texto['pt-br'])
        
@pontos_bp.route('/visualizar', methods=['GET', 'POST'])
@login_required
def visualizar_pontos():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        request_type = request.form.get('type')
        if request_type == 'edit':
            id = request.form.get('id') if request.form.get('id') and str(request.form.get('id')) != 'null' else None
            code = request.form.get('code') if request.form.get('code') and str(request.form.get('code')) != 'null' else None
            address = request.form.get('address') if request.form.get('address') and str(request.form.get('address')) != 'null' else None
            latitude = request.form.get('latitude') if request.form.get('latitude') and str(request.form.get('latitude')) != 'null' else None
            longitude = request.form.get('longitude') if request.form.get('longitude') and str(request.form.get('longitude')) != 'null' else None
            image_link = request.form.get('image_link') if request.form.get('image_link') and str(request.form.get('image_link')) != 'null' else None
            reference = request.form.get('reference') if request.form.get('reference') and str(request.form.get('reference')) != 'null' else None
            district = request.form.get('district') if request.form.get('district') and str(request.form.get('district')) != 'null' else None
            zone = request.form.get('zone') if request.form.get('zone') and str(request.form.get('zone')) != 'null' else None
            city = request.form.get('city') if request.form.get('city') and str(request.form.get('city')) != 'null' else None
            state = request.form.get('state') if request.form.get('state') and str(request.form.get('state')) != 'null' else None
            country = request.form.get('country') if request.form.get('country') and str(request.form.get('country')) != 'null' else None
            format = request.form.get('format') if request.form.get('format') and str(request.form.get('format')) != 'null' else None
            measure = request.form.get('measure') if request.form.get('measure') and str(request.form.get('measure')) != 'null' else None
            impacto = request.form.get('impacto') if request.form.get('impacto') and str(request.form.get('impacto')) != 'null' else None
            valor_tabela_comm = request.form.get('valor_tabela_comm') if request.form.get('valor_tabela_comm') and str(request.form.get('valor_tabela_comm')) != 'null' else None
            valor_negociado_comm = request.form.get('valor_negociado_comm') if request.form.get('valor_negociado_comm') and str(request.form.get('valor_negociado_comm')) != 'null' else None
            producao = request.form.get('producao') if request.form.get('producao') and str(request.form.get('producao')) != 'null' else None
            observacoes_comm = request.form.get('observacoes_comm') if request.form.get('observacoes_comm') and str(request.form.get('observacoes_comm')) != 'null' else None
            outros_comm = request.form.get('outros_comm') if request.form.get('outros_comm') and str(request.form.get('outros_comm')) != 'null' else None
            empresa = request.form.get('empresa') if request.form.get('empresa') and str(request.form.get('empresa')) != 'null' else None
            valor_negociado_int = request.form.get('valor_negociado_int') if request.form.get('valor_negociado_int') and str(request.form.get('valor_negociado_int')) != 'null' else None
            custo_liq = request.form.get('custo_liq') if request.form.get('custo_liq') and str(request.form.get('custo_liq')) != 'null' else None
            medida_int = request.form.get('medida_int') if request.form.get('medida_int') and str(request.form.get('medida_int')) != 'null' else None
            observacoes_int = request.form.get('observacoes_int') if request.form.get('observacoes_int') and str(request.form.get('observacoes_int')) != 'null' else None
            outros_int = request.form.get('outros_int') if request.form.get('outros_int') and str(request.form.get('outros_int')) != 'null' else None
            dados = {
                'id': id,
                'code': code,
                'address': address,
                'latitude': latitude,
                'longitude': longitude,
                'image_link': image_link,
                'reference': reference,
                'district': district,
                'zone': zone,
                'city': city,
                'state': state,
                'country': country,
                'format': format,
                'measure': measure,
                'impacto': impacto,
                'valor_tabela_comm': valor_tabela_comm,
                'valor_negociado_comm': valor_negociado_comm,
                'producao': producao,
                'observacoes_comm': observacoes_comm,
                'outros_comm': outros_comm,
                'empresa': empresa,
                'valor_negociado_int': valor_negociado_int,
                'custo_liq': custo_liq,
                'medida_int': medida_int,
                'observacoes_int': observacoes_int,
                'outros_int': outros_int
            }
            return edit_pontos(lang, dados)
        elif request_type == 'excluir':
            id = str(request.form.get('id'))
            return delete_ponto(lang, id)
        elif request_type == 'gerarBook':
            columns = loads(request.form.get('columns'))
            idList = loads(request.form.get('idList'))
            bookName = str(request.form.get('bookName'))
            personName = str(request.form.get('personName'))
            clientName = str(request.form.get('clientName'))
            return bookGenerateWithPoints(lang, columns, idList, current_user.id, bookName, personName, clientName)
        elif request_type == 'editarGrupo':
            idList = loads(request.form.get('idList'))
            dados = {
                'district': request.form.get('district'),
                'reference': request.form.get('reference'),
                'city': request.form.get('city'),
                'zone': request.form.get('zone'),
                'state': request.form.get('state'),
                'country': request.form.get('country'),
                'format': request.form.get('format'),
                'measure': request.form.get('measure'),
                'impacto': request.form.get('impacto'),
                'valor_tabela_comm': request.form.get('valor_tabela_comm'),
                'valor_negociado_comm': request.form.get('valor_negociado_comm'),
                'producao': request.form.get('producao'),
                'observacoes_comm': request.form.get('observacoes_comm'),
                'empresa': request.form.get('empresa'),
                'valor_negociado_int': request.form.get('valor_negociado_int'),
                'custo_liq': request.form.get('custo_liq'),
                'medida_int': request.form.get('medida_int'),
                'observacoes_int': request.form.get('observacoes_int')
            }
            return editar_grupo(lang, idList, dados)
        elif request_type == 'excluirGrupo':
            idList = loads(request.form.get('idList'))
            return delete_pontos(lang, idList)
    else:
        if request.args.get('filter'):
            request_filter = loads(request.args.get('filter'))
            if request_filter['type'] == 'all':
                response = get_pontos(request_filter)
                return response
            elif request_filter['type'] == 'getPointsByMarkerPosition':
                print(request_filter)
                latitude = float(request_filter['coordinates']['lat'])
                longitude = float(request_filter['coordinates']['lng'])
                radius = int(request_filter['radius'])
                return get_point_in_radius(latitude, longitude, radius)
        texto = visualizar_pontos_content_text
        if lang == 'es-ar' or lang == 'es':
            return dumps(texto['es'])
        elif lang == 'en':
            return dumps(texto['en'])
        else:
            return dumps(texto['pt_br'])