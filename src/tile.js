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
        <div id="board">
            <button class="peg" id=${this.id}>
            ID: ${this.id}
            <br>peg: ${this.peg}
            <br>num#: ${this.number}
            <br>?: ${this.peg}
            </button>
        </div>
        `        // document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
    }


    static findById(id) {
        return this.all.find(tile => tile.id === id)
    }

  
}


Tile.all = [];