class Player {



    constructor(data) {
        this.id = data.attributes.id
        // this.name = data.attributes.name


        Player.all.push(this)

        // console.log(this)
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



}


Player.all = []