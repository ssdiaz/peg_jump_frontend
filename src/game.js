// make sure you add a script tag into your HTML file [Part 4]
// console.log("in game")

class Game {
    // console.log(this)

    constructor(data){
        // console.log(this)
        // console.log("above as this")

        this.id = data.id
        this.player = data.attributes.player
        this.board_id = data.attributes.board_id

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


}

Game.all = []
