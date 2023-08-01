export var lang = document.getElementsByTagName('html')[0].getAttribute('lang')
export var body = document.querySelector('#body')

export function alertGenerate(parentElement, text) {
    let alert = document.createElement('div')
    alert.className = 'alert alert-warning alert-dismissible fade show'
    alert.role = 'alert'
    alert.tabIndex = 1
    alert.innerHTML = `
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `
    parentElement.insertAdjacentElement('afterbegin', alert)
    return alert
}
export function allFirstUppercase(string) {
    if (!string) return
    let words = string.split(' ')
    let newWords = []
    words.forEach(word => {
        if (word == 'de' || word == 'dos' || word == 'das' || word == 'do' || word == 'da') {
            newWords.push(word)
            return
        }
        let newWord = word.length > 0 ? word[0].toUpperCase() + word.substring(1) : word
        newWords.push(newWord)
    })
    return newWords.join(' ').trim()
}

export function firstAndParagraphUppercase(string) {
    function isAlphabet(char) {
        let alphabet = 'abcdefghijklmnopqrstuvwxyzãáàâéèêíìõóòôú'
        if (alphabet.indexOf(char) != -1 && alphabet.toUpperCase().indexOf(char) != -1) {
            return true
        }
        return false
    }

    if (!string) return
    let newString = ''
    let isAfterPoint = false
    for (let i = 0; i < string.length; i++) {
        if (i == 0) {
            newString = newString + string[i].toUpperCase()
            continue
        }
        if (string[i] == '.' || string[i] == '!' || string[i] == '?') {
            isAfterPoint = true
            newString = newString + string[i]
            continue
            // if (i + 1 < string.length) {
            //     if (isAlphabet(string[i + 1])) {
            //         newString = newString + string[i + 1].toUpperCase()
            //         continue
            //     } else {
            //         newString = newString + string[i + 1]
            //         continue
            //     }
            // }
        }
        if (string[i] == ' ') {
            newString = newString + string[i]
            continue
        }
        if (isAfterPoint) {
            if (isAlphabet(string[i])) {
                newString = newString + string[i].toUpperCase()
                isAfterPoint = false
                continue
            } else {
                newString = newString + string[i]
                continue
            }
        } else {
            newString = newString + string[i]
            continue
        }
    }
    return newString
}