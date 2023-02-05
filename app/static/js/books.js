import { criarBooks, listaBooks } from "./booksFunctions.js"

export var booksOpt = function() {
    fetch(`/painel/books?arg=top-menu`)
    .then(response => {
        if (!response.ok) {
            alertGenerate(body, 'Não foi possível carregar os dados. Verifique a sua conexão e tente novamente.')
        } else {
            return response.json()
            .then(texts => {
                let booksOptBt = document.querySelector('#books')
                booksOptBt.style.fontWeight = 'bold'
                booksOptBt.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'

                let bodyHeader = document.querySelector('#body-header')
                bodyHeader.innerHTML = ''

                let bodyContent = document.querySelector('#body-content')
                bodyContent.innerHTML = ''

                let listaBooksOpt = document.createElement('div')
                listaBooksOpt.id = 'listaBooksOpt'
                listaBooksOpt.className = "body-header-opt"
                listaBooksOpt.innerHTML = texts.lista
                listaBooksOpt.addEventListener('click', () => {
                    listaBooks()
                })
                bodyHeader.appendChild(listaBooksOpt)
                
                let criarBooksOpt = document.createElement('div')
                criarBooksOpt.id = 'criarBooksOpt'
                criarBooksOpt.className = "body-header-opt"
                criarBooksOpt.innerHTML = texts.criar
                criarBooksOpt.addEventListener('click', () => {
                    criarBooks()
                })
                bodyHeader.appendChild(criarBooksOpt)

                listaBooks()
            })
        }
    })
}

window.onload = booksOpt()