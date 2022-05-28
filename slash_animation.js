export default class Slash{

constructor(game,solider_x,solider_y){
    this.game = game;
    this.ctx = game.ctx;
    this.skeleton_image = new Image();
    this.skeleton_image.src = 'assets/slash_animation.png';

    this.Width = 72;
    this.Height = 65;
    this.pos_x = solider_x
    this.pos_y = solider_y - 40;

    this.frameX = 0;
    this.max_frame = 4;
    this.fps = 12;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps;

}


draw(deltaTime,solider_x,solider_y){
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

    this.ctx.drawImage(this.skeleton_image,this.frameX * this.Width,0,this.Width,this.Height,solider_x-15,solider_y-40,this.Width,this.Height);
                
}


update(deltaTime,solider_x){
    if(!deltaTime) 
      return;
        this.pos_x = solider_x;
}


}