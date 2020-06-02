document.addEventListener("DOMContentLoaded", function(){
    AppController.displayWelcome()

})

class AppController {

    // Logical Program Flow

    static displayWelcome() {
        this.buildNavBar('home')
    }

    static displayStatistics() {        
        this.buildNavBar('stats')
        Statistics.displayStatsPage()
    }

    static startNewGame() {
        this.buildNavBar('game')
        
        const player1 = new Player()
        const player2 = new Player() 
        
        let game = new Game(player1, player2)
        
        game.mainGameLoop() 

        if (game.quitGame === true) {
            game = null    
        }            
        
    }

    // DOM Updates

    static clearWrapperContent() {       
        const wrapper = document.getElementsByClassName('wrapper')[0]
        const content = wrapper.getElementsByTagName('div')          

        while (content.length !== 0) {
            content[0].parentNode.removeChild(content[0])
        }
    }

    static buildNavBar(currentScreen) {         
        // current screens are 'home', 'game', and 'stats'

        const wrapper = document.getElementsByClassName('wrapper')[0]

        const createHomeButton = function() {
            const homeScreen = document.createElement('div')
            homeScreen.setAttribute('class', 'button')
            homeScreen.innerText = "Home"
            wrapper.appendChild(homeScreen)

            homeScreen.addEventListener('click', function(){
                AppController.clearWrapperContent()
                AppController.displayWelcome()
            })
        }
        const createNewGameButton = function() {
            const newGameDiv = document.createElement('div')
            newGameDiv.setAttribute('class', 'button')
            newGameDiv.innerText = "New Game"
            wrapper.appendChild(newGameDiv)

            newGameDiv.addEventListener('click', function(){
                AppController.clearWrapperContent()
                AppController.startNewGame()
            })
        }
        const createStatsButton = function() {
            const viewStatsDiv = document.createElement('div')
            viewStatsDiv.setAttribute('class', 'button')
            viewStatsDiv.innerText = "View Statistics"
            wrapper.appendChild(viewStatsDiv)

            viewStatsDiv.addEventListener('click', function() {
                AppController.clearWrapperContent()
                AppController.displayStatistics()
            })
        }

        if (currentScreen === 'home') {
            createNewGameButton()
            createStatsButton()
        } else if (currentScreen === 'game') {
            createHomeButton()
        } else if (currentScreen === 'stats') {
            createHomeButton()
            createNewGameButton()
        } else {
            console.log("Error: currentScreen options are 'home', 'game', or 'stats'")
        }
    }
}

class Game {

    // Logical Program Flow 

    constructor(player1, player2) {
        this.human = player1 
        this.computer = player2 
        this.deck = new Deck() 
        this.quitGame = false 
    }

    mainGameLoop() {
        this.gameWindow = this.displayGameWindow()
        
        while (this.quitGame === false) {  
            this.newRound()
            //this.takeTurn(this.human)
            //this.computerTurn(this.computer)
        
            this.roundComplete() 
        }
        this.gameOver()
    }

    newRound() {
        this.deck.newRound(this.human, this.computer)
        this.displayNewRound()
    }

    takeTurn(player) {
        // add buttons for hit and stay 
        const buttons = displayTurnControls()
        let stay = false 

        while (stay === false) {
            // draw cards 
            // update DOM after each card draw 
        }

    }

    computerTurn(player) {

    }

    roundComplete() {
        // prompt user to deal again or quit 
        // update this.quitGame 

        this.quitGame = true 
    }

    gameOver() {
        console.log("game over")

        AppController.clearWrapperContent()
        AppController.displayWelcome()
    }

    // DOM Updates 

    displayGameWindow() {
        const wrapper = document.getElementsByClassName('wrapper')[0]

        const gameWindow = document.createElement('div')
        gameWindow.setAttribute('class', 'main-window')

        wrapper.appendChild(gameWindow)
        return gameWindow
    }

    displayNewRound() {
        this.computerCardsContainer = document.createElement('div')
        this.humanCardsContainer = document.createElement('div')        

        this.computerCardsContainer.setAttribute('class', 'player-hand-container')
        this.humanCardsContainer.setAttribute('class', 'player-hand-container')        

        this.displayUpdatePlayerHand(this.computerCardsContainer, this.computer)
        this.displayUpdatePlayerHand(this.humanCardsContainer, this.human)

        this.gameWindow.appendChild(this.computerCardsContainer)
        this.gameWindow.appendChild(this.humanCardsContainer)
        debugger 
    }

    displayUpdatePlayerHand(playerDiv, player) {
        const cards = playerDiv.getElementsByTagName('div')
        while (cards.length !== 0) {
            cards[0].parentNode.removeChild(cards[0])
        }

        for (let i = 0; i < player.currentHand.length; i++) {
            const card = this.buildCard(player.currentHand[i])
            playerDiv.appendChild(card) 
        }
    }

    buildCard(cardObject) {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        
        card.innerText = `${cardObject.value} \n ${cardObject.suit}`
        return card 
    }

    displayTurnControls() {
        // add hit and stay button for player turn 
        return [] // return objects so we can easily delete them later 
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

    static fetchStats(statsWindow) {
        fetch("http://localhost:3000/statistics").then(function(response) {
            return response.json();
        }).then(function(json){

            for (let i = 0; i < json.length; i++) {
                Statistics.buildPlayerStatsContainer(statsWindow, json[i])
            }

        })
    }

    static buildPlayerStatsContainer(container, json) {
        const playerStatsContainer = document.createElement('div')
        playerStatsContainer.setAttribute('class', 'stats-container')

        const statId = document.createElement('h1')
        const winCount = document.createElement('p')
        const lossCount = document.createElement('p')
        const bustCount = document.createElement('p')
        
        statId.innerText = `stat id is ${json.id}`
        winCount.innerText = `Win Count: ${json.win_count}`
        lossCount.innerText = `Loss Count: ${json.loss_count}`
        bustCount.innerText = `Bust Count: ${json.bust_count}`

        playerStatsContainer.appendChild(statId)
        playerStatsContainer.appendChild(winCount)
        playerStatsContainer.appendChild(lossCount)
        playerStatsContainer.appendChild(bustCount)

        container.appendChild(playerStatsContainer)
    }

    static displayStatsPage() {
        const wrapper = document.getElementsByClassName('wrapper')[0]

        const statsWindow = document.createElement('div')
        statsWindow.setAttribute('class', 'main-window')

        this.fetchStats(statsWindow)

        wrapper.appendChild(statsWindow)
    }
}

class Deck {
    dealCard(player) {
        const availableCards = this.allCards.map(function(card) {
            if (card.available === true) {
                return card 
            }
        })
        
        const cardIndex = Math.floor(Math.random() * Math.floor(availableCards.length))

        this.allCards[cardIndex].available = false 
        player.currentHand.push(this.allCards[cardIndex])
    }

    newRound(player1, player2) {
        this.dealCard(player1)
        this.dealCard(player1)
        this.dealCard(player2)
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