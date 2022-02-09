class Tile {
    constructor(data) {
        this.id = `peg${data.id}`
        this.options = data.options
        this.removes = data.removes
        this.active = data.active
        this.board_id = data.board_id
        this.number = data.number

        Tile.all.push(this)
    }

    //render HTML for Peg
    renderPegHTML(){
        return `      
            <button class="peg" id="${this.id}">
                <div class="number" id="${this.id}">
                </div>

                <div class="active" id="${this.id}">
                </div>

                <div class="options" id="${this.id}">
                </div>

                <div class="removes" id="${this.id}">
                </div>
            </button>
        `
    }

    //render integers/booleans to DOM
    renderPegElements() {
        document.querySelector(`#${this.id} .number`).innerText = this.number
        document.querySelector(`#${this.id} .active`).innerText = this.active
        document.querySelector(`#${this.id} .options`).innerText = this.options
        document.querySelector(`#${this.id} .removes`).innerText = this.removes
    }

    //render updated active status for Tile
    renderActive() {
        return this.active
    }

    //find Tile by ID ('peg#')
    static findById(id) {
        return this.all.find(tile => tile.id === id)
    }
  
    //return what peg is to be removed from selected and picked peg
    static returnRemovedPeg(selectedTile, pickedTile) {
        //console.log("in returnRemovedPeg function")    

        let optionsString = selectedTile.options //Tile 6
        let optionsArray = optionsString.substr(1, optionsString.length-2).split(", ")
        //=> [1, 4, 13, 15]   //console.log(optionsArray)
      
        let pickedIndex = optionsArray.indexOf(`${pickedTile.number}`, 0) //=> 0
        //['1', '4', '13', '15']  //console.log(pickedIndexInOptions)

        let removesString = selectedTile.removes
        let removesArray = removesString.substr(1, removesString.length-2).split(", ")
          //=> ['3', '5', '9', '10']
      
        let removePegNum = removesArray[pickedIndex]// => 3
        let removePeg = Tile.findById(`peg${removePegNum}`) //=> Tile 3

        return removePeg  // RETURNS REMOVED PEG
    }


    static checkPegsRemoved() {
        let removed = Tile.all.filter(tile => tile.active === false);
        return removed.length
    }


    // static movesRemaining() {
    //     let trueCount = []
    //     let trueTiles = Tile.all.filter(tile => tile.active === true);

    //     trueTiles.forEach(tile => {
    //         let removesArray = tile.removes.substr(1, tile.removes.length-2).split(", ")
    //         //=> [2,3] Array

    //         removesArray.forEach(num => {
    //             let tile = Tile.findById(`peg${num}`)

    //              if (tile.active === true) {
    //                 trueCount.push(tile)
    //              }
    //         })
    //     })
    //     return trueCount.length
    // }

    // static checkGameResult() {
    //     let outcome = ""
    //     let trueTiles = Tile.all.filter(tile => tile.active === true).length

    //     if (trueTiles === 1) {
    //         alert("CONGRATS! You win! ")
    //         console.log("GAME OVER - WON")
    //         outcome = "WON"
    //     } else if (Tile.movesRemaining() === 0) {
    //         alert("Sorry, you lost :( ")
    //         console.log("GAME OVER - LOST")
    //         outcome = "Loss"
    //     }
    //     //document.querySelector("#game-details .move-count").innerText =  `move count: ${moveCount}` 
    //     document.querySelector("#game-details .game-outcome").innerText =  `Game Over: ${outcome}`
    // }





}


Tile.all = [];

