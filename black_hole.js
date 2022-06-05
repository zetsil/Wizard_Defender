import Projectile from "./projectile.js";

export default class BlackHole extends Projectile{
    constructor(game,y){
        super(game);
        this.projectile_y = y;
        this.shoot = true;


    }


    updateProjectilePos(deltaTime)
    {
        if(!deltaTime) 
        return;

        if(this.projectile_y < this.enemy_y && this.enemy_bounce == false)
            this.destroyed = true;
        else if((this.projectile_y < 0 || this.projectile_y > this.game.Height || this.projectile_x < 0 ||  this.projectile_x > this.game.Width)){
                this.destroyed = true;    }

        
        
    

        if(this.bool_hit)
           return;    

        this.projectile_x  += ((this.enemy_x - this.original_pos_x ) )  /  (deltaTime + 200)  ;
        this.projectile_y += ((this.enemy_y - 550 ) )    / (deltaTime + 200) ; 

        
        this.ctx.strokeStyle = "violet";
        this.ctx.beginPath();
        this.ctx.arc(this.projectile_x, this.projectile_y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();


        this.checkHit();


    }

    // checkHit()
    // {


    //     if (Math.pow(this.projectile_x - this.enemy_x ,2) + Math.pow(this.projectile_y - this.enemy_y ,2) < Math.pow(23,2))
    //     {
    //         console.log("hit");
    //     this.bool_hit = true; 
    //     this.destroyed = true;
    //     }

             

    // }

    checkHit()
    {

        var wv = this.game.current_level.wave;

        wv.forEach((enemy,i) =>{
        if (Math.pow(this.projectile_x - enemy.pos_x - enemy.Width/2,2) + Math.pow(this.projectile_y - enemy.pos_y - enemy.Height/2,2) < Math.pow(enemy.Height,2))
             { 
              if(enemy.created && enemy.health != 0 && enemy.type != "collect" && enemy.type != "coin"){
               enemy.hit();
            //    this.bool_hit = true; 
            //    this.destroyed = true;
                }

             }
             
    })

    }

    choseTarget(number)
    {
       var wv = this.game.current_level.wave;
       this.bool_hit = false;
        var alive_list = [];
        wv.forEach((enemy) =>{

            if(enemy.alive && enemy.created)
                alive_list.push(enemy);
        })
        if(alive_list.length == 0)
          return;
        if(number +1 >= alive_list.length)
            return;
             
        var enemy = alive_list[number];

        if(enemy == "undefined"){
            this.enemy_x = 40;
            this.enemy_y = 40;
        }else{
            
        this.enemy_x = enemy.pos_x ;
        this.enemy_y = enemy.pos_y + enemy.speed + 100; 
        }

        
    }
}