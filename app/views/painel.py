import datetime
from flask import Blueprint, make_response, redirect, render_template, request
from flask_login import login_required
from app.providers.db_services import get_point_in_radius
from app.providers.texts import main_en_texts, main_es_texts, main_pt_texts

painel_bp = Blueprint(
    'painel',
    __name__,
    url_prefix='/painel'
)

@painel_bp.route('/', methods=['GET', 'POST'])
@login_required
def painel():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')
    if request.method == 'POST':
        pass
    else:
        select_lang = request.args.get('select-lang')
        if select_lang == 'pt-br':
            resp = make_response(redirect('/painel'))
            resp.set_cookie('lang', 'pt-br', max_age=datetime.timedelta(days=365))
            return resp
        if select_lang == 'es':
            resp = make_response(redirect('/painel'))
            resp.set_cookie('lang', 'es', max_age=datetime.timedelta(days=365))
            return resp
        if select_lang == 'en':
            resp = make_response(redirect('/painel'))
            resp.set_cookie('lang', 'en', max_age=datetime.timedelta(days=365))
            return resp


        return redirect('/painel/pontos')

