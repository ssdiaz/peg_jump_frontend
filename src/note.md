// let boardBody = document.querySelector("#board > table > tbody")
// let content = document.getElementById('board');
// let firstChild = content.firstChild.nodeName;
// console.log(firstChild)
 // const allPegs = document.querySelectorAll(".peg");
  // const board = document.getElementById('board');


// define peg buttons
// let peg1  = document.querySelector("#pegs > table > tbody > tr:nth-child(1) > td:nth-child(5)")
// let peg2  = document.querySelector("#pegs > table > tbody > tr:nth-child(2) > td:nth-child(4)")
// let peg3  = document.querySelector("#pegs > table > tbody > tr:nth-child(2) > td:nth-child(6)")
// let peg4  = document.querySelector("#pegs > table > tbody > tr:nth-child(3) > td:nth-child(3)")
// let peg5  = document.querySelector("#pegs > table > tbody > tr:nth-child(3) > td:nth-child(5)")
// let peg6  = document.querySelector("#pegs > table > tbody > tr:nth-child(3) > td:nth-child(7)")
// let peg7  = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(2)")
// let peg8  = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(4)")
// let peg9  = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(6)")
// let peg10 = document.querySelector("#pegs > table > tbody > tr:nth-child(4) > td:nth-child(8)")
// let peg11 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(1)")
// let peg12 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(3)")
// let peg13 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(5)")
// let peg14 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(7)")
// let peg15 = document.querySelector("#pegs > table > tbody > tr:nth-child(5) > td:nth-child(9)")



for color change:
// [New Game] : select play button
function random(number) {
  return Math.floor(Math.random() * (number+1));
}
  const btnPlay = document.querySelector("#play-btn");
  btnPlay.addEventListener('click', function(event) {
    event.preventDefault() 

    getTiles()// load board

    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
  });//





NOTES- 
fetch requestes need a method, header, and body. so look up this code.