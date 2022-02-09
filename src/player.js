class Player {

    constructor(data) {
        this.id = data.id
        this.name = data.attributes.name
        // this.moveCount = 0 //** probably needs to be pulled from game when shoveled in */
        Player.all.unshift(this)
    }


    //render HTML for Players
    renderPlayerHTML() {
        return `      
            <td id="name">${this.name}</td>
            <td id="move-count">${this.moveCount}</td>
        `
    }



    static findById(id) {
        return this.all.find(player => player.id === id)
    }



    // render player form
    renderPlayerForm() {
        // console.log(this)
        return `      
            <h3>Create a username!</h3>
            
            <input id="input-name"
                type="text"
                name="name"
                value=""
                placeholder="username"                    
                class="input-text"
            />
            <br />
            <input id='create-player-button'
                type="submit"
                name="submit"
                value="Create New Player"
                class="submit"
            />
        `        // document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
    }



    //render winner board
    static renderWinnerBoard (){

    }



}


Player.all = []

