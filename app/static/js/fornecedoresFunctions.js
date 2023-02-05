import { alertGenerate, lang, body } from './patternFunctions.js'

var fornecedores = []

export var listaFornecedores = function() {
    let listaFornecedoresOpt = document.querySelector('#listaFornecedoresOpt')
    let novoFornecedorOpt = document.querySelector('#novoFornecedorOpt')
    listaFornecedoresOpt.classList.add('select')
    novoFornecedorOpt.classList.remove('select')
}
export var novoFornecedor = function() {
    let listaFornecedoresOpt = document.querySelector('#listaFornecedoresOpt')
    let novoFornecedorOpt = document.querySelector('#novoFornecedorOpt')
    novoFornecedorOpt.classList.add('select')
    listaFornecedoresOpt.classList.remove('select')

    
}