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

    // render a peg
    renderPeg() {
        // console.log(this)
        return `      
            <button class="peg" id="${this.id}">
                <div class="number" id="${this.id}">
                    ${this.number}
                </div>

                <div class="active" id="${this.id}">
                    ${this.active}
                </div>

                <div class="options" id="${this.id}">
                    ${this.options}
                </div>

                <div class="removes" id="${this.id}">
                    ${this.removes}
                </div>

            </button>
        `        // document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
    }

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

    renderPegElements() {
        document.querySelector(`#${this.id} .number`).innerText = this.number
        document.querySelector(`#${this.id} .active`).innerText = this.active
        document.querySelector(`#${this.id} .options`).innerText = this.options
        document.querySelector(`#${this.id} .removes`).innerText = this.removes
    }

    renderActive() {
        return this.active
    }

    static findById(id) {
        return this.all.find(tile => tile.id === id)
    }
  
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




}


Tile.all = [];