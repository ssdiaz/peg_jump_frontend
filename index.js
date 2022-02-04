// o	npm install -g json-server
// o	json-server --watch db.json

// const tilesIndexEndPoint = "http://localhost:3000/tiles"
const boardShowEndPoint = "http://localhost:3000/boards/1"
// const peg = document.querySelector('#create-task-form > input[type=submit]:nth-child(n)');

// let pegTable = document.getElementById("pegs");

// let peg = document.querySelector('#pegs > input[type=submit]:nth-child(3)');
//                                 #pegs > table > tbody > tr:nth-child(1) > td:nth-child(5) > span



// make sure the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")

    getBoard()
})
    // fetch your endpoint


function getBoard() {
    console.log("board!")

    fetch(boardShowEndPoint)
    .then(response => response.json())
    .then(boardArray => {
        console.log(boardArray)
        boardArray.data.attributes.tiles.forEach( tile => {
            const tileMarkup = `
            <div data-id=${tile.id}>
                <p>ID: ${tile.id}</p>
                <p>peg: ${tile.peg}</p>
                <p>number: ${tile.number}</p>
            </div>
            `
            document.querySelector('#pegs').innerHTML += tileMarkup
        })

    })
} 
