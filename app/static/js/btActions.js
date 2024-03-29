var pontosOption = document.querySelector('#pontos')
pontosOption.addEventListener('click', () => {
    window.location.href = '/painel/pontos'
})

var booksOption = document.querySelector('#books')
booksOption.addEventListener('click', () => {
    window.location.href = '/painel/books'
})

var propostasOption = document.querySelector('#propostas')
propostasOption.addEventListener('click', () => {
    window.location.href = '/painel/propostas'
})

var fornecedoresOption = document.querySelector('#fornecedores')
fornecedoresOption.addEventListener('click', () => {
    window.location.href = '/painel/fornecedores'
})

var clientesOption = document.querySelector('#clientes')
clientesOption.addEventListener('click', () => {
    window.location.href = '/painel/clientes'
})

var conversorOption = document.querySelector('#conversor')
conversorOption.addEventListener('click', () => {
    window.location.href = '/painel/conversor'
})
var equipeOption = document.querySelector('#equipe')
equipeOption.addEventListener('click', () => {
    window.location.href = '/painel/equipe'
})

var ptBt = document.querySelector('#ptBt')
ptBt.addEventListener('click', () => {
    window.location.href = '/painel?select-lang=pt-br'
})

var esBt = document.querySelector('#esBt')
esBt.addEventListener('click', () => {
    window.location.href = '/painel?select-lang=es'
})

var enBt = document.querySelector('#enBt')
enBt.addEventListener('click', () => {
    window.location.href = '/painel?select-lang=en'
})