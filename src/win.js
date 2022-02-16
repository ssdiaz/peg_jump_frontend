class Win {

    constructor(data){
        this.move_count = data.attributes.move_count
        this.win_count = data.attributes.win_count
        this.player_id = data.attributes.player_id

        Win.all.push(this)
    }

    renderMoveHTML() {
        return `      
            <td class="move-count">${this.move_count}</td>
        `
    }

    static findById(id) {
        return this.all.find(win => win.id === id)
    }

    static findByPlayerId(id) {
        return this.all.find(win => win.player_id === id)
    }

}

Win.all = []