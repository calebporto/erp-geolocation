from datetime import datetime
from json import dumps, loads
import os
from secrets import token_urlsafe
from flask import Blueprint, Response, flash, make_response, redirect, render_template, request
from flask_login import current_user, login_required
from app.providers.db_services import get_proposal, proposal_register
from app.providers.functions import buffer_upload, proposal_files_generator
from app.providers.redis_services import get_redis_msg
from app.providers.texts import propostas_menu_texts, main_en_texts, main_es_texts, main_pt_texts
import boto3

propostas_bp = Blueprint(
    'propostas',
    __name__,
    url_prefix='/painel/propostas'
)
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

@propostas_bp.route('/')
@login_required
def propostas():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')

    if request.args.get('arg') == 'top-menu':
        texts = propostas_menu_texts
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
    return render_template('propostas.html', texts=texts)

@propostas_bp.route('/nova-proposta', methods=['POST'])
@login_required
def nova_proposta():
    dados = loads(request.data)
    dados['file_id'] = token_urlsafe(40)
    response = proposal_register(dados)
    pdf_buffer = proposal_files_generator(dados)
    path_pdf_upload = f'propostaspdf/{dados["file_id"]}.pdf'
    content_type = 'application/pdf'
    upload_status = buffer_upload(pdf_buffer, path_pdf_upload, content_type)
    if response and upload_status:
        return Response(dumps(dados['file_id']), 200)
    else:
        return Response(dumps('Dados Inválidos'), 400)
        
@propostas_bp.route('/buscar')
@login_required
def buscar():
    return get_proposal(request.args)

@propostas_bp.route('/pdfview/<file_id>')
@login_required
def pdf(file_id):
    try:
        s3.download_file(os.environ['AWS_BUCKET_NAME'], f'propostaspdf/{file_id}', 'app/static/media/pdf/temp_view.pdf')
        with open('app/static/media/pdf/temp_view.pdf', 'rb') as tempfile:
            dados = tempfile.read()
        return make_response(dados, {'content-type': 'application/pdf'})
    except FileNotFoundError:
        return 'Link inexistente. Contate o servidor. (Erro: Arquivo não encontrado)'
    except:
        return 'Erro no servidor. Estamos trabalhando para corrigir.'
