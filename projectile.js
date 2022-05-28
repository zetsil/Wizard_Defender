export default class Projectile
{
    constructor(game,ally_pox_x)
    {
        this.game = game;
        this.ctx = game.ctx;
        this.original_pos_x = ally_pox_x;

        this.projectile_x = this.original_pos_x;
        this.projectile_y = game.height - 30;
      //  this.speed = 150; //if decrese speed increese
        this.bool_hit = false;
        this.enemy_x = 30;
        this.enemy_y = 30; 
        this.enemy_bounce = false;
        this.has_bounce = false;

        this.destroyed = false;

        this.xSpeed = 0;
        this.ySpeed = 0;

    }

    static speed = 150;

    checkHit()
    {

        var wv = this.game.current_level.wave;

        wv.forEach((enemy,i) =>{
        if (Math.pow(this.projectile_x - enemy.pos_x - enemy.Width/2,2) + Math.pow(this.projectile_y - enemy.pos_y - enemy.Height/2,2) < Math.pow(enemy.Height,2))
             { 
              if(enemy.created && enemy.bounce_off == false && enemy.health != 0){
               enemy.hit();
               this.bool_hit = true; 
               this.destroyed = true;
                }else if(enemy.created && enemy.bounce_off == true && this.has_bounce == false ){
                   this.changeDirection();  
                   if(enemy.pos_y > 5)
                     enemy.pos_y -= 5;
                   var me = this;
                   this.has_bounce = true;
                   setTimeout(function(){me.destroyed = true;},1000);                 
                }


             }
             
    })

    }

    changeDirection() {
        //This next line will change the speed by a random amount, 
        //delete it if you don't like it,  
        //or change the range for a different behavior
        this.speed += Math.random(1,3) * Math.random([-1,1])


        let ang = Math.random(Math.PI * 2)
        this.changeXSpeed(ang);
        this.changeYSpeed(ang);
    }


    changeXSpeed(ang) {
        this.xSpeed = Projectile.speed * Math.cos(ang);
        
    }

    changeYSpeed(ang) {
        this.ySpeed = Projectile.speed * Math.sin(ang);
    }

    choseTarget()
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
        var enemy = alive_list[Math.floor(Math.random() * alive_list.length)];
        this.enemy_x = enemy.pos_x;
        this.enemy_y = enemy.pos_y;
        this.enemy_bounce = enemy.bounce_off;

        
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

        this.projectile_x  += (1 +(this.enemy_x - this.original_pos_x ) )  / ( deltaTime + Projectile.speed) + this.xSpeed /deltaTime;
        this.projectile_y += (1 + (this.enemy_y - 550 ) )    / (deltaTime + Projectile.speed) + this.ySpeed / deltaTime; 

        
        this.ctx.strokeStyle = "green";
        this.ctx.beginPath();
        this.ctx.arc(this.projectile_x, this.projectile_y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.checkHit();


    }

}