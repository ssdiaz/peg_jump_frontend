// let boardBody = document.querySelector("#board > table > tbody")
// let content = document.getElementById('board');
// let firstChild = content.firstChild.nodeName;
// console.log(firstChild)
 // const allPegs = document.querySelectorAll(".peg");
  // const board = document.getElementById('board');


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

for color change:
// [New Game] : select play button
function random(number) {
  return Math.floor(Math.random() * (number+1));
}
  const btnPlay = document.querySelector("#play-btn");
  btnPlay.addEventListener('click', function(event) {
    event.preventDefault() 

    getTiles()// load board

    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
  });//


  //  [TILES] loads tiles
//function old() {
  // fetch("http://localhost:3000/boards/1")
  // .then(response => response.json())
  //  .then(boardArray => {
  //     // console.log(boardArray)//=> board Object
  //     boardArray.data.attributes.tiles.forEach( tile => {
  //       // create new Tile from boardArray of each tile
  //       let newTile = new Tile(tile)

  //       // select the peg array placement, add in inner HTML, and call the renderPeg() function from the Tile class
  //       //document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += newTile.renderPeg()  
  //       //document.querySelector(`#${newTile.id} .active`).innerText = newTile.renderActive() //added this

  //       document.querySelector(pegArray[`${tile.id}`-1]).innerHTML += newTile.renderPegHTML()
  //       newTile.renderPegElements() 

  //     })
  //     // .catch(err => console.dir(err))
  //  })
//} // document.querySelector(".peg #peg1")



// function pegClick(){
//   // clicking a peg
//   board.addEventListener('click', (event) => {
//     const objClicked = event.target.nodeName    // event.target === button#1.peg     // event.target.nodeName === BUTTON
//       // check that clicked button and not on div
//       if (objClicked === 'BUTTON') {
//         console.dir(event.target.id);
//         return event.target.id
//         // call a function here
//       }
//   })
// }








NOTES- 
- fetch requestes need a method, header, and body. so look up this code.
- if creating a new object, create it FULLY in the DOM then post to the database - can't have it just create nothing without sending to database
- for hash tables: https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/#:~:text=To%20set%20the%20key%2Fvalue,will%20be%20incremented%20by%20one
- for timer:    https://www.ostraining.com/blog/coding/stopwatch/



MOVE STEPS
1. firstMove()              --> [EVENT LISTENER] --> runs once 
2. *selectPeg()*            --> [EVENT LISTENER]
3. selectMovePosition()     --> [EVENT LISTENER]
4. movePegs()
5. resetMove() 
    --> then selectPeg()



NEED TO ADD TO BE FUNCTIONAL:
- [DONE] if you click on a blank tile, ignore
- [DONE] if you click same time again, unselect it - only for selectPeg
- [DONE] a way to check the board and if won/loss
- [] if wins, saves player to list? ... nah idk. --- only if we need the POST, which I think we do
- [] should i be posting the tiles? and recreating the game with reset? Probably
