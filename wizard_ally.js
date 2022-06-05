import Ally from "./ally.js";
import Solider from "./solider.js";
import BlackHole from "./black_hole.js";

export default class WizardAlly extends Ally{
    constructor(game){
      super(game);
      this.skeleton_image.src = 'assets/wizard_violet_animation.png';
      this.Width = 30;
      this.Height = 40;

      this.pos_y = game.height -110;

      this.frameX = 0;
      this.max_frame = 4;
      this.fps = 10;
      this.frameTimer = 0;
      this.frameInterval = 1000/this.fps;
      this.projectile_list = [];


      var projectile1 = new BlackHole(game,this.pos_y);
      var projectile2 = new BlackHole(game,this.pos_y);
      var projectile3 = new BlackHole(game,this.pos_y);
      var projectile4 = new BlackHole(game,this.pos_y);
      var projectile5 = new BlackHole(game,this.pos_y);


      this.projectile_list.push(projectile1);
      this.projectile_list.push(projectile2);
      this.projectile_list.push(projectile3);
      this.projectile_list.push(projectile4);
      this.projectile_list.push(projectile5);


      
      
    }

    attack(deltaTime){
        this.projectile_list.forEach((projectile ,i)=> {
        if(projectile.shoot )
        {
  
          projectile.destroyed = false;
          this.projectile_x = this.pos_x;
          this.original_pos_x = this.pos_x;
          this.projectile_y = this.game.height - 110;
          projectile.shoot = false;
          var me = this;
 
          projectile.choseTarget(i);
          projectile.original_pos_x =  this.original_pos_x;
          projectile.projectile_x = this.pos_x;
          projectile.projectile_y = this.game.height - 110;
          projectile.has_bounce = false;
          setTimeout(function(){projectile.shoot = true;},5500 );
        }

        // this.projectile_x  += (1 +(this.game.click_x - this.original_pos_x ) )  / ( deltaTime + 200);
        // this.projectile_y += (1 + (this.game.click_y - 550 ) )    / (deltaTime + 200);
        
        projectile.updateProjectilePos(deltaTime);

    })


        // this.ctx.strokeStyle = "blue";
        // this.ctx.beginPath();
        // this.ctx.arc(this.projectile_x, this.projectile_y, 5, 0, 2 * Math.PI);
        // this.ctx.stroke();
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
        else if(this.pos_x  < 0 ){
            this.speed = Math.abs(this.speed);    
            if(this.game.mana < 20)
              this.game.mana += 1;
              this.game.charge_mana.play();
        }
               

            this.attack(deltaTime);
            this.pos_x += this.speed  / deltaTime;
    }

}