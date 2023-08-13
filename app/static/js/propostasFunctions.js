import { ItemProposta, Proposta, QueryParams } from "./classes.js"
import { alertGenerate, allFirstUppercase, body } from './patternFunctions.js'

export var novaProposta = function () {
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
    function zerarCampos() {
        addMidiaSelect.selectedIndex = 0
        addMidiaOutros.value = ''
        divAddItemMidiaShowText.innerHTML = ''
        addPraca.value = ''
        divAddItemPracaShowText.innerHTML = ''
        addBook.value = ''
        divAddItemBookShowText.innerHTML = ''
        isBlankValueCheck.checked = false
        isMediaKitCheck.checked = false
        isMediaKitCheck.disabled = true
        isMediaKitCheck.style.color = 'gray'
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
        } else if (isBlankValueCheck.checked == false && !currentItem.period) {
            alertGenerate(divAddItem, 'Selecione o período.').focus()
        } else if (isBlankValueCheck.checked == false && !currentItem.format) {
            alertGenerate(divAddItem, 'Preencha o formato.').focus()
        } else if (isBlankValueCheck.checked == false && !currentItem.faces) {
            alertGenerate(divAddItem, 'Selecione o número de faces.').focus()
        } else if (isBlankValueCheck.checked == false && !currentItem.periodQuant) {
            alertGenerate(divAddItem, 'Selecione a quantidade de períodos.').focus()
        } else if (isBlankValueCheck.checked == false && !currentItem.tabValue) {
            alertGenerate(divAddItem, 'Preencha o valor de tabela.').focus()
        } else if (isBlankValueCheck.checked == false && !currentItem.negValue) {
            alertGenerate(divAddItem, 'Preencha o valor negociado.').focus()
        } else if (isBlankValueCheck.checked == false && !currentItem.production) {
            alertGenerate(divAddItem, 'Preencha o valor de produção.').focus()
        } else {
            if (isBlankValueCheck.checked == false) {
                currentItem.calcularTotais()
                currentItem.calcularComissao(proposta.agencyTax)
            }
            proposta.items.push(currentItem)
            renderizarProposta()
            zerarCampos()
            currentItem = new ItemProposta()
            resetAndBlockItemValues(false)
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
                lineBookValue.innerHTML = item.book ? 'Link' : ''
                lineBookValue.href = item.book || ''
                divLineBook.appendChild(lineBookValue)
                lineDiv.appendChild(divLineBook)
                let divLinePeriodo = document.createElement('div')
                divLinePeriodo.className = 'lineDivItem periodoLineDiv'
                let linePeriodoValue = document.createElement('span')
                linePeriodoValue.innerHTML = item.period || ''
                divLinePeriodo.appendChild(linePeriodoValue)
                lineDiv.appendChild(divLinePeriodo)
                let divLineFormato = document.createElement('div')
                divLineFormato.className = 'lineDivItem mdLineDiv'
                let lineFormatoValue = document.createElement('span')
                lineFormatoValue.innerHTML = item.format || ''
                divLineFormato.appendChild(lineFormatoValue)
                lineDiv.appendChild(divLineFormato)
                let divLineFaces = document.createElement('div')
                divLineFaces.className = 'lineDivItem smLineDiv'
                let lineFacesValue = document.createElement('span')
                lineFacesValue.innerHTML = item.faces || ''
                divLineFaces.appendChild(lineFacesValue)
                lineDiv.appendChild(divLineFaces)
                let divLinePeriodos = document.createElement('div')
                divLinePeriodos.className = 'lineDivItem smLineDiv'
                let linePeriodosValue = document.createElement('span')
                linePeriodosValue.innerHTML = item.periodQuant || ''
                divLinePeriodos.appendChild(linePeriodosValue)
                lineDiv.appendChild(divLinePeriodos)
                let divLineTabValue = document.createElement('div')
                divLineTabValue.className = 'lineDivItem mdLineDiv'
                let lineTabValueValue = document.createElement('span')
                lineTabValueValue.innerHTML = item.taxTabValue ? (item.taxTabValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
                divLineTabValue.appendChild(lineTabValueValue)
                lineDiv.appendChild(divLineTabValue)
                let divLineNegValue = document.createElement('div')
                divLineNegValue.className = 'lineDivItem mdLineDiv'
                let lineNegValueValue = document.createElement('span')
                lineNegValueValue.innerHTML = item.taxNegValue ? (item.taxNegValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
                divLineNegValue.appendChild(lineNegValueValue)
                lineDiv.appendChild(divLineNegValue)
                let divLineProduction = document.createElement('div')
                divLineProduction.className = 'lineDivItem mdLineDiv'
                let lineProductionValue = document.createElement('span')
                lineProductionValue.innerHTML = item.production ? (item.production).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
                divLineProduction.appendChild(lineProductionValue)
                lineDiv.appendChild(divLineProduction)
                let divLineTotalNegValue = document.createElement('div')
                divLineTotalNegValue.className = 'lineDivItem mdLineDiv'
                let lineTotalNegValueValue = document.createElement('span')
                lineTotalNegValueValue.innerHTML = item.taxTotalNegValue ? (item.taxTotalNegValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
                divLineTotalNegValue.appendChild(lineTotalNegValueValue)
                lineDiv.appendChild(divLineTotalNegValue)
                let divLineTotalProduction = document.createElement('div')
                divLineTotalProduction.className = 'lineDivItem mdLineDiv'
                let lineTotalProductionValue = document.createElement('span')
                lineTotalProductionValue.innerHTML = item.totalProduction ? (item.totalProduction).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
                divLineTotalProduction.appendChild(lineTotalProductionValue)
                lineDiv.appendChild(divLineTotalProduction)
                let divLineTotal = document.createElement('div')
                divLineTotal.className = 'lineDivItem mdLineDiv lineTotal'
                let lineTotalValue = document.createElement('span')
                lineTotalValue.innerHTML = item.taxTotal ? (item.taxTotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
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
    function resetAndBlockItemValues(status) {
        if (status == true) {
            selectPeriodo.selectedIndex = 0
            divAddItemPeriodoShowText.innerHTML = ''
            currentItem.period = null
            selectPeriodo.disabled = true
            
            addFormato.value = ''
            divAddItemFormatoShowText.innerHTML = ''
            currentItem.format = null
            addFormato.disabled = true

            divFacesInput.value = ''
            divFacesResult.innerHTML = ''
            currentItem.faces = null
            divFacesInput.disabled = true
            
            divPeriodosInput.value = ''
            divPeriodosResult.innerHTML = ''
            currentItem.periodQuant = null
            divPeriodosInput.disabled = true
            
            divVeiculacaoTabInput.value = ''
            divVeiculacaoTabResult.innerHTML = ''
            currentItem.tabValue = null
            divVeiculacaoTabInput.disabled = true
            
            divVeiculacaoNegInput.value = ''
            divVeiculacaoNegResult.innerHTML = ''
            currentItem.negValue = null
            divVeiculacaoNegInput.disabled = true
            
            divProducaoInput.value = ''
            divProducaoResult.innerHTML = ''
            currentItem.production = null
            divProducaoInput.disabled = true
        } else {
            currentItem.isMediaKit = false
            selectPeriodo.disabled = false
            addFormato.disabled = false
            divFacesInput.disabled = false
            divPeriodosInput.disabled = false
            divVeiculacaoTabInput.disabled = false
            divVeiculacaoNegInput.disabled = false
            divProducaoInput.disabled = false
        }
    }
    function resetarProposta() {
        proposta = new Proposta
        currentItem = new ItemProposta
        clienteInputInput.value = ''
        showClienteValue.innerHTML = ''
        ACInputInput.value = ''
        showACValue.innerHTML = ''
        campanhaInputInput.value = ''
        showCampanhaValue.innerHTML = ''
        employeeInput.value = ''
        showExecutivoValue.innerHTML = ''
        agenciaCheck.checked = false
        agenciaNameInput.disabled = true
        agenciaNameInput.value = ''
        showAgenciaNameValue.innerHTML = ''
        agenciaComissaoInput.disabled = true
        agenciaComissaoInput.value = ''
        showAgenciaTaxValue.innerHTML = ''
        renderizarProposta()
    }
    function gerarProposta(button) {
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
                    // alertGenerate(body, 'Proposta gerada com sucesso').focus()
                    // painelPropostas()
                    sending = false
                    fileIdProvisorio = data
                    button.innerHTML = 'Gerar Proposta'
                    resetarProposta()
                    $(`#okModal`).modal('show')
                })
            }
        })
    }

    let fileIdProvisorio;
    let proposta = new Proposta()
    let currentItem = new ItemProposta()

    let painelPropostasOpt = document.querySelector('#painelPropostasOpt')
    let novaPropostaOpt = document.querySelector('#novaPropostaOpt')
    novaPropostaOpt.classList.add('select')
    painelPropostasOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    // Modal provisório
    let okModal = document.createElement('div')
    okModal.className = 'modal fade'
    okModal.id = `okModal`
    okModal.tabIndex = '-1'
    okModal.ariaLabel = `exampleModal`
    okModal.ariaHidden = true
    okModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal">Proposta Cadastrada com Sucesso</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <button class="btn btn-warning" id="okModalDownload">Download PDF</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
    `
    body_content.appendChild(okModal)
    
    let pdfDownloadBt = document.querySelector('#okModalDownload')
    pdfDownloadBt.addEventListener('click', () => {
        if (fileIdProvisorio) {
            window.open(`/painel/propostas/pdfview/${fileIdProvisorio}.pdf`)
        }
    })


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
        //divAddItemBookShowText.innerHTML = e.target.value
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

    let divBlankData = document.createElement('div')
    divBlankData.className = 'divBlankData'
    let divIsBlankData = document.createElement('div')
    divIsBlankData.className = 'isBlankDiv'
    let divBlankValueCheck = document.createElement('div')
    divBlankValueCheck.className = 'form-check form-switch divAgenciaCheck'
    let isBlankValueCheck = document.createElement('input')
    isBlankValueCheck.type = 'checkbox'
    isBlankValueCheck.className = 'form-check-input'
    isBlankValueCheck.id = 'isBlankValueCheck'
    isBlankValueCheck.checked = false
    isBlankValueCheck.addEventListener('click', (e) => {
        if (e.target.checked == false) {
            isMediaKitCheck.checked = false
            isMediaKitCheck.disabled = true
            isMediaKitLabel.style.color = 'gray'
            resetAndBlockItemValues(false)
        } else {
            isMediaKitCheck.disabled = false
            isMediaKitLabel.style.color = 'black'
            resetAndBlockItemValues(true)
        }
    })
    divBlankValueCheck.appendChild(isBlankValueCheck)
    let isBlankValueLabel = document.createElement('span')
    isBlankValueLabel.innerHTML = 'Deixar valores em branco'
    divIsBlankData.appendChild(divBlankValueCheck)
    divIsBlankData.appendChild(isBlankValueLabel)
    let divIsMediaKit = document.createElement('div')
    divIsMediaKit.className = 'isBlankDiv'
    let divMediaKitCheck = document.createElement('div')
    divMediaKitCheck.className = 'form-check form-switch divAgenciaCheck'
    let isMediaKitCheck = document.createElement('input')
    isMediaKitCheck.type = 'checkbox'
    isMediaKitCheck.className = 'form-check-input'
    isMediaKitCheck.id = 'isMediaKitCheck'
    isMediaKitCheck.disabled = true
    isMediaKitCheck.checked = false
    isMediaKitCheck.addEventListener('click', (e) => {
        e.target.checked == true ? currentItem.isMediaKit = true : currentItem.isMediaKit = false
    })
    divMediaKitCheck.appendChild(isMediaKitCheck)
    let isMediaKitLabel = document.createElement('span')
    isMediaKitLabel.innerHTML = 'Valores no media kit'
    divIsMediaKit.appendChild(divMediaKitCheck)
    divIsMediaKit.appendChild(isMediaKitLabel)
    divBlankData.appendChild(divIsBlankData)
    divBlankData.appendChild(divIsMediaKit)

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
    divAddItem.appendChild(divBlankData)
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
    showCampanhaValue.innerHTML = ''
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
    let propostas = {
        lista: [],
        totalCount: 0
    }
    let queryParams = new QueryParams()
    
    function carregarPropostas() {
        let qp = queryParams
        fetch(
            `/painel/propostas/buscar?filter=${qp.filter}&filter_by=${qp.filter_by}&order_by=${qp.order_by}&guidance=${qp.guidance}&offset=${qp.offset}`
        ).then(response => {
            if (!response.ok) {
                alertGenerate(body, 'Algo deu errado. Tente novamente mais tarde.')
            } else {
                return response.json().then((data) => {
                    propostas.totalCount = data.count
                    data.lista.forEach(item => {
                        let ano = item.proposal_date.substring(0,4)
                        let mes = item.proposal_date.substring(5,7)
                        let dia = item.proposal_date.substring(8,10)
                        let ppDate = `${dia}/${mes}/${ano}`
                        let proposta = new Proposta(
                            item.id,
                            item.user_id,
                            ppDate,
                            item.client,
                            item.clientPerson,
                            item.campaign,
                            item.agencyName,
                            item.agencyTax,
                            item.employeeName,
                            item.items
                        )
                        propostas.lista.push(proposta)
                    })
                    visualizarPropostas()
                    queryParams.offset = propostas.lista.length
                })
            }
        })
    }
    function visualizarPropostas() {
        function propostaLine(proposta) {
            let lineDiv = document.createElement('div')
            lineDiv.className = 'lineDiv'
            let lineDateDiv = document.createElement('div')
            lineDateDiv.className = 'lineField lineDateDiv'
            lineDateDiv.innerHTML = proposta.proposal_date
            lineDiv.appendChild(lineDateDiv)
            let lineClientDiv = document.createElement('div')
            lineClientDiv.className = 'lineField lineClientDiv'
            lineClientDiv.innerHTML = proposta.client
            lineDiv.appendChild(lineClientDiv)
            let lineStatusDiv = document.createElement('div')
            lineStatusDiv.className = 'lineField lineStatusDiv'
            lineStatusDiv.innerHTML = ''
            lineDiv.appendChild(lineStatusDiv)
            let lineOptionsDiv = document.createElement('div')
            lineOptionsDiv.className = 'lineField lineOptionsDiv'
            let viewOpt = document.createElement('button')
            viewOpt.className = 'btn btn-primary lineOpt'
            viewOpt.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-eye-fill btMin" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
            `
            lineOptionsDiv.appendChild(viewOpt)
            let pdfOpt = document.createElement('button')
            pdfOpt.className = 'btn btn-danger lineOpt'
            pdfOpt.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
            </svg>
            `
            lineOptionsDiv.appendChild(pdfOpt)
            let excelOpt = document.createElement('button')
            excelOpt.className = 'btn btn-success lineOpt'
            excelOpt.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z"/>
            </svg>
            `
            lineOptionsDiv.appendChild(excelOpt)
            let deleteOpt = document.createElement('button')
            deleteOpt.className = 'btn btn-dark lineOpt'
            deleteOpt.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill btMin" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
            `
            lineOptionsDiv.appendChild(deleteOpt)
            lineDiv.appendChild(lineOptionsDiv)

            return lineDiv
        }
        for (let i = queryParams.offset; i < propostas.lista.length; i++) {
            divLista.appendChild(propostaLine(propostas.lista[i]))
        }
        verMaisBt()
    }
    function verMaisBt() {
        verMaisDiv.innerHTML = ''
        if (propostas.lista.length > 0) {
            if (propostas.lista.length >= propostas.totalCount) {
                let nadaMaisText = document.createElement('p')
                nadaMaisText.className = 'nadaMaisText'
                nadaMaisText.innerHTML = 'Não há mais registros'
                verMaisDiv.appendChild(nadaMaisText)
            } else {
                let verMaisBtBt = document.createElement('button')
                verMaisBtBt.className = 'btn btn-warning verMaisBtBt'
                verMaisBtBt.innerHTML = 'Ver Mais'
                verMaisBtBt.addEventListener('click', (e) => {
                    carregarPropostas()
                })
                verMaisDiv.appendChild(verMaisBtBt)
            }
        }
    }
    let painelPropostasOpt = document.querySelector('#painelPropostasOpt')
    let novaPropostaOpt = document.querySelector('#novaPropostaOpt')
    painelPropostasOpt.classList.add('select')
    novaPropostaOpt.classList.remove('select')

    let body_content = document.querySelector('#body-content')
    body_content.innerHTML = ''

    let divPainel = document.createElement('div')
    divPainel.className = 'divPainel'
    let divTitle = document.createElement('div')
    divTitle.className = 'lineTitle'
    let divDateTitle = document.createElement('div')
    divDateTitle.className = 'lineField lineDateDiv'
    divDateTitle.innerHTML = 'Data'
    divTitle.appendChild(divDateTitle)
    let divClientTitle = document.createElement('div')
    divClientTitle.className = 'lineField lineClientDiv'
    divClientTitle.innerHTML = 'Cliente'
    divTitle.appendChild(divClientTitle)
    let divStatusTitle = document.createElement('div')
    divStatusTitle.className = 'lineField lineStatusDiv'
    divStatusTitle.innerHTML = 'Status'
    divTitle.appendChild(divStatusTitle)
    let divOptionsTitle = document.createElement('div')
    divOptionsTitle.className = 'lineField lineOptionsDiv'
    divOptionsTitle.innerHTML = 'Opções'
    divTitle.appendChild(divOptionsTitle)
    let divLista = document.createElement('div')
    divLista.className = 'divLista'
    let verMaisDiv = document.createElement('div')
    verMaisDiv.className = 'verMaisDiv'
    divPainel.appendChild(divTitle)
    divPainel.appendChild(divLista)
    divPainel.appendChild(verMaisDiv)
    body_content.appendChild(divPainel)

    carregarPropostas()

}