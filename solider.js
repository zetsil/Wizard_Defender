import Slash from "./slash_animation.js";
export default class Solider{

    constructor(game){
      this.game = game;
      this.ctx = game.ctx;
      this.skeleton_image = new Image();
      this.skeleton_image.src = 'assets/solider_animation.png';
      this.Width = 35;
      this.Height = 50;
     // this.pos_x = Solider.start_x;
      this.pos_x = Math.floor(Math.random() * (game.width - 50))+ 10;
      if( this.pos_x  >= game.width)
        this.pos_x = game.width - 30;
      this.pos_y = game.height - 70;
      //this.pos_y = 530;
      this.speed = 15;
  
      this.frameX = 0;
      this.max_frame = 4;
      this.fps = 10;
      this.frameTimer = 0;
      this.frameInterval = 1000/this.fps;

      this.slash_animation = new Slash(game,this.pos_x,this.pos_y);
      this.timer_started = false;


      this.atack_ready = false;
  
    }
  
  
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
                  
  }
  
  update(deltaTime){
      if(!deltaTime) 
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
         
      var me = this;
      if(this.atack_ready == false){
        this.intervalG = setTimeout(function(){me.atack_ready = true;},Solider.attack_cooldown);
      }else if(this.timer_started == false && this.atack_ready == true){
        this.timer_started = true;
        this.intervalG = setTimeout(function(){me.atack_ready = false; me.timer_started =false;},4000);
      }
 



             
      this.pos_x += this.speed  / deltaTime;
  }

  static start_x=20;
  static attack_cooldown = 3000;

  atack(){
    var wv = this.game.current_level.wave;

    wv.forEach((enemy,i) =>{
    if (Math.pow(enemy.pos_x - this.pos_x+20 ,2) + Math.pow(enemy.pos_y - this.pos_y +20,2) < Math.pow(50,2))
         { 
            if(enemy.created){
            enemy.hit();
            this.bool_hit = true; 
            this.destroyed = true;
            }

         }
         
})

  }

}