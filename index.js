import Game from "./gameLoop.js"
console.log("start game!");

document.getElementById("myBtn").addEventListener("click", startGame);

//mana event listenet
document.getElementById("mana_space").addEventListener("mouseenter",increaseMana);
document.getElementById("mana_space").addEventListener("mouseleave",stopMana);
//gold event listener
document.getElementById("gold_space").addEventListener("mouseenter",increaseGold);
document.getElementById("gold_space").addEventListener("mouseleave",stopGold);

document.getElementById("rain").addEventListener("click",startRain);
document.getElementById("snow").addEventListener("click",startSnow);
document.getElementById("archer").addEventListener("click",addArcher);
document.getElementById("gold_cart").addEventListener("click",addCart);
document.getElementById("solider").addEventListener("click",addSolider);



document.getElementById("archer_speed").addEventListener("click",incresArcherSpeed);
document.getElementById("rain_cost_decrees_button").addEventListener("click",rainCost);
document.getElementById("snow_cost_decrees_button").addEventListener("click",snowCost);
document.getElementById("gold_cart_increase_button").addEventListener("click",cartSpeed);






var game;
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("upgrade");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  game.pause();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  game.un_pause();

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    game.un_pause();
  }}



 function startGame(){
     if(game)
        return;
    let startScreen = document.getElementById("start-screen");
    let mana_space = document.getElementById("mana_space");
    let rain_space = document.getElementById("rain");
    let snow_space = document.getElementById("snow");
    let fire_space =  document.getElementById("fire");
    mana_space.style.visibility="visible";
    rain_space.style.visibility="visible";
    snow_space.style.visibility="visible";
    startScreen.style.visibility='hidden';
    fire_space.style.visibility="visible";

    var popup = document.getElementById("myPopup");
    popup.innerHTML = "<----Use blue space to regenerate mana";

    popup.classList.toggle("show");
    popup.style.opacity = (popup.style.opacity == 1) ? 0 : 1;   

    
    setTimeout(function(){popup.classList.toggle("hide");},7000);




    var canvas = document.getElementById("gameScreen");
    let ctx = canvas.getContext("2d");







    game = new Game(ctx);
   // var move = 0;
  //   canvas.addEventListener("mousemove", function(e) { 
  //     var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
  //     var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
  //     var canvasY = Math.round(e.clientY - cRect.top); 
      
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
  //     var max_mov = -5;
      
  //     if(canvasX <  (canvas.width/2 ))
  //         move = -1 *(canvas.width/2 - canvasX - 1 );
  //     if(move <= max_mov)
  //         move = max_mov;    

  //     if(canvasX >  (canvas.width/2))
  //         move =  canvasX - canvas.width/2  ;
  //     if(move >= -max_mov)
  //         move = -max_mov ;        



  //     console.log(move);

              
            
  //     ctx.resetTransform();
  //     ctx.translate(move,0);
                      
  //     ctx.fillStyle = "grey";
  //     ctx.font = '48px serif';  // from the X/Y positions to make  
  //    // ctx.restore();     
  // });

   game.gameLoop();

    canvas.onclick = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;

        game.checkClickedObject(x,y);

    }



    // base_image = new Image();
    // base_image.src = 'assets/skeleton.png';
    // base_image.onload = function(){
    //     ctx.drawImage(base_image, 0, 0);
    //  }
}

function increaseMana()
{
 if (typeof game != "undefined")
  game.increaseMana();
 
}

function stopMana(){
if (typeof game != "undefined")
    game.stopMana();
}

function increaseGold()
{
 if (typeof game != "undefined")
  game.increaseGold();
 
}

function stopGold(){
if (typeof game != "undefined")
    game.stopGold();
}

function startRain(){
    if (typeof game != "undefined")
       game.castRain();
}

function startSnow(){
    if (typeof game != "undefined")
       game.castSnow();
}

function addArcher()
{
    if (typeof game != "undefined")
       game.addArcher();
}

function addCart(){
  if (typeof game != "undefined")
      game.addCart();
}

function addSolider(){
  if (typeof game != "undefined")
      game.addSolider();
}


function incresArcherSpeed(){
    console.log("heloo");
    if (typeof game != "undefined")
       game.incresArcherSpeed();
}

function rainCost(){
  if (typeof game != "undefined")
     game.rain_cost_decrees();
}
function snowCost(){
  if (typeof game != "undefined")
      game.snow_cost_decrease();
}

function cartSpeed(){
  if (typeof game != "undefined")
      game.increase_gold_cart_speed();
}