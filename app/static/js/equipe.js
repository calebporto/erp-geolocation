import { listaColaboradores, novoColaborador } from "./equipeFunctions.js"

export var equipeOpt = function() {
    fetch(`/painel/equipe?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let equipeOptBt = document.querySelector('#equipe')
                equipeOptBt.style.fontWeight = 'bold'
                equipeOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let listaOpt = document.createElement('div')
                listaOpt.id = 'listaOpt'
                listaOpt.className = "body-header-opt"
                listaOpt.innerHTML = texts.lista
                listaOpt.addEventListener('click', () => {
                    listaColaboradores()
                })
                bodyHeader.appendChild(listaOpt)
                
                let novoOpt = document.createElement('div')
                novoOpt.id = 'novoOpt'
                novoOpt.className = "body-header-opt"
                novoOpt.innerHTML = texts.novo
                novoOpt.addEventListener('click', () => {
                    novoColaborador()
                })
                bodyHeader.appendChild(novoOpt)

                listaColaboradores()
            })
        }
    })
}

window.onload = equipeOpt()