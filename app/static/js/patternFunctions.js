export var lang = document.getElementsByTagName('html')[0].getAttribute('lang')
export var body = document.querySelector('#body')

export function alertGenerate(parentElement, text) {
    let alert = document.createElement('div')
        alert.className = 'alert alert-warning alert-dismissible fade show'
        alert.role = 'alert'
        alert.focus()
        alert.innerHTML = `
            ${text}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `
        
        parentElement.insertAdjacentElement('afterbegin', alert)
}