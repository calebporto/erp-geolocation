import { novoFornecedor, listaFornecedores } from "./fornecedoresFunctions.js"

export var fornecedoresOpt = function() {
    fetch(`/painel/fornecedores?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let fornecedoresOptBt = document.querySelector('#fornecedores')
                fornecedoresOptBt.style.fontWeight = 'bold'
                fornecedoresOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let listaFornecedoresOpt = document.createElement('div')
                listaFornecedoresOpt.id = 'listaFornecedoresOpt'
                listaFornecedoresOpt.className = "body-header-opt"
                listaFornecedoresOpt.innerHTML = texts.lista
                listaFornecedoresOpt.addEventListener('click', () => {
                    listaFornecedores()
                })
                bodyHeader.appendChild(listaFornecedoresOpt)
                
                let novoFornecedorOpt = document.createElement('div')
                novoFornecedorOpt.id = 'novoFornecedorOpt'
                novoFornecedorOpt.className = "body-header-opt"
                novoFornecedorOpt.innerHTML = texts.novo
                novoFornecedorOpt.addEventListener('click', () => {
                    novoFornecedor()
                })
                bodyHeader.appendChild(novoFornecedorOpt)

                listaFornecedores()
            })
        }
    })
}

window.onload = fornecedoresOpt()