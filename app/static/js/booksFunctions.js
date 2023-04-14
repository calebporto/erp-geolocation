import { alertGenerate, lang, body } from './patternFunctions.js'
import { Book } from './classes.js'

var books = []

function atualizarLista(divLista) {
    divLista.innerHTML = ''
    books.forEach(element => {
        let bookNome = element.title != null ? (element.title).replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) : null
        let bookId = element.id
        let bookData = element.creation_date
        let image_id = element.image_id
        let pdfBtText = null
        let pptxBtText = null
        let excluirBtText = null
        let modalCancelBtText = null
        let modalConfirmBtText = null

        if (lang == 'es' || lang == 'es-ar') {
            pdfBtText = 'Abrir PDF'
            pptxBtText = 'Descargar PPTX'
            excluirBtText = 'Borrar'
            modalCancelBtText = 'Cancelar'
            modalConfirmBtText = 'Confirmar'
        } else if (lang == 'en') {
            pdfBtText = 'Open PDF'
            pptxBtText = 'Download PPTX'
            excluirBtText = 'Delete'
            modalCancelBtText = 'Cancel'
            modalConfirmBtText = 'Confirm'
        } else {
            pdfBtText = 'Abrir PDF'
            pptxBtText = 'Baixar PPTX'
            excluirBtText = 'Excluir'
            modalCancelBtText = 'Cancelar'
            modalConfirmBtText = 'Confirmar'
        }

        let linha = document.createElement('div')
        linha.className = 'linha'

        let data = document.createElement('div')
        data.className = 'linha-data'
        data.innerHTML = bookData

        let nome = document.createElement('div')
        nome.className = 'linha-nome'
        nome.innerHTML = bookNome

        //Botão Abrir PDF
        let visualizar = document.createElement('div')
        visualizar.className = 'linha-bt'
        let visualizarBt = document.createElement('button')
        visualizarBt.type = 'button'
        visualizarBt.className = 'btn btn-sm btn-warning linha-bt-bt'
        visualizarBt.innerHTML = pdfBtText
        visualizarBt.addEventListener('click', () => {
            window.open(`/pdfview/${image_id}.pdf`)
        })
        visualizar.appendChild(visualizarBt)
        
        // Botão Baixar PPTX
        let baixarPPTX = document.createElement('div')
        baixarPPTX.className = 'linha-bt'

        let baixarPPTXBt = document.createElement('button')
        baixarPPTXBt.type = 'button'
        baixarPPTXBt.className = 'btn btn-sm btn-danger linha-bt-bt'
        baixarPPTXBt.innerHTML = pptxBtText
        baixarPPTXBt.addEventListener('click', () => {
            window.open(`/painel/books/lista?filter=downloadpptx&arg=${image_id}.pptx`)
        })
        baixarPPTX.appendChild(baixarPPTXBt)

        // Botão Excluir
        let excluir = document.createElement('div')
        excluir.className = 'linha-bt'

        let excluirBt = document.createElement('button')
        excluirBt.type = 'button'
        excluirBt.className = 'btn btn-sm btn-secondary linha-bt-bt'
        excluirBt.innerHTML = excluirBtText
        excluirBt.addEventListener('click', () => {
            $(`#excluir${bookId}`).modal('show')
        })
        excluir.appendChild(excluirBt)
        
        let excluirModal = document.createElement('div')
        excluirModal.className = 'modal'
        excluirModal.classList.add('fade')
        excluirModal.id = `excluir${bookId}`
        excluirModal.tabIndex = '-1'
        excluirModal.setAttribute('aria-labelledby', `exampleModalLabelExcluir${element.id}`)
        excluirModal.ariaHidden = true
        excluirModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelexcluir">Tem certeza?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                Após a exclusão, todo o cadastro de ${nome.innerHTML} será apagado.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${modalCancelBtText}</button>
                    <button type="button" id="excluirBt${bookId}" class="btn btn-warning">${modalConfirmBtText}</button>
                </div>
                </form>
            </div>
        </div>
        `
        excluir.appendChild(excluirModal)
        
        linha.appendChild(data)
        linha.appendChild(nome)
        linha.appendChild(visualizar)
        linha.appendChild(baixarPPTX)
        linha.appendChild(excluir)
        divLista.appendChild(linha)

        let excluirConfirmarBt = document.querySelector(`#excluirBt${bookId}`)
        excluirConfirmarBt.addEventListener('click', () => {
            excluirConfirmarBt.innerHTML = `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `
            fetch(`/painel/books/lista?filter=excluir&arg=${bookId}`)
            .then((response) => {
                if (!response.ok) {
                    excluirConfirmarBt.innerHTML = 'Confirmar'
                    $(`#excluir${bookId}`).modal('hide')
                    alertGenerate(body, 'Erro no servidor. Tente novamente.')
                } else {
                    return response.json()
                    .then((data) => {
                        if(data.status == false) {
                            excluirConfirmarBt.innerHTML = 'Confirmar'
                            $(`#excluir${bookId}`).modal('hide')
                            alertGenerate(body, 'Erro no servidor. Tente novamente.')        
                        } else {
                            $(`#excluir${bookId}`).modal('hide')
                            data.message.forEach((message) => {
                                if (message.length > 2) {
                                    alertGenerate(body, message)
                                }
                            })
                            carregarLista(divLista)
                        }
                    })
                }
            })
        })
    })
}
function carregarLista(divLista) {
    divLista.innerHTML = `
    <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `
    let listaBooks = fetch('/painel/books/lista?filter=all')
    .then(function(response) {
        if (response.ok) {
            books = []
            return response.json()
            .then(function(data) {
                data.books.forEach(element => {
                    let ano = element.creation_date.substring(0, 4)
                    let mes = element.creation_date.substring(5, 7)
                    let dia = element.creation_date.substring(8, 10)
                    let book = new Book(
                        element.id,
                        element.title,
                        element.content,
                        `${dia}/${mes}/${ano}`,
                        element.image_id,
                    )
                    books.push(book)
                });
                data.messages.forEach((message) => {
                    alertGenerate(body, message)
                })
                atualizarLista(divLista)
            })
        } else {
            lista.innerHTML = ''
            alertGenerate(body, 'Erro ao carregar os Dados. Tente novamente.')
        }
    })
}

export var listaBooks = function() {
    let listaBooksOpt = document.querySelector('#listaBooksOpt')
    let criarBooksOpt = document.querySelector('#criarBooksOpt')
    listaBooksOpt.classList.add('select')
    criarBooksOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let divLista = document.createElement('div')
    divLista.className = 'lista'
    divLista.id = 'lista'
    
    carregarLista(divLista)
    body_content.append(divLista)
}
export var criarBooks = function() {
    let listaBooksOpt = document.querySelector('#listaBooksOpt')
    let criarBooksOpt = document.querySelector('#criarBooksOpt')
    criarBooksOpt.classList.add('select')
    listaBooksOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let divCriarItems = document.createElement('div')
    divCriarItems.className = 'criar-items'
    divCriarItems.id = "divCriarItems"
    
    let divCriarInput = document.createElement('div')
    divCriarInput.className = 'criar-input'

    fetch(`/painel/books/criar?lang=${lang}`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível concluir a solicitação. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then((textContent) => {
                let labelFileInput = document.createElement('p')
                labelFileInput.innerHTML = textContent.legenda1
                divCriarInput.appendChild(labelFileInput)
                
                let fileInput = document.createElement('input')
                fileInput.type = 'file'
                fileInput.accept = '.xlsx'
                fileInput.name = 'arquivo'
                fileInput.id = 'arquivo'
                fileInput.required = true
                divCriarInput.appendChild(fileInput)
                
                let descriptionFileInput = document.createElement('p')
                descriptionFileInput.className = 'description'
                descriptionFileInput.innerHTML = textContent.legenda2
                divCriarInput.appendChild(descriptionFileInput)
                
                divCriarItems.append(divCriarInput)

                let divCriarBt = document.createElement('div')
                divCriarBt.className = 'criar-bt'
            
                let buttonCriarBt = document.createElement('button')
                buttonCriarBt.className = 'gold-bt'
                buttonCriarBt.innerHTML = textContent.criarBt
                buttonCriarBt.addEventListener('click', () => {
                    if (fileInput.files.length == 0) {
                        alertGenerate(body, 'Selecione uma planilha.')
                        criarBooks()
                        return
                    }
                    if (fileInput.files.length != 1) {
                        alertGenerate(body, 'Selecione somente 1 arquivo.')
                        criarBooks()
                        return
                    }
                    let divSelectColumnsModal = document.createElement('div')
                    divSelectColumnsModal.className = 'modal fade'
                    divSelectColumnsModal.id = 'selectModal'
                    divSelectColumnsModal.setAttribute('data-bs-backdrop', 'static')
                    divSelectColumnsModal.setAttribute('data-bs-keyboard', 'false')
                    divSelectColumnsModal.setAttribute('aria-labelledby', 'modalColumnsTitle')
                    divSelectColumnsModal.tabIndex = '-1'
                    divSelectColumnsModal.ariaHidden = true
                    let modalColumnsTitle = null
                    let cancelarBt = null
                    let confirmarBt = null
                    if (lang == 'en') {
                        modalColumnsTitle = 'Choose the columns to generate the book:'
                        confirmarBt = 'Confirm'
                        cancelarBt = 'Cancel'
                    } else if (lang == 'es' || lang == 'es-ar') {
                        modalColumnsTitle = 'Elija las columnas para generar el book:'
                        confirmarBt = 'Confirmar'
                        cancelarBt = 'Cancelar'
                    } else {
                        modalColumnsTitle = 'Escolha as colunas para gerar o book:'
                        confirmarBt = 'Confirmar'
                        cancelarBt = 'Cancelar'
                    }
                    divSelectColumnsModal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content modal-lg">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalColumnsTitle">${modalColumnsTitle}</h5>
                            </div>
                            <div class="modal-body" id="selectModalBody">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button id='cancelarEnvio' type="button" class="btn btn-secondary" data-bs-dismiss="modal">${cancelarBt}</button>
                                <button id='enviarPlanilha' type="button" class="btn btn-warning">${confirmarBt}</button>
                            </div>
                        </div>
                    </div>
                    `
                    divCriarInput.append(divSelectColumnsModal)

                    let modalBody = document.querySelector('#selectModalBody')
                    modalBody.innerHTML = `
                    <div class="spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    `
                    let planilha = new FormData()
                    planilha.append('arquivo', fileInput.files[0])
                    planilha.append('lang', lang)
                    planilha.append('type', 'retornarColunas')
                    fetch('/painel/books/criar', {
                        method: 'POST',
                        body: planilha
                    })
                    .then(function(response) {
                        if (response.status == 400) {
                            return response.text()
                            .then(text => {
                                alertGenerate(body, text)
                                criarBooks()
                            })
                        } else if(response.status == 200) {
                            return response.json()
                            .then(data => {
                                $('#selectModal').modal('show')
                                modalBody.innerHTML = ''
                                if (data.message) {
                                    alertGenerate(modalBody, data.message)
                                }
                                data.colunas.obrigatorias.forEach(function(element, index){
                                    let divCheckboxModal = document.createElement('div')
                                    divCheckboxModal.className = 'divCheckboxModal'
                                    let checkboxBlocked = document.createElement('input')
                                    checkboxBlocked.type = 'checkbox'
                                    checkboxBlocked.checked = true
                                    checkboxBlocked.value = element
                                    checkboxBlocked.disabled = true
                                    checkboxBlocked.id = 'obrigatorias' + index
                                    divCheckboxModal.appendChild(checkboxBlocked)
                                    let checkboxBlockedLabel = document.createElement('label')
                                    checkboxBlockedLabel.innerHTML = element
                                    checkboxBlockedLabel.htmlFor = 'obrigatorias' + index
                                    divCheckboxModal.append(checkboxBlockedLabel)
                                    modalBody.append(divCheckboxModal)
                                });
                                data.colunas.outras.forEach(function(element, index, colunasObrigatorias){
                                    let divCheckboxModal = document.createElement('div')
                                    divCheckboxModal.className = 'divCheckboxModal'
                                    let checkboxModalOpen = document.createElement('input')
                                    checkboxModalOpen.type = 'checkbox'
                                    checkboxModalOpen.value = element
                                    checkboxModalOpen.id = 'outras' + index
                                    divCheckboxModal.appendChild(checkboxModalOpen)
                                    let checkboxModalOpenLabel = document.createElement('label')
                                    checkboxModalOpenLabel.innerHTML = element
                                    checkboxModalOpenLabel.htmlFor = 'outras' + index
                                    divCheckboxModal.append(checkboxModalOpenLabel)
                                    modalBody.append(divCheckboxModal)
                                })

                                let divBookName = document.createElement('div')
                                divBookName.className = 'divBookNameCriar'
                                let labelBookName = document.createElement('p')
                                if (lang == 'es' || lang == 'es-ar') {
                                    labelBookName.innerHTML = 'Nombre del Book:'
                                } else if (lang == 'en') {
                                    labelBookName.innerHTML = 'Book Name:'
                                } else {
                                    labelBookName.innerHTML = 'Nome do Book:'
                                }
                                labelBookName.className = 'labelBookNameCriar'
                                divBookName.appendChild(labelBookName)
                                let inputBookName = document.createElement('input')
                                inputBookName.className = 'inputBookNameCriar'
                                inputBookName.type = 'text'
                                inputBookName.id = 'bookName'
                                inputBookName.maxLength = 30
                                divBookName.appendChild(inputBookName)
                                modalBody.appendChild(divBookName)

                                let divBookClient = document.createElement('div')
                                divBookClient.className = 'divBookClientCriar'
                                let labelBookClient = document.createElement('p')
                                if (lang == 'es' || lang == 'es-ar') {
                                    labelBookClient.innerHTML = 'Cliente:'
                                } else if (lang == 'en') {
                                    labelBookClient.innerHTML = 'Client:'
                                } else {
                                    labelBookClient.innerHTML = 'Cliente:'
                                }
                                labelBookClient.className = 'labelBookClientCriar'
                                divBookClient.appendChild(labelBookClient)
                                let inputBookClient = document.createElement('input')
                                inputBookClient.id = 'inputBookClientCriar'
                                inputBookClient.className = 'inputBookNameCriar'
                                inputBookClient.maxLength = 30
                                
                                divBookClient.appendChild(inputBookClient)
                                modalBody.appendChild(divBookClient)
                                
                                let divBookPessoaCriar = document.createElement('div')
                                divBookPessoaCriar.className = 'divBookPessoaCriar'
                                let labelBookPessoa = document.createElement('p')
                                if (lang == 'es' || lang == 'es-ar') {
                                    labelBookPessoa.innerHTML = 'A/C:'
                                } else if (lang == 'en') {
                                    labelBookPessoa.innerHTML = 'A/C:'
                                } else {
                                    labelBookPessoa.innerHTML = 'A/C:'
                                }
                                labelBookPessoa.className = 'labelBookPessoaCriar'
                                divBookPessoaCriar.appendChild(labelBookPessoa)
                                let inputBookPessoa = document.createElement('input')
                                inputBookPessoa.className = 'inputBookPessoaCriar'
                                inputBookPessoa.type = 'text'
                                inputBookPessoa.id = 'bookPessoa'
                                inputBookPessoa.maxLength = 30

                                divBookPessoaCriar.appendChild(inputBookPessoa)
                                modalBody.appendChild(divBookPessoaCriar)
                                
                                let enviarBt = document.querySelector('#enviarPlanilha')
                                enviarBt.addEventListener('click', function() {
                                    enviarBt.innerHTML = `
                                    <div class="spinner-border spinner-border-sm text-dark" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    `
                                    let columnList = []
                                    modalBody.childNodes.forEach(element => {
                                        element.childNodes.forEach(item => {
                                            if (item.tagName == 'INPUT' && item.checked == true) {
                                                columnList.push(item.value)
                                            }
                                        })
                                    })
                                    if (columnList.length > 15) {
                                        if(lang == 'es' || lang == 'es-ar') {
                                            enviarBt.innerHTML = confirmarBt
                                            alertGenerate(modalBody, 'Book admite un máximo de 15 columnas')
                                            return
                                        } else if (lang == 'en') {
                                            enviarBt.innerHTML = confirmarBt
                                            alertGenerate(modalBody, 'Book supports a maximum of 15 columns')
                                            return
                                        } else {
                                            enviarBt.innerHTML = confirmarBt
                                            alertGenerate(modalBody, 'O book suporta no máximo 15 colunas.')
                                            return
                                        }
                                    }
                                    let bookName = document.querySelector('#bookName')
                                    if (!bookName.value) {
                                        bookName.style.borderColor = 'red'
                                        if(lang == 'es' || lang == 'es-ar') {
                                            enviarBt.innerHTML = confirmarBt
                                            alertGenerate(modalBody, 'Proporcione un nombre para el libro.')
                                            return
                                        } else if (lang == 'en') {
                                            enviarBt.innerHTML = confirmarBt
                                            alertGenerate(modalBody, 'Provide a name for the book.')
                                            return
                                        } else {
                                            enviarBt.innerHTML = confirmarBt
                                            alertGenerate(modalBody, 'Forneça um nome para o book.')
                                            return
                                        }
                                    }
                                    let clientName = document.querySelector('#inputBookClientCriar').value
                                    let ACName = document.querySelector('#bookPessoa').value
                                
                                    let dados = new FormData()
                                    dados.append('arquivo', fileInput.files[0])
                                    dados.append('lang', lang)
                                    dados.append('type', 'gerarBook')
                                    dados.append('colunas', columnList)
                                    dados.append('bookName', bookName.value)
                                    dados.append('client', clientName)
                                    dados.append('personName', ACName)
                                    fetch('/painel/books/criar', {
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
                                            criarBooks()
                                        } else {
                                            return response.json()
                                            .then(function(data) {
                                                $('#selectModal').modal('hide')
                                                data.message.forEach((message) => {
                                                    alertGenerate(body, message)
                                                })
                                                criarBooks()
                                            })
                                        }
                                    })
                                })
                                let cancelarBt = document.querySelector('#cancelarEnvio')
                                cancelarBt.addEventListener('click', function() {
                                    criarBooks()
                                })
                            })
                        } else {
                            alertGenerate(body, 'Erro no servidor. Tente novamente.')
                            criarBooks()
                        }
                    })
                })
                
                divCriarBt.appendChild(buttonCriarBt)
                divCriarItems.append(divCriarBt)
                body_content.appendChild(divCriarItems)
            })
        }
    })
}