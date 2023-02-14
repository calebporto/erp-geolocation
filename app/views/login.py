import datetime
from flask import Blueprint, flash, make_response, redirect, render_template, request
from flask_login import current_user, login_user, logout_user
import datetime
from app.models.tables import User
from app.providers.hash_provider import check_password

login_bp = Blueprint(
    'login',
    __name__
)

@login_bp.route('/select-language')
def select_language():
    if request.cookies.get('lang'):
        return redirect('/login')

    language = request.args.get('selected')
    if language == 'pt':
        try:
            if current_user.name:
                resp = make_response(redirect('/painel'))
                resp.set_cookie('lang', 'pt-br', max_age=datetime.timedelta(days=365))
                return resp
        except:
            pass
        resp = make_response(redirect('/login'))
        resp.set_cookie('lang', 'pt-br', max_age=datetime.timedelta(days=365))
        return resp
    if language == 'es':
        try:
            if current_user.name:
                resp = make_response(redirect('/painel'))
                resp.set_cookie('lang', 'es', max_age=datetime.timedelta(days=365))
                return resp
        except:
            pass
        resp = make_response(redirect('/login'))
        resp.set_cookie('lang', 'es', max_age=datetime.timedelta(days=365))
        return resp
    if language == 'en':
        try:
            if current_user.name:
                resp = make_response(redirect('/painel'))
                resp.set_cookie('lang', 'en', max_age=datetime.timedelta(days=365))
                return resp
        except:
            pass
        resp = make_response(redirect('/login'))
        resp.set_cookie('lang', 'en', max_age=datetime.timedelta(days=365))
        return resp
    return render_template('select-language.html')

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.cookies.get('lang') == None:
        return redirect('/select-language')
    
    try:
        if current_user.name:
            return redirect('/painel')
    except:
        pass

    if request.method == 'POST':
        email = request.form.get('email')
        senha = request.form.get('senha')
        lembrar_me = request.form.get('lembrar-me')

        user = User.query.filter(User.email == email).first()
        if not user:
            flash('Usuário Inválido')
            return redirect('/login')
        if not check_password(senha, user.hash):
            flash('Senha Inválida')
            return redirect('/login')
        if lembrar_me == 'on':
            login_user(user, remember=True)
        else:
            print(user)
            login_user(user, remember=False)

        return redirect('painel')
    else:
        pt_texts = {
            'lang': 'pt-br',
            'titulo': 'Login',
            'email': 'E-mail',
            'senha': 'Senha',
            'entrar-bt':'Entrar'
        }
        texts = pt_texts
        return render_template('login.html', texts=texts)

@login_bp.route('/logout')
def logout():
    logout_user()
    return redirect('/login')