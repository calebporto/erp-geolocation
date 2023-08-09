from json import dumps
from flask import Blueprint, flash, redirect, render_template, request
from flask_login import current_user, login_required
from app.providers.texts import main_en_texts, main_es_texts, main_pt_texts, clientes_menu_texts
from app.providers.redis_services import get_redis_msg

clientes_bp = Blueprint(
    'clientes',
    __name__,
    url_prefix='/painel/clientes'
)

@clientes_bp.route('/')
@login_required
def equipe():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')
    if not current_user.is_admin:
        return redirect('/painel')
    
    if request.args.get('arg') == 'top-menu':
        texts = clientes_menu_texts
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
    return render_template('clientes.html', texts=texts)
