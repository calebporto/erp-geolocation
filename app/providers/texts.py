from flask_login import current_user


main_pt_texts = {
    'lang': 'pt-br',
    'titulo-pagina': 'Painel - M Souza',
    'titulo': 'Painel Administrativo',
    'aside': {
        'user-name': 'Bem vindo, ',
        'aside-sair': 'Sair',
        'pontos': 'Pontos',
        'books': 'Books',
        'fornecedores': 'Fornecedores',
        'conversor': 'Conversor',
        'equipe': 'Equipe'
    }
}
main_es_texts = {
    'lang': 'es',
    'titulo-pagina': 'Painel - M Souza',
    'titulo': 'Panel Administrativo',
    'aside': {
        'user-name': 'Bienvenido, ',
        'aside-sair': 'Salir',
        'pontos': 'Lugares',
        'books': 'Books',
        'fornecedores': 'Proveedores',
        'conversor': 'Convertidor',
        'equipe': 'Equipo'
    }
}
main_en_texts = {
    'lang': 'en',
    'titulo-pagina': 'Painel - M Souza',
    'titulo': 'Administrative Panel',
    'aside': {
        'user-name': 'Welcome, ',
        'aside-sair': 'Exit',
        'pontos': 'Spots',
        'books': 'Books',
        'fornecedores': 'Providers',
        'conversor': 'Converter',
        'equipe': 'Team'
    }
}
# Pontos
pontos_menu_texts = {
    'pt-br': {
        'lista': 'Lista',
        'mapa': 'Mapa',
        'importarZip': 'Importar ZIP',
        'importar': 'Importar XLSX'
    }, 'en': {
        'lista': 'List',
        'mapa': 'Map',
        'importarZip': 'ZIP Import',
        'importar': 'XLSX Import'
    }, 'es': {
        'lista': 'Lista',
        'mapa': 'Mapa',
        'importarZip': 'Importar ZIP',
        'importar': 'Importar XLSX'
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
importar_zip_content_text = {
    'pt-br': {
        'observacoes': '''
        O seu arquivo .zip deve conter somente planilhas no formato
        .xlsx, e não pode conter pastas.
        ''',
        'legenda1': 'Selecione um arquivo ZIP:',
        'legenda2': 'Somente formato .zip / Máximo 5 MB',
        'enviarBt': 'Enviar',
        'padronizarLabel': 'Padronizar campos (Opcional):',
        'cidadeLabel': 'Cidade:',
        'empresaLabel': 'Empresa:',
        'custoLabel': 'Custo Líquido:',
        'estadoLabel': 'Estado:',
        'zonaLabel': 'Zona:',
        'valorTabelaLabel': 'Valor de Tabela:',
        'valorNegociadoLabel': 'Valor Negociado:',
        'formatoLabel': 'Formato:',
        'paisLabel': 'Selecione o país (Obrigatório):',
        'defaultOption': '-- Selecione --'
    }, 'es-ar': {
        'observacoes': '''
        Su archivo .zip solo debe contener hojas de trabajo en formato .xlsx y no puede contener carpetas.
        ''',
        'legenda1': 'Seleccione un archivo ZIP:',
        'legenda2': 'Solo formato .zip / Máximo 5 MB',
        'enviarBt': 'Mandar',
        'padronizarLabel': 'Estandarizar campos (Opcional):',
        'cidadeLabel': 'Ciudad:',
        'empresaLabel': 'Empresa:',
        'custoLabel': 'Costo neto:',
        'estadoLabel': 'Estado:',
        'zonaLabel': 'Zona:',
        'valorTabelaLabel': 'Valor de la tabla:',
        'valorNegociadoLabel': 'Valor negociado:',
        'formatoLabel': 'Formato:',
        'paisLabel': 'Seleccionar país (Obligatorio):',
        'defaultOption': '-- Seleccionar --'
    }, 'en': {
        'observacoes': '''
        Your .zip file must only contain worksheets in .xlsx format, and cannot contain directories.
        ''',
        'legenda1': 'Select a ZIP file:',
        'legenda2': '.zip format only / Maximum 5 MB',
        'enviarBt': 'Send',
        'padronizarLabel': 'Standardize fields (Optional):',
        'cidadeLabel': 'City:',
        'empresaLabel': 'Company:',
        'custoLabel': 'Net Cost:',
        'estadoLabel': 'State:',
        'zonaLabel': 'Zone:',
        'valorTabelaLabel': 'Table value:',
        'valorNegociadoLabel': 'Negotiated value:',
        'formatoLabel': 'Format:',
        'paisLabel': 'Select the country (required):',
        'defaultOption': '-- Select --'
    }
}
visualizar_pontos_content_text = {
    'pt_br': {
        'adicionarFiltro': 'Adicionar Filtro',
        'limparFiltros': 'Limpar Filtros',
        'adicionarFiltroConfirmarBt': 'Adicionar',
        'adicionarFiltroCancelarBt': 'Cancelar',
        'adicionarFiltroModalTitle': 'Adicionar Filtro:',
        'pais': 'País:',
        'paisDefaultOpt': '-- Selecione um país --',
        'paisBrasilOpt': 'Brasil',
        'paisArgentinaOpt': 'Argentina',
        'paisInglaterraOpt': 'Inglaterra',
        'codigo': 'Código:',
        'cidade': 'Cidade:',
        'estado': 'Estado:',
        'zona': 'Zona:',
        'bairro': 'Bairro:',
        'endereco': 'Endereço:',
        'empresa': 'Empresa:',
        'formato': 'Formato:',
        'notFilters': 'Sem Filtros.'
    }, 'es': {
        'adicionarFiltro': 'Añadir Filtro',
        'limparFiltros': 'Limpiar Filtros',
        'adicionarFiltroConfirmarBt': 'Agregar',
        'adicionarFiltroCancelarBt': 'Cancelar',
        'adicionarFiltroModalTitle': 'Añadir Filtro:',
        'pais': 'País:',
        'paisDefaultOpt': '-- Seleccione um país --',
        'paisBrasilOpt': 'Brasil',
        'paisArgentinaOpt': 'Argentina',
        'paisInglaterraOpt': 'Inglaterra',
        'codigo': 'Código:',
        'cidade': 'Ciudad:',
        'estado': 'Estado:',
        'zona': 'Zona:',
        'bairro': 'Barrio:',
        'endereco': 'Dirección:',
        'empresa': 'Empresa:',
        'formato': 'Formato:',
        'notFilters': 'Sin Filtros.'
    }, 'en': {
        'adicionarFiltro': 'Add Filter',
        'limparFiltros': 'Clear Filters',
        'adicionarFiltroConfirmarBt': 'Add',
        'adicionarFiltroCancelarBt': 'Cancel',
        'adicionarFiltroModalTitle': 'Add Filter:',
        'pais': 'Coutry:',
        'paisDefaultOpt': '-- Select a Country --',
        'paisBrasilOpt': 'Brazil',
        'paisArgentinaOpt': 'Argentina',
        'paisInglaterraOpt': 'England',
        'codigo': 'Code:',
        'cidade': 'City:',
        'estado': 'State:',
        'zona': 'Zone:',
        'bairro': 'District:',
        'endereco': 'Address:',
        'empresa': 'Company:',
        'formato': 'Format:',
        'notFilters': 'No filters.'
    }
}
#Books
books_menu_texts = {
    'pt-br': {
        'lista': 'Lista',
        'criar': 'Criar Book'
    }, 'en': {
        'lista': 'List',
        'criar': 'Create Book'
    }, 'es': {
        'lista': 'Lista',
        'criar': 'Crear Book'
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
        'novo': 'Novo Fornecedor'
    }, 'en': {
        'lista': 'List',
        'novo': 'New Provider'
    }, 'es': {
        'lista': 'Lista',
        'novo': 'Nuevo Proveedor'
    }
}
novo_fornecedor_texts = {
    'pt-br': {
        'nome': 'Nome',
        'site': 'Site',
        'executivo': 'Executivo',
        'email1': 'E-mail Principal',
        'email2': 'E-mail Secundário',
        'tel1': 'Telefone Principal',
        'tel2': 'Telefone Secundário',
        'relation': 'Nível de Relacionamento',
        'option': 'Selecione um Nível',
        'confirmarBt': 'Cadastrar',
        'cancelarBt': 'Cancelar'
    }, 'en': {
        'nome': 'Name',
        'site': 'Site',
        'executivo': 'Officer',
        'email1': 'Primary E-mail',
        'email2': 'Secondary E-mail',
        'tel1': 'Main Phone',
        'tel2': 'Secondary Phone',
        'relation': 'Relation Level',
        'option': 'Select a Level',
        'confirmarBt': 'Register',
        'cancelarBt': 'Cancel'
    }, 'es': {
        'nome': 'Nombre',
        'site': 'Sitio',
        'executivo': 'Ejecutivo',
        'email1': 'Email Principal',
        'email2': 'Email Secundario',
        'tel1': 'Teléfono Principal',
        'tel2': 'Teléfono Secundario',
        'relation': 'Nível de Relación',
        'option': 'Seleccione um Nível',
        'confirmarBt': 'Registrar',
        'cancelarBt': 'Cancelar'
    }
}

# Conversor
conversor_menu_texts = {
    'pt-br': {
        'kml': 'KML para Excel'
    }, 'en': {
        'kml': 'KML para Excel'
    }, 'es': {
        'kml': 'KML to Excel'
    }
}
kml_content_text = {
    'pt-br': {
        'legenda1': 'Selecione um arquivo KML:',
        'legenda2': 'Somente formato .kml',
        'converterBt': 'Converter'
    }, 'es-ar': {
        'legenda1': 'Seleccione un archivo KML:',
        'legenda2': 'Solo formato .kml',
        'converterBt': 'Convertir'
    }, 'en': {
        'legenda1': 'Select an KML file:',
        'legenda2': '.kml format only',
        'converterBt': 'Convert'
    }
}

# Equipe
equipe_menu_texts = {
    'pt-br': {
        'lista': 'Colaboradores',
        'novo': 'Novo Colaborador'
    }, 'es': {
        'lista': 'Colaboradores',
        'novo': 'Nuevo Colaborador'
    }, 'en': {
        'lista': 'Collaborators',
        'novo': 'New Collaborator'
    }
}
novo_colaborador_texts = {
    'pt-br': {
        'nome': 'Nome',
        'email': 'E-mail',
        'senha1': 'Escolha uma Senha:',
        'senha2': 'Confirme a Senha:',
        'confirmarBt': 'Cadastrar',
        'cancelarBt': 'Cancelar'
    }, 'en': {
        'nome': 'Name',
        'email': 'E-mail',
        'senha1': 'Choose a password:',
        'senha2': 'Confirm the Password:',
        'confirmarBt': 'Register',
        'cancelarBt': 'Cancel'
    }, 'es': {
        'nome': 'Nombre',
        'email': 'E-mail',
        'senha1': 'Elije una Contraseña:',
        'senha2': 'Confirme la Contraseña:',
        'confirmarBt': 'Registrar',
        'cancelarBt': 'Cancelar'
    }
}