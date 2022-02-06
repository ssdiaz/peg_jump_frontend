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




// Constants used throughout
const board = document.getElementById('board'); 
// set end point and fetch your endpoint
const boardShowEndPoint = "http://localhost:3000/boards/1";
const gameEndPoint = "http://localhost:3000/games"


// Load the DOM; 
document.addEventListener('DOMContentLoaded', () => { 
  console.log("DOM loaded")//had:  // getTiles()   // fetch board
  createNewPlayer()
})



// [NEW PLAYER] : Select New Player User Info
function createNewPlayer(){
  // NEW PLAYER = find form, add a listener, then call callback function to action
  const selectPlayerForm = document.querySelector("#new-player-form")
  // createPlayerForm.addEventListener("submit", (e) => createFormHandler(e))
  selectPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault() //prevent page reload
    const nameInput = document.querySelector("#input-name").value  // grab user input value and set to variable
    nameInput ? postFetchPlayer(nameInput) : console.log("username cannot be empty")  // if (nameInput){postFetchPlayer(nameInput)} else {console.log("username cannot be empty")}// if text in box, call post function
  })
}
// [NEW PLAYER] : POST fetch
function postFetchPlayer(nameInput){ //; creates new player and POST back to our database
  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: nameInput })      // build body object :note you can do this outside of the fetch request
  })
  .then(response => response.json())
  .then(player => {
    console.log(player)

    const playerAttributes = player.data.attributes
    const playerMarkup = `
      <div data-id${player.id}>
        <p>Username: ${playerAttributes.name}</p>
      </div>
    `
    const usernameCreated = document.querySelector(".player-container")
    usernameCreated.innerHTML += playerMarkup     // update div with player info from above
    
    // hide form
    if(usernameCreated) {
      document.querySelector(".form-container").style.display = 'none'
    }
  })
  .catch(function(error){
    alert("Invalid Username. Please try again.");
    console.log(error.message)
  })
}











// [New Game] : select play button
const btnPlay = document.querySelector("#play-btn");
btnPlay.addEventListener('click', function(event) {
  event.preventDefault() 

  getBoardTiles()// load board
});


function getBoardTiles() {
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














// clicking a peg
board.addEventListener('click', (event) => {
  const objClicked = event.target.nodeName    // event.target === button#1.peg     // event.target.nodeName === BUTTON
    // check that clicked button and not on div
    if (objClicked === 'BUTTON') {
      console.dir(event.target.id);

      // call a function here
    }
})




// fetch player
function getPlayer(){
  fetch("http://localhost:3000/players")
  .then(response => response.json())
    .then(playerArray => {     
      console.log(playerArray.data)

      console.log("look:")
      let test = Player.findById(1)
      console.log(test)

      playerArray.data.forEach( player => {
        console.log(player)
        console.log(player.id)
      })
    })
}

