// make sure you add a script tag into your HTML file [Part 4]
// console.log("in game")

class Game {
    // console.log(this)

    constructor(data){
        this.id = data.id
        this.player = data.attributes.player
        this.board_id = data.attributes.board_id
        this.win = null

        Game.all.push(this)
    }


    // static selectPeg(){

    // }


    // static pickFirstPegRemoved() {

    // }



    // static removePeg(){

    // }

    // static win() {

    // }

    // static loss() {

    // }


    static movesRemaining() {
        let movesLeft = []
        let trueTiles = Tile.all.filter(tile => tile.active === true);

        trueTiles.forEach(tile => {
            let arrayOptions = tile.options.substr(1, tile.options.length-2).split(", ")
            //=> [4,13]            
            let arrayRemoves = tile.removes.substr(1, tile.removes.length-2).split(", ")
            //=> [7,12]

            arrayRemoves.forEach(num => {
                //=> num = 12
                let removeTile = Tile.findById(`peg${num}`) //=> Tile 12
                let indexRemove = arrayRemoves.indexOf(`${num}`) //=> 1

                let indexOptions = arrayOptions[indexRemove] //=> 13
                let optionTile = Tile.findById(`peg${indexOptions}`) //=> Tile 13

                if ((removeTile.active === true) && (optionTile.active === false)) {
                    movesLeft.push(tile)
                }
            })
        })
        return movesLeft.length
    }


    static checkGameResult() {
        let outcome = ""
        let trueTiles = Tile.all.filter(tile => tile.active === true).length

        if (trueTiles === 1) {
            alert("CONGRATS! You win! ")
            console.log("GAME OVER - WON")
            outcome = "WON"
        } else if (Game.movesRemaining() === 0) {
            alert("Sorry, you lost :( ")
            console.log("GAME OVER - LOST")
            outcome = "Loss"
        }
        //document.querySelector("#game-details .move-count").innerText =  `move count: ${moveCount}` 
        document.querySelector("#game-details .game-outcome").innerText =  `Game Over: ${outcome}`






    }






}

Game.all = []
