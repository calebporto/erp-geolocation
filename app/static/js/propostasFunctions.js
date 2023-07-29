export var novaProposta = function() {
    let painelPropostasOpt = document.querySelector('#painelPropostasOpt')
    let novaPropostaOpt = document.querySelector('#novaPropostaOpt')
    novaPropostaOpt.classList.add('select')
    painelPropostasOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let divHeader = document.createElement('div')
    divHeader.className = 'divHeader'
    divHeader.id = 'divHeader'

    let divClienteInput = document.createElement('div')
    divClienteInput.className = 'divHeaderInput'
    divClienteInput.id = 'divClienteInput'
    let clienteInputTitle = document.createElement('p')
    clienteInputTitle.innerHTML = 'Empresa:'
    let clienteInputInput = document.createElement('input')
    clienteInputInput.id = 'clienteInput'
    clienteInputInput.maxLength = 50
    divClienteInput.appendChild(clienteInputTitle)
    divClienteInput.appendChild(clienteInputInput)
    
    let divACInput = document.createElement('div')
    divACInput.className = 'divHeaderInput'
    divACInput.id = 'divACInput'
    let ACInputTitle = document.createElement('p')
    ACInputTitle.innerHTML = 'A/C (Executivo da empresa):'
    let ACInputInput = document.createElement('input')
    ACInputInput.id = 'acInput'
    ACInputInput.maxLength = 50
    divACInput.appendChild(ACInputTitle)
    divACInput.appendChild(ACInputInput)
    
    let divCampanhaInput = document.createElement('div')
    divCampanhaInput.className = 'divHeaderInput'
    divCampanhaInput.id = 'divCampanhaInput'
    let campanhaInputTitle = document.createElement('p')
    campanhaInputTitle.innerHTML = 'Campanha:'
    let campanhaInputInput = document.createElement('input')
    campanhaInputInput.id = 'campanhaInput'
    campanhaInputInput.maxLength = 50
    divCampanhaInput.appendChild(campanhaInputTitle)
    divCampanhaInput.appendChild(campanhaInputInput)
    
    divHeader.appendChild(divClienteInput)
    divHeader.appendChild(divACInput)
    divHeader.appendChild(divCampanhaInput)
    body_content.appendChild(divHeader)

    let divMiddle = document.createElement('div')
    divMiddle.className = 'divMiddle'
    divMiddle.id = 'divMiddle'

    let divAgencia = document.createElement('div')
    divAgencia.className = 'divAgencia'
    let divAgenciaCheck = document.createElement('div')
    divAgenciaCheck.className = 'form-check form-switch divAgenciaCheck'
    let agenciaCheck = document.createElement('input')
    agenciaCheck.type = 'checkbox'
    agenciaCheck.className = 'form-check-input'
    agenciaCheck.id = 'agenciaCheck'
    agenciaCheck.checked = false
    agenciaCheck.addEventListener('click', () => {
        if (agenciaCheck.checked == false) {
            agenciaNameInput.disabled = true
            agenciaNameInput.value = ''
            agenciaComissaoInput.disabled = true
            agenciaComissaoInput.value = ''
        } else {
            agenciaNameInput.disabled = false
            agenciaComissaoInput.disabled = false
        }
    })
    divAgenciaCheck.appendChild(agenciaCheck)
    let divAgenciaName = document.createElement('div')
    divAgenciaName.className = 'divAgenciaName'
    let agenciaNameTitle = document.createElement('p')
    agenciaNameTitle.innerHTML = 'Nome da agência'
    divAgenciaName.appendChild(agenciaNameTitle)
    let agenciaNameInput = document.createElement('input')
    agenciaNameInput.id = 'agenciaNameInput'
    agenciaNameInput.disabled = true
    divAgenciaName.appendChild(agenciaNameInput)
    let divAgenciaComissao = document.createElement('div')
    divAgenciaComissao.className = 'divAgenciaComissao'
    let agenciaComissaoTitle = document.createElement('p')
    agenciaComissaoTitle.innerHTML = 'Porcentagem de comissão:'
    divAgenciaComissao.appendChild(agenciaComissaoTitle)
    let agenciaComissaoInput = document.createElement('input')
    agenciaComissaoInput.disabled = true
    agenciaComissaoInput.id = 'agenciaComissaoInput'
    divAgenciaComissao.appendChild(agenciaComissaoInput)
    
    divAgencia.appendChild(divAgenciaCheck)
    divAgencia.appendChild(divAgenciaName)
    divAgencia.appendChild(divAgenciaComissao)
    body_content.appendChild(divAgencia)

    let divAddItem = document.createElement('div')
    divAddItem.className = 'divAddItem'
    let divAddItemTitle = document.createElement('div')
    divAddItemTitle.className = 'divAddItemTitle'
    let addItemTitle = document.createElement('span')
    addItemTitle.innerHTML = 'Adicionar Item'
    divAddItemTitle.appendChild(addItemTitle)
    divAddItem.appendChild(divAddItemTitle)

    body_content.appendChild(divAddItem)
    
}

export var painelPropostas = function() {
    let painelPropostasOpt = document.querySelector('#painelPropostasOpt')
    let novaPropostaOpt = document.querySelector('#novaPropostaOpt')
    painelPropostasOpt.classList.add('select')
    novaPropostaOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''
}