import { kmlToExcel } from "./conversorFunctions.js"

export var conversorOpt = function() {
    fetch(`/painel/conversor?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let conversorOptBt = document.querySelector('#conversor')
                conversorOptBt.style.fontWeight = 'bold'
                conversorOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let kmlOpt = document.createElement('div')
                kmlOpt.id = 'kmlOpt'
                kmlOpt.className = "body-header-opt"
                kmlOpt.innerHTML = texts.kml
                kmlOpt.addEventListener('click', () => {
                    kmlToExcel()
                })
                bodyHeader.appendChild(kmlOpt)

                kmlToExcel()
            })
        }
    })
}

window.onload = conversorOpt()