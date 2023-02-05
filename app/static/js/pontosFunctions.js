import { alertGenerate, lang, body } from './patternFunctions.js'

export var carregarPontos = function(filterType, filter, index) {
    let pontos = fetch(`/painel/pontos?filterType=${filterType}&filter=${filter}&index=${index}`)
    .then(function(response){
        if (!response.ok) {
            alert('Não foi possível carregar os dados. Erro no servidor.')
        } else {
            return response.json()
            .then(function(data) {
                return data
            })
        }
    })
    return pontos
}
export var listaPontos = function() {
    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    listaPontosOpt.classList.add('select')
    importarPontosOpt.classList.remove('select')
}
export var criarPontos = function() {
    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let criarPontosOpt = document.querySelector('#criarPontosOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    listaPontosOpt.classList.remove('select')
    criarPontosOpt.classList.add('select')
    importarPontosOpt.classList.remove('select')
}
export var importarPontos = function() {
    let listaPontosOpt = document.querySelector('#listaPontosOpt')
    let importarPontosOpt = document.querySelector('#importarPontosOpt')
    listaPontosOpt.classList.remove('select')
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
                //divImportarItems.append(divImportarInput)
                
                let checkBook = document.createElement('div')
                checkBook.className = 'form-check form-switch'
                let checkBookInput = document.createElement('input')
                checkBookInput.className = 'form-check-input'
                checkBookInput.type = 'checkbox'
                checkBookInput.id = 'flexSwitchCheckDefault'
                checkBookInput.name = 'gerarBook'
                checkBookInput.value = 'off'
                checkBookInput.addEventListener('change', () => {
                    if (checkBookInput.checked == true) {
                        checkBookInput.value = 'on'
                    } else {
                        checkBookInput.value = 'off'
                    }
                })
                checkBook.appendChild(checkBookInput)
                
                let checkBookLabel = document.createElement('label')
                checkBookLabel.className = 'form-check-label'
                checkBookLabel.htmlFor = 'flexSwitchCheckDefault'
                checkBookLabel.innerHTML = textContent.checkBook
                checkBook.appendChild(checkBookLabel)
                
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
                checkBook.appendChild(divSelectColumnsModal)
                divImportarInput.appendChild(checkBook)
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
                    }
                    if (checkBookInput.value == 'on') {
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
                        fetch('/painel/pontos/importar', {
                            method: 'POST',
                            body: planilha
                        })
                        .then(function(response) {
                            if (response.status == 400) {
                                return response.text()
                                .then(text => {
                                    alertGenerate(body, text)
                                    importarPontos()
                                })
                            } else if(response.status == 200) {
                                return response.json()
                                .then(data => {
                                    $('#selectModal').modal('show')
                                    modalBody.innerHTML = ''
                                    if (data.message) {
                                        alertGenerate(modalBody, data.message)
                                    }
                                    data.colunas.obrigatorias.forEach(function(element, index, colunasObrigatorias){
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
                                    divBookName.className = 'divBookNameImportar'
                                    let labelBookName = document.createElement('p')
                                    if (lang == 'es' || lang == 'es-ar') {
                                        labelBookName.innerHTML = 'Nombre del Book:'
                                    } else if (lang == 'en') {
                                        labelBookName.innerHTML = 'Book Name:'
                                    } else {
                                        labelBookName.innerHTML = 'Nome do Book:'
                                    }
                                    labelBookName.className = 'labelBookNameImportar'
                                    divBookName.appendChild(labelBookName)
                                    let inputBookName = document.createElement('input')
                                    inputBookName.className = 'inputBookNameImportar'
                                    inputBookName.type = 'text'
                                    inputBookName.id = 'bookName'
                                    inputBookName.maxLength = 30
                                    divBookName.appendChild(inputBookName)
                                    modalBody.appendChild(divBookName)

                                    let divBookClient = document.createElement('div')
                                    divBookClient.className = 'divBookClientImportar'
                                    let labelBookClient = document.createElement('p')
                                    if (lang == 'es' || lang == 'es-ar') {
                                        labelBookClient.innerHTML = 'Cliente:'
                                    } else if (lang == 'en') {
                                        labelBookClient.innerHTML = 'Client:'
                                    } else {
                                        labelBookClient.innerHTML = 'Cliente:'
                                    }
                                    labelBookClient.className = 'labelBookClientImportar'
                                    divBookClient.appendChild(labelBookClient)
                                    let selectBookClient = document.createElement('select')
                                    selectBookClient.id = 'bookClient'
                                    selectBookClient.className = 'selectBookClientImportar'
                                    let disabledOption = document.createElement('option')
                                    disabledOption.disabled = true
                                    disabledOption.selected = true
                                    disabledOption.value = -1
                                    if (lang == 'es' || lang == 'es-ar') {
                                        disabledOption.innerHTML = '--- Seleccione un Cliente ---'
                                    } else if (lang == 'en') {
                                        disabledOption.innerHTML = '--- Select a Client ---'
                                    } else {
                                        disabledOption.innerHTML = '--- Selecione um Cliente ---'
                                    }
                                    selectBookClient.appendChild(disabledOption)
                                    
                                    data.clientes.forEach( (cliente) => {
                                        let clienteOption = document.createElement('option')
                                        clienteOption.value = cliente.id
                                        clienteOption.innerHTML = cliente.name
                                        selectBookClient.appendChild(clienteOption)
                                    })
                                    selectBookClient.addEventListener('change', () => {
                                        let clientId = selectBookClient.options[selectBookClient.selectedIndex].value
                                        let person = null
                                        for (let i = 0; i < data.clientes.length; i++) {
                                            if (data.clientes[i].id == clientId) {
                                                person = data.clientes[i].person_name
                                                break
                                            }
                                        }
                                        let pessoaInput = document.querySelector('#bookPessoa')
                                        pessoaInput.value = person
                                    })
                                    divBookClient.appendChild(selectBookClient)
                                    modalBody.appendChild(divBookClient)
                                    
                                    let divBookPessoaImportar = document.createElement('div')
                                    divBookPessoaImportar.className = 'divBookPessoaImportar'
                                    let labelBookPessoa = document.createElement('p')
                                    if (lang == 'es' || lang == 'es-ar') {
                                        labelBookPessoa.innerHTML = 'A/C:'
                                    } else if (lang == 'en') {
                                        labelBookPessoa.innerHTML = 'A/C:'
                                    } else {
                                        labelBookPessoa.innerHTML = 'A/C:'
                                    }
                                    labelBookPessoa.className = 'labelBookPessoaImportar'
                                    divBookPessoaImportar.appendChild(labelBookPessoa)
                                    let inputBookPessoa = document.createElement('input')
                                    inputBookPessoa.className = 'inputBookPessoaImportar'
                                    inputBookPessoa.type = 'text'
                                    inputBookPessoa.id = 'bookPessoa'
                                    inputBookPessoa.maxLength = 30

                                    divBookPessoaImportar.appendChild(inputBookPessoa)
                                    modalBody.appendChild(divBookPessoaImportar)
                                })
                            } else {
                                alertGenerate(body, 'Erro no servidor. Tente novamente.')
                                importarPontos()
                            }
                        })
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
                            let clientName = document.querySelector('#bookClient')
                            let clientNameSelectedId = clientName.options[clientName.selectedIndex].value
                            let ACName = document.querySelector('#bookPessoa').value
                        
                            let dados = new FormData()
                            dados.append('arquivo', fileInput.files[0])
                            dados.append('lang', lang)
                            dados.append('type', 'registrar&book')
                            dados.append('colunas', columnList)
                            dados.append('bookName', bookName.value)
                            dados.append('clientId', clientNameSelectedId)
                            dados.append('personName', ACName)
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
                        })
                        let cancelarBt = document.querySelector('#cancelarEnvio')
                        cancelarBt.addEventListener('click', function() {
                            importarPontos()
                        })
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