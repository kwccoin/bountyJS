// from node card0-impertive.js
// refactoring by stages 
// - stage a : (try to remove mutation) just move logging so no mutation in the fuction
// - stage b : (make popRandom () pure) avoid play Random using in place mutation array splice 
// - stage c : (make payEqual () pure) 
// - stage d : (extract winMessage) try to avoid logic in display message
// - stage e : (combine end message) 
// - stage f : (combine sate vars into one)
// - stage g : (creat a nextState()) basically it is generalisd to nextState( current state) 
// - stage h : (create a turn message) 
// - stage i : (store states in an array)
// - stage j : (split into runGame() and report())
// - stage k : (using recursion instead of loop)

// the competition card is discarded as in wiki: https://en.wikipedia.org/wiki/Goofspiel
// total score can be less if there are equal card and the value was droped

function without(arr, value){                                
    const index = arr.indexOf(value);                        
    return [...arr.slice(0, index), ...arr.slice(index+1)];  
}

function winMessage(playerScores) {
    if (playerScores[0] == playerScores[1]) {
        return "PLayer Tie.\n";
    } else if (playerScores[0] > playerScores[1]) {
        return "PLayer 0 Wins!\n";
    } else {
        return "PLayer 1 Wins!\n";
    }
}

function scoreMessage(playerScores){
    return `Scores: ${playerScores[0]} v ${playerScores[1]}`;
}

function endMessage(playerScores){
    return scoreMessage(playerScores) + "\n" + 
           winMessage(playerScores);
}

function turnMessage(state){ 
       return   `--------------------------------\n`+
            // status +
           ` Turn ${state.turn}:`+ 
            `\n\t  (-- last Bounty Cards  : ${state.lastBountyCard},) ` +
            `\n\t  (-- last Playing Cards : ${state.lastPlayingCards[0]} and ${state.lastPlayingCards[1]},) ` +
            `\n\t  current player Scores  : ${state.playerScores[0]} and ${state.playerScores[1]}, ` +
            `\n\t  remaining bounty Cards : ${state.bountyCards}, ` +
            `\n\t  on hand player Cards   : ${state.playerCards[0]} and ${state.playerCards[1]}. ` 
}

function report(states, onTurn, onEnd){
    return states.map(onTurn).join("\n")+"\n"+
        onEnd(last(states).playerScores) // last(states) not lastState
}

function newScore(playerScores, playerCards, bountyCard){
    if (playerCards[0] > playerCards[1]) {
            return [playerScores[0]+bountyCard, playerScores[1]]; //  not + 1
        } else if (playerCards[0] < playerCards[1]){
            return [playerScores[0]  ,  playerScores[1]+bountyCard]; //  not + 1
        } else {
            return [playerScores[0]  ,  playerScores[1]]  // need this to return otherwise no state when card is equal (not needed under OO and imperative)
          }
}

function nextState(state) {

        const bountyCard = selectRandom(state.bountyCards);  
    
        const card0 = playRandomStrategy(state.playerCards[0], bountyCard);
        const card1 = playEqualStrategy(state.playerCards[1], bountyCard);
    
        return {turn: state.turn + 1,
                bountyCards: without(state.bountyCards, bountyCard),
                playerCards: [without(state.playerCards[0], card0),  // need card0
                              without(state.playerCards[1], card1)], // need card1
                lastBountyCard: bountyCard, 
                lastPlayingCards : [card0, card1],
                playerScores: newScore(state.playerScores, 
                                       [card0, card1],
                                       bountyCard) // need bountyCard1
        }
}

function recur(states, stateChange, endCondition){
    if(endCondition(last(states))){ // missing one ) in the code
        return states;
    } else {
        return recur(states.concat(stateChange(last(states))),stateChange, endCondition); // lastState should be last(states) and the function recur need 3 parameters not 1 parameter
    }
}

function runGame() {
    let states = [{ turn : 0,
                  bountyCards :  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                  playerCards : [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
                  lastBountyCard: 0,         // need this to help logging 
                  lastPlayingCards : [0, 0], // need this to help logging 
                  playerScores : [0, 0]}] 

    return recur(states, nextState, function(state){
                 return state.bountyCards.length == 0; // not > 0 
                 });
    
}


console.log(report(runGame(), turnMessage, endMessage));


function last(arr){
    return arr[arr.length - 1];
}

function selectRandom(arr){ 
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function playRandomStrategy(playerCards, bountyCard){
    const card = selectRandom(playerCards); 
    return card;
}

function playEqualStrategy(playerCards, bountyCard){
    return bountyCard;
}


module.exports = runGame; // for running under external call