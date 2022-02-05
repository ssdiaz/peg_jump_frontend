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

const boardShowEndPoint = "http://localhost:3000/boards/1"
// make sure the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded")

  getBoard()
})

// fetch your endpoint
function getBoard() {
  fetch(boardShowEndPoint)
  .then(response => response.json())
  .then(boardArray => {
    console.log(boardArray)
    boardArray.data.attributes.tiles.forEach( tile => {
      const tileMarkup = `
      
      <div id="pegs">
      <button class="peg" id=${tile.id}>
          ID: ${tile.id}
          <br>peg: ${tile.peg}
          <br>num#: ${tile.number}
          <br>?: ${tile.peg}
          </button>
        </div>

      `
      // document.querySelector('#pegs').innerHTML += tileMarkup
      // peg1.innerText = tileMarkup
      document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
    })
  })
} 


// const allPegs = document.querySelectorAll(".peg");

// works!!
const pegs = document.getElementById('pegs');
pegs.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  console.dir(event.target.id);
  console.log("hi")
  // call a function here
})






const btn = document.querySelector('button');
function random(number) {
  return Math.floor(Math.random() * (number+1));
}
btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});