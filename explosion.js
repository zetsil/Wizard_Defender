
export default class Explosion{
 
    constructor(game){
        this.game = game;
        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/explosion.png';
        this.Width = 90;
        this.Height = 90;
        this.pos_x = game.width/2 -100;
        this.pos_y = game.height/2;

        this.frameX = 0;
        this.max_frame = 1;
        this.fps = 1;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
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

        this.ctx.drawImage(this.skeleton_image,this.frameX * this.Width,0,this.Width,this.Height,this.pos_x,this.pos_y,this.Width,this.Height);

        
    }


    }