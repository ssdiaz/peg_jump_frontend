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

const btnPlay = document.querySelector("#play-btn");

const instructions = document.querySelector(".directions")
const displayOptionsText = document.querySelector(".display-options")
//Game variables used / reset
let optionsArray = []
let pegSelected = ""
let pegPicked = ""
let optionIndex = ""
let pegRemoved = ""
// set end point and fetch your endpoint
const gameEndPoint = "http://localhost:3000/games"
//to track moves
let movesTotal = 0

//move functions
function resetOptionsArray(){
  optionsArray.length === 0 ?  optionsArray :  optionsArray = []
}

//set peg color on DOM
function setPegColor(tile){
  let peg = document.querySelector(`#${tile.id}`)

  if (tile.active === true) {
    peg.style.backgroundColor = 'violet'
  } else {
    peg.style.backgroundColor = '#bbb'
  }
  document.querySelector(`#${tile.id} .active`).innerText = tile.renderActive()
}

//for clicks - valid tile and not something else in doc
function validClick(event){
  if (event.target.id !== 'ignore' && (event.target.nodeName === 'DIV' || event.target.nodeName === 'BUTTON')) {
    return true
  }
}

//for clicks - return tile status
function getClickStatus(event) {
  let tile = Tile.findById(event.target.id)
  return tile.active
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Load the DOM; 
document.addEventListener('DOMContentLoaded', () => {   
  console.log("DOM loaded")    

  fetchPlayer() //used later, but fetches Players for the database & Winner's Board
  //fetchWins()

  // setTimeout(function(){ 
  //   //alert("After .1 seconds!");
  //   displayWinnerBoard()
  //  }, 100);


  newGame()

})

function fetchPlayer() { //fetches players from database
  fetch("http://localhost:3000/players")
  .then(response => response.json())
    .then(players => {
      players.data.forEach( data => { 

        newPlayer = new Player(data)

      })
      fetchWins()
      //displayWinnerBoard()
      //console.log("players good") //=> hits even when blank
    })
}

function fetchWins() { //fetches players from database
  fetch("http://localhost:3000/wins")
  .then(response => response.json())
    .then(winsData => {
      winsData.data.forEach( data => { 

        newWin = new Win(data)

      })
    displayWinnerBoard()
    //console.log("wins here") //=> hits even when blank
    })
}



function displayWinnerBoard() {

 // console.log("am I hitting?") //=> hits even when blank
  let first15 = Player.all.slice(0, 15);  //grab first 15 players in array

  for (let i = 0; i < (first15.length); i++) {
    let player = Player.all[i]

    let playerId = parseInt(player.id)
    let winPlayer = Win.findByPlayerId(playerId)

    document.querySelector(`#slot${i+1}`).innerHTML += player.renderPlayerHTML()
    document.querySelector(`#slot${i+1}`).innerHTML += winPlayer.renderMoveHTML()
  }

}



// [New Game] : select play button
function newGame() {
  btnPlay.addEventListener('click', function(e) {

    cheatWin()

    getGameTiles()

    firstMove()

    changeToResetBtn()

    document.querySelector(".instructions-header").innerHTML = `<h4>Next Move:</h4>`

  });
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cheatWin(){

  document.querySelector(".cheat").innerHTML = `<p><button id="cheat-btn">CHEAT!</button></p>`

  const btnCheat = document.querySelector("#cheat-btn");

  btnCheat.addEventListener('click', function(e) {

    console.log("cheater!")

    Tile.all.forEach( tile => {
      tile.active = false
      setPegColor(tile)
    })

    let winTile = Tile.all[12]
    
    winTile.active = true
    setPegColor(winTile)

    selectPeg()
    gameWon()
  })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function changeToResetBtn(){
  btnPlay.innerText = "Reset"
  btnPlay.addEventListener('click', function(e) {
    resetGame()
  })
}


function resetGame(){
    window.location.reload();    //https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
}



//  [TILES] loads tiles
function getGameTiles() {
  fetch("http://localhost:3000/games")
  .then(response => response.json())
  .then(games => {
    games.data.forEach( data => { 

      let newGame = new Game(data)
      let newBoard = new Board(data.attributes.board_id)

      //show game id
      document.querySelector("#game-details .game-ids").innerHTML += `game id: ${newGame.id}`

      //show board id
      document.querySelector("#game-details .game-ids").innerHTML += `board id: ${newBoard.id}`

      //show move count
      document.querySelector("#game-details .move-count").innerText =  `move count: ${movesTotal}` 

      //remove players div content
      document.querySelector(".player-container").innerText =  ""

      //diplay Game Outcome
      document.querySelector("#game-details .game-outcome").innerText =  `Game Status: in progress`

      data.attributes.tiles.forEach( tileData =>  {
        let newTile = new Tile(tileData)
        document.querySelector(pegArray[`${tileData.id}`-1]).innerHTML += newTile.renderPegHTML()
        newTile.renderPegElements() 
      })

    })
  })
}






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//[MOVE 1]
function firstMove() {
  instructions.innerText = `[firstMove] Click a peg to remove`

  board.addEventListener('click', (event) => {
    if (validClick(event)){
      let id = event.target.id //=> peg1 

      let tileClicked = Tile.findById(id) //=> Tile 1

      tileClicked.active = false

      setPegColor(tileClicked)

      selectPeg()

    } else {
      console.log("clicked ignore. go again")
      firstMove()
    }
  }, {once : true})
}



//[MOVE 2] --- the real first move
function selectPeg(){

  if (Game.checkGameResult() === "game over"){
    const outcome = Game.checkWin() === true ? "WON" : "Loss"
    document.querySelector("#game-details .game-outcome").innerText =  `Game Over: ${outcome}`
    return
  }

  instructions.innerText = "[selectPeg] Select a Violet Peg to move"

  resetOptionsArray()

  board.addEventListener('click', (event) => {       
    if (validClick(event) && getClickStatus(event) === true) { 
      let id = event.target.id//=> peg6
      let tile = Tile.findById(id)//=> Tile 6
      pegSelected = tile//=> Tile 6 //this is used in functions below

      let pegClicked =  document.querySelector(`#${id}`)//=> button for peg6
      pegClicked.style.backgroundColor = 'yellow'

      let optionsString = tile.options //=> '[1, 4, 15]' //=>string '[1, 4, 15]'      
      let optionsStringToArray = optionsString.substr(1, optionsString.length-2).split(", ") //=> (3) ['1', '4', '15']

      function checkOptions(){
        optionsStringToArray.forEach(function(num) {
          let peg = document.querySelector(`#peg${num}.active`)
          
          if (peg.innerText === 'false' ) {  // console.log(typeof peg.innerText) //=> string - leave as 'false' string!
            optionsArray.push(parseInt(num))  //=> needs to be in int for selectMovePosiiton()
          }
        })
      } 
      checkOptions()

      //console.log(typeof peg.innerText) //=> string - leave below as 'false' string!
      //peg.innerText.innerHTML = `Potential Options: ${optionsArray}`
      displayOptionsText.innerText = `Potential Options - Pegs: ${optionsArray}`

      selectMovePosition()

    } else {
      console.log("click ignored")

      selectPeg()
    }

  }, {once : true})

}


//[MOVE 3]
function selectMovePosition(){
  instructions.innerText = "[selectMovePosition] Select available position to move Peg."

  board.addEventListener('click', (event) => {   
    let tile = Tile.findById(event.target.id)

    //to unselect peg
    if (tile === pegSelected) {
      console.log("they clicked twice to the selected peg")

      resetPegSelect()
      return
    }

    // check valid click and peg is false
    if (validClick(event) && getClickStatus(event) === false ){
      pegPicked = Tile.findById(event.target.id) //=> Tile 1
      pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked) //=> Tile 3

      // If pegPicked is in pegSelected array, good, otherwise alert and start over.
      if (optionsArray.includes(pegPicked.number, 0)) { 
        //console.log("yes, call next function")

        //abort if removed peg is gone already (false)
        if (pegRemoved.active === false) {
          alert("No Peg to remove. Please re-select.")
          
          resetPegSelect()
          return
        }
  
        movePegs()

      } else {
        console.log("clicked ignored")
        alert("Not a valid option for peg. Please re-select.");

        resetPegSelect()
        return
      }
    } else {
      alert("Invalid Peg Selected. Please choose a grey peg. Please re-select.");
      console.log("Invalid Peg Selected")

      selectMovePosition()
    }

  }, {once : true})

}


//[MOVE 4]
function movePegs(){
  instructions.innerText = "[movePegs]"

  pegSelected.active = false
  setPegColor(pegSelected) //=> Tile 6    //console.log(pegSelected)//=> Tile 6

  pegPicked.active = true
  setPegColor(pegPicked) //=> Tile 1    //console.log(pegPicked)//=> Tile 1  
  
  pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked)

  pegRemoved.active = false
  setPegColor(pegRemoved)

  resetMove()

  selectPeg()

  document.querySelector("#game-details .move-count").innerText =  `move count: ${movesTotal += 1}` 
  
  gameWon()

}

//[MOVE 5]
function resetMove() {
  optionsArray = []
  pegSelected = ""
  pegPicked = ""
  optionIndex = ""
  pegRemoved = ""
  displayOptionsText.innerHTML = `<br>`

  resetOptionsArray()
}


function resetPegSelect() {
  document.querySelector(`#${pegSelected.id}`).style.backgroundColor = 'violet'
  pegSelected = ""
  optionsArray = []
  displayOptionsText.innerHTML = `<br>`

  selectPeg()
}


function gameWon(){
  if (Game.checkWin() === true){

    document.querySelector(".player-form-container").innerHTML = Player.renderPlayerForm()

    newPlayerEvent()
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// [NEW PLAYER] : Grab input from user / make a click event
function newPlayerEvent(){  // NEW PLAYER = find form, add a listener, then call callback function to action
  
    const selectPlayerForm = document.querySelector("#create-player-button")

    selectPlayerForm.addEventListener("click", (e) => {
      e.preventDefault() //prevent page reload
      const userInput = document.querySelector("#input-name").value 
      userInput ? postFetchPlayer(userInput) : alert("Username cannot be empty") 
    })
      
}



// [NEW PLAYER] : POST fetch
function postFetchPlayer(userInput){ //; creates new player and POST back to our database
  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
    body: JSON.stringify({
      name: userInput 
    })    
  })
  .then(response => response.json())
  .then(player => {
    
    createWinLog(player)

  })
  .catch(function(error){
    alert("Invalid Username. Please try again.");
    console.log(error.message)
  })

}


function createWinLog(player){

  let movesFinal = movesTotal

  fetch("http://localhost:3000/wins", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
    body: JSON.stringify( {
      move_count: movesFinal,
      win_count: 1,
      player_id: player.data.id
    }  )    
  })
  .then(response => response.json())

  resetGame()
  
}

