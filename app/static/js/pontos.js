import { importarZip, importarPontos, listaPontos, mapaPontos } from "./pontosFunctions.js"

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
                
                let mapaPontosOpt = document.createElement('div')
                mapaPontosOpt.id = 'mapaPontosOpt'
                mapaPontosOpt.className = "body-header-opt"
                mapaPontosOpt.innerHTML = texts.mapa
                mapaPontosOpt.addEventListener('click', () => {
                    mapaPontos()
                })
                bodyHeader.appendChild(mapaPontosOpt)
                
                let importarZipOpt = document.createElement('div')
                importarZipOpt.id = 'importarZipOpt'
                importarZipOpt.className = "body-header-opt"
                importarZipOpt.innerHTML = texts.importarZip
                importarZipOpt.addEventListener('click', () => {
                    importarZip()
                })
                bodyHeader.appendChild(importarZipOpt)

                let importarPontosOpt = document.createElement('div')
                importarPontosOpt.id = 'importarPontosOpt'
                importarPontosOpt.className = "body-header-opt"
                importarPontosOpt.innerHTML = texts.importar
                importarPontosOpt.addEventListener('click', () => {
                    importarPontos()
                })
                bodyHeader.appendChild(importarPontosOpt)

                listaPontos()
            })
        }
    })
}

window.onload = pontosOpt()