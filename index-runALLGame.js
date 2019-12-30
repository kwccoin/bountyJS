function runALLGame() {

    console.log("\n\n imperative <=== Ia \n")
    require('./myJS/cardA-impertive.js')

    console.log("\n\n imperative and run as a variable <--- Ib\n")
    var oneGame = require('./myJS/cardA-impertive.js');
    oneGame();

    console.log("\n\n OO run it as a Class <=== Oa \n")
    require('./myJS/cardB-OO.js')

    console.log("\n\n OO store it as variables to run it <--- Ob\n")
    oneGame = require('./myJS/cardB-OO.js');
    new oneGame();

    console.log("\n\n FP 8 cards <=== FP8 \n")
    require('./myJS/cardC-FP-1-8cards.js')

    console.log("\n\n FP 13 cards <--- FP13 \n")
    require('./myJS/cardC-FP-1-13cards.js')

    //console.log("\n\nstore it as variables then run it <---\n")
    //oneGame = require('./myJS/cardC-FP-1.js');
    //oneGame(); 
};

runALLGame()

module.exports = runALLGame;