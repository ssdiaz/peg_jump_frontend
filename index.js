const boardShowEndPoint = "http://localhost:3000/boards/1"

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
// pegRowIndex = [[1,5],[2,4], [2,6], [3,3], [3,5], [3,7], [4,2], [4,4], [4,6], [4,8], [5,1], [5,3], [5,5], [5,7], [5,9]]

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
            <div class="peg" id=${tile.id}>
                <p>
                    ID: ${tile.id}
                    <br>peg: ${tile.peg}
                    <br>num#: ${tile.number}
                    <br>?: ${tile.peg}
                    <li class="like">Like! <span class="like-glyph">&#x2661;</span></li>
                </p>
            </div>
            `
            document.querySelector("#pegs").innerHTML += tileMarkup
            // document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += tileMarkup
        })
    })
} 







const allPegs = document.querySelectorAll(".peg");






let glyphStates = {
    "♡": "♥",
    "♥": "♡"
  };
  
  let colorStates = {
    "red" : "",
    "": "red"
  };
  
  let articleHearts = document.querySelectorAll(".like-glyph");
  
  function likeCallback(e) {
    let heart = e.target;
    mimicServerCall()
      .then(function(serverMessage){
        alert("You notified the server!");
        alert(serverMessage);
        heart.innerText = glyphStates[heart.innerText];
        heart.style.color = colorStates[heart.style.color];
      })
      .catch(function(error) {
        alert("Something went wrong!");
      });
  }
  
  
  for (let glyph of articleHearts) {
    glyph.addEventListener("click", likeCallback);
  }

  function mimicServerCall() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve("Pretend remote server notified of action!");
      }, 300);
    });
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
