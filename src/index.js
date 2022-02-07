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
const selectPlayerForm = document.querySelector("#new-player-form")
const btnPlay = document.querySelector("#play-btn");
const directionsText = document.querySelector(".directions")
const displayOptionsText = document.querySelector(".display-options")
let optionsArray = []
let pegSelected = ""
let pegNewPosition = ""
// set end point and fetch your endpoint
const boardShowEndPoint = "http://localhost:3000/boards/1";
const gameEndPoint = "http://localhost:3000/games"

function resetOptionsArray(){
  optionsArray.length === 0 ?  optionsArray :  optionsArray = 0
}

function setPegColor(pegId){
  let peg = document.querySelector(`#${pegId}`)

  if (document.querySelector(`#${pegId}.active`).innerText === "true") {
    peg.style.backgroundColor = 'violet'
  } else {
    peg.style.backgroundColor = '#bbb'
  }
}





// Load the DOM; 
document.addEventListener('DOMContentLoaded', () => { 
  console.log("DOM loaded")//had:  // getTiles()   // fetch board
  
  newGame()
  // pegClick()

  newPlayerEvent() // set the button newPlayer clickable
  // selectPlayerForm.style.display = 'none' //hide form
})













// [New Game] : select play button
function newGame() {

  btnPlay.addEventListener('click', function(e) {
    // e.preventDefault() 

    if (board.innerText.length === 43){
      let newGame = function Game() {
        this.active = "active"
      }
  
      let newBoard = function Board() {
        this.active = "active"
        this.id = 1
      }
      
      // console.log(`game: ${newGame}`)
      // console.log(`board: ${newBoard}`)
      console.log("new game - and board, and tiles")
      // postFetchGame(game) // this needs to be AFTER we get board_id and player_id
  
      getBoardTiles()
      firstMove()

      btnPlay.innerText = "Reset Game"
      resetGame()
    }
  });
}

function resetGame(){
  btnPlay.addEventListener('click', function(e) {
    // document.reload()
    window.location.reload();
    // If we needed to force the document to be fetched from the
    // web server again (such as where the document contents
    // change dynamically but cache control headers are not
    // configured properly), Firefox supports a non-standard
    // parameter that can be set to true to bypass the cache:
    //window.location.reload(true);
    //https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
  })
}

//  [TILES] loads tiles
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




function firstMove() {
  directionsText.innerText = `Click a peg to remove`

  board.addEventListener('click', (event) => {
    let id = event.target.id
    // console.log(event.target.id)

    let pegClicked =  document.querySelector(`#${id}`) 



    let pegActiveStatus =  document.querySelector(`#${id}.active`) 
    pegActiveStatus.innerText = 'false'      //change peg to false

    setPegColor(pegClicked.id) // pegClicked.style.backgroundColor = '#bbb'
    console.log(`PEG CLIKECKED: ${pegClicked.id}`)

    selectPeg()

  },{once : true})
}



function selectPeg(){
  directionsText.innerText = "Select a Peg to move"
  resetOptionsArray()   // newArray.length === 0 ?  newArray :  newArray = 0

  board.addEventListener('click', (event) => { 
    let id = event.target.id
    pegSelected = id

    console.log(`peg selected: ${pegSelected}`)

    let pegClicked =  document.querySelector(`#${id}`)  
    pegClicked.style.backgroundColor = 'yellow'

    let optionsString = document.querySelector(`#${id}.options`).innerText  // console.log(typeof options) //=>string
    let optionsStringToArray = optionsString.substr(1, optionsString.length-2).split(", ")

    function checkOptions(){
      optionsStringToArray.forEach(function(num){
        let peg = document.querySelector(`#peg${num}.active`)
        if (peg.innerText === 'false' ) {
          optionsArray.push(num)
        }
      })
    }   
    checkOptions()

    displayOptionsText.innerHTML += `<br><br>Peg Options: ${optionsArray}`

    selectMovePosition()
  },{once : true})
}



function selectMovePosition(){
  directionsText.innerText = "Select availible position to move Peg."

  board.addEventListener('click', (event) => {        
    let pegId = event.target.id
    // console.log(pegId) //=> peg1
    // console.log(`options array: ${optionsArray}`) //=> ['1']
      
    // THEN if that number is in array, good, otherwise alert and start over.
    let pegClickedNumber =  document.querySelector(`#${pegId}.number`).innerText
    // console.log(`numbtxt: ${pegClickedNumber}`)

    if (optionsArray.includes(pegClickedNumber, 0)) {
      console.log("yes, call next function")

      pegNewPosition = pegId //=> peg1
      console.log(`pegNewPosition: ${pegNewPosition}`)

      movePegs()

    } else {
      alert("Invalid Peg Selected. Please choose a grey peg.");
      selectMovePosition()
    }
  },{once : true})
  //reset array at end if needed
  //optionsArray = []
}

function movePegs(){
  // console.log(`selected: ${pegSelected}`)
  document.querySelector(`#${pegSelected}.active`).innerText = false
  setPegColor(pegSelected)
  pegSelected = ""
  // console.log(`selected reset: ${pegSelected}`)

  // console.log(`newPosition: ${pegNewPosition}`)
  document.querySelector(`#${pegNewPosition}.active`).innerText = true
  setPegColor(pegNewPosition)
  pegNewPosition = ""
  // console.log(`newPosition reset: ${pegNewPosition}`)




}






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


// function moveOrder(){
//   // directionsText = "Select 1 peg to remove"



//   //   // selectPeg()
//   //   // selectRemove()
//   //   // removePeg()
//   //   // setPeg()

//   // document.querySelector(".directions").innerText = "hi"
// }



















// POST GAME PLAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// broken
// function postFetchGame(game){
//   fetch(gameEndPoint, {
//     method: "POST",
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(game)      // build body object :note you can do this outside of the fetch request
//   })
//   .then(response => response.json())
//   .then(games => {
//     console.log("below")
//     console.log(games)
//   })
// }





// NOT USED YETttttt!!!!!!!!!!!!!!!!!!!!!!! fetch player
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





// document.querySelector("#new-player-form").innerHTML += new Player(tile).renderPeg()  




// [NEW PLAYER] : Select New Player User Info
function newPlayerEvent(){
  // NEW PLAYER = find form, add a listener, then call callback function to action

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