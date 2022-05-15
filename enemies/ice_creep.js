import Enemy from "../enemy.js";
import IceProjectile from "./ice_projectile.js";


export default class IceCreep extends Enemy
{
    constructor(game)
    {
      super(game);   
      this.skeleton_image.src = 'assets/ice_creeper_animation.png';
      this.Width = 27;
      this.Height = 38;
      this.max_frame = 10;
      this.speed = 10;
      this.health = 1;
      this.fps = 30;
      this.frameInterval = 1000/this.fps;
      this.gold = 2;

      this.shoot = true;

      this.projectile = new IceProjectile(game,0,550);


    }


    update(deltaTime){
        var slow_buff = 0;
        var freez_buff = 1;
        if(!this.freez_state && Enemy.freez && !this.start_freez && this.created)
        {
           var me = this;
           setTimeout(function(){me.freez_state = true;},900);
           this.start_freez = true;
        }
        if(this.freez_state && Enemy.freez)
          freez_buff =0 ;
    
        if(this.game.cast_rain)
        {
            var slow_buff = 3;
            
        }

        if(this.game.allys.lenght != 0 && this.projectile.destroyed || this.shoot && this.created)
        {
            
                this.projectile.destroyed = false;
                
                this.original_pos_x = this.pos_x;
                this.original_pos_y = this.pos_y;
                this.projectile.projectile_x = this.pos_x;
                this.projectile.projectile_y = this.pos_y;
                this.shoot = false;
                var me = this;
      
                this.projectile.choseTarget();

                this.projectile.original_pos_x =  this.original_pos_x;
                this.projectile.original_pos_y =  this.original_pos_y;

                this.projectile.projectile_x = this.pos_x;

               // this.projectile.projectile_y = 550;
                this.projectile.has_bounce = false;
                // if(!Ally.no_reload)
                 //  setTimeout(function(){me.shoot = true;},4000 );
              
        }else if(this.created)
           this.projectile.updateProjectilePos(deltaTime);

        
           

        
        slow_buff = 0;
    
            
            if(!deltaTime) 
             return;
            this.pos_y += freez_buff * (this.speed - slow_buff + Enemy.up_speed) / deltaTime;
        }

 
}