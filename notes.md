






















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




// NOT USED YETttttt!!!!!!!!!!!!!!!!!!!!!!! fetch player
// function getPlayer(){
//   fetch("http://localhost:3000/players")
//   .then(response => response.json())
//     .then(playerArray => {     
//       console.log(playerArray.data)

//       console.log("look:")
//       let player = Player.findById(1)
//       console.log(player)

//       playerArray.data.forEach( player => {
//         console.log(player)
//         console.log(player.id)
//       })
//     })
// }


      // //check pegPicked is false (free)
      // if (clickedTileStatus(event) === false ){
      //   pegPicked = Tile.findById(event.target.id) //=> Tile 1
      //   pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked) //=> Tile 3

      //   // If pegPicked is in pegSelected array, good, otherwise alert and start over.
      //   if (optionsArray.includes(pegPicked.number, 0) && pegRemoved.active === true) { 
          

      //     movePegs()          //console.log("yes, call next function")

      //   } else {
      //     (pegRemoved && pegRemoved.active === false) ? alert("No Peg to remove. Please re-select.") : alert("Not a valid option for peg. Please re-select.");
      //     resetPegSelect()
      //     return
      //   }
      // } else {
      //   alert("Invalid Peg Selected. Please re-select a grey peg.");
      //   //console.log("Invalid Peg Selected")
      //   selectMovePosition()
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







[[[FRIDAY]]]
NEED TO ADD TO BE FUNCTIONAL:
- [DONE] if you click on a blank tile, ignore
- [DONE] if you click same time again, unselect it; only for selectPeg
- [DONE] a way to check the board and if won/loss
- [DONE] if wins, saves player to list
- [] should i be posting the tiles? and recreating the game with reset? Probably

Other things to do:
- [DONE] Confirm Requirements
- [DONE] Readme w/Backend Repo
- [] Finish the design / layout
    - [] Format pegs look
    - [DONE] If click ignore peg, do nothing
    - [DONE] refactor the pegs format
- [] Refactor index.js COMPLETELY!
    - [] Fix Peg Options
    - [] Remove unused items - like routes
    - [] Figure out Seed Data and such
    - [] MOVES
      - [] MOVE 1
      - [] MOVE 2
      - [DONE] MOVE 3 - selectMovePosition
      - [] MOVE 4
      - [] refine MOVE Sintructions
- [] [STRETCH_GOALS]
    - [] win streak?
    - [] Demo Move?
    - [] Updated Notes and User Story - add a line to see note.md to readme









[[SATURDAY]]REQUIREMENTS 
- [DONE] Single Page Application (SPA)
- [DONE] Front end - HTML, CSS, JavaScript
- [DONE] Frontend communicates with backend API built with Ruby and Rails
- [DONE] README.md
- [] BLOG
     --- A Blog Post telling the story behind the application, challenges you overcame, and what you learned
- [] VIDEO --- 1-2 mins
- [DONE] has 3 AJAX calls (2 of CRUD) 
    -> CREATE Players, CREATE Wins, READ Game & Peg(?), READ Players and Wins
- [] Read other blogs

[[SUNDAY]]STUDY GUIDE: 
- [] What is a Rails API 
- [] All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format. // The backend and frontend must collaborate to demonstrate Client-Server Communication.
EXPLAIN:
- [] JavaScript - Use classes and functions to organize your code into reusable pieces. - are these classes separate? what abotu Ids??
- [] JavaScript - Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax.
- [] JavaScript - Use ES6 features when appropriate (e.g. arrow functions, let & const, rest and spread syntax).
- [] Review  Creating a Rails API from Scratch - https://github.com/learn-co-curriculum/js-rails-as-api-creating-a-rails-api-from-scratch
- [] 
- [] 
- [] 
In particular, the JavaScript Fundamentals concepts your reviewer may ask about include:
- [] variables
- [] data structures
- [] functions
- [] hoisting
- [] scope
- [] context
- [] this
- [] closures
- [] ES6 syntax
- [] let, const
- [] arrow functions
EXPLAIN: (LEanring Goals)
- [] Explain how Rails routes a request to a controller and method based on the URL and HTTP verb
- [] Use render json: to render serialized JSON
- [] Select, Create, and Modify DOM nodes
- [] Attach listeners to DOM nodes to respond to user interaction
- [] Use preventDefault to control form submit behavior
- [] Use fetch with 'GET', 'POST', 'PATCH' & 'DELETE' HTTP methods
- [] Create a JavaScript object with ES6 class syntax
- [] Instantiate JavaScript objects and call methods on them.

