

STATS -
On new game - POST a new game on the backend for player 1 and player 2
At the end of the round - PATCH to update current session stats 

DISPLAY 
-Show All time wins/losses/bustCount for Computer and Human (reduce all games to total count)
-(optional) - show recent games 


evaluatepoints will not work right now if a user has more than one ace


garbage collection question
-if i remove buttons every round and replace them will i be recreating buttons?
-does remove() from the DOM remove that variable from memory?


when playing through the game loop multiple times
-index.js:525 Uncaught TypeError: Cannot set property 'available' of undefined
    at Deck.dealCard (index.js:525)
    at Deck.newRound (index.js:534)
    at Game.newRound (index.js:128)
    at Game.phaseOneHuman (index.js:118)
    at HTMLButtonElement.<anonymous> (index.js:376)


#<ActiveRecord::StatementInvalid: SQLite3::BusyException: database is locked>
 - SQLLite3 was not designed for concurrent db acess 

