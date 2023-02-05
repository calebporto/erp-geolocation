function alertGenerate(parentElement, text) {
    let alert = document.createElement('div')
        alert.className = 'alert alert-warning alert-dismissible fade show'
        alert.role = 'alert'
        alert.innerHTML = `
            ${text}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `
        
        parentElement.insertAdjacentElement('afterbegin', alert)
}

var email = document.querySelector('#email')
var senha = document.querySelector('#senha')
var loginBt = document.querySelector('#login-bt')
var loginBox = document.querySelector('#login-box')
var form = document.querySelector('#login-form')

loginBt.addEventListener('click', (event) => {
    event.preventDefault()
    if (!email.value || !email.value.includes('@') || !email.value.includes('.') || email.value.length < 8){
        alertGenerate(loginBox, 'Forneça um e-mail válido.')
    } else if (!senha.value) {
        alertGenerate(loginBox, 'Forneça uma senha válida.')
    } else if (senha.value.length < 8) {
        alertGenerate(loginBox, 'Sua senha deve conter ao menos 8 caracteres.')
    } else {
        form.submit()
    }
})