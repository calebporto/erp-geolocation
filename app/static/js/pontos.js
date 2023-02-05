import { criarPontos, importarPontos, listaPontos } from "./pontosFunctions.js"

export var pontosOpt = function() {
    fetch(`/painel/pontos?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let pontosOptBt = document.querySelector('#pontos')
                pontosOptBt.style.fontWeight = 'bold'
                pontosOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let listaPontosOpt = document.createElement('div')
                listaPontosOpt.id = 'listaPontosOpt'
                listaPontosOpt.className = "body-header-opt"
                listaPontosOpt.innerHTML = texts.lista
                listaPontosOpt.addEventListener('click', () => {
                    listaPontos()
                })
                bodyHeader.appendChild(listaPontosOpt)
                
                let importarPontosOpt = document.createElement('div')
                importarPontosOpt.id = 'importarPontosOpt'
                importarPontosOpt.className = "body-header-opt"
                importarPontosOpt.innerHTML = texts.importar
                importarPontosOpt.addEventListener('click', () => {
                    importarPontos()
                })
                bodyHeader.appendChild(importarPontosOpt)

                importarPontos()
            })
        }
    })
}

window.onload = pontosOpt()