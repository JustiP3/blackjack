document.addEventListener("DOMContentLoaded", function(){
    AppController.displayWelcome()
    let h1 = document.getElementsByTagName('h1')[0]

    h1.addEventListener('click', function(){
        h1.remove()
    })
})

class AppController {
    static displayWelcome() {
        const wrapper = document.getElementsByClassName('wrapper')[0]
        const newGameDiv = document.createElement('div')
        newGameDiv.setAttribute('class', 'button')
        newGameDiv.innerText = "New Game"
        wrapper.appendChild(newGameDiv)
    }
}

class Game {

}

class Player {

}

class Statistics {

}