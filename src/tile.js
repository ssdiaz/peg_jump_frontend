class Tile {
    constructor(data) {
        this.id = `peg${data.id}`
        this.options = data.options
        this.removes = data.removes
        this.active = data.active
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
    }

    //find Tile by ID ('peg#')
    static findById(id) {
        return this.all.find(tile => tile.id === id)
    }

    //return what peg is to be removed from selected and picked peg
    static returnRemovedPeg(selectedTile, pickedTile) {
        let optionsString = selectedTile.options 
        let optionsArray = optionsString.substr(1, optionsString.length - 2).split(", ")
              
        let pickedIndex = optionsArray.indexOf(`${pickedTile.number}`, 0)

        let removesString = selectedTile.removes
        let removesArray = removesString.substr(1, removesString.length - 2).split(", ")
      
        let removePegNum = removesArray[pickedIndex]
        let removePeg = Tile.findById(`peg${removePegNum}`) 

        return removePeg
    }

    static checkPegsRemoved() {
        let removed = Tile.all.filter(tile => tile.active === false);
        return removed.length
    }

}


Tile.all = [];

