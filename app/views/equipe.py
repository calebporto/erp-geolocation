from curses import flash
from json import dumps
from secrets import token_hex
from flask import Blueprint, redirect, render_template, request
from flask_login import current_user, login_required
from app.models.basemodels import Register_Response_, User_For_View_
from app.models.tables import User
from pymysql.err import IntegrityError as IntegrityError2
from sqlalchemy.exc import IntegrityError
from app.providers.functions import alternative_id_generator
from app.providers.hash_provider import hash_generate
from app.providers.redis_services import get_redis_msg
from app import db
from app.providers.texts import equipe_menu_texts, main_en_texts, main_es_texts, main_pt_texts, novo_colaborador_texts
equipe_bp = Blueprint(
    'equipe',
    __name__,
    url_prefix='/painel/equipe'
)

@equipe_bp.route('/')
@login_required
def equipe():
    lang = request.cookies.get('lang')
    if lang == None:
        return redirect('/select-language')
    
    if request.args.get('arg') == 'top-menu':
        texts = equipe_menu_texts
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
    return render_template('equipe.html', texts=texts)

@equipe_bp.route('/novo-colaborador', methods=['GET', 'POST'])
@login_required
def novo_colaborador():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        try:
            messages = []
            nome = request.form.get('nome')
            email = request.form.get('email')
            senha = request.form.get('senha')
            if not nome or not email or not senha:
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Registro invalido.')
                elif lang == 'en':
                    messages.append('Invalid data.')
                else:
                    messages.append('Dados inválidos.')
                response = Register_Response_(
                    status=False,
                    message=messages
                )
                return response.json()
            user_check = User.query.filter(User.email == email).first()
            if user_check != None:
                if lang == 'es' or lang == 'es-ar':
                    messages.append('E-mail ya registrado.')
                elif lang == 'en':
                    messages.append('E-mail already registered.')
                else:
                    messages.append('E-mail já registrado.')
                response = Register_Response_(
                    status=False,
                    message=messages
                )
                return response.json()
            else:
                alternative_id = alternative_id_generator()
                new_user = User(
                    alternative_id,
                    nome,
                    email,
                    hash_generate(senha),
                    False,
                    True
                )
                db.session.add(new_user)
                db.session.commit()
                
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Empleado registrado con éxito.')
                elif lang == 'en':
                    messages.append('Employee registered successfully.')
                else:
                    messages.append('Colaborador cadastrado com sucesso.')
                response = Register_Response_(
                    status=True,
                    message=messages
                )
                return response.json()
        except Exception as error:
            print(str(error))
            response = Register_Response_(
                status=False,
                message=['Erro no servidor. Tente Novamente.']
            )
            return response.json()
    else:
        filter = request.args.get('filter')
        if filter == 'texts':
            if lang == 'es' or lang == 'es-ar':
                return dumps(novo_colaborador_texts['es'])
            elif lang == 'en':
                return dumps(novo_colaborador_texts['en'])
            else:
                return dumps(novo_colaborador_texts['pt-br'])
            
@equipe_bp.route('/lista', methods=['GET', 'POST'])
@login_required
def lista_de_colaboradores():
    lang = request.cookies.get('lang')
    if request.method == 'POST':
        messages = []
        request_type = request.form.get('type')
        id = request.form.get('id')
        if request_type == 'editar':
            try:
                nome = request.form.get('nome')
                email = request.form.get('email')
                if not nome or not email:
                    response = Register_Response_(
                        status=False,
                        message=['Dados inválidos']
                    )
                    return response.json()
                user = User.query.filter(User.id == id).first()
                user.name = str(nome)
                user.email = str(email)
                db.session.add(user)
                db.session.commit()
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Cambio realizado con éxito.')
                elif lang == 'en':
                    messages.append('Change made successfully.')
                else:
                    messages.append('Alteração efetuada com sucesso.')
                response = Register_Response_(
                    status=True,
                    message=messages
                )
                return response.json()
            except Exception as error:
                print(str(error))
                response = Register_Response_(
                    status=False,
                    message=['Erro no servidor']
                )
                return response.json()
        if request_type == 'novaSenha':
            try:
                senha1 = request.form.get('senha1')
                senha2 = request.form.get('senha2')
                if senha1 != senha2:
                    response = Register_Response_(
                        status=False,
                        message=['As senhas não conferem.']
                    )
                    return response.json()
                user = User.query.filter(User.id == id).first()
                user.hash = hash_generate(str(senha1))
                user.alternative_id = alternative_id_generator()
                db.session.add(user)
                db.session.commit()
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Cambio realizado con éxito.')
                elif lang == 'en':
                    messages.append('Change made successfully.')
                else:
                    messages.append('Alteração efetuada com sucesso.')
                response = Register_Response_(
                    status=True,
                    message=messages
                )
                return response.json()
                
            except Exception as error:
                print(str(error))
                response = Register_Response_(
                    status=False,
                    message=['Erro no Servidor. Tente novamente.']
                )
                return response.json()
    else:
        messages = []
        if request.args.get('filter'):
            filtro = request.args.get('filter')
            if filtro == 'all':
                lista_db = User.query.all()
                for i, item in enumerate(lista_db):
                    user = User_For_View_(
                        id=item.id,
                        name=item.name,
                        email=item.email,
                        is_admin=item.is_admin,
                        is_collaborator=item.is_collaborator
                    )
                    lista_db[i] = user.dict()
                lista_ordenada = sorted(lista_db, key=lambda row:row['name'].lower())
                return dumps(lista_ordenada)
            if filtro == 'excluir':
                id = request.args.get('arg')
                if not id:
                    response = Register_Response_(
                        status=False,
                        message=['Erro no servidor. Atualize a página e tente novamente.']
                    )
                    return response.json()
                user = User.query.filter(User.id == id).first()
                db.session.delete(user)
                db.session.commit()
                if lang == 'es' or lang == 'es-ar':
                    messages.append('Usuario eliminado con éxito.')
                elif lang == 'en':
                    messages.append('User removed successfully.')
                else:
                    messages.append('Usuário removido com sucesso.')
                response = Register_Response_(
                    status=True,
                    message=messages
                )
                return response.json()