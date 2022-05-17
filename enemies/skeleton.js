import Enemy from "../enemy.js";
export default class Skeleton extends Enemy
{
    constructor(game)
    {

        super(game);
        this.kill_sound = new Audio("assets/skeleton_kill.mp3");
      

     
 }



 hit(){
    this.kill = true;
    this.speed +=2;
    this.health -= 1;
    if(this.health == 0){
       this.speed = -20;
       this.kill_sound.play();
       var me = this;
       setTimeout(function(){me.alive = false;},500);
       this.game.gold += this.gold;
    }

 }

 
}

