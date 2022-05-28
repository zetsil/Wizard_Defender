import Solider from "./solider.js";
export default class Viking extends Solider{

    constructor(game)
    {
        super(game);
        this.game = game;
        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/viking.png';
        this.Width = 30;
        this.Height = 43;


        this.frameX = 0;
        this.max_frame = 0;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.atack_ready = true;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.slash_animation.Width = 60.8;
        this.slash_animation.Height = 56;
        this.slash_animation.skeleton_image.src = "assets/axe_animation.png";

        this.speed = 100;

        this.enemy_y = 300;
        this.enemy_x = 300;
        this.chosen_enemy = null;


        this.slash_animation.frameX = 0;
        this.slash_animation.max_frame = 32;
        this.slash_animation.fps = 30;
        this.slash_animation.frameTimer = 0;
        this.slash_animation.frameInterval = 1000/this.fps;


        this.original_pos_x = this.pos_x;
        this.original_pos_y = this.pos_y ;

        this.target_chose = false;

    }


    checkHit(enemy,x,y){
       if (Math.pow(this.pos_x - x - enemy.Width/2,2) + Math.pow(this.pos_y - y - enemy.Height/2,2) < Math.pow(enemy.Height,2))
          return true;
        return false;  

    }


    update(deltaTime)
    {
        if(!deltaTime) 
          return;
        if(this.freez_state == true)
          return;    
          if(this.pos_x > (this.game.width -15)){
            this.speed = -this.speed;
        }



        else if(this.pos_x  < 0 )
            this.speed = Math.abs(this.speed);  
            this.ctx.beginPath();
            if(this.atack_ready) {
              this.atack();
              this.slash_animation.draw(deltaTime,this.pos_x,this.pos_y);
  
            }


            if(this.chosen_enemy != null && (this.checkHit(this.chosen_enemy,this.enemy_x ,this.enemy_y + this.chosen_enemy.speed + 30) || this.chosen_enemy.kill != false  || this.pos_x > this.game.width || this.pos_x <0 || this.pos_y > this.game.height || this.pos_y <0) ){
             //   var me = this;
              //  setTimeout(function(){me.target_chose = false;},1000);
              this.target_chose  = false;
                
            }
              
            
    
    
            if(this.target_chose == false){
               this.choseTarget(); 
               this.target_chose =  true;
               this.original_pos_x = this.pos_x;
               this.original_pos_y = this.pos_y;
    
            }
            if(this.chosen_enemy != null )
            {
            this.pos_x  += (1 +(this.enemy_x   - this.original_pos_x ) )  / ( deltaTime + this.speed) ;
            this.pos_y += (1 + (this.enemy_y + this.chosen_enemy.speed + 30  - this.original_pos_y  ) )    / (deltaTime + this.speed) ;
            }
    }


    choseTarget()
    {
        this.original_pos_x = this.pos_x;
        this.original_pos_y = this.pos_y;
       var wv = this.game.current_level.wave;
       this.bool_hit = false;
        var alive_list = [];
        wv.forEach((enemy) =>{

            if(enemy.alive && enemy.created)
                alive_list.push(enemy);
        })
        if(alive_list.length == 0)
          return;
        var enemy = alive_list[Math.floor(Math.random() * alive_list.length)];
        this.enemy_x = enemy.pos_x;
        this.enemy_y = enemy.pos_y + enemy.speed;
        this.chosen_enemy = enemy;
        this.enemy_bounce = enemy.bounce_off;

        
    }


    




        
}