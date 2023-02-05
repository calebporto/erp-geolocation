from flask import Blueprint, make_response, redirect, render_template, request
from flask_login import login_required
from app.providers.texts import main_en_texts, main_es_texts, main_pt_texts
from app.views.main import redis_db
from app.models.tables import Spot

painel_bp = Blueprint(
    'painel',
    __name__,
    url_prefix='/painel'
)

@painel_bp.route('/', methods=['GET', 'POST'])
@login_required
def painel():
    print(redis_db.get('teste1'))
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')
    if request.method == 'POST':
        pass
    else:
        select_lang = request.args.get('select-lang')
        if select_lang == 'pt-br':
            resp = make_response(redirect('/painel'))
            resp.set_cookie('lang', 'pt-br')
            return resp
        if select_lang == 'es':
            resp = make_response(redirect('/painel'))
            resp.set_cookie('lang', 'es')
            return resp
        if select_lang == 'en':
            resp = make_response(redirect('/painel'))
            resp.set_cookie('lang', 'en')
            return resp


        # Pegar cookie de linguagem para definir texts
        if lang == 'es':
            texts = main_es_texts
        elif lang == 'en':
            texts = main_en_texts
        else:
            texts = main_pt_texts
        return render_template('painel.html', texts=texts)

@painel_bp.route('/pontossss', methods=['GET', 'POST'])
def pontossss():
    if request.method == 'POST':
        pass
    else:
        filter_type = request.args.get('filterType')
        if filter_type:
            filter = request.args.get('filter')
            index = request.args.get('index')
            if filter_type == 'all':
                pontos = Spot.query.order_by(Spot.id.desc()).limit(50).all()
            elif filter_type == 'all_view_more':
                lower_id = index
                pontos = Spot.query.filter(Spot.id < lower_id).order_by(Spot.id.desc()).limit(50).all()
