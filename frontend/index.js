document.addEventListener("DOMContentLoaded", function(){
    AppController.displayWelcome()
    




})

class AppController {
    static displayWelcome() {
        const wrapper = document.getElementsByClassName('wrapper')[0]
        
        const newGameDiv = document.createElement('div')
        newGameDiv.setAttribute('class', 'button')
        newGameDiv.innerText = "New Game"
        wrapper.appendChild(newGameDiv)

        const viewStatsDiv = document.createElement('div')
        viewStatsDiv.setAttribute('class', 'button')
        viewStatsDiv.innerText = "View Statistics"
        wrapper.appendChild(viewStatsDiv)

        // Event Listeners for buttons 

        newGameDiv.addEventListener('click', function(){

        })

        viewStatsDiv.addEventListener('click', function() {

        })
    }

    static displayStatistics() {

    }

    static startNewGame() {

    }

    static clearWrapperContent() {
        const wrapper = document.getElementsByClassName('wrapper')[0]
        const content = wrapper.getElementsByTagName('div') 

        for (let i = content.length - 1; i >=0 ; i--) {
            content[0].parentNode.removeChild(content[0])
        }
    }
}

class Game {
    constructor(player1, player2) {
        this.human = player1 
        this.computer = player2 
        this.deck = new Deck 
    }

}

class Player {
    constructor() {
        this.currentHand = []
        this.stats = new Statistics
    }
}

class Statistics {
    constructor() {
        this.wins = 0
        this.losses = 0
        this.bustCount = 0
    }

    postStats(player) {

    }

    fetchStats(player) {

    }

    displayStatsPage() {

    }
}

class Deck {
    dealCard(player) {

    }

    newRound(player1, player2) {

    }

    endRound(player1, player2) {

    }

    allCards = [
        {
            value: "Ace",
            suit: "Spades",
            available: true 
        },
        {
            value: "Two",
            suit: "Spades",
            available: true 
        },
        {
            value: "Three",
            suit: "Spades",
            available: true 
        },
        {
            value: "Four",
            suit: "Spades",
            available: true 
        },
        {
            value: "Five",
            suit: "Spades",
            available: true 
        },
        {
            value: "Six",
            suit: "Spades",
            available: true 
        },
        {
            value: "Seven",
            suit: "Spades",
            available: true 
        },
        {
            value: "Eight",
            suit: "Spades",
            available: true 
        },
        {
            value: "Nine",
            suit: "Spades",
            available: true 
        },
        {
            value: "Ten",
            suit: "Spades",
            available: true 
        },
        {
            value: "Jack",
            suit: "Spades",
            available: true 
        },
        {
            value: "Queen",
            suit: "Spades",
            available: true 
        },
        {
            value: "King",
            suit: "Spades",
            available: true 
        },

        {
            value: "Ace",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Two",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Three",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Four",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Five",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Six",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Seven",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Eight",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Nine",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Ten",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Jack",
            suit: "Clubs",
            available: true 
        },
        {
            value: "Queen",
            suit: "Clubs",
            available: true 
        },
        {
            value: "King",
            suit: "Clubs",
            available: true 
        },

        {
            value: "Ace",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Two",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Three",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Four",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Five",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Six",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Seven",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Eight",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Nine",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Ten",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Jack",
            suit: "Hearts",
            available: true 
        },
        {
            value: "Queen",
            suit: "Hearts",
            available: true 
        },
        {
            value: "King",
            suit: "Hearts",
            available: true 
        },

        {
            value: "Ace",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Two",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Three",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Four",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Five",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Six",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Seven",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Eight",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Nine",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Ten",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Jack",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "Queen",
            suit: "Diamonds",
            available: true 
        },
        {
            value: "King",
            suit: "Diamonds",
            available: true 
        }       
    ]

}