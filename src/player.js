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







}


Player.all = []