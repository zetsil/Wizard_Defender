import Enemy from "../enemy.js";

export default class EvilKnight extends Enemy{

    constructor(game){
        super(game);
        this.skeleton_image.src = 'assets/evil_knight_animation.png';
        this.kill_sound = new Audio("assets/knight_kill.mp3");
        this.Width = 70;
        this.Height = 60;
        this.max_frame = 3;
        this.fps = 5;
        this.frameInterval = 1000/this.fps;
        this.bounce_off = true;
        this.gold = 5;
        this.health = 5;

        
     //   this.frameInterval = 1000/this

    }

    hit(){
        this.kill = true;
        this.speed +=2;
        this.health -= 1;
        if(this.health == 0){
           this.speed = -20;
           var me = this;
           this.kill_sound.play();
           setTimeout(function(){me.alive = false;},500);
           this.game.gold += this.gold + Enemy.gold_up;
        }
 
     }

    



    
}