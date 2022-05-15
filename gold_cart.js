export default class GoldCart{

  constructor(game){
    this.game = game;
    this.ctx = game.ctx;
    this.skeleton_image = new Image();
    this.skeleton_image.src = 'assets/gold_cart.png';
    this.Width = 48;
    this.Height = 42;
    this.pos_x = Math.floor(Math.random() * 700);
    this.pos_y = 565;
    this.speed = 15;

    this.frameX = 0;
    this.max_frame = 0;
    this.fps = 30;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps;

    this.invers = 1;

  }
   static SPEED = 0;
   static CAPACITY = 0;

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
    if(this.pos_x > 790){
        this.invers = -this.invers;
        this.game.gold += 8 + GoldCart.CAPACITY;
    }
    else if(this.pos_x  < 0 )
    this.invers = Math.abs(this.invers);    
           
    this.pos_x += this.invers * (this.speed + GoldCart.SPEED) / deltaTime;
}



}
