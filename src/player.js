class Player {

    constructor(data) {
        this.id = data.id
        this.name = data.attributes.name
       
        Player.all.unshift(this)
    }

    renderPlayerHTML(num) {
        return `    
            <td>${num}</td>
            <td id="name">${this.name}</td>
        `
    }

    static findById(id) {
        return this.all.find(player => player.id === id)
    }

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
                    value="Save New Player"
                    class="submit"
                />
            </form>
        `
    }

}

Player.all = []
