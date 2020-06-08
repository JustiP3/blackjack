

STATS -
On new game - POST a new game on the backend for player 1 and player 2
At the end of the round - PATCH to update current session stats 

DISPLAY 
-Show All time wins/losses/bustCount for Computer and Human (reduce all games to total count)
-(optional) - show recent games 


garbage collection question
-if i remove buttons every round and replace them will i be recreating buttons?
-does remove() from the DOM remove that variable from memory?


#<ActiveRecord::StatementInvalid: SQLite3::BusyException: database is locked>
 - SQLLite3 was not designed for concurrent db acess 
 - fixed with asynchronous function calls


 Statistics are not being updated at the end of a round 
 -I think I am passing the wrong ID to update statistics
 -Needs to be id of this game's player statistics not the id of the player 

 when playing through the game loop multiple times
-index.js:525 Uncaught TypeError: Cannot set property 'available' of undefined
    at Deck.dealCard (index.js:525)
    at Deck.newRound (index.js:534)
    at Game.newRound (index.js:128)
    at Game.phaseOneHuman (index.js:118)
    at HTMLButtonElement.<anonymous> (index.js:376)
    -Should be fixed - will continue to monitor 

 ***TODO***
-Display stats in a useful way 
-Make display look nicer
-at beginning of round display a placehold card in dealer's hand
-fix open issues
-if user goes over 21, do not allow them to continue getting cards (BUST!)

***OPEN ISSUES***


-evaluatepoints will not work right now if a user has more than one ace