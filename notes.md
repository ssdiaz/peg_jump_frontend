NOTES- 
- fetch requestes need a method, header, and body. so look up this code.
- if creating a new object, create it FULLY in the DOM then post to the database - can't have it just create nothing without sending to database
- for hash tables: https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/#:~:text=To%20set%20the%20key%2Fvalue,will%20be%20incremented%20by%20one
- for timer:    https://www.ostraining.com/blog/coding/stopwatch/











[[FRIDAY]]
NEEDS TO ADD TO BE FUNCTIONAL:
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
- [DONE] BLOG
     --- A Blog Post telling the story behind the application, challenges you overcame, and what you learned
- [DONE] VIDEO --- 1-2 mins
- [DONE] has 3 AJAX calls (2 of CRUD) 
    -> CREATE Players, CREATE Wins, READ Game & Peg(?), READ Players and Wins





[[SUNDAY]]STUDY GUIDE: 
- [DONE] What is a Rails API 
- [DONE] All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format. // The backend and frontend must collaborate to demonstrate Client-Server Communication.
EXPLAIN:
    - [] JavaScript - Use classes and functions to organize your code into reusable pieces. - are these classes separate? what about Ids??
    - [] JavaScript - Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax.
    - [DONE] JavaScript - Use ES6 features when appropriate (e.g. arrow functions, let & const, rest and spread syntax).
    - [DONE] Review  Creating a Rails API from Scratch - https://github.com/learn-co-curriculum/js-rails-as-api-creating-a-rails-api-from-scratch

- [] READ MY OWN NOTES!!!!!!!!!!! All 270 pages :)

In particular, the JavaScript Fundamentals concepts your reviewer may ask about include:
    - [DONE] variables
    - [DONE] data structures
    - [DONE] functions
    - [DONE] hoisting
    - [DONE] scope
    - [] context
    - [] this
    - [] closures
    - [] ES6 syntax
    - [DONE] let, const
    - [DONE] arrow functions
EXPLAIN: (Leanring Goals)
    - [] Explain how Rails routes a request to a controller and method based on the URL and HTTP verb
    - [] Use render json: to render serialized JSON
    - [] Select, Create, and Modify DOM nodes
    - [] Attach listeners to DOM nodes to respond to user interaction
    - [] Use preventDefault to control form submit behavior
    - [DONE] Use fetch with 'GET', 'POST', 'PATCH' & 'DELETE' HTTP methods
    - [DONE] Create a JavaScript object with ES6 class syntax
    - [DONE] Instantiate JavaScript objects and call methods on them.

- [] EXPLAIN:      let optionsArray = pegSelected.options.substr(1, pegSelected.options.length-2).split(", ") //=> (3)??['1', '4', '15']
  - substr() extracts part of a string. so "Hello World!".substr(1,4) //=> ello
- [] read this! for validOptionslength === 0 pero keep what we have!-  https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
- [] includes synxtax: array.includes(element, start)
- [] namspace your routes?
- [] Why add a script tag? to HTML file

- READ:
- [] for fetch/ajax requests - https://www.freecodecamp.org/news/how-to-use-fetch-api/#:~:text=Fetch%20is%20an%20interface%20for,promise%2C%20with%20a%20Response%20object.



MY NOTES:!! FROM MY STUDYGUIDE!!
- [] What is the DOM?
    - JS changes are made through the middle latyer called the DOM; DOM only knows JS and they're like twins
    - DOM is a code-based version on of your webpage (like DNA is a version of you)
    - JS was born in the browser along with the DOM (Document Object Model)
    - Browser's don't display HTML - they use it to display content
    - DOM is avaiable through two variables: window and document
        - the window variable - Chrome's information about the browser; a browser without a window is nothing
        - the document object - used to change content; has properties (like URL) and methods; the methods and propetied the DOM provides is called the DOM's API - API just means the things these objects know how to do
    - NODES - DOM nodes represent the components that make up a web page - sort of like the HTML tags
    - Updating the DOM updates the browser's rendered page ... so is the DOM just a rendered version of your browser?... 
    - changes to the DOM do not effect the HTML file on the server 
        - the HTML lives on the server and that is unchanged
    
JS Variables
    - don't declare one as undefined; variables are undefined until we assign a value, so encoutnering an undefined variable usually means the variable was declared before being used
    - no reason to use VAR - has scope issues; does not throw an error if you declare it twice; not blocked scoped the way let and const is
        - both let and const will throw an error if you delcare the same variable twice, but we can reassign a variable decalred with let 
        - const means it cannot be redeclared or reassigned
            - const object properties can still be modified tho. so I think like Object.name
    - variables decalres WITHOUT let,const,var are ALWAYS global scoped - so I probably didnt need to use const with my constants in the top - could just have used this = that --- BAD for if youre stroing PWs bc then its accessible everywhere!
Arrays
    - since the index starts at 0, the last element is always one less the length array[array.length-1]
    - .push = add to end; .unshift = add to beginning - both MUTATE the original array
    - .slice() removes elements from an array without manipulating the original array / returns a portion of an array / reutrns a COPY not the original array
        .splice() is destructive!
    - RECAP - DESTRUCTIVE:
        - push() pushes elements onto the ends of arrays  ||  pop() pops them off
        - unshift() adds elements to the beginnings of arrays  ||  shift() pulls them off
    - Array is actually a special type of Object; anything that can be done to an Object can be done to an Array
    - Data types in JS 
        ??? numbers, strings, Booleans, symbols, Objects, null, undefined
            - Array is a special type of Object
            - Fundamental Truth: all keys in Objects and all indexes in Arrays are actually strings, converted by the JS Engine
FUNCTIONS
    - First class Objects (data structures) of the langauge
        - assigned to a variable, stored in a data structure, pass as an argument, return value of another function
        - can be treated like other data types
    - Loading JavaScript on Document Load
        o	Two events that represent two important milestones in terms of page load:
            ???	1. The DOMContentLoaded event fires when your page's DOM is fully parsed from the underlying html
            ???	2. The load event fires when a resource and all its dependent resources (including CSS and JavaScript) have finished loading
        - DOMContentLoaded is the borwser's way to know when a page's HTML has loaded into the DOM
            - can't manipulate HTML elements before they load in the DOM - don't execute code until DOM is loaded
            - DOMContentLoaded does NOT wait for images and stylesheets to load; it fires onces the initial HTML document loads
            - if you need EVERYTHING to load first, use the load event instead - but if images take a bit to load it will cause a delay for the page to load if you use this event
        - JS provies us the ability to update a page WITHOUT realoading (SPA, infiate scroll...)
    - SCOPE
        - all about where it's DEFINED; not where it's invoked
        - ask yourself "What is the parent scope of this function" and that's what it has access to
        - can only climb the scope latter and not the other way around. SO nested functions have access to parent and grandparent and global scope, BUT parent scope doesn't have access to child scope
        - SCOPE CHAIN only goes in one direction; outer scope DOES NOT have access to inner scope
JS Engine
    - WHen our JS code is ran in the browser, the JS Engine makes two separate passes over our code:
        1. Compilation Phase
            - reads line by line and gives memeory to variabels and functions declared - functions get memory, new execution context with scope, and adds parent scope reference to the scope chain variables [[memory & scope]]
        2. Execution Phase
            - line by line EXECUTION; code actually runs here
            - if the engine can't find a match in the global scope - it throws a reference error
    - we can use the same identifier (const name = ) to declare variables/functions in multiple scopes
Form
    - form elements autoamtically submit the form and redirects to a new URL - need to add the preventDefault() to stop this
Fetch() function
    - AJAX technique is just a way to send data
    -  global method on the window object
    - JSON sends data in the internet formatted as a String written in JS syntax for an Object
    - the first .then() is where you tell JS to convert the network repsonse into JSON 
        --- takes response from URL and converts it to JSON
    - the final .then() is where you get some JSON passed in (the return the of the first then()) where you can then do whatver actino you want / use it to manipulate the DOM
        --- allows you to grab that converted json response to do whatever you want / maniupulate the dom
    - fetch is like a little mini browser - it gos to a URL to make a network request and sends renders it back with then
    - Correct to say: "fetch() uses an HTTP POST to send content gathered in a JavaScript Object." 
    - Data being sent in fetch() must be stored in the body of the configurationObject: this must be as a string as the data being sent is text (just like when it is received and we need to convert the response to a JSON string so we can use it to manipulate the DOM)
        *** page 110 for good example of how I should have set up fetch POST oops oh well ***
    - catch(0 is used for when things go wrong with fetch)
APIs
    - allow you to share your data with the internet / another program
JSON
    - just a way to format data
JS Objects ------ REVIEW OBJECTS PAGE 77 *****
    - not like OO Programming, more like key/value data structure
    - have { } ... const object = { ... }
    - ***** review dot notation and bracket notatino for selctingkey values ***********
    - Variables don???t work with the dot operator because it treats the variable name as a literal key 
        - address.key is trying to access the property on address with a key of key instead of street, zipCode, etc.
Asynchronous JavaScript
    - browsers use an asynchonous execution model
        - do little bits of lots of tasks until all tasks are done AKA cooking a thanksgiving meal so all is warm at the same time! 
- Rails as API
    - you don't need instance variables becasue youre not rendering views
        -  now we're directly rendering JSON in the same action (the controller) and we no longer need instance variables for the sepearate views (bc, not usign views)
        - immedaitely rendering the model the JSON and not using ERB

- ... JavaScript???s 3 magical dots can be used in two different ways:
    - rest parameter ??? allows you to collect the rest of your remining arguments that you are passing into your function into an array
        - so, function muppetlat(a,b, ...muppets) { ... means  you are getting the REST of your paramenters into an array (called muppest). If you only pass in 2 params, you get an enmpty array in muppets
    - spread operator ??? allows you to pass elements of an array into a function as an argument
        - allows us to pass elements of an array into a function as an argument 
        - add(...arr) means array=[1,2,3] will be used as arguemnts in the function
- Object.assign()
    - alows us to combine properies form multiple objects into a single object
- Hoisting
    - Javasctipe's ability to call functions BEFORE They appear in code
        - for hoisting, function must be defined using a function delcaration => name() {}
- Function Expression
    - no name: =>  function(){}
    - also just regular exxpressions => 1+1
    - return is the function itself
    - JS doesn't recognize this as a function expression but as a function delcaraion thats missing a name
    - to tell JS that it's a funciton expression, use the grouping operator () ; meaning, wrap it in the grouping operator () to tell JS to interpret what's inside the () as a value and not a declaration
    - functions with no name are anonymous and no way to call them directly; we loose access to them immediately once created
        - how to invoke? use it as a callback functions like in event listeners
        - or, you can assign it to a varaible and use that variable as a pointer and call it with ()
    - NOTE; Functional expressions ARE NOT HOISTED - same for any varaibel assigment
- IIFE - immediately invoked function expression
    (function(baseNumber){
        return basenumber + 3
    })(2) //=> 5



OTHER
- behvaiors on objects are called methods
- using innerHTML can lead to HTML hacks if using userr driven data



REFACTOR
- *** line 65 - insertAdjacentHTML ***