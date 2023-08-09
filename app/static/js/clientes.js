import { listaClientes, novoCliente } from './clientesFunctions.js'

export var clientesOpt = function() {
    fetch(`/painel/clientes?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let clientesOptBt = document.querySelector('#clientes')
                clientesOptBt.style.fontWeight = 'bold'
                clientesOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let listaOpt = document.createElement('div')
                listaOpt.id = 'listaOpt'
                listaOpt.className = "body-header-opt"
                listaOpt.innerHTML = texts.lista
                listaOpt.addEventListener('click', () => {
                    listaClientes()
                })
                bodyHeader.appendChild(listaOpt)
                
                let novoOpt = document.createElement('div')
                novoOpt.id = 'novoOpt'
                novoOpt.className = "body-header-opt"
                novoOpt.innerHTML = texts.novo
                novoOpt.addEventListener('click', () => {
                    novoCliente()
                })
                bodyHeader.appendChild(novoOpt)

                listaClientes()
            })
        }
    })
}

window.onload = clientesOpt()