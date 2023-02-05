from flask_login import current_user


main_pt_texts = {
    'lang': 'pt-br',
    'titulo-pagina': 'Painel - M Souza',
    'titulo': 'Painel Administrativo',
    'aside': {
        'user-name': f'Bem vindo, ',
        'aside-sair': 'Sair',
        'pontos': 'Pontos',
        'books': 'Books',
        'fornecedores': 'Fornecedores',
        'clientes': 'Clientes',
        'equipe': 'Equipe'
    }
}
main_es_texts = {
    'lang': 'es',
    'titulo-pagina': 'Painel - M Souza',
    'titulo': 'Panel Administrativo',
    'aside': {
        'user-name': f'Bienvenido, ',
        'aside-sair': 'Salir',
        'pontos': 'Lugares',
        'books': 'Books',
        'fornecedores': 'Proveedores',
        'clientes': 'Clientes',
        'equipe': 'Equipo'
    }
}
main_en_texts = {
    'lang': 'en',
    'titulo-pagina': 'Painel - M Souza',
    'titulo': 'Administrative Panel',
    'aside': {
        'user-name': f'Welcome, ',
        'aside-sair': 'Exit',
        'pontos': 'Spots',
        'books': 'Books',
        'fornecedores': 'Providers',
        'clientes': 'Clients',
        'equipe': 'Team'
    }
}
# Pontos
pontos_menu_texts = {
    'pt-br': {
        'lista': 'Lista',
        'criar': 'Criar',
        'importar': 'Importar'
    }, 'en': {
        'lista': 'List',
        'criar': 'Create',
        'importar': 'Import'
    }, 'es': {
        'lista': 'Lista',
        'criar': 'Crear',
        'importar': 'Importar'
    }
}
importar_content_text = {
    'pt-br': {
        'legenda1': 'Selecione uma planilha Excel:',
        'legenda2': 'Somente formato .xlsx',
        'checkBook': 'Gerar Book',
        'enviarBt': 'Enviar'
    }, 'es-ar': {
        'legenda1': 'Seleccione una hoja de cálculo de Excel:',
        'legenda2': 'Solo formato .xlsx',
        'checkBook': 'Generar Book',
        'enviarBt': 'Mandar'
    }, 'en': {
        'legenda1': 'Select an Excel spreadsheet:',
        'legenda2': '.xlsx format only',
        'checkBook': 'Generate Book',
        'enviarBt': 'Send'
    }
}
#Books
books_menu_texts = {
    'pt-br': {
        'lista': 'Lista',
        'criar': 'Criar'
    }, 'en': {
        'lista': 'List',
        'criar': 'Create'
    }, 'es': {
        'lista': 'Lista',
        'criar': 'Crear'
    }
}
criar_content_text = {
    'pt-br': {
        'legenda1': 'Selecione uma planilha Excel:',
        'legenda2': 'Somente formato .xlsx',
        'checkBook': 'Gerar Book',
        'criarBt': 'Gerar Book'
    }, 'es-ar': {
        'legenda1': 'Seleccione una hoja de cálculo de Excel:',
        'legenda2': 'Solo formato .xlsx',
        'checkBook': 'Generar Book',
        'criarBt': 'Generar Book'
    }, 'en': {
        'legenda1': 'Select an Excel spreadsheet:',
        'legenda2': '.xlsx format only',
        'checkBook': 'Generate Book',
        'criarBt': 'Generate Book'
    }
}

# Fornecedores

fornecedores_menu_texts = {
    'pt-br': {
        'lista': 'Lista',
        'novo': 'Novo'
    }, 'en': {
        'lista': 'List',
        'novo': 'New'
    }, 'es': {
        'lista': 'Lista',
        'novo': 'Nuevo'
    }
}