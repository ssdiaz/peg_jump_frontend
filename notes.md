NOTES- 
- fetch requestes need a method, header, and body. so look up this code.
- if creating a new object, create it FULLY in the DOM then post to the database - can't have it just create nothing without sending to database
- for hash tables: https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/#:~:text=To%20set%20the%20key%2Fvalue,will%20be%20incremented%20by%20one
- for timer:    https://www.ostraining.com/blog/coding/stopwatch/











[[[FRIDAY]]]
NEED TO ADD TO BE FUNCTIONAL:
- [DONE] if you click on a blank tile, ignore
- [DONE] if you click same time again, unselect it; only for selectPeg
- [DONE] a way to check the board and if won/loss
- [DONE] if wins, saves player to list
- [DONE] should I be posting the tiles? and recreating the game with reset?...no; seed data below

Other things to do:
- [DONE] Confirm Requirements
- [DONE] Readme w/Backend Repo
- [DONE] Finish the design / layout
    - [DONE] Format pegs look
    - [DONE] If click ignore peg, do nothing
    - [DONE] refactor the pegs format
    - [DONE] Add image in front view
    - [DONE] make everything static on page; in terms of layout
- [DONE] Refactor index.js COMPLETELY!
    - [DONE] Fix Peg Options Display
    - [DONE] Remove unused items - like routes
    - [X] Figure out Seed Data and such
    - [DONE] Check variable names and such
    - [DONE] MOVES
      - [DONE] MOVE 1
      - [DONE] MOVE 2
      - [DONE] MOVE 3 - selectMovePosition
      - [DONE] MOVE 4
      - [DONE] refine MOVES intructions
- [X] [STRETCH_GOALS]
    - [X] Win streak? instead of move count
    - [X] Demo Move?
    - [X] Updated Notes and User Story - add a line to see note.md to readme
    - [X] only let pegs.active = true pegs be clickable
    - [X] Use javascript/css animation with webkits
    - [X] Timer Challenge - when timer hit, can't use cheat. save time to board. Create faster player board.



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
- []
- [] EXPLAIN:      let optionsArray = pegSelected.options.substr(1, pegSelected.options.length-2).split(", ") //=> (3) ['1', '4', '15']
  - substr() extracts part of a string. so "Hello World!".substr(1,4) //=> ello
- [] read this! for validOptionslength === 0 pero keep what we have!-  https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
- [] includes synxtax: array.includes(element, start)
- [] namspace your routes?
- [] Why add a script tag? to HTML file
