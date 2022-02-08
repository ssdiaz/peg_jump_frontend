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

    renderActive() {
        return this.active
    }


    static findById(id) {
        return this.all.find(tile => tile.id === id)
    }
  
}


Tile.all = [];