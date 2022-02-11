Build a SPA (Single Page Application)

- Frontend - HTML, CSS, JS
- Frontend will communicate with a backend API built with Ruby and Rails

Requirements:
- The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format.

- The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.

- The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.

- The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, and Delete (CRUD). Your client-side JavaScript code must use fetch with the appropriate HTTP verb, and your Rails API should use RESTful conventions.


The Peg Game
            *_*
         2     3
     *4*     5    *6*
   7     8     9    10
11   12    13    14   15

[  ]  [  ]  [  ]  [  ]  [01]  [  ]  [  ]  [  ]  [  ]
[  ]  [  ]  [  ]  [02]  [  ]  [03]  [  ]  [  ]  [  ]
[  ]  [  ]  [04]  [  ]  [05]  [  ]  [06]  [  ]  [  ]
[  ]  [07]  [  ]  [08]  [  ]  [09]  [  ]  [10]  [  ]
[11]  [  ]  [12]  [  ]  [13]  [  ]  [14]  [  ]  [15]

Display board
	def display_board(tile)
        puts "[  ]  [  ]  [  ]  [  ]  #tile{[01]}  [  ]  [  ]  [  ]  [  ]"
        puts "[  ]  [  ]  [  ]  #tile{[02]}  [  ]  #tile{[03]}  [  ]  [  ]  [  ]"
        puts "[  ]  [  ]  #tile{[04]}  [  ]  #tile{[05]}  [  ]  #tile{06]}  [  ]  [  ]"
        puts "[  ]  #tile{[07]}  [  ]  #tile{[08]}  [  ]  #tile{[09]}  [  ]  #tile{[10]}  [  ]"
        puts "#tile{[11]}  [  ]  #tile{[12]}  [  ]  #tile{[13]}  [  ]  #tile{[14]}  [  ]  #tile{[15]}"
    End

def display_board
  puts "[  ]  [  ]  [  ]  [  ]  [01]  [  ]  [  ]  [  ]  [  ]"
  puts "[  ]  [  ]  [  ]  [02]  [  ]  [03]  [  ]  [  ]  [  ]"
  puts "[  ]  [  ]  [04]  [  ]  [05]  [  ]  [06]  [  ]  [  ]"
  puts "[  ]  [07]  [  ]  [08]  [  ]  [09]  [  ]  [10]  [  ]"
  puts "[11]  [  ]  [12]  [  ]  [13]  [  ]  [14]  [  ]  [15]"
end

Game Play ** - Have to base selection on removal; meaning a player can only select null tiles
- track null tiles in a hidden manner (DB). 
- so, tile[01], peg: true/false (true = taken, false = empty; removed peg)
- since 01 is false, options for selection is: 04 & 06
- **if selection = 04 && user clicks 01 - remove 02**

    selection = if click && peg === true
        ** hover/opaque options ** 
    click = if click && selection.options == true && selection.option[i].peg === false
        ** make move **

    selection = tile[04]
    click = tile[01]
    indexToRemove = selection.options.find(index[click])     ===> returns index of 0
    tileToRemove = selection.removes[indexToRemove])         ===> indexToRemvoe=0 so returns 2 
    
    //actions moves
    tileToRemove.peg = false
    selection.peg = false
    click.eg = true

    - ...save to board....
    - ... run new display ... 
    - ... show options for selection ---> 


name/id: Objects Picked -> options | removes |  peg
01 -> options: [4,6], removes: [2,3], peg: true => defaults to true; true or false (boolean)
02 -> options: [7,8], removes: [4,5]
03 -> options: [8,10], removes: [5,6]
04 -> options: [1,6,13,11], removes: [2,5,8,7]
05 -> options: [12,14], removes: [8,9]
06 -> options: [1,4,15], removes: [3,5,10]
07 -> options: [2,9], removes: [4,8]
08 -> options: [3,10], removes: [5,9]
09 -> options: [2,7], removes: [5,8]
10 -> options: [3,15,8], removes: [6,9]
11 -> options: [4,13], removes: [7,12]
12 -> options: [5,14], removes: [8,13]
13 -> options: [11,4,6,15], removes: [12,8,9,14]
14 -> options: [12,5], removes: [13,9]
15 -> options: [13,6], removes: [14,10]






Object -> Titles = 1-15
Title1: number:1,  options: [4,6], removes: [2,3]
...
Tile6: number:6, options: [1,4], removes: [3,5]
...
Tile 15: ... 

Tile.selection = 6    -> user 'clicked' to highlight/select
Tile.options = [4, 6] -> options should hover/change color/opaque
- can only select a tile that is null -> 1 should color change
    - *Selection Tile6*.options.map(function(opt){
        return opt.null
        * do some color change action here, or in next function *
    })
Tile.move = 1       -> user picked tile 1
- move can only be an empty tile (title.nul) & must be selection.option

Tile.remove = 2          
                     -> selection = 1 (so title space 1). Call Tile1, find option.number[index], and match Tile1.remove[index]     
- Tile.move should call Tile.remove

- IF user makes a click and the tile is full = set tile to new selecion
    otherwise, if tile.nul, check if that tile is in selection.options and move or don't move       
- ONLY make pegs clickable if:
    1. at least 1 option is null
    OR
    2. tile === selection.option


Front-End: render objects to the DOM
Backend: (Rails) database; Tiles, and tile options, tile removes
--- build the backend first adn make sure you have seed data for the tiles
--- class Title
    has many: options -- could leave this. then less sets of arrays maybe
    has many: removals
    --- not even; these are just arrays!
    has_many: tiles

--- class GamePlay
     has many: tiles

--- class GamePlayTiles


USER STORY ("player):
- A player can select a peg to move to remove all pegs except 1 in gameplay. 
- A player loses when all pegs on the board no longer have avaiable 'options' to select
- A player wins when 1 peg remains on the board (with no available 'options')
- A player can restart a game
- If a player wins, they can save their name to a high score board

STRETCH GOALS:
- a player can redo a move
- stats board - top 10 wins/plays with time; shows name, time 
- stats board - top player with most wins
- a player profile and selected avatar
- add a clock
- highscore board keeps track of (1) moves, (2) and time



MODELS
    Game
        belongs_to :player
        has_many :tiles
        //has_one board
        //has_many :moves
        - creates a tile
        - creates a board
            - MIGRATION: player_id, win(t/f)

    Player
        has_many :games
            - MIGRATION: name

    Tile ** board changes; tiles dont **
        belongs_to :game
        belongs_to :board
            - MIGRATION: options, removes, peg, ... game_id, board_id

    Board ** board changes; tiles dont **
        belongs_to :game
        has_many :tiles
             - MIGRATION: game_id

    Move
        No associaions. Just methods & validations.
            //belongs_to :game? ... but don't give a move a game id
        VALIDATIONS: 
            valid move = 
        remove = 
        set_selection = 
        set_click = 


SEED DATA
    game1 = Game.create(id: 1, player_id: 1)
    player1 = Player.create(name: "Me")     // OR Player.create() ---> (id:1)

    tiles =
        [ 1, [4,6],      [2,3],        true],
        [ 2, [7,8],       [4,5],       true],
        [ 3, [8,10],      [5,6],       true],
        [ 4, [1,6,13,11], [2,5,8,7],   true],
        [ 5, [12,14],     [8,9],       true],
        [ 6, [1,4,15],    [3,5,10],    true],
        [ 7, [2,9],       [4,8],       true],
        [ 8, [3,10],      [5,9],       true],
        [ 9, [2,7],       [5,8],       true],
        [10, [3,15,8],    [6,9],       true],
        [11, [4,13],      [7,12],      true],
        [12, [5,14],      [8,13],      true],
        [13, [11,4,6,15], [12,8,9,14], true],
        [14, [12,5],      [13,9],      true],
        [15, [13,6],      [14,10],     true]

    tiles.each do |tile|
        Tile.create(options: tile[1], removes: tile[2], peg: true)
    end





DEFINED
- Tiles - set up in Game
-  Board - so we can see it (front end)


VARIABLES / HELPERS
- peg = !tile.null

Display board
-	def display_board (board)
-	  puts " #{board[0]} | #{board[1]} | #{board[2]} "
-	  puts "-----------"
-	  puts " #{board[3]} | #{board[4]} | #{board[5]} "
-	  puts "-----------"
-	  puts " #{board[6]} | #{board[7]} | #{board[8]} "
-	End


SUBMITTING
submit your front end repo, then link to your backend in the ReadMe.rb
using heroku, you'll havea differnt calls

STEPS OF CREATING SO FAR
- create Git Repo - I am keeping backend and front end separate repos. Submiting frontend with link to backend
- in terminal, 
    - create API - rails new peg_game_backend_api --api
    - cd into the project
    - - make github repo now, don't add readme or linsence -- readme is added with rails new, and licenese you can add after
    - git init
    - git add .
    - git commit -m "initial commit rails api"
    - add the remote: connect our local API with the remote from github repo:
        git remote add origin git@github.com:ssdiaz/peg_jump_backend_api.git
        git branch -M main
        git push -u origin main
    - now you can add the license:
        in github, add file > create new file > type license then click choose a license template > then commit directly to main 


Set up controller & routes in your backend (Rails)
To load your font end, rubn 'open index.HTML' in terminal

to run your JSON server
    <!-- npm install -g json-server
    json-server --watch db.json -->

// o	npm install -g json-server
// o	json-server --watch db.json


NEXT STEPS [[at least one has-many relationship]]
- Play Button - initiates a new Game
    - need to create a Game model
    - What does the Game model do?
        - sets up pegs
        - removes 1 peg / (SG) lets user choose peg to remove
        - each round checks if loss or win
        - defines win and loss methods
        - Game has many moves
        - Player has many games BUT a game belongs_to a :player
    - Move - is this a class?
        - Has many games? 
        - move updates the peg t/f
        - changes the peg's color - FRONTEND!
- Link the pegs to the peg JSON data
- 



const allPegs = document.querySelectorAll(".peg");





for buttons events FINALLY!
- https://stackoverflow.com/questions/49680484/how-to-add-one-event-listener-for-all-buttons/49680660





// for play button - right now changes background
const btn = document.querySelector('button');
function random(number) {
  return Math.floor(Math.random() * (number+1));
}
btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});









--------------------------------------------
Opt, Opt, Removal
R2 = 1,4,2 HAVE 
R3 = 1,6,3 HAVE 
R5= 2,9,5
R4 = 2,7,4
R5 = 3,8,5
R6 = 3,10,6
R2 = 4,1,2 HAVE
R5 = 4,6,5
R8 = 4,13,8
R8= 5,12,8
R7= 4,11,7
R9= 5,14,9
R3= 6,1,3 HAVE
R10= 6,15,10
R9= 6,13,9
R5= 6,4,5 HAVE
R4= 7,2,4 HAVE
R8= 7,9,8
R5= 8,3,5 HAVE
R9= 8,10,9
R8= 9,7,8 HAVE
R5= 9,2,5 HAVE
R6= 10,3,6 HAVE
R9= 10,8,9 HAVE
R12= 11,13,12
R7= R7= 11,4,7 HAVE
R13= 12,14,13
R8= 12,5,8 HAVE
R13= 12,14,13
R14= 13,15,14
R9= 13,6,9 HAVE
R8= 13,4,8 HAVE
R13= 14,12,13
R9= 14,5,9
R14= 15,13,14
R10 = 15,6,10 HAVE


BY REMOVAL
R2 = 1,4,2 HAVE 
R2 = 4,1,2 HAVE
2
R3 = 1,6,3 HAVE 
R3= 6,1,3 HAVE
2
R4 = 2,7,4
R4= 7,2,4 HAVE
2
R5 = 3,8,5
R5= 6,4,5 HAVE
R5= 8,3,5 HAVE
R5= 9,2,5 HAVE
R5 = 4,6,5
R5= 2,9,5
6
R6 = 3,10,6
R6= 10,3,6 HAVE
2
R7= 4,11,7
R7= R7= 11,4,7 HAVE
2
R8= 9,7,8 HAVE
R8= 12,5,8 HAVE
R8= 13,4,8 HAVE
R8 = 4,13,8
R8= 5,12,8
R8= 7,9,8
6
R9= 5,14,9
R9= 6,13,9
R9= 8,10,9
R9= 13,6,9 HAVE
R9= 10,8,9 HAVE
R9= 14,5,9
6
R10= 6,15,10
R10 = 15,6,10 HAVE
2
R12= 11,13,12
1
R13= 12,14,13
R13= 14,12,13
R13= 12,14,13
3
R14= 13,15,14
R14= 15,13,14
2