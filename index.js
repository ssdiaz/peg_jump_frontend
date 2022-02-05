// using:
const boardShowEndPoint = "http://localhost:3000/boards/1"

// Workign on:
// const tilesIndexEndPoint = "http://localhost:3000/tiles"
// let pegTable = document.getElementById("pegs");
// let peg = document.querySelector('#pegs > input[type=submit]:nth-child(3)');
//                                 #pegs > table > tbody > tr:nth-child(1) > td:nth-child(5) > span



// define peg buttons
// let peg1  = document.querySelector("#pegs > table > tbody > tr:nth-child(1) > td:nth-child(5)")
// let peg2  = document.querySelector("#pegs > table > tbody > tr:nth-child(2) > td:nth-child(4)")
// let peg3  = document.querySelector("#pegs > table > tbody > tr:nth-child(2) > td:nth-child(6)")
// let peg4  = document.querySelector("#pegs > table > tbody > tr:nth-child(3) > td:nth-child(3)")
// let peg5  = document.querySelector("#pegs > table > tbody > tr:nth-child(3) > td:nth-child(5)")
// let peg6  = document.querySelector("#pegs > table > tbody > tr:nth-child(3) > td:nth-child(7)")
// let peg7  = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(2)")
// let peg8  = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(4)")
// let peg9  = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(6)")
// let peg10 = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(8)")
// let peg11 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(1)")
// let peg12 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(3)")
// let peg13 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(5)")
// let peg14 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(7)")
// let peg15 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(9)")

let peg1  = "#pegs > table > tbody > tr:nth-child(1) > td:nth-child(5)"
let peg2  = "#pegs > table > tbody > tr:nth-child(2) > td:nth-child(4)"
let peg3  = "#pegs > table > tbody > tr:nth-child(2) > td:nth-child(6)"
let peg4  = "#pegs > table > tbody > tr:nth-child(3) > td:nth-child(3)"
let peg5  = "#pegs > table > tbody > tr:nth-child(3) > td:nth-child(5)"
let peg6  = "#pegs > table > tbody > tr:nth-child(3) > td:nth-child(7)"
let peg7  = "#pegs > table > tbody > tr:nth-child(4) > td:nth-child(2)"
let peg8  = "#pegs > table > tbody > tr:nth-child(4) > td:nth-child(4)"
let peg9  = "#pegs > table > tbody > tr:nth-child(4) > td:nth-child(6)"
let peg10 = "#pegs > table > tbody > tr:nth-child(4) > td:nth-child(8)"
let peg11 = "#pegs > table > tbody > tr:nth-child(5) > td:nth-child(1)"
let peg12 = "#pegs > table > tbody > tr:nth-child(5) > td:nth-child(3)"
let peg13 = "#pegs > table > tbody > tr:nth-child(5) > td:nth-child(5)"
let peg14 = "#pegs > table > tbody > tr:nth-child(5) > td:nth-child(7)"
let peg15 = "#pegs > table > tbody > tr:nth-child(5) > td:nth-child(9)"

let pegArray = [peg1, peg2, peg3, peg4, peg5, peg6, peg7, peg8, peg9, peg10, peg11, peg12, peg13, peg14, peg15]


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
            <button class="peg" id=${tile.id}>
                <p>
                    ID: ${tile.id}
                    <br>peg: ${tile.peg}
                    <br>num#: ${tile.number}
                    <br>?: ${tile.peg}
                </p>
            </button>
            `
            // document.querySelector('#pegs').innerHTML += tileMarkup
            // peg1.innerText = tileMarkup
            document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
        })
    })
} 





















// function startPegRemoved(){
// }

// const button = document.getElementById('button')

// class Moves {
//     constructor(selection, move) {
//         this.selection = selection
//         this.move = move
//     }

//     setSelection(){

//     }

//     setMove(){

//     }


//     checkForOptions(){

//     }

//     removePeg(){

//     }

//     placePeg(){

//     }

//     checkIfLoss(){

//     }

//     checkIfWon(){

//     }

// }

// let move1 = new Moves(6,1)
