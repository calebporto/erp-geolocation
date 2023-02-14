import { alertGenerate, lang, body } from './patternFunctions.js'

export var kmlToExcel = function() {
    let kmlOpt = document.querySelector('#kmlOpt')
    kmlOpt.classList.add('select')
    
    let bodyContent = document.querySelector('#body-content')
    bodyContent.innerHTML = ''

    let divConverterItems = document.createElement('div')
    divConverterItems.className = 'criar-items'
    divConverterItems.id = "divConverterItems"
    
    let divConverterInput = document.createElement('div')
    divConverterInput.className = 'criar-input'

    fetch(`/painel/conversor/kml?lang=${lang}`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível concluir a solicitação. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then((textContent) => {
                let labelFileInput = document.createElement('p')
                labelFileInput.innerHTML = textContent.legenda1
                divConverterInput.appendChild(labelFileInput)
                
                let fileInput = document.createElement('input')
                fileInput.type = 'file'
                fileInput.accept = '.kml'
                fileInput.name = 'arquivo'
                fileInput.id = 'arquivo'
                fileInput.required = true
                divConverterInput.appendChild(fileInput)
                
                let descriptionFileInput = document.createElement('p')
                descriptionFileInput.className = 'description'
                descriptionFileInput.innerHTML = textContent.legenda2
                divConverterInput.appendChild(descriptionFileInput)
                
                divConverterItems.append(divConverterInput)

                let divConverterBt = document.createElement('div')
                divConverterBt.className = 'criar-bt'
            
                let buttonConverterBt = document.createElement('button')
                buttonConverterBt.className = 'gold-bt'
                buttonConverterBt.innerHTML = textContent.converterBt
                buttonConverterBt.addEventListener('click', () => {
                    buttonConverterBt.innerHTML = `
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    `
                    if (fileInput.files.length == 0) {
                        if (lang == 'es' || lang == 'es-ar') {
                            alertGenerate(body, 'Seleccione um archivo KML.')
                        } else if (lang == 'en') {
                            alertGenerate(body, 'Select a KML file.')
                        } else {
                            alertGenerate(body, 'Selecione um arquivo KML.')
                        }
                        kmlToExcel()
                        return
                    }
                    if (fileInput.files.length != 1) {
                        alertGenerate(body, 'Selecione somente 1 arquivo.')
                        kmlToExcel()
                        return
                    }
                    let arquivo = new FormData()
                    arquivo.append('arquivo', fileInput.files[0])
                    arquivo.append('lang', lang)
                    fetch('/painel/conversor/kml', {
                        method: 'POST',
                        body: arquivo
                    })
                    .then(function(response) {
                        if (!response.ok) {
                            alertGenerate(body, 'Erro no servidor. Tente novamente.')
                            kmlToExcel()
                            return
                        } else {
                            return response.json()
                            .then((data) => {
                                if (data.message) {
                                    data.message.forEach(element => {
                                        alertGenerate(body, element)
                                    });
                                }
                                kmlToExcel()
                                if (data.data) {
                                    window.open(`/painel/conversor/kml/download/${data.data}`)
                                }
                            })
                        }
                    })
                })
                
                divConverterBt.appendChild(buttonConverterBt)
                divConverterItems.append(divConverterBt)
                bodyContent.appendChild(divConverterItems)
            })
        }
    })
}