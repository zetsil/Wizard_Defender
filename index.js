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
document.getElementById("wizard").addEventListener("click",addWizard);


document.getElementById("bomb").addEventListener("click",startBomb);




document.getElementById("archer_speed").addEventListener("click",incresArcherSpeed);
document.getElementById("rain_cost_decrees_button").addEventListener("click",rainCost);
document.getElementById("snow_cost_decrees_button").addEventListener("click",snowCost);
document.getElementById("gold_cart_increase_button").addEventListener("click",cartSpeed);
document.getElementById("gold_speed_button").addEventListener("click",goldSpeed);


const assets = [
  "assets/RetroPickUpCoin.wav",
  "assets/RetroChargeMagic.wav",
  "assets/game_hit_sound_effect.mp3",
  "assets/mixkit-explosion-spell.wav",
  "assets/archer_1.mp3",
  "assets/archer_2.mp3",
  "assets/archer_3.mp3",
  "assets/archer_4.mp3",
  "assets/archer_5.mp3",
  "assets/skeleton_animation.png",
  "assets/archere_animation.png",
  "assets/solider_animation.png",
  "assets/wizard_violet.png",
  "assets/gold_cart.png",
  "assets/game_hit_sound_effect.mp3",
];


const assetsLoaded = assets.map(url =>
  new Promise((resolve, reject) => {
    const extension =url.split('.').pop();
    if(extension == "mp3" || extension == "wav")
       var  sound = new Audio(url);
    else   
       var img = new Image(url);

    if(extension == "mp3" || extension == "wav")
    {
      sound.onerror = e => reject(`${url} failed to load`);
      sound.onload = e => resolve(img);
      sound.src = url;
    }else
    {
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
  .catch(err => console.error(err)
  
  )
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

    let rain_cost = document.getElementById("RAIN_COST");
    let snow_cost = document.getElementById("snow_cost");
    let fire_cost = document.getElementById("fire_cost");
    let bomb_count = document.getElementById("bomb_number");

    let VIKING = document.getElementById("viking");
    let solider = document.getElementById("solider");
    let gold_cart = document.getElementById("gold_cart");
    let archer = document.getElementById("archer");
    let wizard = document.getElementById("wizard");
    let gold_space = document.getElementById("gold_space");

    let VIKING_cost = document.getElementById("viking_cost");
    let solider_cost = document.getElementById("solider_cost");
    let gold_cart_cost = document.getElementById("gold_cart_cost");
    let archer_cost = document.getElementById("archer_cost");
    let wizard_cost = document.getElementById("wizard_cost");



    mana_space.style.visibility="visible";
    rain_space.style.visibility="visible";
    snow_space.style.visibility="visible";
    fire_space.style.visibility="visible";
    bomb.style.visibility="visible";

    rain_cost.style.visibility="visible";
    snow_cost.style.visibility="visible";
    snow_space.style.visibility="visible";
    fire_cost.style.visibility="visible";
    bomb_count.style.visibility="visible";

    solider.style.visibility="visible";
    gold_cart.style.visibility="visible";
    archer.style.visibility="visible";
    wizard.style.visibility="visible";
    gold_space.style.visibility="visible";
    VIKING.style.visibility="visible";

    solider_cost.style.visibility="visible";
    gold_cart_cost.style.visibility="visible";
    archer_cost.style.visibility="visible";
    wizard_cost.style.visibility="visible";
    VIKING_cost.style.visibility="visible";



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

function addWizard(){
  if (typeof game != 'undefined')
     game.addWizard();
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

function goldSpeed(){
  if (typeof game != "undefined")
     game.increaseGoldSpead();
}