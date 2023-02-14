from datetime import timedelta
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from dotenv import load_dotenv
load_dotenv()

db = SQLAlchemy()
login_manager = LoginManager()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'False'  # Desativando recurso do SQLAlchemy que gasta muita memória e não é utilizado
app.config['USE_SESSION_FOR_NEXT'] = 'True'  # Excluindo a variável 'next' da string de recirecionamento do login_required
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(weeks=1)
app.config['REMEMBER_COOKIE_REFRESH_EACH_REQUEST'] = True

login_manager.login_view = "/login"  # Definindo a página de redirecionamento caso o usuário não esteja logado através de login_required
login_manager.login_message = 'Você deve estar logado para acessar esta página.'

from .models import tables

from app.views.main import main_bp
app.register_blueprint(main_bp)
from app.views.login import login_bp
app.register_blueprint(login_bp)
from app.views.painel import painel_bp
app.register_blueprint(painel_bp)
from app.views.pontos import pontos_bp
app.register_blueprint(pontos_bp)
from app.views.books import books_bp
app.register_blueprint(books_bp)
from app.views.fornecedores import fornecedores_bp
app.register_blueprint(fornecedores_bp)
from app.views.conversor import conversor_bp
app.register_blueprint(conversor_bp)
from app.views.equipe import equipe_bp
app.register_blueprint(equipe_bp)

db.init_app(app)
login_manager.init_app(app)

with app.app_context():
    db.create_all()