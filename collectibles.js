export default class Collectibles{
    constructor(game){

        this.game = game;
        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/mana_portion.png';
        this.Width = 30;
        this.Height = 30;
        this.sound = new Audio("assets/Retro Magic Protection 25.wav");
        this.sound.volume = 0.3;
        this.type = "collect";
        this.pos_x = Math.floor(Math.random() * (game.width - 50))+ 10;
        if( this.pos_x  >= game.width)
          this.pos_x = game.width - 30;
        this.pos_y = 0;

        this.frameX = 0;
        this.max_frame = 0;
        const newLocal = 1;
        this.fps = newLocal;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;


        this.kill = false;
        this.alive = true;
        this.created = false;
        this.health = 1;

        this.speed = 16;
        this.gold = 0;
        this.mana = 10;
        


        this.time_of_arivel = 0;
     

    }

    draw(deltaTime){
        if(!deltaTime) 
          return;
        if(this.frameTimer > this.frameInterval && this.created)
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

        if(this.health <= 0)
        {
          this.ctx.fillStyle = "yellow";
          let a = String(30) + 'px serif';
          this.ctx.font = a;
          if(this.gold > 0)
            this.ctx.fillText(String(this.gold), this.pos_x,this.pos_y);
          else if(this.mana > 0){
            this.ctx.fillStyle = "blue";
            this.ctx.fillText(String(this.mana), this.pos_x,this.pos_y);
          }
              
          return;
        }


        if(this.created && this.alive)
          this.ctx.drawImage(this.skeleton_image,this.frameX * this.Width,0,this.Width,this.Height,this.pos_x,this.pos_y,this.Width,this.Height);
        else{
            this.pos_x =Math.abs(Math.floor(Math.random() *  this.game.width) - 10);
            this.pos_y = 0;
            this.kill = false;
            }
        
    }

    hit(){
        this.kill = true;
        this.health = 0;
        this.speed = -20;
        var me = this;
        this.sound.play();
        setTimeout(function(){me.alive = false;},700);
        this.game.gold += this.gold ;
        this.game.mana += this.mana;
 
     }

     update(deltaTime){
         if(!deltaTime)
            return;
        this.pos_y += this.speed   / deltaTime;
    }

}