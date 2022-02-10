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
const btnCheat = document.querySelector("#cheat-btn");
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
let moveCount = 0

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
function cheatWin(){
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

// Load the DOM; 
document.addEventListener('DOMContentLoaded', () => { 
  console.log("DOM loaded")//had:  // getTiles()   // fetch board
    

  fetchPlayer()
  //loadPlayerBoard()

  newGame()



  //newPlayerEvent() // set the button newPlayer clickable
  // selectPlayerForm.style.display = 'none' //hide form
})

function fetchPlayer() {
  fetch("http://localhost:3000/players")
  .then(response => response.json())
    .then(players => {
      players.data.forEach( data => { 
        newPlayer = new Player(data)
        //console.log(newPlayer)

      })
      displayWinnerBoard()
    })
}



function displayWinnerBoard() {
  let first15 = Player.all.slice(0, 15);  //grab first 15 players in array

  for (let i = 0; i < (first15.length); i++) {
    let player = Player.all[i]   // console.log(Player.all[i])
    document.querySelector(`#slot${i+1}`).innerHTML += player.renderPlayerHTML()
  }
}






// [New Game] : select play button
function newGame() {
  btnPlay.addEventListener('click', function(e) {

    cheatWin()

    getGameTiles()

    firstMove()

    btnPlay.innerText = "Reset"
    resetGame()
  });
}



function resetGame(){
  btnPlay.addEventListener('click', function(e) {
    // document.reload()
    window.location.reload();    //https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
  })
}



//  [TILES] loads tiles
function getGameTiles() {
  fetch("http://localhost:3000/games")
  .then(response => response.json())
   .then(games => {
      games.data.forEach( data => { //console.log(data)
        //console.log(data.attributes.board_id)
        //console.log(data.attributes.tiles)

        let newGame = new Game(data)    //console.log(newGame)
        //show game id
        document.querySelector("#game-details .game-ids").innerHTML += `game id: ${newGame.id}`

        let newBoard = new Board(data.attributes.board_id)

        //show board id
        document.querySelector("#game-details .game-ids").innerHTML += `board id: ${newBoard.id}`

        //show move count
        document.querySelector("#game-details .move-count").innerText =  `move count: ${moveCount}` 

        //remove players div content
        document.querySelector(".player-container").innerText =  ""

        //diplay Game Outcome
        document.querySelector("#game-details .game-outcome").innerText =  `Game Status: in progress`

        data.attributes.tiles.forEach( tileData =>  {
          let newTile = new Tile(tileData)  //console.log(tile)
          document.querySelector(pegArray[`${tileData.id}`-1]).innerHTML += newTile.renderPegHTML()
          newTile.renderPegElements() 
        })

      })
      // .catch(err => console.dir(err))
      })
}









/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//[MOVE 1]
function firstMove() {
  instructions.innerText = `[firstMove] Click a peg to remove`

  board.addEventListener('click', (event) => {
    if (validClick(event)){
      let id = event.target.id //=> peg1 
      //console.log(event.target)//=>peg1

      //let pegClicked =  document.querySelector(`#${id}`) 
      let tileClicked = Tile.findById(id)
      //console.log(tileClicked) //Tile {id: 'peg1', ...}

      // let pegActiveStatus =  document.querySelector(`#${id}.active`)
      tileClicked.active = false

      setPegColor(tileClicked) // pegClicked.style.backgroundColor = '#bbb'
      //console.log(tileClicked)//=> peg1


      selectPeg()

    } else {
      console.log("clicked ignore. go again")
      firstMove()
    }
  }, {once : true})
}



//[MOVE 2]
function selectPeg(){

  if (Game.checkGameResult() === "game over"){
    return
  }


  instructions.innerText = "[selectPeg] Select a Violet Peg to move"
  resetOptionsArray()

  board.addEventListener('click', (event) => {       
    if (validClick(event) && getClickStatus(event) === true){ 
      let id = event.target.id//=> peg6
      let tile = Tile.findById(id)//=> Tile 6
      pegSelected = tile//=> Tile 6 //this is used in functions below

      let pegClicked =  document.querySelector(`#${id}`)//=> button for peg6
      pegClicked.style.backgroundColor = 'yellow'

      let optionsString = tile.options //=> '[1, 4, 15]' //=>string     //console.log(optionsString)//=> '[1, 4, 15]'      
      let optionsStringToArray = optionsString.substr(1, optionsString.length-2).split(", ")//=> (3) ['1', '4', '15']

      function checkOptions(){
        optionsStringToArray.forEach(function(num){
          let peg = document.querySelector(`#peg${num}.active`)
          //console.log(typeof peg.innerText) //=> string - leave below as 'false' string!
          if (peg.innerText === 'false' ) {
            optionsArray.push(parseInt(num))//=>needs to be in int for selectMovePosiiton()   //console.log(parseInt(num))
          }
        })
      } 
      checkOptions()

      displayOptionsText.innerHTML = `Peg Options: ${optionsArray}`

      selectMovePosition()

    } else {
      //alert("Invalid Peg Selected. Please choose a violet peg.");
      console.log("click ignored")

      selectPeg()
    }
    //Tile.checkGameResult()
  }, {once : true})

  //Tile.checkGameResult()

}


//[MOVE 3]
function selectMovePosition(){
  instructions.innerText = "[selectMovePosition] Select available position to move Peg."

  // Tile.checkGameResult()

  board.addEventListener('click', (event) => {   
    let tile = Tile.findById(event.target.id)

    //to unselect peg
    if (tile === pegSelected) {
      console.log("means they clicked the selected peg")

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
        //Tile.checkGameResult()

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

  // console.log("Tiles removed:, final")
  // console.log(Tile.checkPegsRemoved())

  resetMove()

  //Tile.checkGameResult()


  selectPeg()

  //Tile.checkGameResult()

  document.querySelector("#game-details .move-count").innerText =  `move count: ${moveCount += 1}` 
  
  gameWon()
}

//[MOVE 5]
function resetMove() {

  //Tile.checkGameResult()

  let optionsArray = []
  let pegSelected = ""
  let pegPicked = ""
  let optionIndex = ""
  let pegRemoved = ""

  resetOptionsArray()

  displayOptionsText.innerText = `\n`

  //Tile.checkGameResult()
}


function resetPegSelect() {
  document.querySelector(`#${pegSelected.id}`).style.backgroundColor = 'violet'
  pegSelected = ""
  optionsArray = []
  displayOptionsText.innerHTML = `\n`

  selectPeg()
}


function gameWon(){
  if (Game.checkWin() === true){
    document.querySelector(".form-container").innerHTML = Player.renderPlayerForm()

    newPlayerEvent()

    postFetchPlayer(nameInput)

  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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










// [NEW PLAYER] : Select New Player User Info
// document.querySelector("#new-player-form").innerHTML += new Player(tile).renderPeg()  
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
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
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
