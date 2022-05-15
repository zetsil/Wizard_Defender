
export default class IceProjectile
{

    constructor(game,creep_pos_x,creep_pos_y)
    {
        this.game = game;
        this.ctx = game.ctx;
        this.original_pos_x = creep_pos_x;
        this.original_pos_y = creep_pos_y;

        this.projectile_x = creep_pos_x;
        this.projectile_y = creep_pos_y;
        this.bool_hit = false;

        this.ally_x = 30;
        this.ally_y = 30; 

        this.destroyed = false;
        this.created = false;

        this.xSpeed = 0;
        this.ySpeed = 0;

    }

    checkHit()
    {

        var wv = this.game.allys;


        wv.forEach((enemy,i) =>{
        if (Math.pow(this.projectile_x - enemy.pos_x - enemy.Width/2,2) + Math.pow(this.projectile_y - enemy.pos_y - enemy.Height/2,2) < Math.pow(enemy.Height,2))
             { 
                   console.log("hit!");
                  // this.bool_hit = true;
                   this.destroyed = true;

             }
             
    })

    }
    static speed = 400;

    choseTarget()
    {
    //    if(this.game.allys.length == 0)
    //       this.destroyed = true;
       var wv = this.game.allys;
       var ally = wv[Math.floor(Math.random() * this.game.allys.length)];
       this.ally_x =  Math.floor(Math.random() * 750);
       this.ally_y = 550;
        
    }

    updateProjectilePos(deltaTime)
    {
        if(!deltaTime || this.game.allys.length == 0) 
           return;
           
           
        // if(this.projectile_y > this.ally_y)
        //     this.destroyed = true;
        else if((this.projectile_y > 600 ||  this.projectile_x > 800)){
            this.destroyed = true;
        }
        
    



        this.projectile_x  += (1 +(this.ally_x - this.original_pos_x ) )  / ( deltaTime + IceProjectile.speed) ;
        this.projectile_y += (1 + (this.ally_y - this.original_pos_y ) )    / (deltaTime + IceProjectile.speed)  ; 

        
        this.ctx.strokeStyle = "yellow";
        this.ctx.beginPath();
        this.ctx.arc(this.projectile_x, this.projectile_y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.checkHit();


    }

}