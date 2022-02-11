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
        `
    }


    static findById(id) {
        return this.all.find(player => player.id === id)
    }


    // render player form
    static renderPlayerForm() {
        return `  
            <form class="add-player-form">    
                <h3>Save your name to the Winner Board!</h3>
                
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
            </form>
        `
    }


}


Player.all = []
