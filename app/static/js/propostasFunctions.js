import { ItemProposta, Proposta } from "./classes.js"
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
export var novaProposta = function () {
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
        } else {
            currentItem.calcularTotais()
            currentItem.calcularComissao(proposta.agencyTax)
            proposta.items.push(currentItem)
            renderizarProposta()
            zerarCampos()
            currentItem = new ItemProposta()

        }
    }
    function renderizarProposta() {
        divShowItemsBody.innerHTML = ''
        if (proposta.items.length > 0) {
            let items = proposta.items
            items.forEach((item, index) => {
                let lineDiv = document.createElement('div')
                lineDiv.className = 'lineDiv'
                let divLineDelete = document.createElement('div')
                divLineDelete.className = 'deleteLineDiv'
                let lineDeleteButton = document.createElement('button')
                lineDeleteButton.className = 'btn btn-danger'
                lineDeleteButton.innerHTML = 'x'
                lineDeleteButton.id = index
                lineDeleteButton.addEventListener('click', e => {
                    deleteLineItem(e.target.id)
                })
                divLineDelete.appendChild(lineDeleteButton)
                lineDiv.appendChild(divLineDelete)
                let divLineMidia = document.createElement('div')
                divLineMidia.className = 'lineDivItem mdLineDiv'
                let lineMidiaValue = document.createElement('span')
                lineMidiaValue.innerHTML = item.media
                divLineMidia.appendChild(lineMidiaValue)
                lineDiv.appendChild(divLineMidia)
                let divLinePraca = document.createElement('div')
                divLinePraca.className = 'lineDivItem mdLineDiv'
                let linePracaValue = document.createElement('span')
                linePracaValue.innerHTML = item.place
                divLinePraca.appendChild(linePracaValue)
                lineDiv.appendChild(divLinePraca)
                let divLineBook = document.createElement('div')
                divLineBook.className = 'lineDivItem lgLineDiv'
                let lineBookValue = document.createElement('a')
                lineBookValue.innerHTML = item.book
                lineBookValue.href = item.book
                divLineBook.appendChild(lineBookValue)
                lineDiv.appendChild(divLineBook)
                let divLinePeriodo = document.createElement('div')
                divLinePeriodo.className = 'lineDivItem periodoLineDiv'
                let linePeriodoValue = document.createElement('span')
                linePeriodoValue.innerHTML = item.period
                divLinePeriodo.appendChild(linePeriodoValue)
                lineDiv.appendChild(divLinePeriodo)
                let divLineFormato = document.createElement('div')
                divLineFormato.className = 'lineDivItem mdLineDiv'
                let lineFormatoValue = document.createElement('span')
                lineFormatoValue.innerHTML = item.format
                divLineFormato.appendChild(lineFormatoValue)
                lineDiv.appendChild(divLineFormato)
                let divLineFaces = document.createElement('div')
                divLineFaces.className = 'lineDivItem smLineDiv'
                let lineFacesValue = document.createElement('span')
                lineFacesValue.innerHTML = item.faces
                divLineFaces.appendChild(lineFacesValue)
                lineDiv.appendChild(divLineFaces)
                let divLinePeriodos = document.createElement('div')
                divLinePeriodos.className = 'lineDivItem smLineDiv'
                let linePeriodosValue = document.createElement('span')
                linePeriodosValue.innerHTML = item.periodQuant
                divLinePeriodos.appendChild(linePeriodosValue)
                lineDiv.appendChild(divLinePeriodos)
                let divLineTabValue = document.createElement('div')
                divLineTabValue.className = 'lineDivItem mdLineDiv'
                let lineTabValueValue = document.createElement('span')
                lineTabValueValue.innerHTML = (item.taxTabValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divLineTabValue.appendChild(lineTabValueValue)
                lineDiv.appendChild(divLineTabValue)
                let divLineNegValue = document.createElement('div')
                divLineNegValue.className = 'lineDivItem mdLineDiv'
                let lineNegValueValue = document.createElement('span')
                lineNegValueValue.innerHTML = (item.taxNegValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divLineNegValue.appendChild(lineNegValueValue)
                lineDiv.appendChild(divLineNegValue)
                let divLineProduction = document.createElement('div')
                divLineProduction.className = 'lineDivItem mdLineDiv'
                let lineProductionValue = document.createElement('span')
                lineProductionValue.innerHTML = (item.production).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divLineProduction.appendChild(lineProductionValue)
                lineDiv.appendChild(divLineProduction)
                let divLineTotalNegValue = document.createElement('div')
                divLineTotalNegValue.className = 'lineDivItem mdLineDiv'
                let lineTotalNegValueValue = document.createElement('span')
                lineTotalNegValueValue.innerHTML = (item.taxTotalNegValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divLineTotalNegValue.appendChild(lineTotalNegValueValue)
                lineDiv.appendChild(divLineTotalNegValue)
                let divLineTotalProduction = document.createElement('div')
                divLineTotalProduction.className = 'lineDivItem mdLineDiv'
                let lineTotalProductionValue = document.createElement('span')
                lineTotalProductionValue.innerHTML = (item.totalProduction).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divLineTotalProduction.appendChild(lineTotalProductionValue)
                lineDiv.appendChild(divLineTotalProduction)
                let divLineTotal = document.createElement('div')
                divLineTotal.className = 'lineDivItem mdLineDiv lineTotal'
                let lineTotalValue = document.createElement('span')
                lineTotalValue.innerHTML = (item.taxTotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                divLineTotal.appendChild(lineTotalValue)
                lineDiv.appendChild(divLineTotal)

                divShowItemsBody.appendChild(lineDiv)
            })
        } else {
            let emptyText = document.createElement('span')
            emptyText.innerHTML = 'Não há itens a mostrar.'
            emptyText.className = 'emptyText'
            emptyText.id = 'emptyText'
            divShowItemsBody.appendChild(emptyText)
        }
    }
    function recalcularComissao(comissao) {
        proposta.items.forEach(item => {
            item.calcularComissao(comissao)
        })
        renderizarProposta()
    }
    function deleteLineItem(index) {
        proposta.items.splice(index, 1)
        renderizarProposta()
    }
    function gerarProposta(button) {
        console.log('clicou')
        proposta.calcularTotal()
        proposta.proposal_date = new Date()
        sending = true
        button.innerHTML = `
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        `
        fetch('/painel/propostas/nova-proposta', {
            method: 'POST',
            body: JSON.stringify(proposta)
        }).then(response => {
            if(!response.ok) {
                alertGenerate(body_content, 'Algo deu errado').focus()
                button.innerHTML = 'Gerar Proposta'
                sending = false
            } else {
                return response.json().then(data => {
                    button.innerHTML = 'Gerar Proposta'
                    sending = false
                })
            }
        })
    }

    let proposta = new Proposta()
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
    clienteInputTitle.innerHTML = 'Cliente:'
    let clienteInputInput = document.createElement('input')
    clienteInputInput.id = 'clienteInput'
    clienteInputInput.maxLength = 50
    clienteInputInput.addEventListener('input', e => {
        proposta.client = allFirstUppercase(e.currentTarget.value) || null
        showClienteValue.innerHTML = allFirstUppercase(e.currentTarget.value) || null
    })
    divClienteInput.appendChild(clienteInputTitle)
    divClienteInput.appendChild(clienteInputInput)

    let divACInput = document.createElement('div')
    divACInput.className = 'divHeaderInput'
    divACInput.id = 'divACInput'
    let ACInputTitle = document.createElement('p')
    ACInputTitle.innerHTML = 'A/C (Executivo do Cliente):'
    let ACInputInput = document.createElement('input')
    ACInputInput.id = 'acInput'
    ACInputInput.maxLength = 50
    ACInputInput.addEventListener('input', e => {
        proposta.clientPerson = allFirstUppercase(e.currentTarget.value) || null
        showACValue.innerHTML = allFirstUppercase(e.currentTarget.value) || null
    })
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
    campanhaInputInput.addEventListener('input', e => {
        proposta.campaign = allFirstUppercase(e.currentTarget.value) || null
        showCampanhaValue.innerHTML = allFirstUppercase(e.currentTarget.value) || null
    })
    divCampanhaInput.appendChild(campanhaInputTitle)
    divCampanhaInput.appendChild(campanhaInputInput)

    divHeader.appendChild(divClienteInput)
    divHeader.appendChild(divACInput)
    divHeader.appendChild(divCampanhaInput)
    body_content.appendChild(divHeader)

    let divEmployee = document.createElement('div')
    divEmployee.className = 'divEmployee'
    let divEmployeeTitle = document.createElement('div')
    divEmployeeTitle.className = 'divEmployeeTitle'
    let employeeTitle = document.createElement('span')
    employeeTitle.innerHTML = 'Executivo Responsável (M Souza):'
    divEmployeeTitle.appendChild(employeeTitle)
    divEmployee.appendChild(divEmployeeTitle)
    let divEmployeeInput = document.createElement('div')
    divEmployeeInput.className = 'divEmployeeInput'
    let employeeInput = document.createElement('input')
    employeeInput.id = 'employeeInput'
    employeeInput.addEventListener('input', e => {
        proposta.employeeName = allFirstUppercase(e.currentTarget.value) || null
        showExecutivoValue.innerHTML = allFirstUppercase(e.currentTarget.value) || null
    })
    divEmployeeInput.appendChild(employeeInput)
    divEmployee.appendChild(divEmployeeInput)
    body_content.appendChild(divEmployee)

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
            proposta.agencyName = ''
            showAgenciaNameValue.innerHTML = ''
            agenciaComissaoInput.disabled = true
            agenciaComissaoInput.value = ''
            proposta.agencyTax = 0
            showAgenciaTaxValue.innerHTML = ''
            recalcularComissao(Number(proposta.agencyTax))
        } else {
            agenciaNameInput.disabled = false
            agenciaComissaoInput.disabled = false
            agenciaComissaoInput.value = 50
            proposta.agencyTax = 50
            showAgenciaTaxValue.innerHTML = '50 %'
            recalcularComissao(Number(proposta.agencyTax))
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
    agenciaNameInput.addEventListener('input', e => {
        proposta.agencyName = allFirstUppercase(e.currentTarget.value) || null
        showAgenciaNameValue.innerHTML = allFirstUppercase(e.currentTarget.value) || null
    })
    divAgenciaName.appendChild(agenciaNameInput)
    let divAgenciaComissao = document.createElement('div')
    divAgenciaComissao.className = 'divAgenciaComissao'
    let agenciaComissaoTitle = document.createElement('p')
    agenciaComissaoTitle.innerHTML = 'Porcentagem de comissão:'
    divAgenciaComissao.appendChild(agenciaComissaoTitle)
    let agenciaComissaoInput = document.createElement('input')
    agenciaComissaoInput.type = 'number'
    agenciaComissaoInput.disabled = true
    agenciaComissaoInput.id = 'agenciaComissaoInput'
    agenciaComissaoInput.addEventListener('change', e => {
        proposta.agencyTax = Number(e.target.value || 0)
        showAgenciaTaxValue.innerHTML = e.target.value ? `${e.target.value} %` : null
        recalcularComissao(Number(proposta.agencyTax))
    })
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
        divVeiculacaoTabResult.innerHTML = Number(e.currentTarget.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
        divVeiculacaoNegResult.innerHTML = Number(e.currentTarget.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
        divProducaoResult.innerHTML = Number(e.currentTarget.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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

    let divShow = document.createElement('div')
    divShow.className = 'divShow'

    let divShowProposta = document.createElement('div')
    divShowProposta.className = 'divAddItem divShowProposta'

    let divShowPropostaTitle = document.createElement('div')
    divShowPropostaTitle.className = 'divAddItemTitle'
    let divShowPropostaTitleText = document.createElement('span')
    divShowPropostaTitleText.innerHTML = 'Pré-Visualização'
    divShowPropostaTitle.appendChild(divShowPropostaTitleText)
    divShowProposta.appendChild(divShowPropostaTitle)

    let divShowPropostaCliente = document.createElement('div')
    divShowPropostaCliente.className = 'divHeaderItemShow'
    let showClienteTitle = document.createElement('span')
    showClienteTitle.innerHTML = 'Cliente:'
    let showClienteValue = document.createElement('p')
    showClienteValue.innerHTML = ''
    divShowPropostaCliente.appendChild(showClienteTitle)
    divShowPropostaCliente.appendChild(showClienteValue)
    divShowProposta.appendChild(divShowPropostaCliente)

    let divShowPropostaAC = document.createElement('div')
    divShowPropostaAC.className = 'divHeaderItemShow'
    let showACTitle = document.createElement('span')
    showACTitle.innerHTML = 'A/C:'
    let showACValue = document.createElement('p')
    showACValue.innerHTML = ''
    divShowPropostaAC.appendChild(showACTitle)
    divShowPropostaAC.appendChild(showACValue)
    divShowProposta.appendChild(divShowPropostaAC)

    let divShowPropostaCampanha = document.createElement('div')
    divShowPropostaCampanha.className = 'divHeaderItemShow'
    let showCampanhaTitle = document.createElement('span')
    showCampanhaTitle.innerHTML = 'Campanha:'
    let showCampanhaValue = document.createElement('p')
    showCampanhaValue.innerHTML = 'nsdovcnsdvo sdfs sdf'
    divShowPropostaCampanha.appendChild(showCampanhaTitle)
    divShowPropostaCampanha.appendChild(showCampanhaValue)
    divShowProposta.appendChild(divShowPropostaCampanha)

    let divShowPropostaExecutivo = document.createElement('div')
    divShowPropostaExecutivo.className = 'divHeaderItemShow'
    let showExecutivoTitle = document.createElement('span')
    showExecutivoTitle.innerHTML = 'Executivo:'
    let showExecutivoValue = document.createElement('p')
    showExecutivoValue.innerHTML = ''
    divShowPropostaExecutivo.appendChild(showExecutivoTitle)
    divShowPropostaExecutivo.appendChild(showExecutivoValue)
    divShowProposta.appendChild(divShowPropostaExecutivo)

    let divShowPropostaAgenciaName = document.createElement('div')
    divShowPropostaAgenciaName.className = 'divHeaderItemShow'
    let showAgenciaNameTitle = document.createElement('span')
    showAgenciaNameTitle.innerHTML = 'Agência:'
    let showAgenciaNameValue = document.createElement('p')
    showAgenciaNameValue.innerHTML = ''
    divShowPropostaAgenciaName.appendChild(showAgenciaNameTitle)
    divShowPropostaAgenciaName.appendChild(showAgenciaNameValue)
    divShowProposta.appendChild(divShowPropostaAgenciaName)

    let divShowPropostaAgenciaTax = document.createElement('div')
    divShowPropostaAgenciaTax.className = 'divHeaderItemShow'
    let showAgenciaTaxTitle = document.createElement('span')
    showAgenciaTaxTitle.innerHTML = 'Comissão:'
    let showAgenciaTaxValue = document.createElement('p')
    showAgenciaTaxValue.innerHTML = ''
    divShowPropostaAgenciaTax.appendChild(showAgenciaTaxTitle)
    divShowPropostaAgenciaTax.appendChild(showAgenciaTaxValue)
    divShowProposta.appendChild(divShowPropostaAgenciaTax)

    let divShowItems = document.createElement('div')
    divShowItems.className = 'divShowItems'
    let divShowItemsHeader = document.createElement('div')
    divShowItemsHeader.className = 'divShowItemsHeader'
    let divItemHeaderDelete = document.createElement('div')
    divItemHeaderDelete.className = 'deleteHeader'
    divShowItemsHeader.appendChild(divItemHeaderDelete)
    let divItemHeaderMidia = document.createElement('div')
    divItemHeaderMidia.className = 'mdHeader'
    let divItemHeaderMidiaText = document.createElement('span')
    divItemHeaderMidiaText.innerHTML = 'Mídia'
    divItemHeaderMidia.appendChild(divItemHeaderMidiaText)
    divShowItemsHeader.appendChild(divItemHeaderMidia)
    let divItemHeaderPraca = document.createElement('div')
    divItemHeaderPraca.className = 'mdHeader'
    let divItemHeaderPracaText = document.createElement('span')
    divItemHeaderPracaText.innerHTML = 'Praça'
    divItemHeaderPraca.appendChild(divItemHeaderPracaText)
    divShowItemsHeader.appendChild(divItemHeaderPraca)
    let divItemHeaderBook = document.createElement('div')
    divItemHeaderBook.className = 'lgHeader'
    let divItemHeaderBookText = document.createElement('span')
    divItemHeaderBookText.innerHTML = 'Book'
    divItemHeaderBook.appendChild(divItemHeaderBookText)
    divShowItemsHeader.appendChild(divItemHeaderBook)
    let divItemHeaderPeriodo = document.createElement('div')
    divItemHeaderPeriodo.className = 'periodoHeader'
    let divItemHeaderPeriodoText = document.createElement('span')
    divItemHeaderPeriodoText.innerHTML = 'Período'
    divItemHeaderPeriodo.appendChild(divItemHeaderPeriodoText)
    divShowItemsHeader.appendChild(divItemHeaderPeriodo)
    let divItemHeaderFormato = document.createElement('div')
    divItemHeaderFormato.className = 'mdHeader'
    let divItemHeaderFormatoText = document.createElement('span')
    divItemHeaderFormatoText.innerHTML = 'Formato'
    divItemHeaderFormato.appendChild(divItemHeaderFormatoText)
    divShowItemsHeader.appendChild(divItemHeaderFormato)
    let divItemHeaderFaces = document.createElement('div')
    divItemHeaderFaces.className = 'smHeader'
    let divItemHeaderFacesText = document.createElement('span')
    divItemHeaderFacesText.innerHTML = 'Faces'
    divItemHeaderFaces.appendChild(divItemHeaderFacesText)
    divShowItemsHeader.appendChild(divItemHeaderFaces)
    let divItemHeaderPeriodos = document.createElement('div')
    divItemHeaderPeriodos.className = 'smHeader'
    let divItemHeaderPeriodosText = document.createElement('span')
    divItemHeaderPeriodosText.innerHTML = 'Períodos'
    divItemHeaderPeriodos.appendChild(divItemHeaderPeriodosText)
    divShowItemsHeader.appendChild(divItemHeaderPeriodos)
    let divItemHeaderTabValue = document.createElement('div')
    divItemHeaderTabValue.className = 'mdHeader'
    let divItemHeaderTabValueText = document.createElement('span')
    divItemHeaderTabValueText.innerHTML = 'Veiculação Tab'
    divItemHeaderTabValue.appendChild(divItemHeaderTabValueText)
    divShowItemsHeader.appendChild(divItemHeaderTabValue)
    let divItemHeaderNegValue = document.createElement('div')
    divItemHeaderNegValue.className = 'mdHeader'
    let divItemHeaderNegValueText = document.createElement('span')
    divItemHeaderNegValueText.innerHTML = 'Veiculação Neg'
    divItemHeaderNegValue.appendChild(divItemHeaderNegValueText)
    divShowItemsHeader.appendChild(divItemHeaderNegValue)
    let divItemHeaderProducao = document.createElement('div')
    divItemHeaderProducao.className = 'mdHeader'
    let divItemHeaderProducaoText = document.createElement('span')
    divItemHeaderProducaoText.innerHTML = 'Produção'
    divItemHeaderProducao.appendChild(divItemHeaderProducaoText)
    divShowItemsHeader.appendChild(divItemHeaderProducao)
    let divItemHeaderTotalNeg = document.createElement('div')
    divItemHeaderTotalNeg.className = 'mdHeader'
    let divItemHeaderTotalNegText = document.createElement('span')
    divItemHeaderTotalNegText.innerHTML = 'Total Veiculação Neg'
    divItemHeaderTotalNeg.appendChild(divItemHeaderTotalNegText)
    divShowItemsHeader.appendChild(divItemHeaderTotalNeg)
    let divItemHeaderTotalProcucao = document.createElement('div')
    divItemHeaderTotalProcucao.className = 'mdHeader'
    let divItemHeaderTotalProcucaoText = document.createElement('span')
    divItemHeaderTotalProcucaoText.innerHTML = 'Total Produção'
    divItemHeaderTotalProcucao.appendChild(divItemHeaderTotalProcucaoText)
    divShowItemsHeader.appendChild(divItemHeaderTotalProcucao)
    let divItemHeaderTotal = document.createElement('div')
    divItemHeaderTotal.className = 'mdHeader'
    let divItemHeaderTotalText = document.createElement('span')
    divItemHeaderTotalText.innerHTML = 'Total'
    divItemHeaderTotal.appendChild(divItemHeaderTotalText)
    divShowItemsHeader.appendChild(divItemHeaderTotal)
    divShowItems.appendChild(divShowItemsHeader)

    let divShowItemsBody = document.createElement('div')
    divShowItemsBody.className = 'divShowItemsBody'
    divShowItems.appendChild(divShowItemsBody)

    divShowProposta.appendChild(divShowItems)
    divShow.appendChild(divShowProposta)
    body_content.appendChild(divShow)

    let gerarBt = document.createElement('div')
    gerarBt.className = 'btn btn-warning gerarBt'
    gerarBt.innerHTML = 'Gerar Proposta'
    let sending = false
    gerarBt.addEventListener('click', e => {
        if (!sending) {
            if (!proposta.client || proposta.client == '') {
                alertGenerate(body_content, 'Preencha o nome do cliente.').focus()
            } else if (!proposta.campaign || proposta.campaign == '') {
                alertGenerate(body_content, 'Preencha o nome da campanha.').focus()
            } else if (agenciaCheck.checked == true && !proposta.agencyName || agenciaCheck.checked == true && proposta.agencyName == '') {
                alertGenerate(body_content, 'Preencha o nome da agência.').focus()
            } else if (agenciaCheck.checked == true && proposta.agencyTax == null) {
                alertGenerate(body_content, 'Preencha o valor da comissão, mesmo que seja 0.').focus()
            } else if (!proposta.employeeName || proposta.employeeName == '') {
                alertGenerate(body_content, 'Preencha o nome do executivo responsável pela proposta.').focus()
            } else if (proposta.items.length == 0) {
                alertGenerate(divAddItem, 'Você deve inserir ao menos 1 item na proposta.').focus()
            } else {
                gerarProposta(e.target)
            }
        }
    })
    body_content.appendChild(gerarBt)

    renderizarProposta()
}

export var painelPropostas = function () {
    let painelPropostasOpt = document.querySelector('#painelPropostasOpt')
    let novaPropostaOpt = document.querySelector('#novaPropostaOpt')
    painelPropostasOpt.classList.add('select')
    novaPropostaOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''
}