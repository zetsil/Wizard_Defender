
import Enemy from "../enemy.js";
export default class FiereEntity extends Enemy{

    constructor(game){
        super(game);
        this.skeleton_image.src = 'assets/fire_enemy_animation.png';
        this.Width = 34;
        this.Height = 37;
        this.max_frame = 5;
        this.fps = 10;
        this.health = 1;
        this.speed = 6;
        this.sound_kill = new Audio("assets/fire_kill.mp3");

        this.rain = false;


    }

    hit(){
        this.kill = true;
       // this.speed +=2;
       
       // this.health -= 1;
        if(this.health == 0){
           this.sound_kill.play();
           this.alive = false;
           this.game.gold += this.gold;
        }
 
     }

    
    update(deltaTime){
        var slow_buff = 0;


        if(this.game.cast_rain && !this.rain && this.created){
            var me = this;
            this.rain = true;
            this.skeleton_image.src = "assets/wet_fire_enemy_animation.png"
            setTimeout(function(){
                me.health = 0;
                me.hit();
                me.alive = false;
                
            },1000 * (4 + Math.random() *  9));
        }

    
        if(this.game.cast_rain)
        {
            var slow_buff = 3;
            
        }else
        slow_buff = 0;
    
            
            if(!deltaTime) 
             return;
            this.pos_y +=  (this.speed - slow_buff + Enemy.up_speed) / deltaTime;
        }

}
