class Tile {
    constructor(data) {
        this.id = data.id
        this.options = data.options
        this.removes = data.removes
        this.peg = data.peg
        this.board_id = data.board_id
        this.number = data.number

        Tile.all.push(this)
    }

    // render a peg
    renderPeg() {
        // console.log(this)
        return `      
            <button class="peg" id="peg${this.id}">
                <div class="number" id="peg${this.id}">
                    ${this.number}
                </div>

                <div class="active" id="peg${this.id}">
                    ${this.peg}
                </div>

                <div class="options" id="peg${this.id}">
                    ${this.options}
                </div>
            </button>
        `        // document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
    }


    static findById(id) {
        return this.all.find(tile => tile.id === id)
    }

  
}


Tile.all = [];