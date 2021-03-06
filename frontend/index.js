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
        
        const player1 = new Player(1)
        const player2 = new Player(2) 
        
        let game = new Game(player1, player2)
        
        game.newGame() 
      
    }

    // DOM Updates

    static clearWrapperContent() {       
        const wrapper = document.getElementsByClassName('wrapper')[0]
        const divContent = wrapper.getElementsByTagName('div')   
        const buttonContent = wrapper.getElementsByTagName('button')         

        while (divContent.length !== 0) {
            divContent[0].parentNode.removeChild(divContent[0])
        }
        while (buttonContent.length !== 0) {
            buttonContent[0].parentNode.removeChild(buttonContent[0])
        }
    }

    static buildNavBar(currentScreen) {         
        // current screens are 'home', 'game', and 'stats'

        const wrapper = document.getElementsByClassName('wrapper')[0]

        const createHomeButton = function() {
            const homeScreen = document.createElement('button')
            homeScreen.setAttribute('class', 'button')
            homeScreen.innerText = "Home"
            wrapper.appendChild(homeScreen)

            homeScreen.addEventListener('click', function(){
                AppController.clearWrapperContent()
                AppController.displayWelcome()
            })
        }
        const createNewGameButton = function() {
            const newGameDiv = document.createElement('button')
            newGameDiv.setAttribute('class', 'button')
            newGameDiv.innerText = "New Game"
            wrapper.appendChild(newGameDiv)

            newGameDiv.addEventListener('click', function(){
                AppController.clearWrapperContent()
                AppController.startNewGame()
            })
        }
        const createStatsButton = function() {
            const viewStatsDiv = document.createElement('button')
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
    }

    newGame() {   
        this.human.fetchPlayer().then((resp) => {
            if (resp === null) {
                return this.human.fetchCreatePlayer().then((resp) => this.computer.fetchPlayer())
            } else {
                return this.computer.fetchPlayer()
            }            
        })       
        .then((resp) => {
            if (resp === null) {
                return this.computer.fetchCreatePlayer().then((resp) => this.human.stats.newGameCreateStats(this.human))
            } else {
                return this.human.stats.newGameCreateStats(this.human)
            }            
        }).then((resp) => {
            this.human.stats.id = resp.id 
            return this.computer.stats.newGameCreateStats(this.computer)
        }).then((resp) => this.computer.stats.id = resp.id)
        
        this.gameWindow = this.displayGameWindow()

        this.buildTable()
        this.phaseOneHuman() 
    }

    phaseOneHuman() {   
        this.human.currentHand = []
        this.computer.currentHand = []   
                    
        this.newRound()            
        this.takeTurn()        
    }

    phaseTwoComputer() {
        this.computerTurn()   
        this.displayUpdateScoreCards()     
        this.roundComplete()         
    }

    newRound() {        
        this.deck.newRound(this.human, this.computer)
        this.displayNewRound()                  
    }

    takeTurn() {  
        this.displayTurnControls() 
    }

    computerTurn() {
        let points = this.evaluatePoints(this.computer)
        const humanPoints = this.evaluatePoints(this.human)

        if (humanPoints > 21)
        {
            this.deck.dealCard(this.computer)
        } else {
            while (points < 16 && points < humanPoints) {
                this.deck.dealCard(this.computer)
                points = this.evaluatePoints(this.computer)
            }  
        }

        const placeholder = document.getElementsByClassName('placeholder')[0]
        placeholder.remove()

        this.displayUpdatePlayerHand(this.computerCardsContainer, this.computer)
                   
    }

    roundComplete() {
        let winner = this.evaluateWinnerAndUpdateStats()      
        this.displayWinnerAndPrompt(winner)    
    }

    gameOver() {
        console.log("game over")

        AppController.clearWrapperContent()
        AppController.displayWelcome()
    }

    evaluatePoints(player) {
        const pointsAHigh = player.currentHand.reduce((acc, cur) => {
            switch(cur.value) {
                case 'Two':
                    return acc + 2
                case 'Three':
                    return acc + 3
                case 'Four':
                    return acc + 4
                case 'Five':
                    return acc + 5
                case 'Six':
                    return acc + 6
                case 'Seven':
                    return acc + 7
                case 'Eight':
                    return acc + 8
                case 'Nine':
                    return acc + 9
                case 'Ten': 
                    return acc + 10
                case 'Jack':
                    return acc + 10
                case 'Queen':
                    return acc + 10
                case 'King':
                    return acc + 10
                case 'Queen':
                    return acc + 10
                case 'King':
                    return acc + 10
                case 'Ace':
                    return acc + 11                    
                default: 
                    console.log('error: could not calculate the value of one of your cards')
            }
        }, 0)

        // ACES can count as 11 or 1. 
        // Player can have up to 4 aces

        const aces = player.currentHand.filter((x) => x.value === "Ace")

        if (!!player.currentHand.find(x => x.value === "Ace") && pointsAHigh > 21) {
            let pointsALow
            if (aces.length === 1) {

                pointsALow = pointsAHigh - 10 

            } else if (aces.length === 2) {

                if (pointsAHigh - 10 > 21) {
                    pointsALow = pointsAHigh - 20
                } else {
                    pointsALow = pointsAHigh - 10 
                }

            } else if (aces.length === 3) {

                if (pointsAHigh - 20 > 21) {
                    pointsALow = pointsAHigh - 30 
                } else if (pointsAHigh - 10 > 21) {
                    pointsALow = pointsAHigh - 20
                } else {
                    pointsALow = pointsAHigh - 10 
                }

            } else if (aces.length === 4) {

                if (pointsAHigh - 30 > 21) {
                    pointsALow = pointsAHigh - 40 
                } else if (pointsAHigh - 20 > 21) {
                    pointsALow = pointsAHigh - 30
                } else if (pointsAHight - 10 > 21) {
                    pointsALow = pointsAHigh - 20 
                } else {
                    pointsALow = pointsAHigh - 10
                }
            }
            return pointsALow
        } else {
            return pointsAHigh
        }
        
    }

    evaluateWinnerAndUpdateStats() {
        const humanPoints = this.evaluatePoints(this.human)
        const computerPoints = this.evaluatePoints(this.computer)
        let winner = null 

        if (humanPoints > computerPoints && humanPoints <= 21) {
            // human wins 
            winner = this.human
        } else if (computerPoints > humanPoints && computerPoints <= 21) {
            //computer wins
            winner = this.computer 
        } else if (humanPoints > 21 && computerPoints <=21) {
            //computer wins            
            winner = this.computer
        } else if (computerPoints > 21 && humanPoints <=21) {
            // human wins             
            winner = this.human
        } else if (computerPoints > 21 && humanPoints > 21) {
            // nobody wins 
            winner = null 
        } else if (computerPoints === humanPoints) {
            // nobody wins 
            winner = null 
        } else {
            console.log("error: cannot evaluate winner")
        }

        switch (winner) {
            case this.human:
                this.human.stats.wins += 1 
                this.computer.stats.losses += 1 
                break;
            case this.computer: 
                this.computer.stats.wins += 1 
                this.human.stats.losses += 1 
                break;
            case null: 
                this.computer.stats.losses += 1 
                this.human.stats.losses += 1 
                break;
        }

        if (humanPoints > 21) {
            this.human.stats.bustCount += 1
        }

        if (computerPoints > 21) {
            this.computer.stats.bustCount += 1
        }
        
        // UPDATE BACKEND STATS 
        
        this.human.stats.updateStats(this.human).then(() => this.computer.stats.updateStats(this.computer))        

        if (winner === this.human) {
            return "Human"
        } else if (winner === this.computer) {
            return "Computer"
        } else if (winner === null) {
            return "Nobody"
        }
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
        const winnerMessage = this.gameWindow.getElementsByTagName('h2')
        
        while (winnerMessage.length > 0) {
            winnerMessage[0].remove()
        }
        while (this.humanCardsContainer.childNodes.length > 0) {
            this.humanCardsContainer.childNodes[0].remove()
        }
        while (this.computerCardsContainer.childNodes.length > 0) {
            this.computerCardsContainer.childNodes[0].remove()
        }
        while (this.buttonsContainer.childNodes.length > 0) {
            this.buttonsContainer.childNodes[0].remove()
        }     

        const placeholder = document.createElement('div')
        placeholder.setAttribute('class', 'placeholder')
        placeholder.innerText = " \n \n "
        this.computerCardsContainer.appendChild(placeholder)

        this.displayUpdateScoreCards()
        this.displayUpdatePlayerHand(this.computerCardsContainer, this.computer)
        this.displayUpdatePlayerHand(this.humanCardsContainer, this.human)            
    }

    displayUpdatePlayerHand(playerDiv, player) {
        const cards = playerDiv.getElementsByClassName('card')
        const numCardsCurrentlyDisplayed = cards.length 
        for (let i = numCardsCurrentlyDisplayed; i < player.currentHand.length; i++) {
            const card = this.buildCard(player.currentHand[i])
            playerDiv.appendChild(card) 
        }
    }

    displayUpdateScoreCards() {
        const humanPoints = this.evaluatePoints(this.human)
        const computerPoints = this.evaluatePoints(this.computer)

        if (humanPoints > 21) {
            this.humanScoreCard.innerText = 'Human Score: BUST!'
        } else {
            this.humanScoreCard.innerText = `Human Score: ${this.evaluatePoints(this.human)}`
        }
        
        if (computerPoints > 21) {
            this.computerScoreCard.innerText = 'Computer Score: BUST!' 
        } else {
            this.computerScoreCard.innerText = `Computer Score: ${this.evaluatePoints(this.computer)}` 
        }
        
        
    }

    buildCard(cardObject) {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        
        card.innerText = `${cardObject.value} \n `

        switch (cardObject.suit) {
            case "Hearts":
                card.innerHTML += "&hearts;"
                card.classList.add('red-card')
                break;
            case "Diamonds":
                card.innerHTML += "&diams;"
                card.classList.add('red-card')
                break;
            case "Spades":
                card.innerHTML += "&spades;"
                card.classList.add('black-card')
                break;
            case "Clubs": 
                card.innerHTML += "&clubs;"
                card.classList.add('black-card')
                break;
        }

        return card 
    }

    displayTurnControls() {                
        const hitButton = document.createElement('button')
        const stayButton = document.createElement('button')
        
        hitButton.setAttribute('class', 'button')
        stayButton.setAttribute('class', 'button')

        hitButton.innerText = "Hit Me"
        stayButton.innerText = "Stay"

        hitButton.addEventListener('click', () => {
            this.deck.dealCard(this.human)
            this.displayUpdateScoreCards()
            this.displayUpdatePlayerHand(this.humanCardsContainer, this.human)
            if (this.evaluatePoints(this.human) > 21) {
                this.computerTurn()
                this.displayUpdateScoreCards()     
                this.roundComplete()  
            }
        })
        

        stayButton.addEventListener('click', () => {
            this.phaseTwoComputer()       
        })

        this.buttonsContainer.appendChild(hitButton)
        this.buttonsContainer.appendChild(stayButton)        
    }

    displayWinnerAndPrompt(winner) {
        this.displayEndRoundControls()
        const displayWinner = document.createElement('h2')
        displayWinner.innerText = `${winner} wins!`

        this.gameWindow.appendChild(displayWinner)
    }

    displayEndRoundControls() {
        const turnControls = document.getElementsByClassName('button')

        while (turnControls.length > 0) {
            turnControls[0].remove()
        }
       
        const dealAgain = document.createElement('button')
        const quitGame = document.createElement('button')

        dealAgain.innerText = "Deal Again"
        quitGame.innerText = "Quit Game"

        dealAgain.setAttribute('class', 'button')
        quitGame.setAttribute('class', 'button')

        dealAgain.addEventListener('click', () => this.phaseOneHuman())
        quitGame.addEventListener('click', this.gameOver)

        this.buttonsContainer.appendChild(dealAgain)
        this.buttonsContainer.appendChild(quitGame)
    }

    buildTable() {
        this.computerCardsContainer = document.createElement('div')
        this.humanCardsContainer = document.createElement('div')    
        this.buttonsContainer = document.createElement('div')   
        this.humanScoreCard = document.createElement('div')
        this.computerScoreCard = document.createElement('div') 

        this.computerCardsContainer.setAttribute('class', 'player-hand-container')
        this.humanCardsContainer.setAttribute('class', 'player-hand-container')  
        this.buttonsContainer.setAttribute('class', 'player-controls') 
        this.humanScoreCard.setAttribute('class', 'score-card')
        this.computerScoreCard.setAttribute('class', 'score-card')

        this.gameWindow.appendChild(this.computerCardsContainer)
        this.gameWindow.appendChild(this.computerScoreCard)
        this.gameWindow.appendChild(this.humanCardsContainer)
        this.gameWindow.appendChild(this.humanScoreCard)
        this.gameWindow.appendChild(this.buttonsContainer)      
    }
}


class Player {
    constructor(id) {
        this.id = id 
        this.currentHand = []
        this.stats = new Statistics
    }

    fetchPlayer() {
        return fetch(`http://localhost:3000/players/${this.id}`).then((resp) => resp.json()).then((json) => json)        
    }

    fetchCreatePlayer() {
        const configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(this.id)
          }

        return fetch('http://localhost:3000/players', configurationObject).then(function(response) {
            return response.json();
        }).then(function(json){
            return json 
        })
    }
}

class Statistics {

    // Instance Methods 
   
    constructor() { 
        this.id = null 
        this.wins = 0
        this.losses = 0
        this.bustCount = 0
    }    

    newGameCreateStats(player) {
        const configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(player)
        }

        return fetch('http://localhost:3000/statistics', configurationObject).then((response) => {
            return response.json();
        }).then((json) => {
            return json 
        })       
    }
    
    updateStats(player) {
        const configurationObject = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(player)
          }

        return fetch(`http://localhost:3000/statistics/${player.stats.id}`, configurationObject).then(function(response) {
            return response.json();
        }).then(function(json){      
            return json 
        })
    }
    

    // Static Methods 

    static fetchStats(statsWindow) {

        fetch("http://localhost:3000/players/1/statistics").then(function(response) {
            return response.json();
        }).then(function(json){
            const totalHumanData = Statistics.reduceStatsArrayToTotal(json, 1)
            Statistics.buildPlayerStatsContainer(statsWindow, totalHumanData)
            return json 
        }).then(fetch("http://localhost:3000/players/2/statistics")).then(function(response) {
            return response
        }).then(function(json){
            const totalComputerData = Statistics.reduceStatsArrayToTotal(json, 2)
            Statistics.buildPlayerStatsContainer(statsWindow, totalComputerData)
            return json 
        })      
    }

    static buildPlayerStatsContainer(container, totalObj) {
        const playerStatsContainer = document.createElement('div')
        playerStatsContainer.setAttribute('class', 'stats-container')

        const playerName = document.createElement('h1')
        const winCount = document.createElement('p')
        const lossCount = document.createElement('p')
        const bustCount = document.createElement('p')
        const viewStatsDetails = document.createElement('button')
        const hiddenPlayerId = document.createElement('p')

        hiddenPlayerId.setAttribute('hidden', 'true')
        hiddenPlayerId.setAttribute('class', 'hidden-player-id')
        hiddenPlayerId.innerText = `${totalObj.playerId}`

        viewStatsDetails.addEventListener('click', this.viewStatsDetailsEventListener)
        
        if (totalObj.playerId === 1) {
            playerName.innerText = `Overall Human Stats`
        } else if (totalObj.playerId === 2) {
            playerName.innerText = `Overall Computer Stats`
        } else {
            playerName.innerText = `Player ${totalObj.id} Stats`
        }
        
        winCount.innerText = `Win Count: ${totalObj.winCount}`
        lossCount.innerText = `Loss Count: ${totalObj.lossCount}`
        bustCount.innerText = `Bust Count: ${totalObj.bustCount}`
        viewStatsDetails.innerText = 'View Details'

        playerStatsContainer.appendChild(playerName)
        playerStatsContainer.appendChild(winCount)
        playerStatsContainer.appendChild(lossCount)
        playerStatsContainer.appendChild(bustCount)
        playerStatsContainer.appendChild(viewStatsDetails)
        playerStatsContainer.appendChild(hiddenPlayerId)

        container.appendChild(playerStatsContainer)
    }

    static displayStatsPage() {
        const wrapper = document.getElementsByClassName('wrapper')[0]

        const statsWindow = document.createElement('div')
        statsWindow.setAttribute('class', 'main-window')

        this.fetchStats(statsWindow)

        wrapper.appendChild(statsWindow)
    }

    static reduceStatsArrayToTotal(array, id) {
        let totalObj = {
            playerId: id,
            winCount: 0,
            lossCount: 0,
            bustCount: 0
        }

        if (array.length > 0) {
            array.forEach((element) => {    
                totalObj.winCount += element.win_count
                totalObj.lossCount += element.loss_count
                totalObj.bustCount += element.bust_count                
            })
        }
        
        return totalObj
    }

    static deleteStatsEventListener() {
        const tableRow = this.parentElement.parentElement
        const gameId = tableRow.childNodes[0].innerText

        const configurationObject = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        }

        return fetch(`http://localhost:3000/statistics/${gameId}`, configurationObject).then(function(response) {
            return response.json();
        }).then(function(json){  
            const remainingStats = json

            Statistics.generateDetailsTable(remainingStats)
            return json 
        })

    }

    static viewStatsDetailsEventListener() {    
        const playerId = this.parentElement.getElementsByClassName('hidden-player-id')[0].innerText          

        return fetch(`http://localhost:3000/players/${playerId}/statistics`).then(function(response) {
            return response.json();
        }).then(function(json){  
            
            Statistics.generateDetailsTable(json)
            return json 
        })
    }

    static generateDetailsTable(json) {
        const mainWindow = document.getElementsByClassName('main-window')[0]        
        const content = mainWindow.childNodes

        const detailsTable = document.createElement('table')
        const backButton = document.createElement('button')
        const buttonContainer = document.createElement('div')

        backButton.innerText = "Go Back"
        backButton.setAttribute('class', 'button')
        backButton.addEventListener('click', function() {
            AppController.clearWrapperContent()
            AppController.displayStatistics()
        })

        buttonContainer.setAttribute('class', 'player-controls')  
        buttonContainer.appendChild(backButton)

        const generateTable = function (table, data) {
            for (let element of data) {
                const row = table.insertRow()

                const idCell = row.insertCell()
                const winCell = row.insertCell()
                const lossCell = row.insertCell()
                const bustCell = row.insertCell()
                const deleteCell = row.insertCell()

                const idText = document.createTextNode(element['id'])
                const winText = document.createTextNode(element['win_count'])
                const lossText = document.createTextNode(element['loss_count'])
                const bustText = document.createTextNode(element['bust_count'])
                const deleteButton = document.createElement('button')
                
                deleteButton.innerText = "Delete"                  
                deleteButton.addEventListener('click', Statistics.deleteStatsEventListener)
                
                idCell.appendChild(idText)
                winCell.appendChild(winText)
                lossCell.appendChild(lossText)
                bustCell.appendChild(bustText)
                deleteCell.appendChild(deleteButton)
            }
        }
        const generateTableHead = function(table) {
            const thead = table.createTHead();
            const row = thead.insertRow();

            const gameIdTh = document.createElement('th')
            const winTh = document.createElement('th')
            const lossTh = document.createElement('th')
            const bustTh = document.createElement('th')
            const deleteTh = document.createElement('th')

            const gameIdText = document.createTextNode('Game ID')
            const winText = document.createTextNode('Wins') 
            const lossText = document.createTextNode('Losses')
            const bustText = document.createTextNode('Bust Count')
            const deleteText = document.createTextNode('Delete')

            gameIdTh.appendChild(gameIdText)
            winTh.appendChild(winText)
            lossTh.appendChild(lossText)
            bustTh.appendChild(bustText)
            deleteTh.appendChild(deleteText)

            row.appendChild(gameIdTh)
            row.appendChild(winTh)
            row.appendChild(lossTh)
            row.appendChild(bustTh)
            row.appendChild(deleteTh)
        }

        while (content.length > 0) {
            content[0].remove()
        }

        generateTable(detailsTable, json)
        generateTableHead(detailsTable)
        mainWindow.appendChild(buttonContainer)
        mainWindow.appendChild(detailsTable)
    }
}

class Deck {
    dealCard(player) {
        let i = 0 
        let availableCardsIndicies = []
        this.allCards.forEach(function(card) {      
            if (card.available === true) {
                availableCardsIndicies.push(i)
            }     
            i++      
        })    
    
        const cardIndex = Math.floor(Math.random() * availableCardsIndicies.length)
     
        this.allCards[availableCardsIndicies[cardIndex]].available = false 
        player.currentHand.push(this.allCards[availableCardsIndicies[cardIndex]])
    }

    newRound(player1, player2) {        
        this.allCards.forEach((x) => x.available = true)
        
        this.dealCard(player1)
        this.dealCard(player1)
        this.dealCard(player2)
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