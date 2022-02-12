Project Requirements:
    - Build a SPA (Single Page Application)
    - Frontend - HTML, CSS, JS; render objects to the DOM
    - Frontend will communicate with a backend API built with Ruby and Rails
    - The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format.
    - The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.
    - The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.
    - The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, and Delete (CRUD). Your client-side JavaScript code must use fetch with the appropriate HTTP verb, and your Rails API should use RESTful conventions.


Project Idea: The Peg Game
            *1*
         2     3
     *4*     5    *6*
   7     8     9    10
11   12    13    14   15


USER STORY ("player"):
    - A player can select a peg to move to remove all pegs except 1 in gameplay. 
    - A player loses when all pegs on the board no longer have avaiable 'options' to select
    - A player wins when 1 peg remains on the board (with no available 'options')
    - A player can restart a game
    - If a player wins, they can save their name to the winners board
    - A player can choose to cheat and add their name to the winners board
    - The Winner's Board shows the 15 most recent wins, name, and move-count 

STRETCH GOALS:
    - [DONE] a player can redo a move
    - [DONE] stats board - top 15 most recent wins/players 
    - [] stats board - top player with most wins
    - [] a player profile and selected avatar
    - [] add a clock
    - [] highscore board keeps track of (1) moves, (2) and time


MODELS (draft)
    Game
        has_one: :board
        has_many :tiles, through: :board

    Board
        has_many :tiles
        belongs_to :game

    Tile 
        ** Tiles do not create/update/destroy **
    
    Player
        has_many :wins 
        validates_presence_of :name
        # validates_uniqueness_of :name 
    
    Wins
        belongs_to :player


SEED DATA (draft)
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

MOVE STEPS
    1. firstMove()              --> [EVENT LISTENER] --> runs once 
    2. *selectPeg()*            --> [EVENT LISTENER]
    3. selectMovePosition()     --> [EVENT LISTENER]
    4. movePegs()
    5. resetMove() 
        --> then selectPeg()


Game Play ** - Have to base selection on removal; meaning a player can only select null tiles
    - track null tiles 
    - so, tile[01], peg: true/false (true = taken, false = empty/removed peg)
    - since 01 is false, options for selection is: 04 & 06

    - Tile Setup:
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


STEPS OF CREATING REPO:
- Create GitHub Repo - kept the backend and front end as separate repos linked in each README.md
- In terminal, 
    - create API - rails new peg_game_backend_api --api
    - cd into the project
    - make github repo now, don't add readme or linsence -- readme is added with rails new, and licenese you can add in GitHub after
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
    - To load your font end, run 'open index.HTML' in terminal
    - To load your database, run 'rails s' in backend

To run your JSON server
    <!-- npm install -g json-server
    json-server --watch db.json -->



Test Data Below:
----------------------------------------------------------------------------------------

[  ]  [  ]  [  ]  [  ]  [01]  [  ]  [  ]  [  ]  [  ]
[  ]  [  ]  [  ]  [02]  [  ]  [03]  [  ]  [  ]  [  ]
[  ]  [  ]  [04]  [  ]  [05]  [  ]  [06]  [  ]  [  ]
[  ]  [07]  [  ]  [08]  [  ]  [09]  [  ]  [10]  [  ]
[11]  [  ]  [12]  [  ]  [13]  [  ]  [14]  [  ]  [15]

def display_board
  puts "[  ]  [  ]  [  ]  [  ]  [01]  [  ]  [  ]  [  ]  [  ]"
  puts "[  ]  [  ]  [  ]  [02]  [  ]  [03]  [  ]  [  ]  [  ]"
  puts "[  ]  [  ]  [04]  [  ]  [05]  [  ]  [06]  [  ]  [  ]"
  puts "[  ]  [07]  [  ]  [08]  [  ]  [09]  [  ]  [10]  [  ]"
  puts "[11]  [  ]  [12]  [  ]  [13]  [  ]  [14]  [  ]  [15]"
end

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