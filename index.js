// o	npm install -g json-server
// o	json-server --watch db.json

// const tilesIndexEndPoint = "http://localhost:3000/tiles"
const boardShowEndPoint = "http://localhost:3000/boards/1"

// make sure the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    // getTiles()
    getBoard()
})
    // fetch your endpoint

// function getTiles() {
//     fetch(tilesIndexEndPoint)
//     .then(response => response.json())
//     .then(tilesArray => {
//         console.log(tilesArray)
//         tilesArray.data.forEach( tile => {
//             const tileMarkup = `
//             <div data-id=${tile.id}>
//                 <p>ID: ${tile.id}</p>
//                 <p>peg: ${tile.attributes.peg}</p>
//             </div>
//             `
//         document.querySelector('#tile-container').innerHTML += tileMarkup
//         })

//     })
// } 

function getBoard() {
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
