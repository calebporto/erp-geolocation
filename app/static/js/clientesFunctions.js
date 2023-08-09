import { Cliente } from "./classes.js"
import { alertGenerate, body, lang } from "./patternFunctions.js"

export function novoCliente() {
    let novoOpt = document.querySelector('#novoOpt')
    let listaOpt = document.querySelector('#listaOpt')
    novoOpt.classList.add('select')
    listaOpt.classList.remove('select')

    let bodyContent = document.querySelector('#body-content')
    bodyContent.innerHTML = ''

    fetch('/painel/clientes/novo?filter=texts')
    .then((response) => {
        if (!response.ok) {
            alertGenerate(body, 'Erro na conexão. Verifique sua Internet.')
        } else {
            return response.json()
            .then((data) => {
                function limparFormulario() {
                    inputNome.value = ''
                    siteInput.value = ''
                    executivoInput.value = ''
                    email1Input.value = ''
                    email2Input.value = ''
                    tel1Input.value = ''
                    tel2Input.value = ''
                }

                let formGroup = document.createElement('div')
                formGroup.className = 'form'
                
                let divNome = document.createElement('div')
                divNome.className = 'input-item'
                let labelNome = document.createElement('p')
                labelNome.className = 'input-label'
                labelNome.innerHTML = data.nome
                divNome.appendChild(labelNome)
                let inputNome = document.createElement('input')
                inputNome.id = 'nome'
                inputNome.maxLength = 50
                inputNome.className = 'input-input'
                divNome.appendChild(inputNome)
                formGroup.appendChild(divNome)

                let divSiteExecutivo = document.createElement('div')
                divSiteExecutivo.className = 'input-group'
                let divSite = document.createElement('div')
                divSite.className = 'input-group-item'
                let siteLabel = document.createElement('p')
                siteLabel.className = 'input-label'
                siteLabel.innerHTML = data.site
                let siteInput = document.createElement('input')
                siteInput.id = 'site'
                siteInput.className = 'input-input'
                siteInput.maxLength = 50
                divSite.appendChild(siteLabel)
                divSite.appendChild(siteInput)
                divSiteExecutivo.appendChild(divSite)
                let divExecutivo = document.createElement('div')
                divExecutivo.className = 'input-group-item'
                let executivoLabel = document.createElement('p')
                executivoLabel.className = 'input-label'
                executivoLabel.innerHTML = data.executivo
                let executivoInput = document.createElement('input')
                executivoInput.id = 'executivo'
                executivoInput.className = 'input-input'
                executivoInput.maxLength = 50
                divExecutivo.appendChild(executivoLabel)
                divExecutivo.appendChild(executivoInput)
                divSiteExecutivo.appendChild(divExecutivo)
                formGroup.appendChild(divSiteExecutivo)
                
                let divEmails = document.createElement('div')
                divEmails.className = 'input-group'
                let divEmail1 = document.createElement('div')
                divEmail1.className = 'input-group-item'
                let email1Label = document.createElement('p')
                email1Label.className = 'input-label'
                email1Label.innerHTML = data.email1
                let email1Input = document.createElement('input')
                email1Input.id = 'email1'
                email1Input.className = 'input-input'
                email1Input.maxLength = 50
                divEmail1.appendChild(email1Label)
                divEmail1.appendChild(email1Input)
                divEmails.appendChild(divEmail1)
                let divEmail2 = document.createElement('div')
                divEmail2.className = 'input-group-item'
                let email2Label = document.createElement('p')
                email2Label.className = 'input-label'
                email2Label.innerHTML = data.email2
                let email2Input = document.createElement('input')
                email2Input.id = 'email2'
                email2Input.className = 'input-input'
                email2Input.maxLength = 50
                divEmail2.appendChild(email2Label)
                divEmail2.appendChild(email2Input)
                divEmails.appendChild(divEmail2)
                formGroup.appendChild(divEmails)
                
                let divTels = document.createElement('div')
                divTels.className = 'input-group'
                let divTel1 = document.createElement('div')
                divTel1.className = 'input-group-item'
                let tel1Label = document.createElement('p')
                tel1Label.className = 'input-label'
                tel1Label.innerHTML = data.tel1
                let tel1Input = document.createElement('input')
                tel1Input.id = 'tel1'
                tel1Input.className = 'input-input'
                $(tel1Input).mask('(00)00000-0000')
                divTel1.appendChild(tel1Label)
                divTel1.appendChild(tel1Input)
                divTels.appendChild(divTel1)
                let divTel2 = document.createElement('div')
                divTel2.className = 'input-group-item'
                let tel2Label = document.createElement('p')
                tel2Label.className = 'input-label'
                tel2Label.innerHTML = data.tel2
                let tel2Input = document.createElement('input')
                tel2Input.id = 'tel2'
                tel2Input.className = 'input-input'
                $(tel2Input).mask('(00)00000-0000')
                divTel2.appendChild(tel2Label)
                divTel2.appendChild(tel2Input)
                divTels.appendChild(divTel2)
                formGroup.appendChild(divTels)

                let divButton = document.createElement('div')
                divButton.className = 'confirmar-bt'
                let cancelarBt = document.createElement('button')
                cancelarBt.className = 'btn btn-secondary'
                cancelarBt.innerHTML = data.cancelarBt
                cancelarBt.id = 'cancelarBt'
                cancelarBt.addEventListener('click', () => {
                    novoCliente()
                })
                divButton.appendChild(cancelarBt)
                let confirmarBt = document.createElement('button')
                confirmarBt.className = 'btn btn-warning'
                confirmarBt.innerHTML = data.confirmarBt
                confirmarBt.id = 'confirmarBt'
                confirmarBt.addEventListener('click', () => {
                    if (inputNome.value.length < 1) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Nombre Inválido').focus()
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Invalid Name').focus()
                        } else {
                            alertGenerate(body, 'Nome Inválido').focus()
                        }
                        return
                    }
                    let send = new FormData()
                    send.append('nome', inputNome.value)
                    send.append('site', siteInput.value)
                    send.append('executivo', executivoInput.value)
                    send.append('email1', email1Input.value)
                    send.append('email2', email2Input.value)
                    send.append('tel1', tel1Input.value)
                    send.append('tel2', tel2.value)
                    fetch('/painel/clientes/novo', {
                        method: 'POST',
                        body: send
                    })
                    .then((response) => {
                        if (!response.ok) {
                            alertGenerate(body, 'Erro no servidor. Tente novamente.').focus()
                            novoCliente()
                        } else {
                            return response.json()
                            .then((data) => {
                                data.message.forEach(element => {
                                    alertGenerate(body, element).focus()
                                });
                                novoCliente()
                                let bodyHeader = document.querySelector('#body-header')
                                bodyHeader.focus()
                            })
                        }
                    })
                })
                divButton.appendChild(confirmarBt)
                formGroup.appendChild(divButton)


                bodyContent.appendChild(formGroup)
            })
        }
    })
}
var clientes = []

function atualizarLista(divLista) {
    divLista.innerHTML = ''
    clientes.forEach(element => {
        let texts = null
        if (lang == 'es' || lang == 'es-ar') {
            texts = {
                'visualizar': 'Visualizar',
                'editar': 'Editar',
                'remover': 'Eliminar',
                'nome': 'Nombre',
                'site': 'Sitio',
                'executivo': 'Ejecutivo',
                'email1': 'E-mail Principal',
                'email2': 'E-mail Secundario',
                'tel1': 'Teléfono Principal',
                'tel2': 'Teléfono Secundario',
                'relation': 'Nível de Relación',
                'confirmarBt': 'Confirmar',
                'cancelarBt': 'Cancelar',
                'fecharBt': 'Cerrar',
                'certeza': '?Está seguro?'
            }
        } else if (lang == 'en') {
            texts = {
                'visualizar': 'View',
                'editar': 'Edit',
                'remover': 'Remove',
                'nome': 'Name',
                'site': 'Site',
                'executivo': 'Officer',
                'email1': 'Primary E-mail',
                'email2': 'Secondary E-mail',
                'tel1': 'Main Phone',
                'tel2': 'Secondary Phone',
                'relation': 'Relation Level',
                'confirmarBt': 'Confirm',
                'cancelarBt': 'Cancel',
                'fecharBt': 'Close',
                'certeza': 'Are you sure?'
            }
        } else {
            texts = {
                'visualizar': 'Visualizar',
                'editar': 'Editar',
                'remover': 'Remover',
                'nome': 'Nome',
                'site': 'Site',
                'executivo': 'Executivo',
                'email1': 'E-mail Principal',
                'email2': 'E-mail Secundário',
                'tel1': 'Telefone Principal',
                'tel2': 'Telefone Secundário',
                'relation': 'Nível de Relacionamento',
                'confirmarBt': 'Confirmar',
                'cancelarBt': 'Cancelar',
                'fecharBt': 'Fechar',
                'certeza': 'Tem certeza?'
            }

        }

        let id = element.id
        let nome = element.name
        let site = element.site != null ? element.site : ''
        let executivo = element.person_name != null ? element.person_name : ''
        let email1 = element.email1 != null ? element.email1 : ''
        let email2 = element.email2 != null ? element.email2 : ''
        let tel1 = element.tel1 != null ? element.tel1 : ''
        let tel2 = element.tel2 != null ? element.tel2 : ''

        let linha = document.createElement('div')
        linha.className = 'linha'
        
        let divNome = document.createElement('div')
        divNome.className = 'linha-nome'
        divNome.innerHTML = nome
        linha.appendChild(divNome)
        
        //Botão visualizar
        let visualizar = document.createElement('div')
        visualizar.className = 'linha-bt'

        let visualizarBt = document.createElement('button')
        visualizarBt.type = 'button'
        visualizarBt.className = 'btn btn-sm btn-warning linha-bt-bt'
        visualizarBt.setAttribute('data-bs-toggle', 'modal')
        visualizarBt.innerHTML = texts.visualizar
        visualizarBt.addEventListener('click', () => {
            $(`#visualizar${element.id}`).modal('show')
        })
        visualizar.appendChild(visualizarBt)

        let visualizarModal = document.createElement('div')
        visualizarModal.className = 'modal fade'
        visualizarModal.id = `visualizar${element.id}`
        visualizarModal.tabIndex = '-1'
        visualizar.ariaLabel = `exampleModalLabelVisualizar${element.id}`
        visualizarModal.ariaHidden = true
        visualizarModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelVisualizar${id}">${nome}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="visualizar-item">
                        <p class="label-item">${texts.nome}:</p>
                        <p class="conteudo-item">${nome}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.site}:</p>
                        <p class="conteudo-item">${site}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.executivo}:</p>
                        <p class="conteudo-item">${executivo}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.email1}:</p>
                        <p class="conteudo-item">${email1}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.email2}:</p>
                        <p class="conteudo-item">${email2}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.tel1}:</p>
                        <p class="conteudo-item">${tel1}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.tel2}:</p>
                        <p class="conteudo-item">${tel2}</p>
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

        // Botão Editar
        let editar = document.createElement('div')
        editar.className = 'linha-bt'

        let editarBt = document.createElement('button')
        editarBt.type = 'button'
        editarBt.className = 'btn btn-sm btn-primary linha-bt-bt'
        editarBt.setAttribute('data-bs-toggle', 'modal')
        editarBt.innerHTML = texts.editar
        editarBt.addEventListener('click', () => {
            $(`#editar${element.id}`).modal('show')
            $('#tel1-edit'+ id).mask('(00)00000-0000')
            $('#tel2-edit'+ id).mask('(00)00000-0000')
            let cancelEditBt = document.querySelector('#cancelEditBt'+id)
            cancelEditBt.addEventListener('click', () => {
                listaClientes()
            })
            let editBt = document.querySelector('#editBt'+ id)
            editBt.addEventListener('click', () => {
                editBt.innerHTML = `
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `
                let nomeValue = document.querySelector('#nome-edit'+ id)
                let siteValue = document.querySelector('#site-edit'+ id)
                let executivoValue = document.querySelector('#executivo-edit'+ id)
                let email1Value = document.querySelector('#email1-edit'+ id)
                let email2Value = document.querySelector('#email2-edit'+ id)
                let tel1Value = document.querySelector('#tel1-edit'+ id)
                let tel2Value = document.querySelector('#tel2-edit'+ id)
                let editModalBody = document.querySelector('#editModalBody'+id)

                if (nomeValue.value.length < 1) {
                    nomeValue.focus()
                    if (lang == 'es' || lang == 'es-ar') {
                        alertGenerate(editModalBody, 'Nombre Inválido').focus()
                    } else if (lang == 'en') {
                        alertGenerate(editModalBody, 'Invalid Name').focus()
                    } else {
                        alertGenerate(editModalBody, 'Nome Inválido').focus()
                    }
                    editBt.innerHTML = texts.confirmarBt
                    return
                }
                let send = new FormData()
                send.append('id', id)
                send.append('nome',nomeValue.value)
                send.append('site', siteValue.value)
                send.append('executivo', executivoValue.value)
                send.append('email1', email1Value.value)
                send.append('email2', email2Value.value)
                send.append('tel1', tel1Value.value)
                send.append('tel2', tel2Value.value)
                fetch('/painel/clientes/lista', {
                    method: 'POST',
                    body: send
                })
                .then((response) => {
                    if (!response.ok) {
                        $(`#editar${element.id}`).modal('hide')
                        alertGenerate(body, 'Erro no servidor. Tente novamente.')
                        listaClientes()
                    } else {
                        return response.json()
                        .then((data) => {
                            $(`#editar${element.id}`).modal('hide')
                            data.message.forEach(element => {
                                alertGenerate(body, element)
                            });
                            listaClientes()
                        })
                    }
                })
            })
        })
        editar.appendChild(editarBt)

        let editarModal = document.createElement('div')
        editarModal.className = 'modal fade'
        editarModal.id = `editar${element.id}`
        editarModal.tabIndex = '-1'
        editarModal.ariaLabel = `exampleModalLabelEditar${element.id}`
        editarModal.ariaHidden = true
        editarModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelEditar${element.id}">${nome}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="editModalBody${id}">
                    <div class="visualizar-item">
                        <p class="label-item">${texts.nome}:</p>
                        <input required maxlength="50" type="text" class="input-edit" id="nome-edit${element.id}" value="${nome}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.site}:</p>
                        <input required maxlength="50" type="text" class="input-edit" id="site-edit${element.id}" value="${site}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.executivo}:</p>
                        <input required maxlength="50" type="text" class="input-edit" id="executivo-edit${element.id}" value="${executivo}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.email1}:</p>
                        <input required maxlength="50" type="text" class="input-edit" name="email-edit" id="email1-edit${element.id}" value="${email1}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.email2}:</p>
                        <input required maxlength="50" type="text" class="input-edit" name="email-edit" id="email2-edit${element.id}" value="${email2}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.tel1}:</p>
                        <input required maxlength="50" type="text" class="input-edit" name="email-edit" id="tel1-edit${element.id}" value="${tel1}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${texts.tel2}:</p>
                        <input required maxlength="50" type="text" class="input-edit" name="email-edit" id="tel2-edit${element.id}" value="${tel2}">
                    </div>
                    <div class="modal-footer">
                        <button id="cancelEditBt${id}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${texts.cancelarBt}</button>
                        <button id="editBt${id}" class="btn btn-warning">${texts.confirmarBt}</button>
                    </div>
                </div>
            </div>
        </div>
        `
        
        editar.appendChild(editarModal)
        linha.appendChild(editar)
        
        // Botão Excluir
        let excluir = document.createElement('div')
        excluir.className = 'linha-bt'

        let excluirBt = document.createElement('button')
        excluirBt.type = 'button'
        excluirBt.className = 'btn btn-sm btn-secondary linha-bt-bt'
        excluirBt.setAttribute('data-bs-toggle', 'modal')
        excluirBt.innerHTML = texts.remover
        excluirBt.addEventListener('click', () => {
            $(`#excluir${element.id}`).modal('show')
            let excluirConfirmarBt = document.querySelector('#excluirConfirmarBt'+id)
            excluirConfirmarBt.addEventListener('click', () => {
                fetch(`/painel/clientes/lista?filter=excluir&arg=${id}`)
                .then((response) => {
                    if (!response.ok) {
                        $(`#excluir${element.id}`).modal('hide')
                        alertGenerate(body, 'Erro no servidor. Tente novamente.').focus()
                        listaClientes()
                    } else {
                        return response.json()
                        .then((data) => {
                            $(`#excluir${element.id}`).modal('hide')
                            data.message.forEach(element => {
                                alertGenerate(body, element).focus().focus()
                            });
                            listaClientes()
                        })
                    }
                })
            })
        })
        excluir.appendChild(excluirBt)

        let excluirModal = document.createElement('div')
        excluirModal.className = 'modal'
        excluirModal.classList.add('fade')
        excluirModal.id = `excluir${element.id}`
        excluirModal.tabIndex = '-1'
        excluirModal.setAttribute('aria-labelledby', `exampleModalLabelExcluir${element.id}`)
        excluirModal.ariaHidden = true
        excluirModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelexcluir">${texts.certeza}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                Após a exclusão, todo o cadastro de ${nome} será apagado.
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

        divLista.appendChild(linha)
    })
}

function carregarLista(divLista) {
    divLista.innerHTML = `
    <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `
    fetch('/painel/clientes/lista?filter=all')
    .then((response) => {
        if (!response.ok) {
            divLista.innerHTML = ''
            alertGenerate(body, 'Erro ao carregar os Dados. Tente novamente.')
        } else {
            clientes = []
            return response.json()
            .then((data) => {
                data.forEach(element => {
                    let cliente = new Cliente(
                        element.id,
                        element.name,
                        element.site,
                        element.person_name,
                        element.email1,
                        element.email2,
                        element.tel1,
                        element.tel2
                    )
                    clientes.push(cliente)
                })
                atualizarLista(divLista)
            })
        }
    })
}

export function listaClientes() {
    let listaOpt = document.querySelector('#listaOpt')
    let novoOpt = document.querySelector('#novoOpt')
    listaOpt.classList.add('select')
    novoOpt.classList.remove('select')
    
    let bodyContent = document.querySelector('#body-content')
    bodyContent.innerHTML = ''

    let divLista = document.createElement('div')
    divLista.className = 'lista'
    divLista.id = 'lista'
    bodyContent.appendChild(divLista)

    carregarLista(divLista)
}