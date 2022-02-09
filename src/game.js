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



}

Game.all = []
