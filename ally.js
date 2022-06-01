import Projectile from "./projectile.js";
export default class Ally{


    constructor(game)
    {
        this.game = game;
        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/archere_animation.png';
        this.Width = 30;
        this.Height = 43;
        this.pos_x = Math.floor(Math.random() * (game.width - 50))+ 10;
        if( this.pos_x  >= game.width)
          this.pos_x = game.width - 30;
        this.pos_y = game.height - 50;

        this.frameX = 0;
        this.max_frame = 4;
        this.fps = 7;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;


        
        this.freez_state = false;
        this.start_freez = false;


        this.time_of_arivel = 0;
        this.speed = 20;
        

        this.projectile_x = this.pos_x;
        this.projectile_y = 550;
        this.shoot = true;



        this.original_pos_x = 0;
        this.projectile = new Projectile(this.game,this.original_pos_x); 


     
    }

    static reload_time = 500;
    static no_reload = false;

    draw(deltaTime){
        if(!deltaTime) 
          return;
        if(this.frameTimer > this.frameInterval)
        {
        if(this.frameX >= this.max_frame) 
          this.frameX = 0;
        else 
          this.frameX++;
        this.frameTimer = 0;
        }
        else{
            this.frameTimer += deltaTime;
        }

        this.ctx.drawImage(this.skeleton_image,this.frameX * this.Width,0,this.Width,this.Height,this.pos_x,this.pos_y,this.Width,this.Height);
        
     //   this.pos_x = Math.floor(Math.random() *  750);
                
    }


    update(deltaTime){
        if(!deltaTime) 
          return;
        if(this.freez_state == true)
            return;  
        if(this.pos_x > (this.game.width -20)){
            this.speed = -this.speed;
            this.pos_x  =this.game.width -20;
        }
        else if(this.pos_x  < 0 )
            this.speed = Math.abs(this.speed);    
               

            this.attack(deltaTime);
            this.pos_x += this.speed  / deltaTime;
    }

    attack(deltaTime){

        if(this.shoot || (Ally.no_reload && this.projectile.destroyed) )
        {
          this.projectile.destroyed = false;
          this.projectile_x = this.pos_x;
          this.original_pos_x = this.pos_x;
          this.projectile_y = 550;
          this.shoot = false;
          var me = this;

          this.projectile.choseTarget();
          this.projectile.original_pos_x =  this.original_pos_x;
          this.projectile.projectile_x = this.pos_x;
          this.projectile.xSpeed = 0;
          this.projectile.ySpeed = 0;
          this.projectile.projectile_y = this.game.height - 30;
          this.projectile.has_bounce = false;
          if(!Ally.no_reload)
             setTimeout(function(){me.shoot = true;},5500- Ally.reload_time );
        }

        // this.projectile_x  += (1 +(this.game.click_x - this.original_pos_x ) )  / ( deltaTime + 200);
        // this.projectile_y += (1 + (this.game.click_y - 550 ) )    / (deltaTime + 200);
        
        this.projectile.updateProjectilePos(deltaTime);


        // this.ctx.strokeStyle = "blue";
        // this.ctx.beginPath();
        // this.ctx.arc(this.projectile_x, this.projectile_y, 5, 0, 2 * Math.PI);
        // this.ctx.stroke();
    }

    static increaseSpeedReload()
    {
      Ally.reload_time += 300;
      Projectile.speed -= 11;
      if (Ally.reload_time  >= 900)
          Ally.no_reload = true;
    }
}