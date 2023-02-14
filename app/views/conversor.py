from io import BytesIO
from json import dumps
import os
from secrets import token_urlsafe
from flask import Blueprint, Response, flash, make_response, redirect, render_template, request
from flask_login import current_user, login_required
from openpyxl import Workbook
import requests
from app.models.basemodels import Register_Response_
from app.providers.redis_services import get_redis_msg
from app.providers.s3_services import download_file_to_s3, upload_file_to_s3
from app.providers.texts import conversor_menu_texts, main_en_texts, main_es_texts, main_pt_texts, kml_content_text
import xmltodict
from app.views.main import s3

conversor_bp = Blueprint(
    'conversor',
    __name__,
    url_prefix='/painel/conversor'
)

@conversor_bp.route('/')
@login_required
def conversor():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')
    
    if request.args.get('arg') == 'top-menu':
        texts = conversor_menu_texts
        if lang == 'en':
            return dumps(texts['en'])
        elif lang == 'es' or lang == 'es-ar':
            return dumps(texts['es'])
        else:
            return dumps(texts['pt-br'])
        
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
    return render_template('conversor.html', texts=texts)

@conversor_bp.route('/kml', methods=['GET','POST'])
def kml():
    if request.method == 'POST':
        messages = []
        lang = request.cookies.get('lang')
        try:
            arquivo = request.files.get('arquivo')
            doc = xmltodict.parse(arquivo.read())
            file_name = token_urlsafe(32)
            if not 'Folder' in doc['kml']['Document']:
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Archivo inválido.')
                elif lang == 'en':
                    messages.append('Invalid file.')
                else:
                    messages.append('Arquivo inválido.')  
                response = Register_Response_(
                    status=False,
                    message=messages,
                    data=None
                )
                return response.json()
            file_folders = doc['kml']['Document']['Folder']
            if type(file_folders) == dict:
                file_folders = [doc['kml']['Document']['Folder']]

            pontos = []
            sheet_columns_dict = {}
            for folder in file_folders:
                name = folder['name']
                pontos_list = []
                folder_columns = []
                if 'Placemark' in folder:
                    if type(folder['Placemark']) == dict:
                        folder['Placemark'] = [folder['Placemark']]
                    for ponto in folder['Placemark']:
                        ponto_dados = {}
                        ponto_nome = ponto['name']
                        ponto_dados['name'] = ponto_nome
                        if not 'name' in folder_columns:
                            folder_columns.append('name')
                        if not 'ExtendedData' in ponto:
                            pass
                        else:
                            if 'Data' in ponto['ExtendedData']:
                                dados = ponto['ExtendedData']['Data']
                                if type(dados) == dict:
                                    dados = [ponto['ExtendedData']['Data']]
                                for dado in dados:
                                    nome_dado = dado['@name']
                                    if not nome_dado in folder_columns:
                                        folder_columns.append(nome_dado)
                                    valor_dado = dado['value']
                                    ponto_dados[nome_dado] = valor_dado
                        if 'Point' in ponto:
                            ponto_dados['coordenadas'] = ponto['Point']['coordinates']
                        else:
                            ponto_dados['coordenadas'] = ''
                        if not 'coordenadas' in folder_columns:
                            folder_columns.append('coordenadas')
                        pontos_list.append(ponto_dados)
                pontos.append({name:pontos_list})
                sheet_columns_dict[name] = folder_columns


            planilha = Workbook()
            planilha.remove(planilha['Sheet'])
                
            for folder in pontos:
                sheetname = str(*folder)
                aba = planilha.create_sheet(sheetname)
                aba.append(sheet_columns_dict[sheetname])
                pontos_list = folder[sheetname]
                for ponto in pontos_list:
                    linha = []
                    for key, value in ponto.items():
                        if key in sheet_columns_dict[sheetname]:
                            linha.append(value)
                        else:
                            linha.append('')
                    aba.append(linha)
            data = None
            planilha_buffer = BytesIO()
            planilha.save(planilha_buffer)
            with planilha_buffer as planilha_file:
                xlsx_upload = upload_file_to_s3(planilha_file.getvalue(), f'xlsx/{file_name}.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                if xlsx_upload == False:
                    message = 'Falha ao converter arquivo. Tente novamente'
                    messages.append(message)
                else:
                    data = file_name
                    if lang == 'es' or lang == 'es-ar':
                        messages.append('Conversión exitosa.')
                    elif lang == 'en':
                        messages.append('Conversion successful.')
                    else:
                        messages.append('Conversão efetuada com sucesso.')
            planilha_buffer.close()
            response = Register_Response_(
                status=True,
                message=messages,
                data=data
            )
            return response.json()
        except Exception as error:
            print(str(error))
            messages.append('Erro no servidor. Tente novamente')
            response = Register_Response_(
                status=False,
                message=messages,
                data=None
            )
            return response.json()
    else:
        texto = kml_content_text
        lang = request.args.get('lang')
        if lang == 'es-ar' or lang == 'es':
            return dumps(texto['es-ar'])
        elif lang == 'en':
            return dumps(texto['en'])
        else:
            return dumps(texto['pt-br'])
        
@conversor_bp.route('/kml/download/<file_name>')
def kmldownload(file_name):
    try:
        s3.download_file(os.environ['AWS_BUCKET_NAME'], f'xlsx/{file_name}.xlsx', 'app/static/media/xlsx/temp.xlsx')
        with open('app/static/media/xlsx/temp.xlsx', 'rb') as tempfile:
            dados = tempfile.read()
        s3.delete_object(Bucket=os.environ['AWS_BUCKET_NAME'], Key=f'xlsx/{file_name}.xlsx')
        return make_response(dados, {'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    except Exception as error:
        print(str(error))
        return Response('Server Error', 500)