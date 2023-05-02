import { Ponto_Basic, Ponto_Commercial, Ponto_Private } from './classes.js'
import { alertGenerate, lang, body } from './patternFunctions.js'

var allTexts = {
    'pt': {
        'codigo': 'Código',
        'endereco': 'Endereço',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
        'image_link': 'Link da imagem',
        'reference': 'Referência',
        'district': 'Bairro',
        'city': 'Cidade',
        'zone': 'Zona',
        'state': 'Estado',
        'country': 'País',
        'format': 'Formato',
        'measure': 'Medida',
        'include_date': 'Data de cadastro',
        'impacto': 'Impacto',
        'valor_tabela_comm': 'Valor de tabela comercial',
        'valor_negociado_comm': 'Valor negociado comercial',
        'producao': 'Produção',
        'observacoes_comm': 'Observações comerciais',
        'outros_comm': 'Outros (comercial)',
        'empresa': 'Empresa',
        'valor_negociado_int': 'Valor negociado interno',
        'custo_liq': 'Custo líquido',
        'medida_int': 'Medida interna',
        'observacoes_int': 'Observações internas',
        'outros_int': 'Outros (interno)',
        'visualizar': 'Visualizar',
        'editar': 'Editar',
        'excluir': 'Excluir',
        'fecharBt': 'Fechar',
        'confirmarBt': 'Confirmar',
        'cancelarBt': 'Cancelar',
        'certeza': 'Tem certeza?',
        'excluirModalBody1': 'Após a exclusão, todo o cadastro do ponto ',
        'excluirModalBody2': ' em ',
        'excluirModalBody3': ' será apagado.',
        'divCriarBookModalTitle': 'Criar book com os pontos selecionados',
        'selectColumnsTitle': 'Selecione as colunas (no máximo 15):',
        'bookName': 'Nome do book (Obrigatorio):',
        'personName': 'Nome do executivo (Opcional):',
        'clientName': 'Nome da empresa/cliente (Opcional):',
        'patternImageLink': 'Foto',
        'patternValorTabelaComm': 'Valor tabela',
        'patternValorNegociadoComm': 'Valor negociado',
        'patternObservacoesComm': 'Observacoes',
        'patternObservacoesInt': 'Comentarios internos',
        'divEditarGrupoModalTitle': 'Alterar colunas em grupo',
        'excluirGrupoModalBody': 'Após a excusão dos pontos selecionados, não será possível reverter.',
        'raioRangeLabel': 'Raio de busca',
        'raioSearchTitle': 'Clique para criar um ponto de busca no mapa',
        'polygonSearchTitle': 'Clique para criar uma área de busca',
        'resultText': ' pontos encontrados.',
        'gerarBookBt': 'Gerar book',
        'limparBt':'Limpar Pesquisa',
        'buscarBt': 'Buscar',
        'searchBox': 'Digite um endereço'
    }, 'es': {
        'codigo': 'Código',
        'endereco': 'Dirección',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
        'image_link': 'Enlace de imágen',
        'reference': 'Referencia',
        'district': 'Barrio',
        'city': 'Ciudad',
        'zone': 'Zona',
        'state': 'Estado',
        'country': 'País',
        'format': 'Formato',
        'measure': 'Medida',
        'include_date': 'Fecha de registro',
        'impacto': 'Impacto',
        'valor_tabela_comm': 'Valor de la tabla comercial',
        'valor_negociado_comm': 'Valor negociado comercial',
        'producao': 'Producción',
        'observacoes_comm': 'Comentarios comerciales',
        'outros_comm': 'Otros (comercial)',
        'empresa': 'Empresa',
        'valor_negociado_int': 'Valor negociado interno',
        'custo_liq': 'Costo neto',
        'medida_int': 'Medida interna',
        'observacoes_int': 'Comentarios internos',
        'outros_int': 'Otros (interno)',
        'visualizar': 'Ver',
        'editar': 'Editar',
        'excluir': 'Borrar',
        'fecharBt': 'Cerrar',
        'confirmarBt': 'Confirmar',
        'cancelarBt': 'Cancelar',
        'certeza': '?Está seguro?',
        'excluirModalBody1': 'Después de la eliminación, todo el registro del punto ',
        'excluirModalBody2': ' en ',
        'excluirModalBody3': ' se eliminará.',
        'divCriarBookModalTitle': 'Crear book con puntos seleccionados.',
        'selectColumnsTitle': 'Seleccionar columnas (máximo 15):',
        'bookName': 'Nombre del book (Obligatorio):',
        'personName': 'Nombre del ejecutivo (Opcional):',
        'clientName': 'Nombre de la empresa/cliente (Opcional):',
        'patternImageLink': 'Foto',
        'patternValorTabelaComm': 'Valor de la tabla',
        'patternValorNegociadoComm': 'Valor negociado',
        'patternObservacoesComm': 'Comentarios',
        'patternObservacoesInt': 'Comentarios internos',
        'divEditarGrupoModalTitle': 'Cambiar columnas en grupo',
        'excluirGrupoModalBody': 'Después de eliminar los puntos seleccionados, no será posible revertirlos.',
        'raioRangeLabel': 'Radio de busqueda',
        'raioSearchTitle': 'Haga clic para crear un punto de búsqueda en el mapa',
        'polygonSearchTitle': 'Haga clic para crear un área de búsqueda',
        'resultText': ' puntos encontrados.',
        'gerarBookBt': 'Generar book',
        'limparBt':'Borrar búsqueda',
        'buscarBt': 'Buscar',
        'searchBox': 'Introduce una dirección'
    }, 'en': {
        'codigo': 'Code',
        'endereco': 'Address',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
        'image_link': 'Image link',
        'reference': 'Reference',
        'district': 'District',
        'city': 'City',
        'zone': 'Zone',
        'state': 'State',
        'country': 'Country',
        'format': 'Format',
        'measure': 'Measure',
        'include_date': 'Include date',
        'impacto': 'Impact',
        'valor_tabela_comm': 'Commercial table value',
        'valor_negociado_comm': 'Commercial negotiated value',
        'producao': 'Production',
        'observacoes_comm': 'Comercial comments',
        'outros_comm': 'Others (commercial)',
        'empresa': 'Company',
        'valor_negociado_int': 'Internal negotiated value',
        'custo_liq': 'Net cost',
        'medida_int': 'Internal measurement',
        'observacoes_int': 'Internal comments',
        'outros_int': 'Others (internal)',
        'visualizar': 'View',
        'editar': 'Edit',
        'excluir': 'Remove',
        'fecharBt': 'Close',
        'confirmarBt': 'Confirm',
        'cancelarBt': 'Cancel',
        'certeza': 'Are you sure?',
        'excluirModalBody1': 'After deletion, the entire record of point ',
        'excluirModalBody2': ' in ',
        'excluirModalBody3': ' will be deleted.',
        'divCriarBookModalTitle': 'Create book with selected points',
        'selectColumnsTitle': 'Select columns (maximum 15):',
        'bookName': 'Book name (required):',
        'personName': 'Employee name (Optional):',
        'clientName': 'Company/Client name (Optional):',
        'patternImageLink': 'Photo',
        'patternValorTabelaComm': 'Average media value',
        'patternValorNegociadoComm': 'Our media value',
        'patternObservacoesComm': 'Comments',
        'patternObservacoesInt': 'Internal comments',
        'divEditarGrupoModalTitle': 'Change columns in group',
        'excluirGrupoModalBody': 'After deleting the selected points, it will not be possible to revert.',
        'raioRangeLabel': 'Search radius',
        'raioSearchTitle': 'Click to create a search point on the map',
        'polygonSearchTitle': 'Click to create a search area',
        'resultText': ' points found.',
        'gerarBookBt': 'Book generate',
        'limparBt':'Clear search' ,
        'buscarBt': 'Search',
        'searchBox': 'Enter an address'
    }
}
var pontos = {
    'length': null,
    'pontos': []
}
var filtros = {
    'view': 'list',
    'type': 'all',
    'coordinates': {'lat': null, 'lng': null},
    'radius': null,
    'id': 0,
    'codigo': [],
    'pais': [],
    'estado': [],
    'cidade': [],
    'zona': [],
    'bairro': [],
    'endereco': [],
    'formato': [],
    'empresa': []
}
var pontosSelecionadosId = []

var markerClickAction; // Altera clique no marcador do mapa entre visualizar modal ou selecionar
var allMarkers = []

function createMarkerClickBt() {
    let divActionsBtGroup = document.querySelector('.divActionsBtGroup')
    let selectAll = document.querySelector('#selectAll')
    let changeMarkerClickBt = document.createElement('div')
    changeMarkerClickBt.className = 'viewBt viewBtMap'
    changeMarkerClickBt.id = 'viewBtMap'
    changeMarkerClickBt.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
    </svg>
    `
    changeMarkerClickBt.addEventListener('click', () => {
        selectAll.checked = false
        if (markerClickAction == 'view') {
            markerClickAction = 'select'
            changeMarkerClickBt.classList.add('select')
        } else if (markerClickAction == 'select') {
            markerClickAction = 'view'
            changeMarkerClickBt.classList.remove('select')
        }
    })
    return changeMarkerClickBt
}
function createSearchBox(map) {
    let texts;
    if (lang == 'es' || lang == 'es-ar') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }
    let input = document.createElement('input')
    input.className = 'placesSearchInput'
    input.id = 'placesSearchInput'
    input.placeholder = texts.searchBox
    let searchBox = new google.maps.places.SearchBox(input)
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    // Bias the SearchBox results towards current map's viewport.
    searchBox.addListener("places_changed", (e) => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return
        }
        const bounds = new google.maps.LatLngBounds()
        places.forEach(place => {
            if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
            } else {
            bounds.extend(place.geometry.location);
            }
            let marker = new google.maps.Marker({
                position: place.geometry.location,//seta posição
                map: map,//Objeto mapa
                title: place.name,//string que será exibida quando passar o mouse no marker
                icon: '/static/media/icons8-aqui-24.png'
            });
        })
        map.fitBounds(bounds)
    })
}
function createDivActions(texts) {
    let divActions = document.createElement('div')
    divActions.className = 'divActions'
    let divSelectAll = document.createElement('div')
    divSelectAll.className = 'divSelectAll'
    let selectAll = document.createElement('input')
    selectAll.type = 'checkbox'
    selectAll.id = 'selectAll'
    selectAll.className = 'selectAll'
    selectAll.addEventListener('change', () => {
        console.log(filtros['view'])
        console.log(filtros.view)
        if (filtros['view'] != 'map') {
            selectAllCheckbox()
        } else {
            selectAllMarkers()
        }
    })
    divSelectAll.appendChild(selectAll)
    divActions.appendChild(divSelectAll)
    let divActionsBtGroup = document.createElement('div')
    divActionsBtGroup.className = 'divActionsBtGroup'
    let divGerarExcel = document.createElement('div')
    divGerarExcel.className = 'divActionsOpt'
    divGerarExcel.id = 'divGerarExcel'
    let divGerarExcelText = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z"/>
    </svg>
    `
    divGerarExcel.innerHTML = divGerarExcelText
    divGerarExcel.removeEventListener('click', gerarExcelEvent)
    divGerarExcel.addEventListener('click', gerarExcelEvent = () => {
        divGerarExcel.innerHTML = `
        <div class="spinner-border spinner-border-sm text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        `
        let send = new FormData()
        send.append('type', 'gerarExcel')
        send.append('ids', JSON.stringify(pontosSelecionadosId))
        fetch('/painel/pontos/visualizar', {
            method: 'POST',
            body: send
        })
        .then((response) => {
            if (!response.ok) {
                divGerarExcel.innerHTML = divGerarExcelText
                if (lang == 'es' || lang == 'es-ar') {
                    alertGenerate(body, 'Erro del servidor.')
                } else if (lang == 'en') {
                    alertGenerate(body, 'Server error.')
                } else {
                    alertGenerate(body, 'Erro no servidor.')
                }
            } else {
                return response.json()
                .then((dados) => {
                    divGerarExcel.innerHTML = divGerarExcelText
                    dados.message.forEach(message => {
                        alertGenerate(body, message)
                    })
                    window.open(`/painel/conversor/kml/download/${dados.data}`)
                })
            }
        })
    })
    divActionsBtGroup.appendChild(divGerarExcel)
    let divCriarBook = document.createElement('div')
    divCriarBook.className = 'divActionsOpt'
    divCriarBook.id = 'divCriarBook'
    divCriarBook.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
        <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
    </svg>
    `
    let sendBookEvent;
    let cancelBookEvent;
    divCriarBook.addEventListener('click', () => {
        $('#criarBookModal').modal('show')
        let modalBody = document.querySelector('#selectModalBody')
        let modalTitle = document.querySelector('#modalColumnsTitle')
        let allColumnsCheckbox = document.getElementsByClassName('select-column-checkbox')
        let sendBookBt = document.querySelector('#sendBook')
        sendBookBt.removeEventListener('click', sendBookEvent)
        sendBookBt.addEventListener('click', sendBookEvent = () => {
            sendBookBt.innerHTML = `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `
            let bookColumnList = []
            for (let i = 0; i < allColumnsCheckbox.length; i++) {
                let checkbox = allColumnsCheckbox[i]
                if (checkbox.checked == true) {
                    bookColumnList.push(checkbox.value)
                }
            }
            if (bookColumnList.length > 15) {
                if (lang == 'es' || lang == 'es-ar'){
                    alertGenerate(modalBody, 'Máximo 15 columnas')
                } else if (lang == 'en'){
                    alertGenerate(modalBody, 'Máximum 15 columns')
                } else {
                    alertGenerate(modalBody, '15 colunas no máximo')
                }
                modalTitle.focus()
                sendBookBt.innerHTML = texts.confirmarBt
                return
            }
            let bookName = document.querySelector('#bookName').value
            let personName = document.querySelector('#personName').value
            let clientName = document.querySelector('#clientName').value
            if (!bookName) {
                if (lang == 'es' || lang == 'es-ar'){
                    alertGenerate(modalBody, 'Elije um nombre para el book')
                } else if (lang == 'en'){
                    alertGenerate(modalBody, 'Choose a name for the book')
                } else {
                    alertGenerate(modalBody, 'Escolha um nome para o book')
                }
                modalTitle.focus()
                sendBookBt.innerHTML = texts.confirmarBt
                return
            }
            let send = new FormData()
            send.append('type', 'gerarBook')
            send.append('columns', JSON.stringify(bookColumnList))
            send.append('idList', JSON.stringify(pontosSelecionadosId))
            send.append('bookName', bookName)
            send.append('personName', personName)
            send.append('clientName', clientName)
            fetch('/painel/pontos/visualizar', {
                method: 'POST',
                body: send
            })
            .then((response) => {
                if (!response.ok) {
                    sendBookBt.innerHTML = texts.confirmarBt
                    cancelBookEvent()
                    $('#criarBookModal').modal('hide')
                    if (lang == 'es' || lang == 'es-ar') {
                        alertGenerate(body, 'Erro del servidor.')
                    } else if (lang == 'en') {
                        alertGenerate(body, 'Server error.')
                    } else {
                        alertGenerate(body, 'Erro no servidor.')
                    }
                    carregarPontos()
                } else {
                    return response.json()
                    .then((dados) => {
                        sendBookBt.innerHTML = texts.confirmarBt
                        cancelBookEvent()
                        $('#criarBookModal').modal('hide')
                        dados.message.forEach(message => {
                            alertGenerate(body, message)
                        })
                        carregarPontos()
                        
                    })
                }
            })
        })
        let cancelBookBt = document.querySelector('#cancelBook')
        cancelBookBt.removeEventListener('click', cancelBookEvent)
        cancelBookBt.addEventListener('click', cancelBookEvent = () => {
            for (let i = 0; i < allColumnsCheckbox.length; i++) {
                let checkbox = allColumnsCheckbox[i]
                if (checkbox.disabled == false) {
                    checkbox.checked = false
                }
            }
            let bookName = document.querySelector('#bookName')
            let personName = document.querySelector('#personName')
            let clientName = document.querySelector('#clientName')
            bookName.value = ''  
            personName.value = ''  
            clientName.value = ''  
        })
    })
    let divCriarBookModal = document.createElement('div')
    divCriarBookModal.className = 'modal fade'
    divCriarBookModal.id = 'criarBookModal'
    divCriarBookModal.setAttribute('data-bs-backdrop', 'static')
    divCriarBookModal.setAttribute('data-bs-keyboard', 'false')
    divCriarBookModal.setAttribute('aria-labelledby', 'modalColumnsTitle')
    divCriarBookModal.tabIndex = '-1'
    divCriarBookModal.ariaHidden = true
    divCriarBookModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalColumnsTitle">${texts.divCriarBookModalTitle}</h5>
            </div>
            <div class="modal-body" id="selectModalBody">
                <div class="div-select-columns">
                    <div class="select-columns-title">${texts.selectColumnsTitle}</div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.codigo}" checked disabled>
                        <p class="select-column-label">${texts.codigo}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.endereco}" checked disabled>
                        <p class="select-column-label">${texts.endereco}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.latitude}" checked disabled>
                        <p class="select-column-label">${texts.latitude}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.longitude}" checked disabled>
                        <p class="select-column-label">${texts.longitude}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.patternImageLink}" checked disabled>
                        <p class="select-column-label">${texts.image_link}</p>
                    </div>
                    <div class="select-column">
                    <input type="checkbox" class="select-column-checkbox" value="${texts.district}" checked disabled>
                    <p class="select-column-label">${texts.district}</p>
                    </div>
                    <div class="select-column">
                    <input type="checkbox" class="select-column-checkbox" value="${texts.reference}" checked disabled>
                    <p class="select-column-label">${texts.reference}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.city}" checked disabled>
                        <p class="select-column-label">${texts.city}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.zone}">
                        <p class="select-column-label">${texts.zone}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.state}">
                        <p class="select-column-label">${texts.state}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.country}">
                        <p class="select-column-label">${texts.country}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.format}" checked disabled>
                        <p class="select-column-label">${texts.format}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.measure}">
                        <p class="select-column-label">${texts.measure}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.impacto}">
                        <p class="select-column-label">${texts.impacto}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.patternValorTabelaComm}">
                        <p class="select-column-label">${texts.valor_tabela_comm}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.patternValorNegociadoComm}">
                        <p class="select-column-label">${texts.valor_negociado_comm}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.producao}">
                        <p class="select-column-label">${texts.producao}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.patternObservacoesComm}">
                        <p class="select-column-label">${texts.observacoes_comm}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.empresa}">
                        <p class="select-column-label">${texts.empresa}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.valor_negociado_int}">
                        <p class="select-column-label">${texts.valor_negociado_int}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.custo_liq}">
                        <p class="select-column-label">${texts.custo_liq}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.medida_int}">
                        <p class="select-column-label">${texts.medida_int}</p>
                    </div>
                    <div class="select-column">
                        <input type="checkbox" class="select-column-checkbox" value="${texts.patternObservacoesInt}">
                        <p class="select-column-label">${texts.observacoes_int}</p>
                    </div>
                </div>
                <div class="div-book-inputs">
                    <div class="book-input-group">
                        <p class="book-label">${texts.bookName}</p>
                        <input type="text" class="book-input" id="bookName">
                    </div>
                    <div class="book-input-group">
                        <p class="book-label">${texts.personName}</p>
                        <input type="text" class="book-input" id="personName">
                    </div>
                    <div class="book-input-group">
                        <p class="book-label">${texts.clientName}</p>
                        <input type="text" class="book-input" id="clientName">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelBook" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.cancelarBt}</button>
                <button id="sendBook" type="button" class="btn btn-warning">${texts.confirmarBt}</button>
            </div>
        </div>
    </div>
    `
    divActionsBtGroup.appendChild(divCriarBookModal)
    divActionsBtGroup.appendChild(divCriarBook)
    divActions.appendChild(divActionsBtGroup)
    let divEditarGrupo = document.createElement('div')
    divEditarGrupo.className = 'divActionsOpt'
    divEditarGrupo.id = 'divEditarGrupo'
    divEditarGrupo.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
    `
    let allCheckboxEvent;
    let editarGrupoCancelarBtEvent;
    let editarGrupoConfirmarBtEvent;
    divEditarGrupo.addEventListener('click', () => {
        $('#editarGrupoModal').modal('show')
        let modalBody = document.querySelector('#editarGrupoModalBody')
        let modalTitle = document.querySelector('#editarGrupoModalTitle')
        let allCheckbox = document.getElementsByClassName('divEditarRadio')
        for (let i = 0; i < allCheckbox.length; i++) {
            let checkbox = allCheckbox[i]
            checkbox.removeEventListener('change', allCheckboxEvent)
            checkbox.addEventListener('change', allCheckboxEvent = () => {
                let input = document.querySelector('#'+ checkbox.value)
                if (checkbox.checked == true) {
                    input.disabled = false
                } else {
                    input.value = ''
                    input.disabled = true
                }
            })
        }
        let editarGrupoCancelarBt = document.querySelector('#editarGrupoCancelarBt')
        editarGrupoCancelarBt.removeEventListener('click', editarGrupoCancelarBtEvent)
        editarGrupoCancelarBt.addEventListener('click', editarGrupoCancelarBtEvent = () => {
            for (let i = 0; i < allCheckbox.length; i++) {
                let checkbox = allCheckbox[i]
                checkbox.checked = false
                let input = document.querySelector('#' + checkbox.value)
                input.value = ''
                input.disabled = true
            }
        })
        let editarGrupoConfirmarBt = document.querySelector('#editarGrupoConfirmarBt')
        editarGrupoConfirmarBt.removeEventListener('click', editarGrupoConfirmarBtEvent)
        editarGrupoConfirmarBt.addEventListener('click', editarGrupoConfirmarBtEvent = () => {
            editarGrupoConfirmarBt.innerHTML = `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `
            let inputs = document.getElementsByClassName('divEditarInput')
            let enabledInputCount = 0
            let send = new FormData()
            send.append('type', 'editarGrupo')
            send.append('idList', JSON.stringify(pontosSelecionadosId))
            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i]
                if (!input.value) {
                    continue
                }
                enabledInputCount++
                send.append(input.id, input.value)
            }
            
            fetch('/painel/pontos/visualizar', {
                method: 'POST',
                body: send
            })
            .then((response) => {
                if (!response.ok) {
                    editarGrupoConfirmarBt.innerHTML = texts.confirmarBt
                    editarGrupoCancelarBtEvent()
                    $('#editarGrupoModal').modal('hide')
                    if (lang == 'es' || lang == 'es-ar') {
                        alertGenerate(body, 'Erro del servidor.')
                    } else if (lang == 'en') {
                        alertGenerate(body, 'Server error.')
                    } else {
                        alertGenerate(body, 'Erro no servidor.')
                    }
                    carregarPontos()
                } else {
                    return response.json()
                    .then((dados) => {
                        editarGrupoConfirmarBt.innerHTML = texts.confirmarBt
                        editarGrupoCancelarBtEvent()
                        $('#editarGrupoModal').modal('hide')
                        dados.message.forEach(message => {
                            alertGenerate(body, message)
                        })
                        carregarPontos()
                    })
                }
            })
        })
    })
    divActionsBtGroup.appendChild(divEditarGrupo)
    let divEditarGrupoModal = document.createElement('div')
    divEditarGrupoModal.className = 'modal fade'
    divEditarGrupoModal.id = 'editarGrupoModal'
    divEditarGrupoModal.setAttribute('data-bs-backdrop', 'static')
    divEditarGrupoModal.setAttribute('data-bs-keyboard', 'false')
    divEditarGrupoModal.setAttribute('aria-labelledby', 'modalColumnsTitle')
    divEditarGrupoModal.tabIndex = '-1'
    divEditarGrupoModal.ariaHidden = true
    divEditarGrupoModal.innerHTML = `
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editarGrupoModalTitle">${texts.divEditarGrupoModalTitle}</h5>
            </div>
            <div class="modal-body" id="editarGrupoModalBody">
                <div class="divEditarItem">
                    <input type="checkbox" value="district" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.district}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="district" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="reference" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.reference}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="reference" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="city" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.city}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="city" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="zone" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.zone}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="zone" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="state" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.state}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="state" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="country" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.country}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="country" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="format" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.format}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="format" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="measure" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.measure}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="measure" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="impacto" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.impacto}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="impacto" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="valor_tabela_comm" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.valor_tabela_comm}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="valor_tabela_comm" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="valor_negociado_comm" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.valor_negociado_comm}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="valor_negociado_comm" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="producao" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.producao}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="producao" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="observacoes_comm" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.observacoes_comm}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="observacoes_comm" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="empresa" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.empresa}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="empresa" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="valor_negociado_int" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.valor_negociado_int}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="valor_negociado_int" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="custo_liq" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.custo_liq}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="custo_liq" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="medida_int" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.medida_int}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="medida_int" disabled> 
                </div>
                <div class="divEditarItem">
                    <input type="checkbox" value="observacoes_int" class="divEditarRadio">
                    <p class="divEditarLabel">${texts.observacoes_int}</p>
                    <input type="text" maxlength="50" class="divEditarInput" id="observacoes_int" disabled> 
                </div>
            <div class="modal-footer">
                <button id="editarGrupoCancelarBt" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.cancelarBt}</button>
                <button id="editarGrupoConfirmarBt" type="button" class="btn btn-warning">${texts.confirmarBt}</button>
            </div>
        </div>
    </div>
    `
    divActionsBtGroup.appendChild(divEditarGrupoModal)
    divActions.appendChild(divActionsBtGroup)
    let divExcluirGrupo = document.createElement('div')
    divExcluirGrupo.className = 'divActionsOpt'
    divExcluirGrupo.id = 'divExcluirGrupo'
    divExcluirGrupo.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
    </svg>
    `
    let excluirGrupoModalBtEvent;
    divExcluirGrupo.addEventListener('click', () => {
        $('#excluirGrupoModal').modal('show')
        let excluirGrupoModalConfirmarBt = document.querySelector('#excluirGrupoModalConfirmarBt')
        excluirGrupoModalConfirmarBt.removeEventListener('click', excluirGrupoModalBtEvent)
        excluirGrupoModalConfirmarBt.addEventListener('click', excluirGrupoModalBtEvent = () => {
            excluirGrupoModalConfirmarBt.innerHTML = `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `
            let send = new FormData()
            send.append('type', 'excluirGrupo')
            send.append('idList', JSON.stringify(pontosSelecionadosId))
            fetch('/painel/pontos/visualizar', {
                method: 'POST',
                body: send
            })
            .then((response) => {
                if (!response.ok) {
                    excluirGrupoModalConfirmarBt.innerHTML = texts.confirmarBt
                    $('#excluirGrupoModal').modal('hide')
                    if (lang == 'es' || lang == 'es-ar') {
                        alertGenerate(body, 'Erro del servidor.')
                    } else if (lang == 'en') {
                        alertGenerate(body, 'Server error.')
                    } else {
                        alertGenerate(body, 'Erro no servidor.')
                    }
                    carregarPontos()
                } else {
                    return response.json()
                    .then((dados) => {
                        excluirGrupoModalConfirmarBt.innerHTML = texts.confirmarBt
                        $('#excluirGrupoModal').modal('hide')
                        dados.message.forEach(message => {
                            alertGenerate(body, message)
                        })
                        carregarPontos()
                    })
                }
            })
        })
    })
    divActionsBtGroup.appendChild(divExcluirGrupo)
    let excluirGrupoModal = document.createElement('div')
    excluirGrupoModal.className = 'modal'
    excluirGrupoModal.classList.add('fade')
    excluirGrupoModal.id = `excluirGrupoModal`
    excluirGrupoModal.tabIndex = '-1'
    excluirGrupoModal.ariaHidden = true
    excluirGrupoModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabelexcluir">${texts.certeza}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            ${texts.excluirGrupoModalBody}
            </div>
            <div class="modal-footer">
                <button id="excluirGrupoModalCancelarBt" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.cancelarBt}</button>
                <button id="excluirGrupoModalConfirmarBt" type="submit" class="btn btn-warning">${texts.confirmarBt}</button>
            </div>
        </div>
    </div>
    `
    divActionsBtGroup.appendChild(excluirGrupoModal)
    divActions.appendChild(divActionsBtGroup)
    return divActions
}
function cleanFilters() {
    filtros = {
        'view': 'list',
        'type': 'all',
        'coordinates': {'lat': null, 'lng': null},
        'radius': null,
        'id': 0,
        'codigo': [],
        'pais': [],
        'estado': [],
        'cidade': [],
        'zona': [],
        'bairro': [],
        'endereco': [],
        'formato': [],
        'empresa': []
    }
}
function selectAllCheckbox() {
    console.log('allCheckbox')
    let selectAll = document.querySelector('#selectAll')
    let allCheckbox = document.getElementsByClassName('linhaCheckbox')
    if (selectAll.checked == true) {
        for (let i = 0; i < allCheckbox.length; i++) {
            let checkbox = allCheckbox[i]
            let linha = document.querySelector(`#linha${checkbox.value}`)
            linha.classList.add('select')
            checkbox.checked = true
            pontosSelecionadosId.push(parseInt(checkbox.value))
        }
    } else {
        for (let i = 0; i < allCheckbox.length; i++) {
            let checkbox = allCheckbox[i]
            let linha = document.querySelector(`#linha${checkbox.value}`)
            linha.classList.remove('select')
            checkbox.checked = false
            let index = pontosSelecionadosId.indexOf(checkbox.value)
            pontosSelecionadosId.splice(index, 1)
        }
    }
    displayActionsBts()
}
function selectAllMarkers() {
    console.log('selectAllMarker')

    let selectAll = document.querySelector('#selectAll')
    let viewBtMap = document.querySelector('#viewBtMap')
    pontosSelecionadosId = []
    if (allMarkers.length == 0) {
        return
    }
    allMarkers.forEach((el, index) => {
        if (selectAll.checked) {
            if (index == 0) {
                viewBtMap.classList.add('select')
                markerClickAction = 'select'
            }
            pontosSelecionadosId.push(parseInt(el.id))
            el.marker.setIcon('/static/media/icons8-maps-40.png')
        } else {
            if (index == 0) {
                viewBtMap.classList.remove('select')
                markerClickAction = 'view'
            }
            el.marker.setIcon(null)
        }
    })
    displayActionsBtsMap()
}
function displayActionsBtsMap() {
    let divActionsBtGroup = document.querySelector('.divActionsBtGroup')
    let selectAll = document.querySelector('#selectAll')
    if (pontosSelecionadosId.length > 0) {
        divActionsBtGroup.style.display = 'flex'
    } else {
        divActionsBtGroup.style.display = 'none'
    }
    if (pontosSelecionadosId.length == allMarkers.length) {
        selectAll.checked = true
    } else {
        selectAll.checked = false
    }
}
function displayActionsBts() {
    let allCheckbox = document.getElementsByClassName('linhaCheckbox')
    let divActionsBtGroup = document.querySelector('.divActionsBtGroup')
    let selectAll = document.querySelector('#selectAll')
    let is_checked = false
    let allChecked = true
    if (allCheckbox.length == 0) {
        allChecked = false
    } else {
        for (let i = 0; i < allCheckbox.length; i++) {
            if (allCheckbox[i].checked == true) {
                is_checked = true
            } else {
                allChecked = false
            }
        }
    }
    if (is_checked == true) {
        divActionsBtGroup.style.display = 'flex'
    } else {
        divActionsBtGroup.style.display = 'none'
    }
    if (allChecked == true) {
        selectAll.checked = true
    } else {
        selectAll.checked = false
    }
}
var initMap = function(divMap, center=null, radius=null) {
    pontosSelecionadosId = []
    markerClickAction = 'view'
    let texts;
    if (lang == 'es' || lang == 'es-ar') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }
    var mapOptions = {
        center: {lat: -23.5489, lng: -46.6388},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER,
        },
    }
    var map = new google.maps.Map(divMap, mapOptions)
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(createMarkerClickBt());
    createSearchBox(map)
    var latlngbounds = new google.maps.LatLngBounds() // Adequar o zoom para ver todos os pontos
    if (center) {
        map.setCenter(center)
        let flag = new google.maps.Marker({
            position: center,
            map:map,
            title: 'Center',
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
        let circle = new google.maps.Circle({
            map: map,
            center: center,
            radius: radius * 1000
          });
    }
    for (let i = 0; i < pontos.pontos.length; i++) {
        let ponto = pontos.pontos[i]
        let id = ponto.basic.id
        let coordenadas = new google.maps.LatLng(ponto.basic.latitude, ponto.basic.longitude)
        let marker = new google.maps.Marker({
            position: coordenadas,//seta posição
            map: map,//Objeto mapa
            title: ponto.basic.address//string que será exibida quando passar o mouse no marker
            //icon: caminho_da_imagem
        });
        latlngbounds.extend(marker.position);
        let markerModal = document.createElement('div')
        markerModal.className = 'modal fade'
        markerModal.id = `markerModal${id}`
        markerModal.tabIndex = '-1'
        markerModal.ariaHidden = true
        markerModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelVisualizar${id}">${ponto.basic.address}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="visualizar-imagem">
                        <img src="${ponto.basic.image_link}" alt="">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.endereco}</p>
                        <p class="conteudo-item">${ponto.basic.address}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.codigo}</p>
                        <p class="conteudo-item">${ponto.basic.code}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.latitude}</p>
                        <p class="conteudo-item">${ponto.basic.latitude}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.longitude}</p>
                        <p class="conteudo-item">${ponto.basic.longitude}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.image_link}</p>
                        <p class="conteudo-item">${ponto.basic.image_link}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.reference}</p>
                        <p class="conteudo-item">${ponto.basic.reference}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.district}</p>
                        <p class="conteudo-item">${ponto.basic.district}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.zone}</p>
                        <p class="conteudo-item">${ponto.basic.zone}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.city}</p>
                        <p class="conteudo-item">${ponto.basic.city}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.state}</p>
                        <p class="conteudo-item">${ponto.basic.state}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.country}</p>
                        <p class="conteudo-item">${ponto.basic.country}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.format}</p>
                        <p class="conteudo-item">${ponto.basic.format}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.measure}</p>
                        <p class="conteudo-item">${ponto.basic.measure}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.impacto}</p>
                        <p class="conteudo-item">${ponto.commercial.impacto}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_tabela_comm}</p>
                        <p class="conteudo-item">${ponto.commercial.valor_tabela_comm}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_negociado_comm}</p>
                        <p class="conteudo-item">${ponto.commercial.valor_negociado_comm}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.producao}</p>
                        <p class="conteudo-item">${ponto.commercial.producao}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.observacoes_comm}</p>
                        <p class="conteudo-item">${ponto.commercial.observacoes}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.outros_comm}</p>
                        <p class="conteudo-item">${ponto.commercial.outros}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.empresa}</p>
                        <p class="conteudo-item">${ponto.private.empresa}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_negociado_int}</p>
                        <p class="conteudo-item">${ponto.private.valor_negociado_int}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.custo_liq}</p>
                        <p class="conteudo-item">${ponto.private.custo_liq}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.medida_int}</p>
                        <p class="conteudo-item">${ponto.private.medida_int}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.observacoes_int}</p>
                        <p class="conteudo-item">${ponto.private.observacoes}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.outros_int}</p>
                        <p class="conteudo-item">${ponto.private.outros}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.fecharBt}</button>
                </div>
            </div>
        </div>
        `
        let markerClicked = false
        google.maps.event.addListener(marker, 'click', () => {
            if (markerClickAction == 'view') {
                $('#markerModal' + id).modal('show')
            } else if (markerClickAction == 'select') {
                if (pontosSelecionadosId.indexOf(id) != -1) {
                    markerClicked = true
                }
                if (markerClicked == false) {
                    markerClicked = true
                    pontosSelecionadosId.push(id)
                    marker.setIcon('/static/media/icons8-maps-40.png')
                } else {
                    markerClicked = false
                    let index = pontosSelecionadosId.indexOf(id)
                    pontosSelecionadosId.splice(index, 1)
                    marker.setIcon(null)
                }
                console.log(pontosSelecionadosId)
                displayActionsBtsMap()
            }
        })
        divMap.appendChild(markerModal)
        let markerInfo = {
            id: id,
            marker: marker
        }
        allMarkers.push(markerInfo)
    }
    if (pontos.pontos.length > 0) {
        map.fitBounds(latlngbounds)
    }
    return map
}
function getPointsByMarkerPosition(map, raioRangeElement, raioSearchBt, searchBtEvent) {
    let texts;
    if (lang == 'es' || lang == 'es-ar') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }

    let drawingManager = new google.maps.drawing.DrawingManager({
        map: map,
        drawingControlOptions: {
            drawingModes: ['marker'],
            position: google.maps.ControlPosition.LEFT_TOP
        }
    })
    google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
        cleanFilters()
        filtros.view = 'map'
        raioSearchBt.removeEventListener('click', searchBtEvent)
        raioSearchBt.addEventListener('click', () => {
            if (lang == 'es' || lang == 'es-ar') {
                alertGenerate(body, 'Limpia la búsqueda para volver a buscar')
            } else if (lang == 'es') {
                alertGenerate(body, 'Clean the search to fetch again')
            } else {
                alertGenerate(body, 'Limpe a pesquisa para buscar novamente')
            }
        })
        let latitude = marker.getPosition().lat()
        let longitude = marker.getPosition().lng()
        let radius = raioRangeElement.value
        filtros.radius = radius
        filtros.coordinates.lat = latitude
        filtros.coordinates.lng = longitude
        drawingManager.setMap(null)
        filtros.type = 'getPointsByMarkerPosition'
        fetch(`/painel/pontos/visualizar?filter=${JSON.stringify(filtros)}`)
        .then((response) => {
            return response.json()
        })
        .then((dados) => {
            pontos.length = dados.length
            dados.pontos.forEach((dado) => {
                let ponto = {
                    'basic': null,
                    'commercial': null,
                    'private': null
                }
                ponto.basic = new Ponto_Basic(
                    dado.basic.id,
                    dado.basic.code,
                    dado.basic.address,
                    dado.basic.latitude,
                    dado.basic.longitude,
                    dado.basic.image_link,
                    dado.basic.reference,
                    dado.basic.district,
                    dado.basic.city,
                    dado.basic.zone,
                    dado.basic.state,
                    dado.basic.country,
                    dado.basic.format,
                    dado.basic.measure
                )
                ponto.commercial = new Ponto_Commercial(
                    dado.commercial.id,
                    dado.commercial.spot_id,
                    dado.commercial.impacto,
                    dado.commercial.valor_tabela_comm,
                    dado.commercial.valor_negociado_comm,
                    dado.commercial.producao,
                    dado.commercial.observacoes,
                    dado.commercial.outros
                )
                ponto.private = new Ponto_Private(
                    dado.private.id,
                    dado.private.spot_id,
                    dado.private.empresa,
                    dado.private.valor_negociado_int,
                    dado.private.custo_liq,
                    dado.private.medida_int,
                    dado.private.observacoes,
                    dado.private.outros
                )
                pontos.pontos.push(ponto)
            })
            let divMap = document.querySelector('#divMap')
            divMap.innerHTML = ''
            let resultText = document.querySelector('#resultText')
            resultText.innerHTML = pontos.length + texts.resultText
            let resultLimparBt = document.querySelector('#resultLimparBt')
            resultLimparBt.disabled = false
            let center = {lat: latitude, lng: longitude}
            let selectAll = document.querySelector('#selectAll')
            selectAll.checked = false
            let resultMap = initMap(divMap, center=center, radius=radius)
        })
    })
    return drawingManager
}
function removeMapMarkerPosition(drawingManager) {
    drawingManager.setOptions({ drawingControl: false })
}
function getPointsByLatLng(latitude, longitude, radius, bt) {
    let texts;
    if (lang == 'es' || lang == 'es-ar') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }
    latitude.disabled = true
    longitude.disabled = true
    radius.disabled = true
    bt.disabled = true
    filtros.radius = radius.value
    filtros.coordinates.lat = latitude.value
    filtros.coordinates.lng = longitude.value
    filtros.type = 'getPointsByMarkerPosition'
    fetch(`/painel/pontos/visualizar?filter=${JSON.stringify(filtros)}`)
    .then((response) => {
        return response.json()
    })
    .then((dados) => {
        pontos.length = dados.length
        dados.pontos.forEach((dado) => {
            pontosSelecionadosId.push(dado.basic.id)
            let ponto = {
                'basic': null,
                'commercial': null,
                'private': null
            }
            ponto.basic = new Ponto_Basic(
                dado.basic.id,
                dado.basic.code,
                dado.basic.address,
                dado.basic.latitude,
                dado.basic.longitude,
                dado.basic.image_link,
                dado.basic.reference,
                dado.basic.district,
                dado.basic.city,
                dado.basic.zone,
                dado.basic.state,
                dado.basic.country,
                dado.basic.format,
                dado.basic.measure
            )
            ponto.commercial = new Ponto_Commercial(
                dado.commercial.id,
                dado.commercial.spot_id,
                dado.commercial.impacto,
                dado.commercial.valor_tabela_comm,
                dado.commercial.valor_negociado_comm,
                dado.commercial.producao,
                dado.commercial.observacoes,
                dado.commercial.outros
            )
            ponto.private = new Ponto_Private(
                dado.private.id,
                dado.private.spot_id,
                dado.private.empresa,
                dado.private.valor_negociado_int,
                dado.private.custo_liq,
                dado.private.medida_int,
                dado.private.observacoes,
                dado.private.outros
            )
            pontos.pontos.push(ponto)
        })
        let divMap = document.querySelector('#divMap')
        divMap.innerHTML = ''
        let resultText = document.querySelector('#resultText')
        resultText.innerHTML = pontos.length + texts.resultText
        let resultLimparBt = document.querySelector('#resultLimparBt')
        resultLimparBt.disabled = false
        let center = {lat: parseFloat(latitude.value), lng: parseFloat(longitude.value)}
        let selectAll = document.querySelector('#selectAll')
        selectAll.checked = false
        let resultMap = initMap(divMap, center=center, radius=parseFloat(radius.value))
    })
}
function gerarLista(index) {
    let texts = null
    if (lang == 'es') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }
    let body_content = document.querySelector('#body-content')
    let listaViewBt = document.querySelector('#listaViewBt')
    let mapaViewBt = document.querySelector('#mapaViewBt')
    listaViewBt.classList.add('select')
    mapaViewBt.classList.remove('select')

    let divActions = document.querySelector('.divActions')
    divActions.style.display = 'flex'

    let divViewList = document.querySelector('#divViewList')
    divViewList.style.height = 'auto'
    if (index == null) {
        divViewList.innerHTML = ''
        index = 0

        let linhaTitle = document.createElement('div')
        linhaTitle.className = 'linhaTitle'
        let checkboxTitle = document.createElement('div')
        checkboxTitle.className = 'divCheckbox'
        linhaTitle.appendChild(checkboxTitle)
        let enderecoTitle = document.createElement('div')
        enderecoTitle.className = 'linha-endereco'
        enderecoTitle.innerHTML = texts.endereco
        linhaTitle.appendChild(enderecoTitle)
        let cidadeTitle = document.createElement('div')
        cidadeTitle.className = 'linha-cidade'
        cidadeTitle.innerHTML = texts.city
        linhaTitle.appendChild(cidadeTitle)
        let formatoTitle = document.createElement('div')
        formatoTitle.className = 'linha-formato'
        formatoTitle.innerHTML = texts.format
        linhaTitle.appendChild(formatoTitle)
        let valorTitle = document.createElement('div')
        valorTitle.className = 'linha-valor'
        valorTitle.innerHTML = texts.empresa
        linhaTitle.appendChild(valorTitle)
        let btsTitle = document.createElement('div')
        btsTitle.className = 'linha-btsTitle'
        linhaTitle.appendChild(btsTitle)
        divViewList.appendChild(linhaTitle)
    } else {
        index = index + 1
    }
    
    
    for (let i = index; i < pontos.pontos.length; i++) {
        let ponto = pontos.pontos[i]
        let id = ponto.basic.id
        let endereco = ponto.basic.address
        let cidade = ponto.basic.city
        let code = ponto.basic.code != null ? ponto.basic.code : ''
        let latitude = ponto.basic.latitude != null ? ponto.basic.latitude : ''
        let longitude = ponto.basic.longitude != null ? ponto.basic.longitude : ''
        let image_link = ponto.basic.image_link != null ? ponto.basic.image_link : ''
        let reference = ponto.basic.reference != null ? ponto.basic.reference : ''
        let district = ponto.basic.district != null ? ponto.basic.district : ''
        let zone = ponto.basic.zone != null ? ponto.basic.zone : ''
        let state = ponto.basic.state != null ? ponto.basic.state : ''
        let country = ponto.basic.country != null ? ponto.basic.country : ''
        let format = ponto.basic.format != null ? ponto.basic.format : ''
        let measure = ponto.basic.measure != null ? ponto.basic.measure : ''
        let impacto = ponto.commercial.impacto != null ? ponto.commercial.impacto : ''
        let valor_tabela_comm = ponto.commercial.valor_tabela_comm != null ? ponto.commercial.valor_tabela_comm : ''
        let valor_negociado_comm = ponto.commercial.valor_negociado_comm != null ? ponto.commercial.valor_negociado_comm : ''
        let producao = ponto.commercial.producao != null ? ponto.commercial.producao : ''
        let observacoes_comm = ponto.commercial.observacoes != null ? ponto.commercial.observacoes : ''
        let outros_comm = ponto.commercial.outros != null ? ponto.commercial.outros : ''
        let empresa = ponto.private.empresa != null ? ponto.private.empresa : ''
        let valor_negociado_int = ponto.private.valor_negociado_int != null ? ponto.private.valor_negociado_int : ''
        let custo_liq = ponto.private.custo_liq != null ? ponto.private.custo_liq : ''
        let medida_int = ponto.private.medida_int != null ? ponto.private.medida_int : ''
        let observacoes_int = ponto.private.observacoes != null ? ponto.private.observacoes : ''
        let outros_int = ponto.private.outros != null ? ponto.private.outros : ''


        let linha = document.createElement('div')
        linha.className = 'linha'
        linha.id = `linha${id}`

        let divCheckbox = document.createElement('div')
        divCheckbox.className = 'divCheckbox'
        let linhaCheckbox = document.createElement('input')
        linhaCheckbox.type = 'checkbox'
        linhaCheckbox.className = 'linhaCheckbox'
        linhaCheckbox.id = `checkbox${id}`
        linhaCheckbox.value = id
        linhaCheckbox.addEventListener('change', () => {
            if (linhaCheckbox.checked == true) {
                pontosSelecionadosId.push(parseInt(linhaCheckbox.value))
                linha.classList.add('select')
            } else {
                let index = pontosSelecionadosId.indexOf(linhaCheckbox.value)
                pontosSelecionadosId.splice(index, 1)
                linha.classList.remove('select')
            }
            displayActionsBts()
        })
        divCheckbox.appendChild(linhaCheckbox)
        linha.appendChild(divCheckbox)

        let enderecoColumn = document.createElement('div')
        enderecoColumn.className = 'linha-endereco'
        enderecoColumn.innerHTML = endereco
        linha.appendChild(enderecoColumn)
        
        let cidadeColumn = document.createElement('div')
        cidadeColumn.className = 'linha-cidade'
        cidadeColumn.innerHTML = cidade
        linha.appendChild(cidadeColumn)
        
        let formatoColumn = document.createElement('div')
        formatoColumn.className = 'linha-formato'
        formatoColumn.innerHTML = format
        linha.appendChild(formatoColumn)
        
        let valorColumn = document.createElement('div')
        valorColumn.className = 'linha-valor'
        valorColumn.innerHTML = empresa
        linha.appendChild(valorColumn)

        // Visualizar
        let visualizar = document.createElement('div')
        visualizar.className = 'linha-bt'
        let visualizarBt = document.createElement('button')
        visualizarBt.type = 'button'
        visualizarBt.className = 'btn btn-sm btn-primary linha-bt-bt'
        visualizarBt.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-eye-fill btMin" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
        </svg>
        `
        visualizarBt.addEventListener('click', () => {
            $(`#visualizar${id}`).modal('show')
        })
        visualizar.appendChild(visualizarBt)
        let visualizarModal = document.createElement('div')
        visualizarModal.className = 'modal fade'
        visualizarModal.id = `visualizar${id}`
        visualizarModal.tabIndex = '-1'
        visualizar.ariaLabel = `exampleModalLabelVisualizar${id}`
        visualizarModal.ariaHidden = true
        visualizarModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelVisualizar${id}">${endereco}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="visualizar-imagem">
                        <img src="${image_link}" alt="">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.endereco}</p>
                        <p class="conteudo-item">${endereco}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.codigo}</p>
                        <p class="conteudo-item">${code}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.latitude}</p>
                        <p class="conteudo-item">${latitude}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.longitude}</p>
                        <p class="conteudo-item">${longitude}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.image_link}</p>
                        <p class="conteudo-item">${image_link}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.reference}</p>
                        <p class="conteudo-item">${reference}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.district}</p>
                        <p class="conteudo-item">${district}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.zone}</p>
                        <p class="conteudo-item">${zone}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.city}</p>
                        <p class="conteudo-item">${cidade}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.state}</p>
                        <p class="conteudo-item">${state}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.country}</p>
                        <p class="conteudo-item">${country}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.format}</p>
                        <p class="conteudo-item">${format}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.measure}</p>
                        <p class="conteudo-item">${measure}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.impacto}</p>
                        <p class="conteudo-item">${impacto}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_tabela_comm}</p>
                        <p class="conteudo-item">${valor_tabela_comm}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_negociado_comm}</p>
                        <p class="conteudo-item">${valor_negociado_comm}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.producao}</p>
                        <p class="conteudo-item">${producao}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.observacoes_comm}</p>
                        <p class="conteudo-item">${observacoes_comm}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.outros_comm}</p>
                        <p class="conteudo-item">${outros_comm}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.empresa}</p>
                        <p class="conteudo-item">${empresa}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_negociado_int}</p>
                        <p class="conteudo-item">${valor_negociado_int}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.custo_liq}</p>
                        <p class="conteudo-item">${custo_liq}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.medida_int}</p>
                        <p class="conteudo-item">${medida_int}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.observacoes_int}</p>
                        <p class="conteudo-item">${observacoes_int}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.outros_int}</p>
                        <p class="conteudo-item">${outros_int}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.fecharBt}</button>
                </div>
            </div>
        </div>
        `
        visualizar.appendChild(visualizarModal)
        linha.appendChild(visualizar)
        
        // Editar
        let editar = document.createElement('div')
        editar.className = 'linha-bt'
        let editarBt = document.createElement('button')
        editarBt.type = 'button'
        editarBt.className = 'btn btn-sm btn-warning linha-bt-bt'
        editarBt.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square btMin" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        `
        let cancelarEditModal;
        let confirmarEditModal;
        editarBt.addEventListener('click', () => {
            $(`#editar${id}`).modal('show')
            let codeInput = document.querySelector('#code-edit'+id)
            let enderecoInput = document.querySelector('#endereco-edit'+id)
            let latitudeInput = document.querySelector('#latitude-edit'+id)
            let longitudeInput = document.querySelector('#longitude-edit'+id)
            let image_linkInput = document.querySelector('#image_link-edit'+id)
            let referenceInput = document.querySelector('#reference-edit'+id)
            let districtInput = document.querySelector('#district-edit'+id)
            let cidadeInput = document.querySelector('#cidade-edit'+id)
            let zoneInput = document.querySelector('#zone-edit'+id)
            let stateInput = document.querySelector('#state-edit'+id)
            let countryInput = document.querySelector('#country-edit'+id)
            let formatInput = document.querySelector('#format-edit'+id)
            let measureInput = document.querySelector('#measure-edit'+id)
            let impactoInput = document.querySelector('#impacto-edit'+id)
            let valor_tabela_commInput = document.querySelector('#valor_tabela_comm-edit'+id)
            let valor_negociado_commInput = document.querySelector('#valor_negociado_comm-edit'+id)
            let producaoInput = document.querySelector('#producao-edit'+id)
            let observacoes_commInput = document.querySelector('#observacoes_comm-edit'+id)
            let outros_commInput = document.querySelector('#outros_comm-edit'+id)
            let empresaInput = document.querySelector('#empresa-edit'+id)
            let valor_negociado_intInput = document.querySelector('#valor_negociado_int-edit'+id)
            let custo_liqInput = document.querySelector('#custo_liq-edit'+id)
            let medida_intInput = document.querySelector('#medida_int-edit'+id)
            let observacoes_intInput = document.querySelector('#observacoes_int-edit'+id)
            let outros_intInput = document.querySelector('#outros_int-edit'+id)

            let cancelarEditBt = document.querySelector('#cancelarEditBt' + id)
            cancelarEditBt.removeEventListener('click', cancelarEditModal)
            cancelarEditBt.addEventListener('click', cancelarEditModal = () => {
                codeInput.value = code
                enderecoInput.value = endereco
                latitudeInput.value = latitude
                longitudeInput.value = longitude
                image_linkInput.value = image_link
                referenceInput.value = reference
                districtInput.value = district
                cidadeInput.value = cidade
                zoneInput.value = zone
                stateInput.value = state
                countryInput.value = country
                formatInput.value = format
                measureInput.value = measure
                impactoInput.value = impacto
                valor_tabela_commInput.value = valor_tabela_comm
                valor_negociado_commInput.value = valor_negociado_comm
                producaoInput.value = producao
                observacoes_commInput.value = observacoes_comm
                outros_commInput.value = outros_comm
                empresaInput.value = empresa
                valor_negociado_intInput.value = valor_negociado_int
                custo_liqInput.value = custo_liq
                medida_intInput.value = medida_int
                observacoes_intInput.value = observacoes_int
                outros_intInput.value = outros_int
            })
            let confirmarEditBt = document.querySelector('#confirmarEditBt' + id)
            confirmarEditBt.removeEventListener('click', confirmarEditModal)
            confirmarEditBt.addEventListener('click', confirmarEditModal = () => {
                confirmarEditBt.innerHTML = `
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `
                if (!id || !enderecoInput.value || !latitudeInput.value || !longitudeInput.value || !image_linkInput.value) {
                    confirmarEditBt.innerHTML = texts.confirmarBt
                    $(`#editar${id}`).modal('hide')
                    if (lang == 'es' || lang == 'es-ar') {
                        alertGenerate(body, 'Algún campo obligatorio no está lleno.')
                    } else if (lang == 'en') {
                        alertGenerate(body, 'Some mandatory field is not filled.')
                    } else {
                        alertGenerate(body, 'Algum campo obrigatório não foi preenchido.')
                    }
                    return
                }
                let send = new FormData()
                send.append('type', 'edit')
                send.append('id', id)
                send.append('code', codeInput.value)
                send.append('address', enderecoInput.value)
                send.append('latitude', latitudeInput.value)
                send.append('longitude', longitudeInput.value)
                send.append('image_link', image_linkInput.value)
                send.append('reference', referenceInput.value)
                send.append('district', districtInput.value)
                send.append('zone', zoneInput.value)
                send.append('city', cidadeInput.value)
                send.append('state', stateInput.value)
                send.append('country', countryInput.value)
                send.append('format', formatInput.value)
                send.append('measure', measureInput.value)
                send.append('impacto', impactoInput.value)
                send.append('valor_tabela_comm', valor_tabela_commInput.value)
                send.append('valor_negociado_comm', valor_negociado_commInput.value)
                send.append('producao', producaoInput.value)
                send.append('observacoes_comm', observacoes_commInput.value)
                send.append('outros_comm', outros_commInput.value)
                send.append('empresa', empresaInput.value)
                send.append('valor_negociado_int', valor_negociado_intInput.value)
                send.append('custo_liq', custo_liqInput.value)
                send.append('medida_int', medida_intInput.value)
                send.append('observacoes_int', observacoes_intInput.value)
                send.append('outros_int', outros_intInput.value)
                fetch('/painel/pontos/visualizar', {
                    method: 'POST',
                    body: send
                })
                .then((response) => {
                    if (!response.ok) {
                        confirmarEditBt.innerHTML = texts.confirmarBt
                        $(`#editar${id}`).modal('hide')
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Erro del servidor.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Server error.')
                        } else {
                            alertGenerate(body, 'Erro no servidor.')
                        }
                    } else {
                        return response.json()
                        .then((dados) => {
                            confirmarEditBt.innerHTML = texts.confirmarBt
                            $(`#editar${id}`).modal('hide')
                            dados.message.forEach(message => {
                                alertGenerate(body, message)
                                carregarPontos()
                            })
                            
                        })
                    }
                })
            })
        })
        editar.appendChild(editarBt)
        let editarModal = document.createElement('div')
        editarModal.className = 'modal fade'
        editarModal.id = `editar${id}`
        editarModal.tabIndex = '-1'
        editarModal.ariaLabel = `exampleModalLabelEditar${id}`
        editarModal.ariaHidden = true
        editarModal.setAttribute('data-bs-backdrop', 'static')
        editarModal.setAttribute('data-bs-keyboard', 'false')
        editarModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelEditar${id}">${endereco}</h5>
                </div>
                <div class="modal-body" id="editModalBody${id}">
                    <div class="visualizar-item">
                        <p class="label-item">${texts.endereco}</p>
                        <input maxlength="50" type="text" class="input-edit" id="endereco-edit${id}" value="${endereco}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.codigo}</p>
                        <input maxlength="50" type="text" class="input-edit" id="code-edit${id}" value="${code}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.latitude}</p>
                        <input maxlength="50" type="text" class="input-edit" id="latitude-edit${id}" value="${latitude}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.longitude}</p>
                        <input maxlength="50" type="text" class="input-edit" id="longitude-edit${id}" value="${longitude}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.image_link}</p>
                        <input maxlength="200" type="text" class="input-edit" id="image_link-edit${id}" value="${image_link}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.reference}</p>
                        <input maxlength="50" type="text" class="input-edit" id="reference-edit${id}" value="${reference}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.district}</p>
                        <input maxlength="50" type="text" class="input-edit" id="district-edit${id}" value="${district}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.zone}</p>
                        <input maxlength="50" type="text" class="input-edit" id="zone-edit${id}" value="${zone}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.city}</p>
                        <input maxlength="50" type="text" class="input-edit" id="cidade-edit${id}" value="${cidade}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.state}</p>
                        <input maxlength="50" type="text" class="input-edit" id="state-edit${id}" value="${state}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.country}</p>
                        <input maxlength="50" type="text" class="input-edit" id="country-edit${id}" value="${country}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.format}</p>
                        <input maxlength="50" type="text" class="input-edit" id="format-edit${id}" value="${format}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.measure}</p>
                        <input maxlength="50" type="text" class="input-edit" id="measure-edit${id}" value="${measure}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.impacto}</p>
                        <input maxlength="50" type="text" class="input-edit" id="impacto-edit${id}" value="${impacto}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_tabela_comm}</p>
                        <input maxlength="50" type="text" class="input-edit" id="valor_tabela_comm-edit${id}" value="${valor_tabela_comm}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_negociado_comm}</p>
                        <input maxlength="50" type="text" class="input-edit" id="valor_negociado_comm-edit${id}" value="${valor_negociado_comm}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.producao}</p>
                        <input maxlength="50" type="text" class="input-edit" id="producao-edit${id}" value="${producao}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.observacoes_comm}</p>
                        <input maxlength="50" type="text" class="input-edit" id="observacoes_comm-edit${id}" value="${observacoes_comm}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.outros_comm}</p>
                        <input maxlength="50" type="text" class="input-edit" id="outros_comm-edit${id}" value="${outros_comm}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.empresa}</p>
                        <input maxlength="50" type="text" class="input-edit" id="empresa-edit${id}" value="${empresa}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.valor_negociado_int}</p>
                        <input maxlength="50" type="text" class="input-edit" id="valor_negociado_int-edit${id}" value="${valor_negociado_int}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.custo_liq}</p>
                        <input maxlength="50" type="text" class="input-edit" id="custo_liq-edit${id}" value="${custo_liq}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.medida_int}</p>
                        <input maxlength="50" type="text" class="input-edit" id="medida_int-edit${id}" value="${medida_int}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.observacoes_int}</p>
                        <input maxlength="50" type="text" class="input-edit" id="observacoes_int-edit${id}" value="${observacoes_int}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.outros_int}</p>
                        <input maxlength="50" type="text" class="input-edit" id="outros_int-edit${id}" value="${outros_int}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="cancelarEditBt${id}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.cancelarBt}</button>
                    <button id="confirmarEditBt${id}" class="btn btn-warning">${texts.confirmarBt}</button>
                </div>
            </div>
        </div>
        `
        editar.appendChild(editarModal)
        linha.appendChild(editar)
        
        // Excluir
        let excluir = document.createElement('div')
        excluir.className = 'linha-bt'
        let excluirBt = document.createElement('button')
        excluirBt.type = 'button'
        excluirBt.className = 'btn btn-sm btn-secondary linha-bt-bt'
        excluirBt.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill btMin" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg>
        `
        let confirmarExcluirModal;
        //excluirBt.removeEventListener('click', confirmarExcluirModal)
        excluirBt.addEventListener('click', confirmarExcluirModal = () => {
            $(`#excluir${id}`).modal('show')
            let confirmarExcluirBt = document.querySelector('#excluirConfirmarBt' + id)
            confirmarExcluirBt.removeEventListener('click', confirmarExcluirModal)
            confirmarExcluirBt.addEventListener('click', confirmarExcluirModal = () => {
                confirmarExcluirBt.innerHTML = `
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `
                let send = new FormData()
                send.append('type', 'excluir')
                send.append('id', id)
                fetch('/painel/pontos/visualizar', {
                    method: 'POST',
                    body: send
                })
                .then((response) => {
                    if (!response.ok) {
                        confirmarExcluirBt.innerHTML = texts.confirmarBt
                        $(`#excluir${id}`).modal('hide')
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Erro del servidor.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Server error.')
                        } else {
                            alertGenerate(body, 'Erro no servidor.')
                        }
                    } else {
                        return response.json()
                        .then((dados) => {
                            confirmarExcluirBt.innerHTML = texts.confirmarBt
                            $(`#excluir${id}`).modal('hide')
                            dados.message.forEach(message => {
                                alertGenerate(body, message)
                                carregarPontos()
                            })
                            
                        })
                    }
                })
            })
        })
        excluir.appendChild(excluirBt)
        let excluirModal = document.createElement('div')
        excluirModal.className = 'modal'
        excluirModal.classList.add('fade')
        excluirModal.id = `excluir${id}`
        excluirModal.tabIndex = '-1'
        excluirModal.setAttribute('aria-labelledby', `exampleModalLabelExcluir${id}`)
        excluirModal.ariaHidden = true
        excluirModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelexcluir">${texts.certeza}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ${texts.excluirModalBody1}${endereco}${texts.excluirModalBody2}${cidade}${texts.excluirModalBody3}
                </div>
                <div class="modal-footer">
                    <button id="excluirCancelarBt${id}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.cancelarBt}</button>
                    <button id="excluirConfirmarBt${id}" type="submit" class="btn btn-warning">${texts.confirmarBt}</button>
                </div>
            </div>
        </div>
        `
        excluir.appendChild(excluirModal)
        linha.appendChild(excluir)

        divViewList.appendChild(linha)
    }
    let checkDivVerMais =  document.getElementById('divVerMais');
    if (pontos.length == 0) {
        if (typeof(checkDivVerMais) != 'undefined' && checkDivVerMais != null) {
            body_content.removeChild(checkDivVerMais)
        }
        if (lang == 'es' || lang == 'es-ar') {
            divViewList.innerHTML = 'No hay registros.'
        } else if (lang == 'en') {
            divViewList.innerHTML = 'No records.'
        } else {
            divViewList.innerHTML = 'Não há registros.'
        }
    } else {
        if (typeof(checkDivVerMais) != 'undefined' && checkDivVerMais != null) {
            if (pontos.pontos.length >= pontos.length) {
                if (lang == 'es' || lang == 'es-ar') {
                    checkDivVerMais.innerHTML = 'No hay más registros.'
                } else if (lang == 'en') {
                    checkDivVerMais.innerHTML = 'There are no more records.'
                } else {
                    checkDivVerMais.innerHTML = 'Não há mais registros.'
                }
            } else {
                checkDivVerMais.innerHTML = ''
                let verMaisBt = document.createElement('button')
                verMaisBt.className = 'btn btn-warning'
                if (lang == 'es' || lang == 'es-ar') {
                    verMaisBt.innerHTML = 'Ver más'
                } else if (lang == 'en') {
                    verMaisBt.innerHTML = 'View more'
                } else {
                    verMaisBt.innerHTML = 'Ver mais'
                }
                verMaisBt.id = 'verMaisBt'
                verMaisBt.addEventListener('click', () => {
                    verMais()
                })
                checkDivVerMais.appendChild(verMaisBt)
            }
        } else {
            let divVerMais = document.createElement('div')
            divVerMais.className = 'divVerMais'
            divVerMais.id = 'divVerMais'
            if (pontos.pontos.length < pontos.length) {
                let verMaisBt = document.createElement('button')
                verMaisBt.className = 'btn btn-warning'
                if (lang == 'es' || lang == 'es-ar') {
                    verMaisBt.innerHTML = 'Ver más'
                } else if (lang == 'en') {
                    verMaisBt.innerHTML = 'View more'
                } else {
                    verMaisBt.innerHTML = 'Ver mais'
                }
                verMaisBt.id = 'verMaisBt'
                verMaisBt.addEventListener('click', () => {
                    verMais()
                })
                divVerMais.appendChild(verMaisBt)
            } else {
                if (lang == 'es' || lang == 'es-ar') {
                    divVerMais.innerHTML = 'No hay más registros.'
                } else if (lang == 'en') {
                    divVerMais.innerHTML = 'There are no more records.'
                } else {
                    divVerMais.innerHTML = 'Não há mais registros.'
                }
            }
            body_content.appendChild(divVerMais)
        }
    }
}
function gerarMapa() {
    let body_content = document.querySelector('#body-content')
    let listaViewBt = document.querySelector('#listaViewBt')
    let mapaViewBt = document.querySelector('#mapaViewBt')
    if (listaViewBt) {
        listaViewBt.classList.remove('select')
    }
    if (mapaViewBt) {
        mapaViewBt.classList.add('select')
    }
    
    let divActions = document.querySelector('.divActions')

    let checkDivVerMais =  document.getElementById('divVerMais')
    if (checkDivVerMais) {
        checkDivVerMais.innerHTML = ''
    }

    let divViewList = document.querySelector('#divViewList')
    if (divViewList) {
        divViewList.style.height = '50rem'
        initMap(divViewList)
    } else {
        let divMap = document.querySelector('#divMap')
        initMap(divMap)
    }
}
function verMais() {
    let verMaisFiltros = Object.assign({}, filtros)
    let index = pontos.pontos.length -1
    verMaisFiltros.id = pontos.pontos[index].basic.id
    fetch(`/painel/pontos/visualizar?filter=${JSON.stringify(verMaisFiltros)}`)
    .then((response) => {
        return response.json()
    })
    .then((dados) => {
        pontos.length = dados.length
        dados.pontos.forEach((dado) => {
            let ponto = {
                'basic': null,
                'commercial': null,
                'private': null
            }
            ponto.basic = new Ponto_Basic(
                dado.basic.id,
                dado.basic.code,
                dado.basic.address,
                dado.basic.latitude,
                dado.basic.longitude,
                dado.basic.image_link,
                dado.basic.reference,
                dado.basic.district,
                dado.basic.city,
                dado.basic.zone,
                dado.basic.state,
                dado.basic.country,
                dado.basic.format,
                dado.basic.measure
            )
            ponto.commercial = new Ponto_Commercial(
                dado.commercial.id,
                dado.commercial.spot_id,
                dado.commercial.impacto,
                dado.commercial.valor_tabela_comm,
                dado.commercial.valor_negociado_comm,
                dado.commercial.producao,
                dado.commercial.observacoes,
                dado.commercial.outros
            )
            ponto.private = new Ponto_Private(
                dado.private.id,
                dado.private.spot_id,
                dado.private.empresa,
                dado.private.valor_negociado_int,
                dado.private.custo_liq,
                dado.private.medida_int,
                dado.private.observacoes,
                dado.private.outros
            )
            pontos.pontos.push(ponto)
        })
        gerarLista(index)
    })

}
function gerarFiltros() {
    let divFiltroList = document.querySelector('#divFiltroList')
    divFiltroList.innerHTML = ''
    let temFiltro = false
    if (filtros.codigo.length > 0) {
        temFiltro = true
        filtros.codigo.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Codigo:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'Code:'
            } else {
                divFiltroKey.innerHTML = 'Código:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.codigo.indexOf(filtro)
                filtros.codigo.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.pais.length > 0) {
        temFiltro = true
        filtros.pais.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'País:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'Country:'
            } else {
                divFiltroKey.innerHTML = 'País:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.pais.indexOf(filtro)
                filtros.pais.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.estado.length > 0) {
        temFiltro = true
        filtros.estado.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Estado:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'State:'
            } else {
                divFiltroKey.innerHTML = 'Estado:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.estado.indexOf(filtro)
                filtros.estado.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.cidade.length > 0) {
        temFiltro = true
        filtros.cidade.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'CIudad:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'City:'
            } else {
                divFiltroKey.innerHTML = 'Cidade:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.cidade.indexOf(filtro)
                filtros.cidade.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.zona.length > 0) {
        temFiltro = true
        filtros.zona.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Zona:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'Zone:'
            } else {
                divFiltroKey.innerHTML = 'Zona:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.zona.indexOf(filtro)
                filtros.zona.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.bairro.length > 0) {
        temFiltro = true
        filtros.bairro.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Barrio:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'District:'
            } else {
                divFiltroKey.innerHTML = 'Bairro:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.bairro.indexOf(filtro)
                filtros.bairro.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.endereco.length > 0) {
        temFiltro = true
        filtros.endereco.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Dirección:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'Address:'
            } else {
                divFiltroKey.innerHTML = 'Endereço:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.endereco.indexOf(filtro)
                filtros.endereco.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.formato.length > 0) {
        temFiltro = true
        filtros.formato.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Formato:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'Format:'
            } else {
                divFiltroKey.innerHTML = 'Formato:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.formato.indexOf(filtro)
                filtros.formato.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    if (filtros.empresa.length > 0) {
        temFiltro = true
        filtros.empresa.forEach((filtro) => {
            let divFiltro = document.createElement('div')
            divFiltro.className = 'divFiltroIcone'
            let divFiltroKey = document.createElement('p')
            divFiltroKey.className = 'divFiltroIconeKey'
            if (lang == 'es' || lang == 'es-ar') {
                divFiltroKey.innerHTML = 'Empresa:'
            } else if (lang == 'es') {
                divFiltroKey.innerHTML = 'Company:'
            } else {
                divFiltroKey.innerHTML = 'Empresa:'
            }
            divFiltro.appendChild(divFiltroKey)
            let divFiltroValue = document.createElement('p')
            divFiltroValue.className = 'divFiltroIconeValue'
            divFiltroValue.innerHTML = filtro
            divFiltro.appendChild(divFiltroValue)
            let divFiltroFechar = document.createElement('span')
            divFiltroFechar.className = 'divFiltroIconeFechar'
            divFiltroFechar.innerHTML = 'x'
            divFiltroFechar.addEventListener('click', () => {
                let index = filtros.empresa.indexOf(filtro)
                filtros.empresa.splice(index, 1)
                filtros.pontosLength = 0
                carregarPontos()
                gerarFiltros()
            })
            divFiltro.appendChild(divFiltroFechar)
            divFiltroList.appendChild(divFiltro)
        })
    }
    // Desmarcando a caixa de selecionar tudo
    let selectAll = document.querySelector('#selectAll')
    selectAll.checked = false
    displayActionsBts()
    if (temFiltro == false) {
        let notFilters = document.createElement('p')
        notFilters.className = 'notFilters'
        if (lang == 'es' || lang == 'es-ar') {
            notFilters.innerHTML = 'Sin filtros.'
        } else if (lang == 'es') {
            notFilters.innerHTML = 'No filters.'
        } else {
            notFilters.innerHTML = 'Sem filtros.'
        }
        divFiltroList.appendChild(notFilters)
        return
    }
}
function visualizarPontos() {
    if (filtros.view == 'list') {
        gerarLista(null)
    } else {
        gerarMapa()
    }
}
function carregarPontos() {
    let divViewList = document.querySelector('#divViewList')
    if (divViewList) {
        divViewList.innerHTML = `
        <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        `
    }
    fetch(`/painel/pontos/visualizar?filter=${JSON.stringify(filtros)}`)
    .then((response) => {
        return response.json()
    })
    .then((dados) => {
        pontos.length = dados.length
        pontos.pontos = []
        dados.pontos.forEach((dado) => {
            let ponto = {
                'basic': null,
                'commercial': null,
                'private': null
            }
            ponto.basic = new Ponto_Basic(
                dado.basic.id,
                dado.basic.code,
                dado.basic.address,
                dado.basic.latitude,
                dado.basic.longitude,
                dado.basic.image_link,
                dado.basic.reference,
                dado.basic.district,
                dado.basic.city,
                dado.basic.zone,
                dado.basic.state,
                dado.basic.country,
                dado.basic.format,
                dado.basic.measure
            )
            ponto.commercial = new Ponto_Commercial(
                dado.commercial.id,
                dado.commercial.spot_id,
                dado.commercial.impacto,
                dado.commercial.valor_tabela_comm,
                dado.commercial.valor_negociado_comm,
                dado.commercial.producao,
                dado.commercial.observacoes,
                dado.commercial.outros
            )
            ponto.private = new Ponto_Private(
                dado.private.id,
                dado.private.spot_id,
                dado.private.empresa,
                dado.private.valor_negociado_int,
                dado.private.custo_liq,
                dado.private.medida_int,
                dado.private.observacoes,
                dado.private.outros
            )
            pontos.pontos.push(ponto)
        })
        pontosSelecionadosId = []
        allMarkers = []
        //console.log(allMarkers.length)
        visualizarPontos()
        displayActionsBts()
    })
}
var gerarExcelEvent;
export var listaPontos = function() {
    cleanFilters()
    pontosSelecionadosId = []
    filtros.view = 'list'
    let texts;
    if (lang == 'es' || lang == 'es-ar') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }

    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let mapaPontosOpt = document.querySelector('#mapaPontosOpt')
    let importarZipOpt = document.querySelector('#importarZipOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    listaPontosOpt.classList.add('select')
    mapaPontosOpt.classList.remove('select')
    importarZipOpt.classList.remove('select')
    importarPontosOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let body_header = document.querySelector('#body-header')

    fetch(`/painel/pontos/visualizar?lang=${lang}`)
    .then((response) => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível concluir a solicitação.')
        } else {
            return response.json()
            .then((textContent) => {
                let divFiltro = document.createElement('div')
                divFiltro.className = 'divFiltro'
                
                let divFiltroBt = document.createElement('div')
                divFiltroBt.className = 'divFiltroBt'

                let filtroBt = document.createElement('button')
                filtroBt.className = 'btn btn-warning filtroBt'
                filtroBt.id = 'filtroBt'
                filtroBt.innerHTML = textContent.adicionarFiltro
                let checkConfirmarBtEvent = false
                filtroBt.addEventListener('click', () => {
                    let modalBody = document.querySelector('#filtroModalBody')
                    modalBody.innerHTML = ''
                    $('#filtroModal').modal('show')
                    if (checkConfirmarBtEvent == false) {
                        checkConfirmarBtEvent = true
                        let confirmarBt = document.querySelector('#filtroModalConfirmar')
                        confirmarBt.addEventListener('click', () => {
                            confirmarBt.innerHTML = `
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            `
                            let inputs = document.getElementsByClassName('divFiltroInput')
                            let checkFiltroSelecionado = false
                            for (let i = 0; i < inputs.length; i++) {
                                let input = inputs[i]
                                if (input.disabled == false) {
                                    checkFiltroSelecionado = true
                                    let key = input.id
                                    let value = input.value
                                    filtros[key].push(value)
                                }
                            }
                            if (checkFiltroSelecionado == false) {
                                confirmarBt.innerHTML = textContent.adicionarFiltroConfirmarBt
                                if (lang == 'es' || lang == 'es-ar') {
                                    alertGenerate(modalBody, 'Filtro inválido.')
                                } else if (lang == 'en') {
                                    alertGenerate(modalBody, 'Invalid filter.')
                                } else {
                                    alertGenerate(modalBody, 'Filtro inválido.')
                                }
                                return
                            }
                            confirmarBt.innerHTML = textContent.adicionarFiltroConfirmarBt
                            $('#filtroModal').modal('hide')
                            filtros.pontosLength = 0
                            carregarPontos()
                            gerarFiltros()
                            modalBody.innerHTML = ''
                        })
                    }
                    let divPais = document.createElement('div')
                    divPais.className = 'divFiltroItem'
                    let paisRadio = document.createElement('input')
                    paisRadio.type = 'checkbox'
                    paisRadio.value = 'pais'
                    paisRadio.className = 'divFiltroRadio'
                    paisRadio.name = 'filtroRadio'
                    paisRadio.addEventListener('change', () => {
                        let paisInput = document.querySelector('#pais')
                        if (paisRadio.checked) {
                            paisInput.disabled = false
                        } else {
                            paisInput.disabled = true
                            paisInput.selectedIndex = 0
                        }
                    })
                    let paisLabel = document.createElement('p')
                    paisLabel.className = 'divFiltroLabel'
                    paisLabel.innerHTML = textContent.pais
                    let paisSelect = document.createElement('select')
                    paisSelect.className = 'divFiltroInput'
                    paisSelect.id = 'pais'
                    paisSelect.disabled = true
                    let paisDefaultOpt = document.createElement('option')
                    paisDefaultOpt.value = 'default'
                    paisDefaultOpt.innerHTML = textContent.paisDefaultOpt
                    paisDefaultOpt.selected = true
                    paisDefaultOpt.disabled = true
                    paisSelect.appendChild(paisDefaultOpt)
                    let paisBrasilOpt = document.createElement('option')
                    paisBrasilOpt.value = 'Brasil'
                    paisBrasilOpt.innerHTML = textContent.paisBrasilOpt
                    paisSelect.appendChild(paisBrasilOpt)
                    let paisArgentinaOpt = document.createElement('option')
                    paisArgentinaOpt.value = 'Argentina'
                    paisArgentinaOpt.innerHTML = textContent.paisArgentinaOpt
                    paisSelect.appendChild(paisArgentinaOpt)
                    let paisInglaterraOpt = document.createElement('option')
                    paisInglaterraOpt.value = 'England'
                    paisInglaterraOpt.innerHTML = textContent.paisInglaterraOpt
                    paisSelect.appendChild(paisInglaterraOpt)
                    divPais.appendChild(paisRadio)
                    divPais.appendChild(paisLabel)
                    divPais.appendChild(paisSelect)
                    modalBody.appendChild(divPais)
            
                    let divCodigo = document.createElement('div')
                    divCodigo.className = 'divFiltroItem'
                    let codigoRadio = document.createElement('input')
                    codigoRadio.type = 'checkbox'
                    codigoRadio.className = 'divFiltroRadio'
                    codigoRadio.value = 'codigo'
                    codigoRadio.name = 'filtroRadio'
                    codigoRadio.addEventListener('change', () => {
                        let codigoInput = document.querySelector('#codigo')
                        if (codigoRadio.checked) {
                            codigoInput.disabled = false
                        } else {
                            codigoInput.disabled = true
                            codigoInput.value = ''
                        }
                    })
                    let codigoLabel = document.createElement('p')
                    codigoLabel.className = 'divFiltroLabel'
                    codigoLabel.innerHTML = textContent.codigo
                    let codigoInput = document.createElement('input')
                    codigoInput.maxLength = 50
                    codigoInput.className = 'divFiltroInput'
                    codigoInput.id = 'codigo'
                    codigoInput.disabled = true
                    divCodigo.appendChild(codigoRadio)
                    divCodigo.appendChild(codigoLabel)
                    divCodigo.appendChild(codigoInput)
                    modalBody.appendChild(divCodigo)
            
                    let divCidade = document.createElement('div')
                    divCidade.className = 'divFiltroItem'
                    let cidadeRadio = document.createElement('input')
                    cidadeRadio.type = 'checkbox'
                    cidadeRadio.className = 'divFiltroRadio'
                    cidadeRadio.value = 'cidade'
                    cidadeRadio.name = 'filtroRadio'
                    cidadeRadio.addEventListener('change', () => {
                        let cidadeInput = document.querySelector('#cidade')
                        if (cidadeRadio.checked) {
                            cidadeInput.disabled = false
                        } else {
                            cidadeInput.disabled = true
                            cidadeInput.value = ''
                        }
                    })
                    let cidadeLabel = document.createElement('p')
                    cidadeLabel.className = 'divFiltroLabel'
                    cidadeLabel.innerHTML = textContent.cidade
                    let cidadeInput = document.createElement('input')
                    cidadeInput.maxLength = 50
                    cidadeInput.className = 'divFiltroInput'
                    cidadeInput.disabled = true
                    cidadeInput.id = 'cidade'
                    divCidade.appendChild(cidadeRadio)
                    divCidade.appendChild(cidadeLabel)
                    divCidade.appendChild(cidadeInput)
                    modalBody.appendChild(divCidade)
            
                    let divEstado = document.createElement('div')
                    divEstado.className = 'divFiltroItem'
                    let estadoRadio = document.createElement('input')
                    estadoRadio.type = 'checkbox'
                    estadoRadio.className = 'divFiltroRadio'
                    estadoRadio.value = 'estado'
                    estadoRadio.name = 'filtroRadio'
                    estadoRadio.addEventListener('change', () => {
                        let estadoInput = document.querySelector('#estado')
                        if (estadoRadio.checked) {
                            estadoInput.disabled = false
                        } else {
                            estadoInput.disabled = true
                            estadoInput.value = ''
                        }
                    })
                    let estadoLabel = document.createElement('p')
                    estadoLabel.className = 'divFiltroLabel'
                    estadoLabel.innerHTML = textContent.estado
                    let estadoInput = document.createElement('input')
                    estadoInput.maxLength = 50
                    estadoInput.className = 'divFiltroInput'
                    estadoInput.id = 'estado'
                    estadoInput.disabled = true
                    divEstado.appendChild(estadoRadio)
                    divEstado.appendChild(estadoLabel)
                    divEstado.appendChild(estadoInput)
                    modalBody.appendChild(divEstado)
            
                    let divZona = document.createElement('div')
                    divZona.className = 'divFiltroItem'
                    let zonaRadio = document.createElement('input')
                    zonaRadio.type = 'checkbox'
                    zonaRadio.className = 'divFiltroRadio'
                    zonaRadio.value = 'zona'
                    zonaRadio.name = 'filtroRadio'
                    zonaRadio.addEventListener('change', () => {
                        let zonaInput = document.querySelector('#zona')
                        if (zonaRadio.checked) {
                            zonaInput.disabled = false
                        } else {
                            zonaInput.disabled = true
                            zonaInput.value = ''
                        }
                    })
                    let zonaLabel = document.createElement('p')
                    zonaLabel.className = 'divFiltroLabel'
                    zonaLabel.innerHTML = textContent.zona
                    let zonaInput = document.createElement('input')
                    zonaInput.maxLength = 50
                    zonaInput.className = 'divFiltroInput'
                    zonaInput.id = 'zona'
                    zonaInput.disabled = true
                    divZona.appendChild(zonaRadio)
                    divZona.appendChild(zonaLabel)
                    divZona.appendChild(zonaInput)
                    modalBody.appendChild(divZona)
            
                    let divBairro = document.createElement('div')
                    divBairro.className = 'divFiltroItem'
                    let bairroRadio = document.createElement('input')
                    bairroRadio.type = 'checkbox'
                    bairroRadio.className = 'divFiltroRadio'
                    bairroRadio.value = 'bairro'
                    bairroRadio.name = 'filtroRadio'
                    bairroRadio.addEventListener('change', () => {
                        let bairroInput = document.querySelector('#bairro')
                        if (bairroRadio.checked) {
                            bairroInput.disabled = false
                        } else {
                            bairroInput.disabled = true
                            bairroInput.value = ''
                        }
                    })
                    let bairroLabel = document.createElement('p')
                    bairroLabel.className = 'divFiltroLabel'
                    bairroLabel.innerHTML = textContent.bairro
                    let bairroInput = document.createElement('input')
                    bairroInput.maxLength = 50
                    bairroInput.className = 'divFiltroInput'
                    bairroInput.id = 'bairro'
                    bairroInput.disabled = true
                    divBairro.appendChild(bairroRadio)
                    divBairro.appendChild(bairroLabel)
                    divBairro.appendChild(bairroInput)
                    modalBody.appendChild(divBairro)
            
                    let divEndereco = document.createElement('div')
                    divEndereco.className = 'divFiltroItem'
                    let enderecoRadio = document.createElement('input')
                    enderecoRadio.type = 'checkbox'
                    enderecoRadio.className = 'divFiltroRadio'
                    enderecoRadio.value = 'endereco'
                    enderecoRadio.name = 'filtroRadio'
                    enderecoRadio.addEventListener('change', () => {
                        let enderecoInput = document.querySelector('#endereco')
                        if (enderecoRadio.checked) {
                            enderecoInput.disabled = false
                        } else {
                            enderecoInput.disabled = true
                            enderecoInput.value = ''
                        }
                    })
                    let enderecoLabel = document.createElement('p')
                    enderecoLabel.className = 'divFiltroLabel'
                    enderecoLabel.innerHTML = textContent.endereco
                    let enderecoInput = document.createElement('input')
                    enderecoInput.maxLength = 50
                    enderecoInput.className = 'divFiltroInput'
                    enderecoInput.id = 'endereco'
                    enderecoInput.disabled = true
                    divEndereco.appendChild(enderecoRadio)
                    divEndereco.appendChild(enderecoLabel)
                    divEndereco.appendChild(enderecoInput)
                    modalBody.appendChild(divEndereco)
            
                    let divEmpresa = document.createElement('div')
                    divEmpresa.className = 'divFiltroItem'
                    let empresaRadio = document.createElement('input')
                    empresaRadio.type = 'checkbox'
                    empresaRadio.className = 'divFiltroRadio'
                    empresaRadio.value = 'empresa'
                    empresaRadio.name = 'filtroRadio'
                    empresaRadio.addEventListener('change', () => {
                        let empresaInput = document.querySelector('#empresa')
                        if (empresaRadio.checked) {
                            empresaInput.disabled = false
                        } else {
                            empresaInput.disabled = true
                            empresaInput.value = ''
                        }
                    })
                    let empresaLabel = document.createElement('p')
                    empresaLabel.className = 'divFiltroLabel'
                    empresaLabel.innerHTML = textContent.empresa
                    let empresaInput = document.createElement('input')
                    empresaInput.maxLength = 50
                    empresaInput.className = 'divFiltroInput'
                    empresaInput.id = 'empresa'
                    empresaInput.disabled = true
                    divEmpresa.appendChild(empresaRadio)
                    divEmpresa.appendChild(empresaLabel)
                    divEmpresa.appendChild(empresaInput)
                    modalBody.appendChild(divEmpresa)
            
                    let divFormato = document.createElement('div')
                    divFormato.className = 'divFiltroItem'
                    let formatoRadio = document.createElement('input')
                    formatoRadio.type = 'checkbox'
                    formatoRadio.className = 'divFiltroRadio'
                    formatoRadio.value = 'formato'
                    formatoRadio.name = 'filtroRadio'
                    formatoRadio.addEventListener('change', () => {
                        let formatoInput = document.querySelector('#formato')
                        if (formatoRadio.checked) {
                            formatoInput.disabled = false
                        } else {
                            formatoInput.disabled = true
                            formatoInput.value = ''
                        }
                    })
                    let formatoLabel = document.createElement('p')
                    formatoLabel.className = 'divFiltroLabel'
                    formatoLabel.innerHTML = textContent.formato
                    let formatoInput = document.createElement('input')
                    formatoInput.maxLength = 50
                    formatoInput.className = 'divFiltroInput'
                    formatoInput.id = 'formato'
                    formatoInput.disabled = true
                    divFormato.appendChild(formatoRadio)
                    divFormato.appendChild(formatoLabel)
                    divFormato.appendChild(formatoInput)
                    modalBody.appendChild(divFormato)
            
                })
                divFiltroBt.appendChild(filtroBt)

                let limparFiltrosBt = document.createElement('button')
                limparFiltrosBt.className = 'btn btn-secondary limparFiltroBt'
                limparFiltrosBt.id = 'limparFiltroBt'
                limparFiltrosBt.innerHTML = textContent.limparFiltros
                limparFiltrosBt.addEventListener('click', () => {
                    cleanFilters()
                    gerarFiltros()
                    carregarPontos()
                })
                divFiltroBt.appendChild(limparFiltrosBt)
                let filtroModal = document.createElement('div')
                filtroModal.className = 'modal fade'
                filtroModal.id = 'filtroModal'
                filtroModal.setAttribute('data-bs-backdrop', 'static')
                filtroModal.setAttribute('data-bs-keyboard', 'false')
                filtroModal.tabIndex = -1
                filtroModal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">${textContent.adicionarFiltroModalTitle}</h5>
                        </div>
                        <div id="filtroModalBody" class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button id="filtroModalCancelar" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${textContent.adicionarFiltroCancelarBt}</button>
                            <button id="filtroModalConfirmar" type="button" class="btn btn-warning">${textContent.adicionarFiltroConfirmarBt}</button>
                        </div>
                    </div>
                </div>
            
                `
                divFiltroBt.appendChild(filtroModal)
                divFiltro.appendChild(divFiltroBt)
            
                let divFiltroList = document.createElement('div')
                divFiltroList.className = 'divFiltroList'
                divFiltroList.id = 'divFiltroList'
                let notFilters = document.createElement('p')
                notFilters.className = 'notFilters'
                notFilters.innerHTML = textContent.notFilters
                divFiltroList.appendChild(notFilters)
                divFiltro.appendChild(divFiltroList)
            
                body_content.appendChild(divFiltro)

                let divViewBts = document.createElement('div')
                divViewBts.className = 'divViewBts'
                let listaViewBt = document.createElement('div')
                listaViewBt.className = 'viewBt'
                listaViewBt.id = 'listaViewBt'
                listaViewBt.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-card-list" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
                `
                listaViewBt.addEventListener('click', () => {
                    filtros['view'] = 'list'
                    markerClickAction = 'view'
                    visualizarPontos()
                })
                divViewBts.appendChild(listaViewBt)
                let mapViewBt = document.createElement('div')
                mapViewBt.className = 'viewBt'
                mapViewBt.id = 'mapaViewBt'
                mapViewBt.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                `
                mapViewBt.addEventListener('click', () => {
                    filtros['view'] = 'map'
                    markerClickAction = 'view'
                    visualizarPontos()
                })
                divViewBts.appendChild(mapViewBt)
                body_content.appendChild(divViewBts)

                
                body_content.appendChild(createDivActions(texts))

                let divViewList = document.createElement('div')
                divViewList.className = 'divViewList'
                divViewList.id = 'divViewList'
                body_content.appendChild(divViewList)

                carregarPontos()
            })
        }
    })
}
export var importarZip = function() {
    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let mapaPontosOpt = document.querySelector('#mapaPontosOpt')
    let importarZipOpt = document.querySelector('#importarZipOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    mapaPontosOpt.classList.remove('select')
    listaPontosOpt.classList.remove('select')
    importarZipOpt.classList.add('select')
    importarPontosOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let body_header = document.querySelector('#body-header')

    let divCriarItems = document.createElement('div')
    divCriarItems.className = 'criar-items'
    divCriarItems.id = "divCriarItems"
    
    let divCriarInput = document.createElement('div')
    divCriarInput.className = 'criar-input'

    fetch(`/painel/pontos/importar-zip?lang=${lang}`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível concluir a solicitação. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then((textContent) => {
                let comments = document.createElement('p')
                comments.className = 'comments'
                comments.innerHTML = textContent.observacoes
                divCriarInput.appendChild(comments)
                
                let labelFileInput = document.createElement('p')
                labelFileInput.innerHTML = textContent.legenda1
                divCriarInput.appendChild(labelFileInput)
                
                let fileInput = document.createElement('input')
                fileInput.type = 'file'
                fileInput.accept = '.zip'
                fileInput.name = 'arquivo'
                fileInput.id = 'arquivo'
                fileInput.required = true
                divCriarInput.appendChild(fileInput)
                
                let descriptionFileInput = document.createElement('p')
                descriptionFileInput.className = 'description'
                descriptionFileInput.innerHTML = textContent.legenda2
                divCriarInput.appendChild(descriptionFileInput)
                divCriarItems.append(divCriarInput)

                let divPais = document.createElement('div')
                divPais.className = 'divPais'
                let paisLabel = document.createElement('p')
                paisLabel.className = 'divPaisLabel'
                paisLabel.innerHTML = textContent.paisLabel
                let paisSelect = document.createElement('select')
                paisSelect.className = 'divPaisSelect'
                let paisDefaultOpt = document.createElement('option')
                paisDefaultOpt.value = 'default'
                paisDefaultOpt.innerHTML = textContent.defaultOption
                paisDefaultOpt.selected = true
                paisDefaultOpt.disabled = true
                paisSelect.appendChild(paisDefaultOpt)
                let paisBrasilOpt = document.createElement('option')
                paisBrasilOpt.value = 'Brasil'
                paisBrasilOpt.innerHTML = 'Brasil'
                paisSelect.appendChild(paisBrasilOpt)
                let paisArgentinaOpt = document.createElement('option')
                paisArgentinaOpt.value = 'Argentina'
                paisArgentinaOpt.innerHTML = 'Argentina'
                paisSelect.appendChild(paisArgentinaOpt)
                let paisInglaterraOpt = document.createElement('option')
                paisInglaterraOpt.value = 'England'
                paisInglaterraOpt.innerHTML = 'England'
                paisSelect.appendChild(paisInglaterraOpt)
                divPais.appendChild(paisLabel)
                divPais.appendChild(paisSelect)
                
                let divPadronizar = document.createElement('div')
                divPadronizar.className = 'divPadronizar'
                let divPadronizarLabel = document.createElement('p')
                divPadronizarLabel.className = 'padronizarLabel'
                divPadronizarLabel.innerHTML = textContent.padronizarLabel
                divPadronizar.appendChild(divPadronizarLabel)

                let divCidade = document.createElement('div')
                divCidade.className = 'divPadronizarItem'
                let cidadeCheckbox = document.createElement('input')
                cidadeCheckbox.type = 'checkbox'
                cidadeCheckbox.className = 'divPadronizarCheckbox'
                cidadeCheckbox.value = 'checkCidade'
                let cidadeLabel = document.createElement('p')
                cidadeLabel.className = 'divPadronizarLabel'
                cidadeLabel.innerHTML = textContent.cidadeLabel
                let cidadeInput = document.createElement('input')
                cidadeInput.maxLength = 50
                cidadeInput.className = 'divPadronizarInput'
                cidadeInput.disabled = true
                cidadeCheckbox.addEventListener('change', () => {
                    if (cidadeCheckbox.checked == true) {
                        cidadeInput.disabled = false
                    } else {
                        cidadeInput.disabled = true
                        cidadeInput.value = ''
                    }
                })
                divCidade.appendChild(cidadeCheckbox)
                divCidade.appendChild(cidadeLabel)
                divCidade.appendChild(cidadeInput)
                
                let divZona = document.createElement('div')
                divZona.className = 'divPadronizarItem'
                let zonaCheckbox = document.createElement('input')
                zonaCheckbox.type = 'checkbox'
                zonaCheckbox.className = 'divPadronizarCheckbox'
                zonaCheckbox.value = 'checkZona'
                let zonaLabel = document.createElement('p')
                zonaLabel.className = 'divPadronizarLabel'
                zonaLabel.innerHTML = textContent.zonaLabel
                let zonaInput = document.createElement('input')
                zonaInput.maxLength = 50
                zonaInput.className = 'divPadronizarInput'
                zonaInput.disabled = true
                zonaCheckbox.addEventListener('change', () => {
                    if (zonaCheckbox.checked == true) {
                        zonaInput.disabled = false
                    } else {
                        zonaInput.disabled = true
                        zonaInput.value = ''
                    }
                })
                divZona.appendChild(zonaCheckbox)
                divZona.appendChild(zonaLabel)
                divZona.appendChild(zonaInput)
                
                let divEmpresa = document.createElement('div')
                divEmpresa.className = 'divPadronizarItem'
                let empresaCheckbox = document.createElement('input')
                empresaCheckbox.type = 'checkbox'
                empresaCheckbox.className = 'divPadronizarCheckbox'
                empresaCheckbox.value = 'checkEmpresa'
                let empresaLabel = document.createElement('p')
                empresaLabel.className = 'divPadronizarLabel'
                empresaLabel.innerHTML = textContent.empresaLabel
                let empresaInput = document.createElement('input')
                empresaInput.maxLength = 50
                empresaInput.className = 'divPadronizarInput'
                empresaInput.disabled = true
                empresaCheckbox.addEventListener('change', () => {
                    if (empresaCheckbox.checked == true) {
                        empresaInput.disabled = false
                    } else {
                        empresaInput.disabled = true
                        empresaInput.value = ''
                    }
                })
                divEmpresa.appendChild(empresaCheckbox)
                divEmpresa.appendChild(empresaLabel)
                divEmpresa.appendChild(empresaInput)
                
                let divCusto = document.createElement('div')
                divCusto.className = 'divPadronizarItem'
                let custoCheckbox = document.createElement('input')
                custoCheckbox.type = 'checkbox'
                custoCheckbox.className = 'divPadronizarCheckbox'
                custoCheckbox.value = 'checkCusto'
                let custoLabel = document.createElement('p')
                custoLabel.className = 'divPadronizarLabel'
                custoLabel.innerHTML = textContent.custoLabel
                let custoInput = document.createElement('input')
                custoInput.maxLength = 50
                custoInput.className = 'divPadronizarInput'
                custoInput.disabled = true
                custoCheckbox.addEventListener('change', () => {
                    if (custoCheckbox.checked == true) {
                        custoInput.disabled = false
                    } else {
                        custoInput.disabled = true
                        custoInput.value = ''
                    }
                })
                divCusto.appendChild(custoCheckbox)
                divCusto.appendChild(custoLabel)
                divCusto.appendChild(custoInput)
                
                let divEstado = document.createElement('div')
                divEstado.className = 'divPadronizarItem'
                let estadoCheckbox = document.createElement('input')
                estadoCheckbox.type = 'checkbox'
                estadoCheckbox.className = 'divPadronizarCheckbox'
                estadoCheckbox.value = 'checkEstado'
                let estadoLabel = document.createElement('p')
                estadoLabel.className = 'divPadronizarLabel'
                estadoLabel.innerHTML = textContent.estadoLabel
                let estadoInput = document.createElement('input')
                estadoInput.maxLength = 50
                estadoInput.className = 'divPadronizarInput'
                estadoInput.disabled = true
                estadoCheckbox.addEventListener('change', () => {
                    if (estadoCheckbox.checked == true) {
                        estadoInput.disabled = false
                    } else {
                        estadoInput.disabled = true
                        estadoInput.value = ''
                    }
                })
                divEstado.appendChild(estadoCheckbox)
                divEstado.appendChild(estadoLabel)
                divEstado.appendChild(estadoInput)
                
                let divValorTabela = document.createElement('div')
                divValorTabela.className = 'divPadronizarItem'
                let valorTabelaCheckbox = document.createElement('input')
                valorTabelaCheckbox.type = 'checkbox'
                valorTabelaCheckbox.className = 'divPadronizarCheckbox'
                valorTabelaCheckbox.value = 'checkValorTabela'
                let valorTabelaLabel = document.createElement('p')
                valorTabelaLabel.className = 'divPadronizarLabel'
                valorTabelaLabel.innerHTML = textContent.valorTabelaLabel
                let valorTabelaInput = document.createElement('input')
                valorTabelaInput.maxLength = 50
                valorTabelaInput.className = 'divPadronizarInput'
                valorTabelaInput.disabled = true
                valorTabelaCheckbox.addEventListener('change', () => {
                    if (valorTabelaCheckbox.checked == true) {
                        valorTabelaInput.disabled = false
                    } else {
                        valorTabelaInput.disabled = true
                        valorTabelaInput.value = ''
                    }
                })
                divValorTabela.appendChild(valorTabelaCheckbox)
                divValorTabela.appendChild(valorTabelaLabel)
                divValorTabela.appendChild(valorTabelaInput)
                
                let divValorNegociado = document.createElement('div')
                divValorNegociado.className = 'divPadronizarItem'
                let valorNegociadoCheckbox = document.createElement('input')
                valorNegociadoCheckbox.type = 'checkbox'
                valorNegociadoCheckbox.className = 'divPadronizarCheckbox'
                valorNegociadoCheckbox.value = 'checkValorNegociado'
                let valorNegociadoLabel = document.createElement('p')
                valorNegociadoLabel.className = 'divPadronizarLabel'
                valorNegociadoLabel.innerHTML = textContent.valorNegociadoLabel
                let valorNegociadoInput = document.createElement('input')
                valorNegociadoInput.maxLength = 50
                valorNegociadoInput.className = 'divPadronizarInput'
                valorNegociadoInput.disabled = true
                valorNegociadoCheckbox.addEventListener('change', () => {
                    if (valorNegociadoCheckbox.checked == true) {
                        valorNegociadoInput.disabled = false
                    } else {
                        valorNegociadoInput.disabled = true
                        valorNegociadoInput.value = ''
                    }
                })
                divValorNegociado.appendChild(valorNegociadoCheckbox)
                divValorNegociado.appendChild(valorNegociadoLabel)
                divValorNegociado.appendChild(valorNegociadoInput)
                
                let divFormato = document.createElement('div') 
                divFormato.className = 'divPadronizarItem'
                let formatoCheckbox = document.createElement('input')
                formatoCheckbox.type = 'checkbox'
                formatoCheckbox.className = 'divPadronizarCheckbox'
                formatoCheckbox.value = 'checkFormato'
                let formatoLabel = document.createElement('p')
                formatoLabel.className = 'divPadronizarLabel'
                formatoLabel.innerHTML = textContent.formatoLabel
                let formatoInput = document.createElement('input')
                formatoInput.maxLength = 50
                formatoInput.className = 'divPadronizarInput'
                formatoInput.disabled = true
                formatoCheckbox.addEventListener('change', () => {
                    if (formatoCheckbox.checked == true) {
                        formatoInput.disabled = false
                    } else {
                        formatoInput.disabled = true
                        formatoInput.value = ''
                    }
                })
                divFormato.appendChild(formatoCheckbox)
                divFormato.appendChild(formatoLabel)
                divFormato.appendChild(formatoInput)

                divPadronizar.appendChild(divZona)
                divPadronizar.appendChild(divCidade)
                divPadronizar.appendChild(divEstado)
                divPadronizar.appendChild(divEmpresa)
                divPadronizar.appendChild(divCusto)
                divPadronizar.appendChild(divValorTabela)
                divPadronizar.appendChild(divValorNegociado)
                divPadronizar.appendChild(divFormato)

                let divCriarBt = document.createElement('div')
                divCriarBt.className = 'criar-bt'
                let buttonCriarBt = document.createElement('button')
                buttonCriarBt.className = 'gold-bt'
                buttonCriarBt.innerHTML = textContent.enviarBt
                buttonCriarBt.addEventListener('click', () => {
                    if (fileInput.files.length == 0) {
                        alertGenerate(body, 'Selecione um arquivo.')
                        importarZip()
                        return
                    }
                    if (fileInput.files.length != 1) {
                        alertGenerate(body, 'Selecione somente 1 arquivo.')
                        importarZip()
                        return
                    }
                    let pais = paisSelect.options[paisSelect.selectedIndex].value
                    if (pais == 'default' || !pais) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Seleccionar país.')
                            body_header.focus()
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Select country.')
                            body_header.focus()
                        } else {
                            alertGenerate(body, 'Selecione o país.')
                            body_header.focus()
                        }
                        return
                    }
                    if (fileInput.files[0].size > 10485760){
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'El archivo debe tener un máximo de 10MB.')
                            body_header.focus()
                        } else if (lang == 'en') {
                            alertGenerate(body, 'The file must be a maximum of 10MB.')
                            body_header.focus()
                        } else {
                            alertGenerate(body, 'O arquivo deve ter no máximo 10MB.')
                            body_header.focus()
                        }
                        return
                    }
                    buttonCriarBt.innerHTML = `
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    `
                    let send = new FormData()
                    send.append('arquivo', fileInput.files[0])
                    send.append('pais', pais)
                    send.append('zona', zonaInput.value)
                    send.append('cidade', cidadeInput.value)
                    send.append('estado', estadoInput.value)
                    send.append('empresa', empresaInput.value)
                    send.append('custo', custoInput.value)
                    send.append('valorTabela', valorTabelaInput.value)
                    send.append('valorNegociado', valorNegociadoInput.value)
                    send.append('formato', formatoInput.value)
                    fetch('/painel/pontos/importar-zip', {
                        method: 'POST',
                        body: send
                    })
                    .then((response) => {
                        if (!response.ok) {
                            buttonCriarBt.innerHTML = textContent.enviarBt
                            alertGenerate(body, 'Erro no servidor. Tente novamente.')
                            importarZip()
                            body_header.focus()
                        } else {
                            return response.json()
                            .then((data) => {
                                buttonCriarBt.innerHTML = textContent.enviarBt
                                data.message.forEach(element => {
                                    alertGenerate(body, element)
                                });
                                importarZip()
                                body_header.focus()
                            })
                        }
                    })
                })
                divCriarBt.appendChild(buttonCriarBt)
                divCriarItems.append(divPais)
                divCriarItems.append(divPadronizar)
                divCriarItems.append(divCriarBt)
                
                body_content.appendChild(divCriarItems)
            })
        }
    })
}
export var importarPontos = function() {
    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let mapaPontosOpt = document.querySelector('#mapaPontosOpt')
    let importarZipOpt = document.querySelector('#importarZipOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    listaPontosOpt.classList.remove('select')
    mapaPontosOpt.classList.remove('select')
    importarZipOpt.classList.remove('select')
    importarPontosOpt.classList.add('select')
    
    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let divImportarItems = document.createElement('div')
    divImportarItems.className = 'importar-items'
    divImportarItems.id = "divImportarItems"
    
    let divImportarInput = document.createElement('div')
    divImportarInput.className = 'importar-input'
    
    fetch(`/painel/pontos/importar?lang=${lang}`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível concluir a solicitação. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(function(textContent) {
                let labelFileInput = document.createElement('p')
                labelFileInput.innerHTML = textContent.legenda1
                divImportarInput.appendChild(labelFileInput)
                
                let fileInput = document.createElement('input')
                fileInput.type = 'file'
                fileInput.accept = '.xlsx'
                fileInput.name = 'arquivo'
                fileInput.id = 'arquivo'
                fileInput.required = true
                divImportarInput.appendChild(fileInput)
                
                let descriptionFileInput = document.createElement('p')
                descriptionFileInput.className = 'description'
                descriptionFileInput.innerHTML = textContent.legenda2
                divImportarInput.appendChild(descriptionFileInput)
                divImportarItems.append(divImportarInput)
                        
                let divImportarBt = document.createElement('div')
                divImportarBt.className = 'importar-bt'
            
                let buttonImportarBt = document.createElement('button')
                buttonImportarBt.className = 'gold-bt'
                buttonImportarBt.innerHTML = textContent.enviarBt
                buttonImportarBt.addEventListener('click', () => {
                    if (fileInput.files.length == 0) {
                        alertGenerate(body, 'Selecione uma planilha.')
                        importarPontos()
                        return
                    }
                    if (fileInput.files.length != 1) {
                        alertGenerate(body, 'Selecione somente 1 arquivo.')
                        importarPontos()
                        return
                    } else {
                        buttonImportarBt.innerHTML = `
                        <div class="spinner-border text-dark" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        `
                        let dados = new FormData()
                        dados.append('lang', lang)
                        dados.append('arquivo', fileInput.files[0])
                        dados.append('type', 'registrar')
                        fetch('/painel/pontos/importar', {
                            method: 'POST',
                            body: dados
                        })
                        .then(function(response) {
                            if (!response.ok) {
                                $('#selectModal').modal('hide')
                                if (lang == 'es' || lang == 'es-ar') {
                                    alertGenerate(body, 'Algo salió mal. Inténtalo de nuevo.')
                                } else if (lang == 'en') {
                                    alertGenerate(body, 'Something went wrong. Try again.')
                                } else {
                                    alertGenerate(body, 'Algo deu errado. Tente novamente.')
                                }
                                importarPontos()
                            } else {
                                return response.json()
                                .then(function(data) {
                                    $('#selectModal').modal('hide')
                                    data.message.forEach((message) => {
                                        alertGenerate(body, message)
                                    })
                                    importarPontos()
                                })
                            }
                        })
                    }
            
                    // Fazer fetch para enviar arquivo
                })
                divImportarBt.appendChild(buttonImportarBt)
                divImportarItems.append(divImportarBt)
                body_content.appendChild(divImportarItems)
            })
        }
    })
}

var searchBtEvent;
var gerarBookEvent;
export var mapaPontos = function() {
    cleanFilters()
    pontosSelecionadosId = []
    allMarkers = []
    pontos.length = 0
    pontos.pontos = []
    filtros.view = 'map'
    let texts;
    if (lang == 'es' || lang == 'es-ar') {
        texts = allTexts.es
    } else if (lang == 'en') {
        texts = allTexts.en
    } else {
        texts = allTexts.pt
    }

    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let mapaPontosOpt = document.querySelector('#mapaPontosOpt')
    let importarZipOpt = document.querySelector('#importarZipOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    listaPontosOpt.classList.remove('select')
    mapaPontosOpt.classList.add('select')
    importarZipOpt.classList.remove('select')
    importarPontosOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''
    body_content.style.minHeight = '50rem'

    let divOptions = document.createElement('div')
    divOptions.className = 'divOptions'
    let divMap = document.createElement('div')
    divMap.className = 'divMap'
    divMap.id = 'divMap'
    let map = initMap(divMap)

    body_content.appendChild(divOptions)
    body_content.appendChild(divMap)

    let divMapActions = document.createElement('divMapActions')
    divMapActions.className = 'divMapActions'
    divMapActions.id = 'divMapActions'
    let divraioSearch = document.createElement('div')
    divraioSearch.className = 'divSearch'
    divraioSearch.id = 'divRaioSearch'
    let raioSearchTitle = document.createElement('p')
    raioSearchTitle.className = 'searchTitle'
    raioSearchTitle.innerHTML = texts.raioSearchTitle
    divraioSearch.appendChild(raioSearchTitle)
    let raioSearchBt = document.createElement('div')
    raioSearchBt.className = 'searchBt btn btn-secondary'
    raioSearchBt.id = 'raioSearchBt'
    raioSearchBt.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
    </svg>
    `
    divraioSearch.appendChild(raioSearchBt)
    let divRaioRange = document.createElement('div')
    divRaioRange.className = 'divRaioRange'
    let raioRangeLabel = document.createElement('label')
    raioRangeLabel.for = 'raioRange'
    raioRangeLabel.innerHTML = texts.raioRangeLabel
    divRaioRange.appendChild(raioRangeLabel)
    let raioRangeValue = document.createElement('p')
    raioRangeValue.innerHTML = '1 Km'
    raioRangeValue.id = 'raioRangeValue'
    raioRangeValue.className = 'raioRangeValue'
    divRaioRange.appendChild(raioRangeValue)
    let raioRange = document.createElement('input')
    raioRange.type = 'range'
    raioRange.className = 'form-range'
    raioRange.min = 1
    raioRange.max = 50
    raioRange.value = 1
    raioRange.id = 'raioRange'
    raioRange.addEventListener('change', () => {
        raioRangeValue.innerHTML = `${raioRange.value} Km`
    })
    divRaioRange.appendChild(raioRange)

    let divCoordenadasSearch = document.createElement('div')
    divCoordenadasSearch.className = 'divCoordenadasSearch'
    let divCoordenadasSearchLatitude = document.createElement('div')
    divCoordenadasSearchLatitude.className = 'coordenadasSearchItem'
    let searchLatitudeLabel = document.createElement('p')
    searchLatitudeLabel.className = 'coordenadasSearchLabel'
    searchLatitudeLabel.innerHTML = texts.latitude
    divCoordenadasSearchLatitude.appendChild(searchLatitudeLabel)
    let searchLatitudeInput = document.createElement('input')
    searchLatitudeInput.id = 'searchLatitudeInput'
    searchLatitudeInput.className = 'coordenadasSearchInput'
    searchLatitudeInput.maxLength = 20
    divCoordenadasSearchLatitude.appendChild(searchLatitudeInput)
    divCoordenadasSearch.appendChild(divCoordenadasSearchLatitude)
    let divCoordenadasSearchLongitude = document.createElement('div')
    divCoordenadasSearchLongitude.className = 'coordenadasSearchItem'
    let searchLongitudeLabel = document.createElement('p')
    searchLongitudeLabel.className = 'coordenadasSearchLabel'
    searchLongitudeLabel.innerHTML = texts.longitude
    divCoordenadasSearchLongitude.appendChild(searchLongitudeLabel)
    let searchLongitudeInput = document.createElement('input')
    searchLongitudeInput.id = 'searchLongitudeInput'
    searchLongitudeInput.className = 'coordenadasSearchInput'
    searchLongitudeInput.maxLength = 20
    divCoordenadasSearchLongitude.appendChild(searchLongitudeInput)
    divCoordenadasSearch.appendChild(divCoordenadasSearchLongitude)
    let coordenadasSearchBt = document.createElement('button')
    coordenadasSearchBt.className = 'coordenadasSearchBt btn btn-dark'
    coordenadasSearchBt.id = 'coordenadasSearchBt'
    coordenadasSearchBt.innerHTML = texts.buscarBt
    divCoordenadasSearch.appendChild(coordenadasSearchBt)
    divraioSearch.appendChild(divRaioRange)
    divraioSearch.appendChild(divCoordenadasSearch)
    divMapActions.appendChild(divraioSearch)

    let raioSearchBtClicked = false
    let drawingManager;
    raioSearchBt.removeEventListener('click', searchBtEvent)
    raioSearchBt.addEventListener('click', searchBtEvent = () => {
        if (raioSearchBtClicked == false) {
            raioSearchBtClicked = true
            raioSearchBt.className = 'searchBt gold-bt'
            searchLatitudeInput.disabled = true
            searchLongitudeInput.disabled = true
            coordenadasSearchBt.disabled = true
            drawingManager = getPointsByMarkerPosition(map, raioRange, raioSearchBt, searchBtEvent)
        } else {
            raioSearchBtClicked = false
            raioSearchBt.className = 'searchBt btn btn-secondary'
            searchLatitudeInput.disabled = false
            searchLongitudeInput.disabled = false
            coordenadasSearchBt.disabled = false
            removeMapMarkerPosition(drawingManager)
        }
    })
    coordenadasSearchBt.addEventListener('click', () => {
        raioSearchBt.removeEventListener('click', searchBtEvent)
        raioSearchBt.addEventListener('click', () => {
            if (lang == 'es' || lang == 'es-ar') {
                alertGenerate(body, 'Limpia la búsqueda para volver a buscar')
            } else if (lang == 'es') {
                alertGenerate(body, 'Clean the search to fetch again')
            } else {
                alertGenerate(body, 'Limpe a pesquisa para buscar novamente')
            }
        })
        getPointsByLatLng(searchLatitudeInput, searchLongitudeInput, raioRange, coordenadasSearchBt)
    })
    let divResultOpt = document.createElement('div')
    divResultOpt.className = 'divResultOpt'
    let resultText = document.createElement('p')
    resultText.className = 'resultText'
    resultText.id = 'resultText'
    divResultOpt.appendChild(resultText)
    let resultLimparBt = document.createElement('button')
    resultLimparBt.className = 'btn btn-secondary resultBt'
    resultLimparBt.id = 'resultLimparBt'
    resultLimparBt.innerHTML = texts.limparBt
    resultLimparBt.disabled = true
    resultLimparBt.addEventListener('click', () => {
        mapaPontos()
    })
    divResultOpt.appendChild(resultLimparBt)
    divOptions.appendChild(divMapActions)
    divOptions.appendChild(divResultOpt)
    divOptions.appendChild(createDivActions(texts))

}
