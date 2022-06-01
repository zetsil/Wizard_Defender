import Game from "./gameLoop.js"
console.log("start game!");

document.getElementById("myBtn").addEventListener("click", preloadGame);

//mana event listenet
document.getElementById("mana_space").addEventListener("mouseenter",increaseMana);
document.getElementById("mana_space").addEventListener("mouseleave",stopMana);
//gold event listener
document.getElementById("gold_space").addEventListener("mouseenter",increaseGold);
document.getElementById("gold_space").addEventListener("mouseleave",stopGold);

document.getElementById("rain").addEventListener("click",startRain);
document.getElementById("snow").addEventListener("click",startSnow);
document.getElementById("fire").addEventListener("click",startFire);
document.getElementById("archer").addEventListener("click",addArcher);
document.getElementById("gold_cart").addEventListener("click",addCart);
document.getElementById("solider").addEventListener("click",addSolider);
document.getElementById("viking").addEventListener("click",addViking);

document.getElementById("bomb").addEventListener("click",startBomb);




document.getElementById("archer_speed").addEventListener("click",incresArcherSpeed);
document.getElementById("rain_cost_decrees_button").addEventListener("click",rainCost);
document.getElementById("snow_cost_decrees_button").addEventListener("click",snowCost);
document.getElementById("gold_cart_increase_button").addEventListener("click",cartSpeed);


const assets = [
  "assets/RetroPickUpCoin.wav",
  "assets/RetroChargeMagic.wav",
  "assets/mixkit-explosion-spell.wav",
  "assets/archer_1.mp3",
  "assets/archer_2.mp3",
  "assets/archer_3.mp3",
  "assets/archer_4.mp3",
  "assets/archer_5.mp3",
  "assets/archere_animation.png",
  "assets/solider_animation.png",
  "assets/gold_cart.png",
  "assets/game_hit_sound_effect.mp3",
];


const assetsLoaded = assets.map(url =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const sound = new Audio();

    const extension =url.split('.').pop();
    if(extension == "mp3" || extension == "wav")
    {
      console.log("heloo frome here");
      sound.onerror = e => reject(`${url} failed to load`);
      sound.onload = e => resolve(img);
      sound.src = url;
    }else
    {
      console.log("heloo");
      img.onerror = e => reject(`${url} failed to load`);
      img.onload = e => resolve(img);
      img.src = url;
    }  
    
  })
);


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


  function preloadGame(){
    Promise
  .all(assetsLoaded)
  .then(startGame())
  .catch(err => console.error(err))
;
  }


 function startGame(){


     if(game)
        return;
    let startScreen = document.getElementById("start-screen");
    let mana_space = document.getElementById("mana_space");
    let rain_space = document.getElementById("rain");
    let snow_space = document.getElementById("snow");
    let fire_space =  document.getElementById("fire");
    let bomb =  document.getElementById("bomb");





    mana_space.style.visibility="visible";
    rain_space.style.visibility="visible";
    snow_space.style.visibility="visible";
    fire_space.style.visibility="visible";
    bomb.style.visibility="visible";
    startScreen.style.visibility='hidden';

    // var popup = document.getElementById("myPopup");
    // popup.innerHTML = "<----Use blue space to regenerate mana";

    // popup.classList.toggle("show");
    // popup.style.opacity = (popup.style.opacity == 1) ? 0 : 1;   

    
    // setTimeout(function(){popup.classList.toggle("hide");},7000);




    var canvas = document.getElementById("gameScreen");
    let ctx = canvas.getContext("2d");
    var table_r = document.getElementById("table_r");


    let width = screen.width;
    let height = screen.height;

    if(window.innerHeight > window.innerWidth) {
      height = screen.width;
      width = screen.height;
      popup.innerHTML = "please use landscape mode !";
    } else {
       width = screen.width;
       height = screen.height;
    }

    if (width < 1025 )
    {
       canvas.style.width = String(width - 220 + "px");
       canvas.style.height = String(height - 30 + "px");

       canvas.width = width - 220 ;
       canvas.height = height - 30;

       mana_space.style.width = "60%";
       rain_space.style.width = "60%";
       bomb.style.width = "60%";
       snow_space.style.width = "60%";
       fire_space.style.width = "60%";
       btn.style.width = "80%";

       document.getElementById("rain").style.width = "60%";
       document.getElementById("snow").style.width = "60%";
       document.getElementById("fire").style.width = "60%";
       document.getElementById("archer").style.width = "60%";
       document.getElementById("gold_cart").style.width = "60%";
       document.getElementById("solider").style.width = "60%";
       document.getElementById("bomb").style.width = "60%";
       document.getElementById("gold_space").style.width = "60%";

       let bomb_nr = document.getElementById("bomb_number");
       bomb_nr.style.fontSize = "20px";



      // table_r.style.height = String(canvas.height + "px");
    }else{
      canvas.style.width="800px"
      canvas.width = 800;
    }


   




   game = new Game(ctx,canvas.width,canvas.height);
  

   game.gameLoop();

    canvas.onclick = (e) => {
        
      var rect = canvas.getBoundingClientRect(), /// get absolute rect. of canvas
      x = e.clientX - rect.left,         /// adjust for x
      y = e.clientY - rect.top;          /// adjust for y

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


function startFire(){
  if (typeof game != "undefined")
     game.castFire();
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

function addViking(){
  if (typeof game != 'undefined')
     game.addViking();
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

function startBomb(){
  if (typeof game != "undefined")
     game.bombExplode();
}