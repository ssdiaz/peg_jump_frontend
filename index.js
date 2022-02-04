// o	npm install -g json-server
// o	json-server --watch db.json

const tilesIndexEndPoint = "http://localhost:3000/tiles"


// make sure the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded")
    getTiles()
})
    // fetch your endpoint

function getTiles() {
    fetch(tilesIndexEndPoint)
    .then(response => response.json())
    .then(tilesArray => {
        console.log(tilesArray)
        tilesArray.forEach( tile => {
            const tileMarkup = `
            <div data-id=${tile.id}>
                <p>ID: ${tile.id}</p>
                <p>peg: ${tile.peg}</p>
            </div>
            `
        document.querySelector('#tile-container').innerHTML += tileMarkup
        })

    })
} 
   


