import { alertGenerate, lang, body } from './patternFunctions.js'
import { Colaborador } from './classes.js'

var colaboradores = []
let bodyContent = document.querySelector('#body-content')

function carregarLista(divLista) {
    divLista.innerHTML = `
    <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `
    fetch('/painel/equipe/lista?filter=all')
    .then((response) => {
        if (!response.ok) {
            divLista.innerHTML = ''
            alertGenerate(body, 'Erro ao carregar os Dados. Tente novamente.')
        } else {
            colaboradores = []
            return response.json()
            .then((data) => {
                data.forEach(element => {
                    let colaborador = new Colaborador(
                        element.id,
                        element.name,
                        element.email,
                        element.is_admin,
                        element.is_collaborator
                    )
                    colaboradores.push(colaborador)
                });
                atualizarLista(divLista)
            })
        }
    })
}
function atualizarLista(divLista) {
    let texts = {
        'pt_br': {
            'visualizarBt': 'Visualizar',
            'editarBt': 'Editar',
            'novaSenhaBt': 'Nova Senha',
            'excluirBt': 'Excluir',
            'confirmarBt': 'Confirmar',
            'cancelarBt': 'Cancelar',
            'fecharBt': 'Fechar',
            'modalNome': 'Nome',
            'modalEmail': 'E-mail',
            'modalAcesso': 'Acesso:',
            'modalSenha': 'Digite a nova senha:',
            'modalConfirmarSenha': 'Repita a nova senha:',
            'certeza': 'Tem certeza?',
            'certezaBody1': 'Após a exclusão, todo o cadastro de ',
            'certezaBody2': ' será apagado.',
            'nomeInvalido': 'Nome inválido.',
            'emailInvalido': 'E-mail inválido.',
            'senhaInvalida': 'Senha inválida.',
            'senhasDiferentes': 'As senhas não conferem.',
            'acesso': {
                'colaborador': 'Colaborador',
                'administrador': 'Administrador'
            }
        }, 'es': {
            'visualizarBt': 'Ver',
            'editarBt': 'Editar',
            'novaSenhaBt': 'Nueva Contraseña',
            'excluirBt': 'Remover',
            'confirmarBt': 'Confirmar',
            'cancelarBt': 'Cancelar',
            'fecharBt': 'Cerrar',
            'modalNome': 'Nombre',
            'modalEmail': 'E-mail',
            'modalAcesso': 'Acceso:',
            'modalSenha': 'Ingrese la nueva contraseña:',
            'modalConfirmarSenha': 'Repita la nueva contraseña:',
            'certeza': '?Está seguro?',
            'certezaBody1': 'Después de la eliminación, todo el registro de ',
            'certezaBody2': ' se eliminará.',
            'nomeInvalido': 'Nombre inválido.',
            'emailInvalido': 'E-mail inválido.',
            'senhaInvalida': 'Contraseña inválida.',
            'senhasDiferentes': 'Las contraseñas no coincidem.',
            'acesso': {
                'colaborador': 'Colaborador',
                'administrador': 'Administrador'
            }
        }, 'en': {
            'visualizarBt': 'Show',
            'editarBt': 'Edit',
            'novaSenhaBt': 'New Password',
            'excluirBt': 'Remove',
            'confirmarBt': 'Confirm',
            'cancelarBt': 'Cancel',
            'fecharBt': 'Close',
            'modalNome': 'Name',
            'modalEmail': 'E-mail',
            'modalAcesso': 'Access:',
            'modalSenha': 'Enter the new passoword:',
            'modalConfirmarSenha': 'Repeat a new passord:',
            'certeza': 'Are you sure?',
            'certezaBody1': 'After deletion, all of ',
            'certezaBody2': "'s record will be deleted",
            'nomeInvalido': 'Invalid name.',
            'emailInvalido': 'Invalid E-mail.',
            'senhaInvalida': 'Invalid password.',
            'senhasDiferentes': "Passwords don't match.",
            'acesso': {
                'colaborador': 'Collaborator',
                'administrador': 'Admin'
            }
        }
    }
    let btTexts = null
    if (lang == 'es') {
        btTexts = texts.es
    } else if (lang == 'en') {
        btTexts = texts.en
    } else {
        btTexts = texts.pt_br
    }
    divLista.innerHTML = ''
    colaboradores.forEach(element => {
        let colaboradorNome = element.name != null ? (element.name).replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) : null
        let colaboradorId = element.id
        let colaboradorEmail = element.email
        let acesso = btTexts.acesso.colaborador
        if (element.is_admin == true) {
            acesso = btTexts.acesso.administrador
        }
        
        let linha = document.createElement('div')
        linha.className = 'linha'
        
        let nome = document.createElement('div')
        nome.className = 'linha-nome'
        nome.innerHTML = colaboradorNome
        
        //Botão visualizar
        let visualizar = document.createElement('div')
        visualizar.className = 'linha-bt'

        let visualizarBt = document.createElement('button')
        visualizarBt.type = 'button'
        visualizarBt.className = 'btn btn-sm btn-warning linha-bt-bt'
        visualizarBt.setAttribute('data-bs-toggle', 'modal')
        visualizarBt.innerHTML = btTexts.visualizarBt
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
                    <h5 class="modal-title" id="exampleModalLabelVisualizar${element.id}">${colaboradorNome}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalNome}:</p>
                        <p class="conteudo-item">${colaboradorNome}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalEmail}:</p>
                        <p class="conteudo-item">${colaboradorEmail}</p>
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalAcesso}</p>
                        <p class="conteudo-item">${acesso}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${btTexts.fecharBt}</button>
                </div>
            </div>
        </div>
        `
        visualizar.appendChild(visualizarModal)

        //Botão editar
        let editar = document.createElement('div')
        editar.className = 'linha-bt'

        let editarBt = document.createElement('button')
        editarBt.type = 'button'
        editarBt.className = 'btn btn-sm btn-primary linha-bt-bt'
        editarBt.setAttribute('data-bs-toggle', 'modal')
        editarBt.innerHTML = btTexts.editarBt
        editarBt.addEventListener('click', () => {
            $(`#editar${element.id}`).modal('show')
            let confirmarBt = document.querySelector('#confirmarBtEditar'+colaboradorId)
            confirmarBt.addEventListener('click', () => {
                confirmarBt.innerHTML = `
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `
                let modalBody = document.querySelector('#modalBodyEditar'+colaboradorId)
                let nome = document.querySelector('#nome-edit'+colaboradorId)
                let email = document.querySelector('#email-edit'+colaboradorId)
                if (!nome.value) {
                    confirmarBt.innerHTML = btTexts.confirmarBt
                    alertGenerate(modalBody, btTexts.nomeInvalido)
                    return
                }
                if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
                    confirmarBt.innerHTML = btTexts.confirmarBt
                    alertGenerate(modalBody, btTexts.emailInvalido)
                    return
                }
                let send = new FormData()
                send.append('type', 'editar')
                send.append('id', colaboradorId)
                send.append('nome', nome.value)
                send.append('email', email.value)
                fetch('/painel/equipe/lista', {
                    method: 'POST',
                    body: send
                })
                .then((response) => {
                    if (!response.ok) {
                        $(`#editar${element.id}`).modal('hide')
                        alertGenerate(body, 'Erro no servidor. Tente novamente.')
                        listaColaboradores()
                    } else {
                        return response.json()
                        .then((data) => {
                            $(`#editar${element.id}`).modal('hide')
                            data.message.forEach(element => {
                                alertGenerate(body, element)
                            });
                            listaColaboradores()
                        })
                    }
                })
            })
            let cancelarBt = document.querySelector('#cancelarBtEditar' + element.id)
            cancelarBt.addEventListener('click', () => {
                listaColaboradores()
            })
        })
        editar.appendChild(editarBt)

        let editarModal = document.createElement('div')
        editarModal.className = 'modal fade'
        editarModal.id = `editar${element.id}`
        editarModal.tabIndex = '-1'
        editarModal.ariaLabel = `exampleModalLabelEditar${element.id}`
        editarModal.ariaHidden = true
        editarModal.setAttribute('data-bs-backdrop', 'static')
        editarModal.setAttribute('data-bs-keyboard', 'false')
        editarModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelEditar${element.id}">${colaboradorNome}</h5>
                </div>
                <div class="modal-body" id="modalBodyEditar${colaboradorId}">
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalNome}</p>
                        <input required maxlength="50" type="text" class="input-edit" name="nome-edit" id="nome-edit${element.id}" value="${colaboradorNome}">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalEmail}</p>
                        <input required maxlength="50" type="text" class="input-edit" name="email-edit" id="email-edit${element.id}" value="${colaboradorEmail}">
                    </div>
                    <div class="modal-footer">
                        <button id="cancelarBtEditar${element.id}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${btTexts.cancelarBt}</button>
                        <button id="confirmarBtEditar${element.id}" type="submit" class="btn btn-warning">${btTexts.confirmarBt}</button>
                    </div>
                </div>
            </div>
        </div>
        `
        editar.appendChild(editarModal)

        //Botão nova senha
        let novaSenha = document.createElement('div')
        novaSenha.className = 'linha-bt'

        let novaSenhaBt = document.createElement('button')
        novaSenhaBt.type = 'button'
        novaSenhaBt.className = 'btn btn-sm btn-info linha-bt-bt'
        novaSenhaBt.setAttribute('data-bs-toggle', 'modal')
        novaSenhaBt.innerHTML = btTexts.novaSenhaBt
        novaSenhaBt.addEventListener('click', () => {
            $(`#novaSenha${element.id}`).modal('show')
            let confirmarBt = document.querySelector('#confirmarBtNovaSenha'+colaboradorId)
            confirmarBt.addEventListener('click', () => {
                confirmarBt.innerHTML = `
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `
                let modalBody = document.querySelector('#modalBodyNovaSenha'+colaboradorId)
                let senha1 = document.querySelector('#senha1Input'+colaboradorId)
                let senha2 = document.querySelector('#senha2Input'+colaboradorId)
                if (!senha1.value) {
                    confirmarBt.innerHTML = btTexts.confirmarBt
                    alertGenerate(modalBody, btTexts.senhaInvalida)
                    return
                }
                if (!senha2.value) {
                    confirmarBt.innerHTML = btTexts.confirmarBt
                    alertGenerate(modalBody, btTexts.senhaInvalida)
                    return
                }
                if (senha1.value != senha2.value) {
                    confirmarBt.innerHTML = btTexts.confirmarBt
                    alertGenerate(modalBody, btTexts.senhasDiferentes)
                    return
                }
                let send = new FormData()
                send.append('type', 'novaSenha')
                send.append('id', colaboradorId)
                send.append('senha1', senha1.value)
                send.append('senha2', senha2.value)
                fetch('/painel/equipe/lista', {
                    method: 'POST',
                    body: send
                })
                .then((response) => {
                    if (!response.ok) {
                        $(`#novaSenha${element.id}`).modal('hide')
                        alertGenerate(body, 'Erro no servidor. Tente novamente.')
                        listaColaboradores()
                    } else {
                        return response.json()
                        .then((data) => {
                            $(`#novaSenha${element.id}`).modal('hide')
                            data.message.forEach(element => {
                                alertGenerate(body, element)
                            });
                            listaColaboradores()
                        })
                    }
                })
            })
            let cancelarBt = document.querySelector('#cancelarBtEditar' + element.id)
            cancelarBt.addEventListener('click', () => {
                listaColaboradores()
            })
        })
        novaSenha.appendChild(novaSenhaBt)

        let novaSenhaModal = document.createElement('div')
        novaSenhaModal.className = 'modal'
        novaSenhaModal.classList.add('fade')
        novaSenhaModal.id = `novaSenha${element.id}`
        novaSenhaModal.tabIndex = '-1'
        novaSenhaModal.setAttribute('aria-labelledby', `exampleModalLabelNovaSenha${element.id}`)
        novaSenhaModal.ariaHidden = true
        novaSenhaModal.setAttribute('data-bs-backdrop', 'static')
        novaSenhaModal.setAttribute('data-bs-keyboard', 'false')
        novaSenhaModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabeleditar">${btTexts.novaSenhaBt} - ${colaboradorNome}</h5>
                </div>
                <div class="modal-body" id="modalBodyNovaSenha${colaboradorId}">
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalSenha}</p>
                        <input id="senha1Input${colaboradorId}" maxlength="20" type="password" class="input-edit" name="senha">
                    </div>
                    <div class="visualizar-item">
                        <p class="label-item">${btTexts.modalConfirmarSenha}</p>
                        <input id="senha2Input${colaboradorId}" maxlength="20" type="password" class="input-edit" name="senha2">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="cancelarBtNovaSenha${colaboradorId}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${btTexts.cancelarBt}</button>
                    <button id="confirmarBtNovaSenha${colaboradorId}" type="submit" class="btn btn-warning">${btTexts.confirmarBt}</button>
                </div>
            </div>
        </div>
        `
        novaSenha.appendChild(novaSenhaModal)

        //Botão excluir
        let excluir = document.createElement('div')
        excluir.className = 'linha-bt'

        let excluirBt = document.createElement('button')
        excluirBt.type = 'button'
        excluirBt.className = 'btn btn-sm btn-secondary linha-bt-bt'
        excluirBt.setAttribute('data-bs-toggle', 'modal')
        excluirBt.innerHTML = btTexts.excluirBt
        excluirBt.addEventListener('click', () => {
            $(`#excluir${element.id}`).modal('show')
            let confirmarBt = document.querySelector('#confirmarBtExcluir'+colaboradorId)
            confirmarBt.addEventListener('click', () => {
                fetch(`/painel/equipe/lista?filter=excluir&arg=${colaboradorId}`)
                .then((response) => {
                    if (!response.ok) {
                        $(`#excluir${element.id}`).modal('hide')
                        alertGenerate(body, 'Erro no servidor. Tente novamente.')
                        listaColaboradores()
                    } else {
                        return response.json()
                        .then((data) => {
                            $(`#excluir${element.id}`).modal('hide')
                            data.message.forEach(element => {
                                alertGenerate(body, element)
                            });
                            listaColaboradores()
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
        excluirModal.setAttribute('data-bs-backdrop', 'static')
        excluirModal.setAttribute('data-bs-keyboard', 'false')
        excluirModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelexcluir">${btTexts.certeza}</h5>
                </div>
                <div class="modal-body">
                ${btTexts.certezaBody1}${colaboradorNome}${btTexts.certezaBody2}.
                </div>
                <div class="modal-footer">
                    <button id="cancelarBtExcluir${colaboradorId}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${btTexts.cancelarBt}</button>
                    <button id="confirmarBtExcluir${colaboradorId}" type="button" class="btn btn-warning">${btTexts.confirmarBt}</button>
                </div>
            </div>
        </div>
        `
        excluir.appendChild(excluirModal)
        
        linha.appendChild(nome)
        linha.appendChild(visualizar)
        linha.appendChild(editar)
        linha.appendChild(novaSenha)
        linha.appendChild(excluir)
        lista.appendChild(linha)
    });
}

export var novoColaborador = function() {
    let novoOpt = document.querySelector('#novoOpt')
    let listaOpt = document.querySelector('#listaOpt')
    novoOpt.classList.add('select')
    listaOpt.classList.remove('select')
    
    let bodyContent = document.querySelector('#body-content')
    bodyContent.innerHTML = ''

    fetch('/painel/equipe/novo-colaborador?filter=texts')
    .then((response) => {
        if (!response.ok) {
            alertGenerate(body, 'Erro na conexão. Verifique sua Internet.')
        } else {
            return response.json()
            .then((data) => {
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
                
                let divEmail = document.createElement('div')
                divEmail.className = 'input-item'
                let labelEmail = document.createElement('p')
                labelEmail.className = 'input-label'
                labelEmail.innerHTML = data.email
                divEmail.appendChild(labelEmail)
                let inputEmail = document.createElement('input')
                inputEmail.id = 'email'
                inputEmail.maxLength = 50
                inputEmail.className = 'input-input'
                divEmail.appendChild(inputEmail)
                formGroup.appendChild(divEmail)

                let divSenhas = document.createElement('div')
                divSenhas.className = 'input-group'
                let divSenha1 = document.createElement('div')
                divSenha1.className = 'input-group-item'
                let senha1Label = document.createElement('p')
                senha1Label.className = 'input-label'
                senha1Label.innerHTML = data.senha1
                let senha1Input = document.createElement('input')
                senha1Input.type = 'password'
                senha1Input.id = 'site'
                senha1Input.className = 'input-input'
                senha1Input.maxLength = 20
                divSenha1.appendChild(senha1Label)
                divSenha1.appendChild(senha1Input)
                divSenhas.appendChild(divSenha1)
                let divSenha2 = document.createElement('div')
                divSenha2.className = 'input-group-item'
                let senha2Label = document.createElement('p')
                senha2Label.className = 'input-label'
                senha2Label.innerHTML = data.senha2
                let senha2Input = document.createElement('input')
                senha2Input.type = 'password'
                senha2Input.id = 'executivo'
                senha2Input.className = 'input-input'
                senha2Input.maxLength = 20
                divSenha2.appendChild(senha2Label)
                divSenha2.appendChild(senha2Input)
                divSenhas.appendChild(divSenha2)
                formGroup.appendChild(divSenhas)

                let divButton = document.createElement('div')
                divButton.className = 'confirmar-bt'
                let cancelarBt = document.createElement('button')
                cancelarBt.className = 'btn btn-secondary'
                cancelarBt.innerHTML = data.cancelarBt
                cancelarBt.id = 'cancelarBt'
                cancelarBt.addEventListener('click', () => {
                    novoColaborador()
                })
                divButton.appendChild(cancelarBt)
                let confirmarBt = document.createElement('button')
                confirmarBt.className = 'btn btn-warning'
                confirmarBt.innerHTML = data.confirmarBt
                confirmarBt.id = 'confirmarBt'
                confirmarBt.addEventListener('click', () => {
                    let cabecalho = document.querySelector('#body-header')
                    if (inputNome.value.length < 1) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Nombre Inválido')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Invalid Name')
                        } else {
                            alertGenerate(body, 'Nome Inválido')
                        }
                        cabecalho.focus()
                        return
                    } else if (inputEmail.value.length < 1 || !inputEmail.value.includes('@') || !inputEmail.value.includes('.')) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'E-mail Inválido.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Invalid E-mail.')
                        } else {
                            alertGenerate(body, 'E-mail Inválido.')
                        }
                        cabecalho.focus()
                        return
                    } else if (senha1Input.value.length < 1) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Contraseña Invalida.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Invalid Password.')
                        } else {
                            alertGenerate(body, 'Senha Inválida.')
                        }
                        cabecalho.focus()
                        return
                    } else if (senha2Input.value.length < 1) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Confirme la contraseña.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Confirm the password.')
                        } else {
                            alertGenerate(body, 'Confirme a Senha.')
                        }
                        cabecalho.focus()
                        return
                    } else if (senha2Input.value != senha1Input.value) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Las contraseñas no coinciden.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Passwords do not match.')
                        } else {
                            alertGenerate(body, 'As senhas não conferem.')
                        }
                        cabecalho.focus()
                        return
                    }
                    confirmarBt.innerHTML = `
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    `
                    let send = new FormData()
                    send.append('nome', inputNome.value)
                    send.append('email', inputEmail.value)
                    send.append('senha', senha1Input.value)
                    fetch('/painel/equipe/novo-colaborador', {
                        method: 'POST',
                        body: send
                    })
                    .then((response) => {
                        if (!response.ok) {
                            alertGenerate(body, 'Erro no servidor. Tente novamente.')
                            novoColaborador()
                        } else {
                            return response.json()
                            .then((data) => {
                                data.message.forEach(element => {
                                    alertGenerate(body, element)
                                });
                                novoColaborador()
                                cabecalho.focus()
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
export var listaColaboradores = function() {
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