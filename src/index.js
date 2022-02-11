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
let movesTotal = 0  //to track moves

// set end point and fetch your endpoint
//const gameEndPoint = "http://localhost:3000/games"

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
function clickedTileStatus(event) {
  let tile = Tile.findById(event.target.id)
  return tile.active
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



function displayWinnerBoard() {   // console.log("am I hitting?") //=> hits even when blank
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


//  [TILES] loads tiles
function getGameTiles() {
  fetch("http://localhost:3000/games")
  .then(response => response.json())
  .then(games => {
    games.data.forEach( data => { 

      let newGame = new Game(data)
      let newBoard = new Board(data.attributes.board_id)

      //remove players div content
      document.querySelector(".player-container").innerText =  ""

      //show move count
      document.querySelector("#game-details .move-count").innerText =  `Move Count: ${newGame.moveCount}` 

      //diplay Game Outcome
      document.querySelector("#game-details .game-outcome").innerText =  `Game Status: In Progress`

      //show game id & board id
      //document.querySelector("#game-details .game-ids").innerHTML += `Game ID: ${newGame.id}, Board ID: ${newBoard.id}`

      data.attributes.tiles.forEach( tileData =>  {
        let newTile = new Tile(tileData)
        document.querySelector(`#tile${newTile.number}`).innerHTML += newTile.renderPegHTML()
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
      //console.log("clicked ignore. go again")
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
    if (validClick(event) && clickedTileStatus(event) === true) { 
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

      let validOptions = optionsArray.filter(optionNum => {
        let pickedTile = Tile.findById(`peg${optionNum}`)
          let pegToRemove = Tile.returnRemovedPeg(pegSelected, pickedTile) 
          return pegToRemove.active === true 
        })

      validOptions.length === 0 ? displayOptionsText.innerText = `\n` : displayOptionsText.innerText = `Potential Options for Selected - Pegs: ${validOptions}`

      //displayOptionsText.innerText = `Potential Options for Selected - Pegs: ${validOptions}`

      selectMovePosition()

    } else {
      console.log("click ignored")

      selectPeg()
    }

    

  }, {once : true})

}


//[MOVE 3]
function selectMovePosition(){
  instructions.innerText = "[3selectMovePosition] Select available position to move Peg."

  board.addEventListener('click', (event) => {
    pegPicked = Tile.findById(event.target.id) //=> Tile 1

    //to unselect peg //console.log("they clicked twice to the selected peg")
    if (pegPicked === pegSelected) { 
      resetPegSelect()
      return
    }

    // check valid click
    if (validClick(event)) {    
      pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked) //=> Tile 3
      
      //IF pegPicked is free (false)              && IF pegPicked is in pegSelected array           && IF pegRemoved is active (true)
      if ( (pegPicked.active === false)  &&  (optionsArray.includes(pegPicked.number, 0))  &&  (pegRemoved.active === true) ) { 
      
        movePegs() //console.log("yes, call next function")

      } else {
        (pegRemoved && pegRemoved.active === false) ? alert("No Peg to remove. Please re-select.") : alert("Not a valid option for peg. Please re-select.");
        resetPegSelect()
        return
      }
  
    } else {
      console.log("clicked ignore")
      selectMovePosition()
    }

  }, {once : true})

}


//[MOVE 4]
function movePegs(){
  instructions.innerText = "[4movePegs]"

  pegSelected.active = false
  setPegColor(pegSelected) //=> Tile 6    //console.log(pegSelected)//=> Tile 6

  pegPicked.active = true
  setPegColor(pegPicked) //=> Tile 1    //console.log(pegPicked)//=> Tile 1  
  
  pegRemoved = Tile.returnRemovedPeg(pegSelected, pegPicked)

  pegRemoved.active = false
  setPegColor(pegRemoved)

  resetMove()

  selectPeg()

  document.querySelector("#game-details .move-count").innerText =  `Move Count: ${movesTotal += 1}` 
  
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resetPegSelect() {
  document.querySelector(`#${pegSelected.id}`).style.backgroundColor = 'violet'
  pegSelected = ""
  optionsArray = []
  displayOptionsText.innerHTML = `<br>`

  selectPeg()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gameWon(){
  if (Game.checkWin() === true){
    //render 'Save Player' form
    document.querySelector(".player-form-container").innerHTML = Player.renderPlayerForm()
    newPlayerEvent()
  }
}

// [NEW PLAYER] : Grab input from user / make a click event
function newPlayerEvent(){  // NEW PLAYER = find form, add a listener, then call callback function to action
  const selectPlayerForm = document.querySelector("#create-player-button")

  selectPlayerForm.addEventListener("click", (e) => {
    e.preventDefault() //prevent page reload
    const userInput = document.querySelector("#input-name").value 
    userInput ? postFetchPlayer(userInput) : alert("Username cannot be empty") 
  })      
}

// [NEW PLAYER] : POST fetch  //; creates new player and POST back to our database
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
    
    createWinLog(player)

  })
  .catch(function(error){
    alert("Invalid Username. Please try again.");
    console.log(error.message)
  })

}

function createWinLog(player){
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
    }  )    
  })
  .then(response => response.json())

  resetGame()  
}
