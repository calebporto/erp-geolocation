from json import dumps
from flask import Blueprint, flash, redirect, render_template, request
from flask_login import current_user, login_required
from app.models.basemodels import Person_, Register_Response_
from app.models.tables import Person
from app.providers.texts import main_en_texts, main_es_texts, main_pt_texts, clientes_menu_texts, novo_fornecedor_texts
from app.providers.redis_services import get_redis_msg
from app import db

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

@clientes_bp.route('/novo', methods=['GET', 'POST'])
def novo_cliente():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        try:
            messages = []
            nome = request.form.get('nome')
            site = request.form.get('site') if request.form.get('site') else None
            executivo = request.form.get('executivo') if request.form.get('executivo') else None
            email1 = request.form.get('email1') if request.form.get('email1') else None
            email2 = request.form.get('email2') if request.form.get('email2') else None
            tel1 = request.form.get('tel1') if request.form.get('tel1') else None
            tel2 = request.form.get('tel2') if request.form.get('tel2') else None
            relation_level = int(request.form.get('relation')) if request.form.get('relation') and int(request.form.get('relation')) != -1 else None
            if not nome:
                messages.append('Campos obrigatórios estão faltando.')
                response  = Register_Response_(
                    status=False,
                    message=messages
                )
            else:
                new_provider = Person(
                    nome,
                    site,
                    executivo,
                    email1,
                    email2,
                    tel1,
                    tel2,
                    None,
                    2
                )
                db.session.add(new_provider)
                db.session.commit()
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Cliente registrado correctamente.')
                elif lang == 'en':
                    messages.append('Successfully registered client.')
                else:
                    messages.append('Cliente registrado com sucesso.')
                response  = Register_Response_(
                    status=True,
                    message=messages
                )
            return response.json()
        except Exception as error:
            print(str(error))
            response = Register_Response_(
                status=False,
                message=['Erro no servidor. Tente novamente']
            )
            return response.json()

    else:
        filter = request.args.get('filter')
        if filter == 'texts':
            if lang == 'es' or lang == 'es-ar':
                return dumps(novo_fornecedor_texts['es'])
            elif lang == 'en':
                return dumps(novo_fornecedor_texts['en'])
            else:
                return dumps(novo_fornecedor_texts['pt-br'])
            

@clientes_bp.route('/lista', methods=['GET', 'POST'])
def lista():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        id = int(request.form.get('id'))
        nome = request.form.get('nome')
        site = request.form.get('site') if request.form.get('site') else None
        executivo = request.form.get('executivo') if request.form.get('executivo') else None
        email1 = request.form.get('email1') if request.form.get('email1') else None
        email2 = request.form.get('email2') if request.form.get('email2') else None
        tel1 = request.form.get('tel1') if request.form.get('tel1') else None
        tel2 = request.form.get('tel2') if request.form.get('tel2') else None
        messages = []
        if not id or not nome:
            messages.append('Campos obrigatórios estão faltando.')
            response  = Register_Response_(
                status=False,
                message=messages
            )
        else:
            provider = Person.query.filter(Person.id == id).first()
            provider.name = nome
            provider.site = site
            provider.person_name = executivo
            provider.email1 = email1
            provider.email2 = email2
            provider.tel1 = tel1
            provider.tel2 = tel2
            db.session.add(provider)
            db.session.commit()
            if lang == 'es' or lang == 'es-ar':
                messages.append('Registro cambiado con éxito.')
            elif lang == 'en':
                messages.append('Registration changed successfully.')
            else:
                messages.append('Cadastro alterado com sucesso.')
            response  = Register_Response_(
                status=True,
                message=messages
            )
        return response.json()
    else:
        filter = request.args.get('filter')
        if filter == 'all':
            provider_list = Person.query.filter(Person.person_type == 2).all()
            for i, provider in enumerate(provider_list):
                data = Person_(
                    id=provider.id,
                    name=provider.name,
                    site=provider.site,
                    person_name=provider.person_name,
                    email1=provider.email1,
                    email2=provider.email2,
                    tel1=provider.tel1,
                    tel2=provider.tel2,
                    relation_level=provider.relation_level
                )
                provider_list[i] = data.dict()
            providers = sorted(provider_list, key=lambda row:row['name'])
            return dumps(providers)
        
        if filter == 'excluir':
            id = int(request.args.get('arg'))
            provider = Person.query.filter(Person.id == id).first()
            db.session.delete(provider)
            db.session.commit()
            messages = []
            if lang == 'es' or lang == 'es-ar':
                messages.append('Registro eliminado con éxito.')
            elif lang == 'en':
                messages.append('Registration removed successfully.')
            else:
                messages.append('Cadastro removido com sucesso.')
            response  = Register_Response_(
                status=True,
                message=messages
            )
            return response.json()