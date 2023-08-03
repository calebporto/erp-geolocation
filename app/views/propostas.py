from datetime import datetime
from json import dumps, loads
from secrets import token_urlsafe
from flask import Blueprint, Response, flash, redirect, render_template, request
from flask_login import current_user, login_required
from app.providers.db_services import proposal_register
from app.providers.redis_services import get_redis_msg
from app.providers.texts import propostas_menu_texts, main_en_texts, main_es_texts, main_pt_texts

propostas_bp = Blueprint(
    'propostas',
    __name__,
    url_prefix='/painel/propostas'
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
    response = proposal_register(dados)
    if response:
        print('ok')
        return Response(dumps(response), 200)
    else:
        return Response(dumps('Dados Inválidos'), 400)
        