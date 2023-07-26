import { importarZip, importarPontos, listaPontos, mapaPontos } from "./pontosFunctions.js"

export var propostasOpt = function() {
    fetch(`/painel/propostas?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let propostasOptBt = document.querySelector('#propostas')
                propostasOptBt.style.fontWeight = 'bold'
                propostasOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let painelPropostasOpt = document.createElement('div')
                painelPropostasOpt.id = 'painelPropostasOpt'
                painelPropostasOpt.className = "body-header-opt"
                painelPropostasOpt.innerHTML = texts.painel
                painelPropostasOpt.addEventListener('click', () => {
                    painelPropostas()
                })
                bodyHeader.appendChild(painelPropostasOpt)
                
                let novaPropostaOpt = document.createElement('div')
                novaPropostaOpt.id = 'novaPropostaOpt'
                novaPropostaOpt.className = "body-header-opt"
                novaPropostaOpt.innerHTML = texts.nova
                novaPropostaOpt.addEventListener('click', () => {
                    novaProposta()
                })
                bodyHeader.appendChild(novaPropostaOpt)

                painelPropostas()
            })
        }
    })
}

window.onload = propostasOpt()