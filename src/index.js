// Constants used throughout
const board = document.getElementById('board'); 
const btnPlay = document.querySelector("#play-btn");
const instructions = document.querySelector(".directions")
const instructionsHeader = document.querySelector(".instructions-header")
const displayOptionsText = document.querySelector(".display-options")

// Variables
let validOptions = []
let pegSelected = "" 
let pegPicked = ""
let pegRemoved = ""
let movesTotal = 0 

// Load the DOM;
document.addEventListener('DOMContentLoaded', () => {    
  console.log("DOM loaded") 
  fetchPlayer() 
  newGame()
})

// GET fetch Players from database
function fetchPlayer() {  
  fetch("http://localhost:3000/players")
  .then(response => response.json())
    .then(players => {
      players.data.forEach( data => { 
        newPlayer = new Player(data)
      })
      fetchWins()
    })
}

// GET fetch Wins from database
function fetchWins() { 
  fetch("http://localhost:3000/wins")
  .then(response => response.json())
    .then(winsData => {
      winsData.data.forEach( data => { 
        newWin = new Win(data)
      })
    displayWinnerBoard()
    })
}

// Display Winner's Board
function displayWinnerBoard() { 
  let first15Players = Player.all.slice(0, 15);

  for (let i = 0; i < (first15Players.length); i++) {
    let player = first15Players[i]
    let playerId = parseInt(player.id)
    let winPlayer = Win.findByPlayerId(playerId)

    document.querySelector(`#slot${i+1}`).innerHTML += player.renderPlayerHTML(i+1)
    document.querySelector(`#slot${i+1}`).innerHTML += winPlayer.renderMoveHTML()
  }
}

// Load Game Listener
function newGame() {  
  btnPlay.addEventListener('click', function(e) {
    document.body.style.backgroundImage = "url('')" 
    document.querySelector(".directions").style.textAlign = 'center'

    getGameTiles()
    changeToResetBtn()

    firstMove()
    cheatWin() 
  });
}

//  GET fetch Tiles
function getGameTiles() {
  fetch("http://localhost:3000/games")
  .then(response => response.json())
  .then(games => {
    games.data.forEach( data => { 
      let newGame = new Game(data)

      //remove players div content
      document.querySelector(".player-container").innerText =  ""

      //show move count
      document.querySelector("#game-details .move-count").innerText =  `Move Count: ${newGame.moveCount}` 

      //diplay Game Outcome
      document.querySelector("#game-details .game-outcome").innerText =  `Game Status: In Progress`

      data.attributes.tiles.forEach( tileData =>  {
        let newTile = new Tile(tileData)
        document.querySelector(`#tile${newTile.number}`).innerHTML += newTile.renderPegHTML()
        newTile.renderPegElements() 
      })
    })
  })
}

// Move 1 - First Move; runs once
function firstMove() {
  instructions.innerText = 'Click a peg to remove'
  nextMoveColor("violet")

  board.addEventListener('click', (e) => {
    if (validClick(e)){
      let tileClicked = Tile.findById(e.target.id )
      tileClicked.active = false
      setPegColor(tileClicked)
      selectPeg()
    } else { 
      firstMove()
    }
  }, {once : true})
}

// Move 2 - start of play loop
function selectPeg(){

  if (checkGameOver()) { return }

  instructions.innerText= `Select a peg to move`
  nextMoveColor("violet")

  board.addEventListener('click', (e) => { 
    if (validClick(e) && clickedTileStatus(e) === true) { 
      pegSelected = Tile.findById(e.target.id)
      document.querySelector(`#${pegSelected.id}`).style.backgroundColor = 'yellow'

      let optionsArray = pegSelected.options.substr(1, pegSelected.options.length - 2).split(", ").map(num => parseInt(num))

      optionsArray.forEach(function(num) {
        let pegOption = Tile.findById(`peg${num}`)
        let pegToRemove = Tile.returnRemovedPeg(pegSelected, pegOption)

        if (pegOption.active === false && pegToRemove.active === true) {
          validOptions.push(num) 
        }
      })
      
      validOptions.length === 0 ? displayOptionsText.innerHTML = `<br><br>` : displayOptionsText.innerText = `\nOptions for Selected - Pegs: ${validOptions}`
      selectMovePosition()

    } else {   
      selectPeg()
    }
  }, {once : true})
}

// Move 3
function selectMovePosition(){
  instructions.innerText = 'Select an available position to move selected peg'
  nextMoveColor("grey")

  board.addEventListener('click', (e) => {
    pegPicked = Tile.findById(e.target.id)

    // To unselect peg:
    if (pegPicked === pegSelected) { 
      resetPegSelect()
      return
    }

    if (validClick(e)) {    
      pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked)
      
      if ( (pegPicked.active === false)  &&  (validOptions.includes(pegPicked.number, 0))  &&  (pegRemoved.active === true) ) { 
        movePegs() 
      } else {
        (pegRemoved && pegRemoved.active === false) ? alert("No Peg to remove. Please re-select.") : alert("Invalid option for peg selected. Please re-select.");
        resetPegSelect()
        return
      }
    } else { 
      selectMovePosition()
    }
  }, {once : true})
}

// Move 4
function movePegs(){
  document.querySelector("#game-details .move-count").innerText =  `Move Count: ${movesTotal += 1}` 

  pegSelected.active = false
  setPegColor(pegSelected) 

  pegPicked.active = true
  setPegColor(pegPicked) 
  
  pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked)
  pegRemoved.active = false
  setPegColor(pegRemoved)

  resetMove()
  selectPeg()  
}

// Move 5
function resetMove() {
  pegSelected = ""
  pegPicked = ""
  pegRemoved = ""
  validOptions = []
  displayOptionsText.innerHTML = `<br><br>`
}


//Helper Methods:

// Change Play button to reset
function changeToResetBtn(){
  btnPlay.innerText = "Reset"
  btnPlay.addEventListener('click', function(e) {
    resetGame()
  })
}

// Set peg color on DOM
function setPegColor(tile){
  let peg = document.querySelector(`#${tile.id}`)

  if (tile.active === true) {
    peg.style.backgroundColor = 'violet'
  } else {
    peg.style.backgroundColor = '#bbb'
  }
}

// Changes the color of the instruction 'NEXT' move peg 
function nextMoveColor(color){
  if (color === "violet") {
    return instructionsHeader.innerHTML = `<h5> Next Move: <span style="color: violet">violet</h5>`
  } else {
    return instructionsHeader.innerHTML = `<h5> Next Move: <span style="color: #bbb">&nbsp;&nbsp;grey</h5>`
  }
}

// Check if clicked a valid tile
function validClick(e){
  if (e.target.id !== 'ignore' && (e.target.nodeName === 'DIV' || e.target.nodeName === 'BUTTON')) {    
    return true
  }
}

// Returns clicked tile status
function clickedTileStatus(event) {
  let tile = Tile.findById(event.target.id)
  return tile.active
}

// Reselect peg clicked
function resetPegSelect() {
  document.querySelector(`#${pegSelected.id}`).style.backgroundColor = 'violet'
  pegSelected = ""
  validOptions = []
  displayOptionsText.innerHTML = `<br><br>`
  selectPeg()
}

// Reset Game / Reload window page
function resetGame(){
  window.location.reload();
}

// To cheat a win
function cheatWin() {
  document.querySelector(".cheat").innerHTML = `<p><button id="cheat-btn">CHEAT?</button></p>`
  
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

    checkGameOver()
  })  
}

// Check if Game Over
function checkGameOver() {
 if (Game.checkGameResult() === "game over"){
    const outcome = Game.checkWin() === true ? "WON" : "Loss"
    document.querySelector("#game-details .game-outcome").innerText = `Game Over: ${outcome}`
    instructions.innerHTML = ``
    
    checkGameWin()   
    return true
  }  
}

//For Games Won: 

function checkGameWin(){
  if (Game.checkWin() === true){
    document.querySelector(".instructions-header").innerHTML = `<h5> Next Move: &#128526; </h5>` //emoji
    document.querySelector(".directions").style.backgroundColor = "white"

    document.querySelector(".player-form-container").innerHTML = Player.renderPlayerForm()
    newPlayerEvent()
  }
}

function newPlayerEvent(){  
  const selectPlayerForm = document.querySelector("#create-player-button")

  selectPlayerForm.addEventListener("click", (e) => {
    e.preventDefault()
    const userInput = document.querySelector("#input-name").value 
    userInput ? postFetchPlayer(userInput) : alert("Username cannot be empty") 
  })      
}

function postFetchPlayer(userInput){ 
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
    createWin(player)
  })
  .catch(function(error){
    alert("Invalid Username. Please try again.");
    console.log(error.message)
  })
}

function createWin(player){
  fetch("http://localhost:3000/wins", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
    body: JSON.stringify( {
      move_count: movesTotal,
      win_count: 1,
      player_id: player.data.id
    })    
  })
  .then(response => response.json())
  resetGame()
}
