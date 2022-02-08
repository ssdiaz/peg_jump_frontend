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
        console.log("in returnRemovedPeg function")    
        //console.log(selectedTile) // Tile 6
        //console.log(pickedTile) // Tile 1

        let selectedOptionsString =  selectedTile.options //Tile 6

        //console.log(" --- ")

        let selectedOptionsArray = selectedOptionsString.substr(1, selectedOptionsString.length-2).split(", ")
        //=> [1, 4, 13, 15]
        //console.log(selectedOptionsArray)
      
        let optionIndexOfPickedInSelected = selectedOptionsArray.indexOf(`${pickedTile.number}`, 0) //=> 0
        //console.log(optionIndexOfPickedInSelected)
         //['1', '4', '13', '15']


        let selectedRemovesString = selectedTile.removes
        let selectedRemovesStringToArray = selectedRemovesString.substr(1, selectedRemovesString.length-2).split(", ")
          //=> ['3', '5', '9', '10']
      
        let pegRemoveNumber = selectedRemovesStringToArray[optionIndexOfPickedInSelected]// => 3
        let removePeg = Tile.findById(`peg${pegRemoveNumber}`) //=> Tile 3
        //console.log(removePeg)

        return removePeg
        //RETURNS TILE 3!!!!!!!!!        // RETURNS REMOVED PEG! based on tile selected and tile picked 
    }
      










}


Tile.all = [];