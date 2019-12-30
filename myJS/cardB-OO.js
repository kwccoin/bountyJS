// node cardB-OO.js

class Deck {
    constructor() {
        this.cards = [1, 2, 3, 4, 5, 6, 7, 8];
    }
    
    popRandom(){
        const index = Math.floor(Math.random() * this.cards.length);
        const value = this.cards[index];
        this.cards.splice(index, 1);
        return value;
    }
    
    remove(cardValue){
        this.cards.splice(this.cards.indexOf(cardValue), 1);
    }
    
    hasCards() {
        return this.cards.length > 0;
    }
}

class Player{
    constructor() {
        this.cards = new Deck();
        this.score = 0;
    }
    
    scorePoint(value){
        this.score +=value;
    }
    
    getScore() {
        return this.score;
    }
}

class RandomPlayer extends Player{
    playCard(scoreCard){
        return this.cards.popRandom();
    }
}

class EqualPlayer extends Player{
    playCard(scoreCard){
        this.cards.remove(scoreCard);
        return scoreCard;
    }
}

class Game {
    constructor() {
        this.players =[new RandomPlayer(), new EqualPlayer()];
        this.scoreCards = new Deck();
        this.turn = 0;
    }
    
    playTurn(){
        const scoreCard = this.scoreCards.popRandom();
        
        console.log(`Turn ${this.turn}: Bounty: ${scoreCard}`);
        
        const card0 = this.players[0].playCard(scoreCard);
        const card1 = this.players[1].playCard(scoreCard);
        
        console.log(`\tP0: ${card0}`);
        console.log(`\tP1: ${card1}`);
        
        if (card0 > card1) {
            this.players[0].scorePoint(scoreCard)
        } else if (card1 > card0){
            this.players[1].scorePoint(scoreCard)
        } else {
            //console.log(`\ncard0 is ${card0}`);
            //console.log(`card1 is ${card1}`);
            console.log("the competition card is discarded")
        }
        
        this.turn += 1;
    }
    
    playGame(){
        while (this.scoreCards.hasCards()){
            this.playTurn();
        }
        
        console.log(`Scores: ${this.players[0].score} v ${this.players[1].score}`)
        
        if (this.players[0].score == this.players[1].score){
            console.log("PLayer Tie.")
        } else if (this.players[0].score > this.players[1].score) {
            console.log("PLayer 0 Wins!")
        } else {
            console.log("PLayer 1 Wins!") 
            }
    }
}

// need these lines to creat the game and run it !!

game = new Game();
game.playGame()

module.exports = Game;