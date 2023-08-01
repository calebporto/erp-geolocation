import { ItemProposta } from "./classes.js"
import { alertGenerate, allFirstUppercase } from './patternFunctions.js'

function populateMidiaOptions(selectElement) {
    let options = [
        ['empena', 'Empena'],
        ['outdoor', 'Outdoor'],
        ['painelLed', 'Painel de Led'],
        ['mub', 'MUB'],
        ['banca', 'Banca de Jornal'],
        ['outro', 'Outro']
    ]
    let disabledOption = document.createElement('option')
    disabledOption.innerHTML = '-- Selecione --'
    disabledOption.disabled = true
    disabledOption.selected = true
    selectElement.appendChild(
        disabledOption
    )
    options.forEach(([value, text]) => {
        let option = document.createElement('option')
        option.value = value
        option.innerHTML = text
        selectElement.appendChild(option)
    })
}
function populatePeriodoOptions(selectElement) {
    let options = [
        ['semanal', 'Semanal'],
        ['biSemanal', 'Bi Semanal'],
        ['mensal', 'Mensal']
    ]
    let disabledOption = document.createElement('option')
    disabledOption.innerHTML = '-- Selecione --'
    disabledOption.disabled = true
    disabledOption.selected = true
    selectElement.appendChild(
        disabledOption
    )
    options.forEach(([value, text]) => {
        let option = document.createElement('option')
        option.value = value
        option.innerHTML = text
        selectElement.appendChild(option)
    })
}
export var novaProposta = function() {
    function zerarCampos() {
        addMidiaSelect.selectedIndex = 0
        addMidiaOutros.value = ''
        divAddItemMidiaShowText.innerHTML = ''
        addPraca.value = ''
        divAddItemPracaShowText.innerHTML = ''
        addBook.value = ''
        divAddItemBookShowText.innerHTML = ''
        selectPeriodo.selectedIndex = 0
        divAddItemPeriodoShowText.innerHTML = ''
        addFormato.value = ''
        divAddItemFormatoShowText.innerHTML = ''
        divFacesInput.value = null
        divFacesResult.innerHTML = ''
        divPeriodosInput.value = null
        divPeriodosResult.innerHTML = ''
        divVeiculacaoTabInput.value = null
        divVeiculacaoTabResult.innerHTML = ''
        divVeiculacaoNegInput.value = null
        divVeiculacaoNegResult.innerHTML = ''
        divProducaoInput.value = null
        divProducaoResult.innerHTML = ''
    }
    function addItem(buttonElement) {
        if (!currentItem.media) {
            alertGenerate(divAddItem, 'Selecione um tipo de mídia.').focus()
        } else if (!currentItem.place) {
            alertGenerate(divAddItem, 'Preencha a praça.').focus()
        } else if (!currentItem.book) {
            alertGenerate(divAddItem, 'Insira o link do book.').focus()
        } else if (!currentItem.period) {
            alertGenerate(divAddItem, 'Selecione o período.').focus()
        } else if (!currentItem.format) {
            alertGenerate(divAddItem, 'Preencha o formato.').focus()
        } else if (!currentItem.faces) {
            alertGenerate(divAddItem, 'Selecione o número de faces.').focus()
        } else if (!currentItem.periodQuant) {
            alertGenerate(divAddItem, 'Selecione a quantidade de períodos.').focus()
        } else if (!currentItem.tabValue) {
            alertGenerate(divAddItem, 'Preencha o valor de tabela.').focus()
        } else if (!currentItem.negValue) {
            alertGenerate(divAddItem, 'Preencha o valor negociado.').focus()
        } else if (!currentItem.production) {
            alertGenerate(divAddItem, 'Preencha o valor de produção.').focus()
        } else{
            zerarCampos()
            currentItem = new ItemProposta()
        }
    }

    let currentItem = new ItemProposta()

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
            agenciaComissaoInput.value = 50
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

    let divAddItemMidia = document.createElement('div')
    divAddItemMidia.className = 'divAddItemParam'
    let divAddItemMidiaTitle = document.createElement('div')
    divAddItemMidiaTitle.className = 'divAddItemParamTitle'
    let divAddItemMidiaTitleText = document.createElement('span')
    divAddItemMidiaTitleText.innerHTML = 'Mídia'
    divAddItemMidiaTitle.appendChild(divAddItemMidiaTitleText)
    let divAddMidiaInput = document.createElement('div')
    divAddMidiaInput.className = 'divAddItemParamInput'
    let addMidiaSelect = document.createElement('select')
    addMidiaSelect.className = 'addMidiaSelect'
    addMidiaSelect.id = 'midiaSelect'
    populateMidiaOptions(addMidiaSelect)
    addMidiaSelect.addEventListener('change', () => {
        if (addMidiaSelect.selectedIndex == (addMidiaSelect.options.length - 1)) {
            addMidiaOutros.disabled = false
            divAddItemMidiaShowText.innerHTML = addMidiaOutros.value
            currentItem.media = null
        } else {
            addMidiaOutros.value = null
            addMidiaOutros.disabled = true
            currentItem.media = addMidiaSelect.options[addMidiaSelect.selectedIndex].innerHTML
            divAddItemMidiaShowText.innerHTML = addMidiaSelect.options[addMidiaSelect.selectedIndex].innerHTML
        }
    })
    divAddMidiaInput.appendChild(addMidiaSelect)
    let addMidiaOutros = document.createElement('input')
    addMidiaOutros.className = 'midiaOutrosInput'
    addMidiaOutros.id = 'midiaOutrosInput'
    addMidiaOutros.disabled = true
    addMidiaOutros.addEventListener('input', (e) => {
        divAddItemMidiaShowText.innerHTML = allFirstUppercase(e.currentTarget.value) || null
        currentItem.media = allFirstUppercase(e.currentTarget.value) || null
    })
    divAddMidiaInput.appendChild(addMidiaOutros)
    let divAddItemMidiaShow = document.createElement('div')
    divAddItemMidiaShow.className = 'divAddItemParamShow'
    let divAddItemMidiaShowText = document.createElement('span')
    divAddItemMidiaShow.appendChild(divAddItemMidiaShowText)
    divAddItemMidia.appendChild(divAddItemMidiaTitle)
    divAddItemMidia.appendChild(divAddMidiaInput)
    divAddItemMidia.appendChild(divAddItemMidiaShow)
    
    let divAddItemPraca = document.createElement('div')
    divAddItemPraca.className = 'divAddItemParam'
    let divAddItemPracaTitle = document.createElement('div')
    divAddItemPracaTitle.className = 'divAddItemParamTitle'
    let divAddItemPracaTitleText = document.createElement('span')
    divAddItemPracaTitleText.innerHTML = 'Praça'
    divAddItemPracaTitle.appendChild(divAddItemPracaTitleText)
    let divAddPracaInput = document.createElement('div')
    divAddPracaInput.className = 'divAddItemParamInput'
    let addPraca = document.createElement('input')
    addPraca.id = 'pracaInput'
    addPraca.addEventListener('input', (e) => {
        divAddItemPracaShowText.innerHTML = allFirstUppercase(e.currentTarget.value) || null
        currentItem.place = allFirstUppercase(e.currentTarget.value) || null
    })
    divAddPracaInput.appendChild(addPraca)
    let divAddItemPracaShow = document.createElement('div')
    divAddItemPracaShow.className = 'divAddItemParamShow'
    let divAddItemPracaShowText = document.createElement('span')
    divAddItemPracaShow.appendChild(divAddItemPracaShowText)
    divAddItemPraca.appendChild(divAddItemPracaTitle)
    divAddItemPraca.appendChild(divAddPracaInput)
    divAddItemPraca.appendChild(divAddItemPracaShow)
    
    let divAddItemBook = document.createElement('div')
    divAddItemBook.className = 'divAddItemParam'
    let divAddItemBookTitle = document.createElement('div')
    divAddItemBookTitle.className = 'divAddItemParamTitle'
    let divAddItemBookTitleText = document.createElement('span')
    divAddItemBookTitleText.innerHTML = 'Book'
    divAddItemBookTitle.appendChild(divAddItemBookTitleText)
    let divAddBookInput = document.createElement('div')
    divAddBookInput.className = 'divAddItemParamInput'
    let addBook = document.createElement('input')
    addBook.id = 'bookInput'
    addBook.addEventListener('change', (e) => {
        divAddItemBookShowText.innerHTML = e.target.value
        currentItem.book = e.target.value
    })
    divAddBookInput.appendChild(addBook)
    let divAddItemBookShow = document.createElement('div')
    divAddItemBookShow.className = 'divAddItemParamShow'
    let divAddItemBookShowText = document.createElement('span')
    divAddItemBookShowText.className = 'bookShowSpan'
    divAddItemBookShow.appendChild(divAddItemBookShowText)
    divAddItemBook.appendChild(divAddItemBookTitle)
    divAddItemBook.appendChild(divAddBookInput)
    divAddItemBook.appendChild(divAddItemBookShow)
    
    let divAddItemPeriodo = document.createElement('div')
    divAddItemPeriodo.className = 'divAddItemParam'
    let divAddItemPeriodoTitle = document.createElement('div')
    divAddItemPeriodoTitle.className = 'divAddItemParamTitle'
    let divAddItemPeriodoTitleText = document.createElement('span')
    divAddItemPeriodoTitleText.innerHTML = 'Período'
    divAddItemPeriodoTitle.appendChild(divAddItemPeriodoTitleText)
    let divAddPeriodo = document.createElement('div')
    divAddPeriodo.className = 'divAddItemParamInput'
    let selectPeriodo = document.createElement('select')
    selectPeriodo.id = 'selectPeriodo'
    selectPeriodo.addEventListener('change', (e) => {
        divAddItemPeriodoShowText.innerHTML = e.target.options[e.target.selectedIndex].innerHTML
        currentItem.period = e.target.options[e.target.selectedIndex].innerHTML
    })
    populatePeriodoOptions(selectPeriodo)
    divAddPeriodo.appendChild(selectPeriodo)
    let divAddItemPeriodoShow = document.createElement('div')
    divAddItemPeriodoShow.className = 'divAddItemParamShow'
    let divAddItemPeriodoShowText = document.createElement('span')
    divAddItemPeriodoShow.appendChild(divAddItemPeriodoShowText)
    divAddItemPeriodo.appendChild(divAddItemPeriodoTitle)
    divAddItemPeriodo.appendChild(divAddPeriodo)
    divAddItemPeriodo.appendChild(divAddItemPeriodoShow)

    let divAddItemFormato = document.createElement('div')
    divAddItemFormato.className = 'divAddItemParam'
    let divAddItemFormatoTitle = document.createElement('div')
    divAddItemFormatoTitle.className = 'divAddItemParamTitle'
    let divAddItemFormatoTitleText = document.createElement('span')
    divAddItemFormatoTitleText.innerHTML = 'Formato'
    divAddItemFormatoTitle.appendChild(divAddItemFormatoTitleText)
    let divAddFormatoInput = document.createElement('div')
    divAddFormatoInput.className = 'divAddItemParamInput'
    let addFormato = document.createElement('input')
    addFormato.id = 'formatoInput'
    addFormato.addEventListener('input', (e) => {
        divAddItemFormatoShowText.innerHTML = allFirstUppercase(e.currentTarget.value) || null
        currentItem.format = allFirstUppercase(e.currentTarget.value) || null
    })
    divAddFormatoInput.appendChild(addFormato)
    let divAddItemFormatoShow = document.createElement('div')
    divAddItemFormatoShow.className = 'divAddItemParamShow'
    let divAddItemFormatoShowText = document.createElement('span')
    divAddItemFormatoShow.appendChild(divAddItemFormatoShowText)
    divAddItemFormato.appendChild(divAddItemFormatoTitle)
    divAddItemFormato.appendChild(divAddFormatoInput)
    divAddItemFormato.appendChild(divAddItemFormatoShow)

    let divMultiParams = document.createElement('div')
    divMultiParams.className = 'divMultiParams'
    let divFaces = document.createElement('div')
    divFaces.className = 'divMiniParam'
    let divFacesTitle = document.createElement('span')
    divFacesTitle.innerHTML = 'Faces'
    divFaces.appendChild(divFacesTitle)
    let divFacesInput = document.createElement('input')
    divFacesInput.type = 'number'
    divFacesInput.min = 0
    divFacesInput.max = 10000
    divFacesInput.id = 'facesInput'
    divFacesInput.addEventListener('input', (e) => {
        divFacesResult.innerHTML = e.currentTarget.value
        currentItem.faces = e.currentTarget.value != 0 ? Number(e.currentTarget.value) : null
    })
    divFaces.appendChild(divFacesInput)
    let divFacesResult = document.createElement('p')
    divFaces.appendChild(divFacesResult)
    divMultiParams.appendChild(divFaces)
    
    let divPeriodos = document.createElement('div')
    divPeriodos.className = 'divMiniParam'
    let divPeriodosTitle = document.createElement('span')
    divPeriodosTitle.innerHTML = 'Periodos'
    divPeriodos.appendChild(divPeriodosTitle)
    let divPeriodosInput = document.createElement('input')
    divPeriodosInput.type = 'number'
    divPeriodosInput.min = 0
    divPeriodosInput.max = 10000
    divPeriodosInput.id = 'periodosInput'
    divPeriodosInput.addEventListener('input', (e) => {
        divPeriodosResult.innerHTML = e.currentTarget.value
        currentItem.periodQuant = e.currentTarget.value != 0 ? Number(e.currentTarget.value) : null
    })
    divPeriodos.appendChild(divPeriodosInput)
    let divPeriodosResult = document.createElement('p')
    divPeriodos.appendChild(divPeriodosResult)
    divMultiParams.appendChild(divPeriodos)
    
    let divVeiculacaoTab = document.createElement('div')
    divVeiculacaoTab.className = 'divMiniParam'
    let divVeiculacaoTabTitle = document.createElement('span')
    divVeiculacaoTabTitle.innerHTML = 'Veiculacão Tab'
    divVeiculacaoTab.appendChild(divVeiculacaoTabTitle)
    let divVeiculacaoTabInput = document.createElement('input')
    divVeiculacaoTabInput.type = 'number'
    divVeiculacaoTabInput.min = 0
    divVeiculacaoTabInput.max = 10000
    divVeiculacaoTabInput.id = 'veiculacaoTabInput'
    divVeiculacaoTabInput.addEventListener('input', (e) => {
        divVeiculacaoTabResult.innerHTML = Number(e.currentTarget.value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        currentItem.tabValue = e.currentTarget.value != 0 ? Number(e.currentTarget.value) : null
    })
    divVeiculacaoTab.appendChild(divVeiculacaoTabInput)
    let divVeiculacaoTabResult = document.createElement('p')
    divVeiculacaoTab.appendChild(divVeiculacaoTabResult)
    divMultiParams.appendChild(divVeiculacaoTab)
    
    let divVeiculacaoNeg = document.createElement('div')
    divVeiculacaoNeg.className = 'divMiniParam'
    let divVeiculacaoNegTitle = document.createElement('span')
    divVeiculacaoNegTitle.innerHTML = 'Veiculacão Neg'
    divVeiculacaoNeg.appendChild(divVeiculacaoNegTitle)
    let divVeiculacaoNegInput = document.createElement('input')
    divVeiculacaoNegInput.type = 'number'
    divVeiculacaoNegInput.min = 0
    divVeiculacaoNegInput.max = 10000
    divVeiculacaoNegInput.id = 'veiculacaoNegInput'
    divVeiculacaoNegInput.addEventListener('input', (e) => {
        divVeiculacaoNegResult.innerHTML = Number(e.currentTarget.value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        currentItem.negValue = e.currentTarget.value != 0 ? Number(e.currentTarget.value) : null
    })
    divVeiculacaoNeg.appendChild(divVeiculacaoNegInput)
    let divVeiculacaoNegResult = document.createElement('p')
    divVeiculacaoNeg.appendChild(divVeiculacaoNegResult)
    divMultiParams.appendChild(divVeiculacaoNeg)
    
    let divProducao = document.createElement('div')
    divProducao.className = 'divMiniParam'
    let divProducaoTitle = document.createElement('span')
    divProducaoTitle.innerHTML = 'Produção'
    divProducao.appendChild(divProducaoTitle)
    let divProducaoInput = document.createElement('input')
    divProducaoInput.type = 'number'
    divProducaoInput.min = 0
    divProducaoInput.max = 10000
    divProducaoInput.id = 'producaoInput'
    divProducaoInput.addEventListener('input', (e) => {
        divProducaoResult.innerHTML = Number(e.currentTarget.value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        currentItem.production = e.currentTarget.value != 0 ? Number(e.currentTarget.value) : null
    })
    divProducao.appendChild(divProducaoInput)
    let divProducaoResult = document.createElement('p')
    divProducao.appendChild(divProducaoResult)
    divMultiParams.appendChild(divProducao)

    let addButton = document.createElement('div')
    addButton.className = 'btn btn-warning addButton'
    addButton.innerHTML = 'Adicionar'
    addButton.id = 'addButton'
    addButton.addEventListener('click', (e) => {
        addItem(e.target, currentItem)
    })



    divAddItem.appendChild(divAddItemTitle)
    divAddItem.appendChild(divAddItemMidia)
    divAddItem.appendChild(divAddItemPraca)
    divAddItem.appendChild(divAddItemBook)
    divAddItem.appendChild(divAddItemPeriodo)
    divAddItem.appendChild(divAddItemFormato)
    divAddItem.appendChild(divMultiParams)
    divAddItem.appendChild(addButton)
    
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