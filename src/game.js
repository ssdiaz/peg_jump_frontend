// Add a script tag into your HTML file

class Game {
    constructor(data){
        this.id = data.id
        this.board_id = data.attributes.board_id
        this.moveCount = 0        
        this.win = null

        Game.all.push(this)
    }

    increaseMoveCount() {
        return this.moveCount = this.moveCount + 1
    }

    static findById(id){
        return this.all.find(game => game.id === id)
    }

    static movesRemaining() {
        let movesLeft = []
        let trueTiles = Tile.all.filter(tile => tile.active === true);

        trueTiles.forEach(tile => {
            let arrayOptions = tile.options.substr(1, tile.options.length-2).split(", ")
            let arrayRemoves = tile.removes.substr(1, tile.removes.length-2).split(", ")

            arrayRemoves.forEach(num => {
                let removeTile = Tile.findById(`peg${num}`) 
                let indexRemove = arrayRemoves.indexOf(`${num}`)
                let indexOptions = arrayOptions[indexRemove] 
                let optionTile = Tile.findById(`peg${indexOptions}`)              

                if ((removeTile.active === true) && (optionTile.active === false)) {
                    movesLeft.push(tile)
                }
            })
        })
        return movesLeft.length
    }

    static checkGameResult() {
        let trueTiles = Tile.all.filter(tile => tile.active === true).length

        if (trueTiles === 1) {
            alert("CONGRATS! You won!")
            console.log("GAME OVER - WON")
            this.win = true

            return "game over"
        } else if (Game.movesRemaining() === 0) {
            alert("Sorry, you lost :( ")
            console.log("GAME OVER - LOST")
            this.win = false
            
            return "game over"
        }
    }

    static checkWin(){
        return this.win
    }

}

Game.all = []
