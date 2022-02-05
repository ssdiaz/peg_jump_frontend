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

let peg1  = "#board > table > tbody > tr:nth-child(1) > td:nth-child(5)"
let peg2  = "#board > table > tbody > tr:nth-child(2) > td:nth-child(4)"
let peg3  = "#board > table > tbody > tr:nth-child(2) > td:nth-child(6)"
let peg4  = "#board > table > tbody > tr:nth-child(3) > td:nth-child(3)"
let peg5  = "#board > table > tbody > tr:nth-child(3) > td:nth-child(5)"
let peg6  = "#board > table > tbody > tr:nth-child(3) > td:nth-child(7)"
let peg7  = "#board > table > tbody > tr:nth-child(4) > td:nth-child(2)"
let peg8  = "#board > table > tbody > tr:nth-child(4) > td:nth-child(4)"
let peg9  = "#board > table > tbody > tr:nth-child(4) > td:nth-child(6)"
let peg10 = "#board > table > tbody > tr:nth-child(4) > td:nth-child(8)"
let peg11 = "#board > table > tbody > tr:nth-child(5) > td:nth-child(1)"
let peg12 = "#board > table > tbody > tr:nth-child(5) > td:nth-child(3)"
let peg13 = "#board > table > tbody > tr:nth-child(5) > td:nth-child(5)"
let peg14 = "#board > table > tbody > tr:nth-child(5) > td:nth-child(7)"
let peg15 = "#board > table > tbody > tr:nth-child(5) > td:nth-child(9)"

let pegArray = [peg1, peg2, peg3, peg4, peg5, peg6, peg7, peg8, peg9, peg10, peg11, peg12, peg13, peg14, peg15]

const board = document.getElementById('board'); // let boardBody = document.querySelector("#board > table > tbody")
// let content = document.getElementById('board');
// let firstChild = content.firstChild.nodeName;
// console.log(firstChild)
 // const allPegs = document.querySelectorAll(".peg");
  // const board = document.getElementById('board');

// make sure the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded")
  // fetch board
  getTiles()
})

// set end point and fetch your endpoint
const boardShowEndPoint = "http://localhost:3000/boards/1";
function getTiles() {
  fetch(boardShowEndPoint)
  .then(response => response.json())
   .then(boardArray => {
    console.log(boardArray)
        boardArray.data.attributes.tiles.forEach( tile => {
          // create new Tile from boardArray of each tile
          let newTile = new Tile(tile)

          // select the peg array placement, add in inner HTML, and call the renderPeg() function from the Tile class
          document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += newTile.renderPeg()  
        })
        // .catch(err => console.dir(err))
   })
} 
 




board.addEventListener('click', (event) => {
  const objClicked = event.target.nodeName    // event.target === button#1.peg     // event.target.nodeName === BUTTON
    // check that clicked button and not on div
    if (objClicked === 'BUTTON') {
      console.dir(event.target.id);

      // call a function here
    }
})

// for play button - right now changes background
const btn = document.querySelector('button');
function random(number) {
  return Math.floor(Math.random() * (number+1));
}
btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});