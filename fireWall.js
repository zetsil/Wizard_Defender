export default class FireWall{
 
    constructor(game){
        this.game = game;
        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/fire_wall_animation.png';
        this.Width = 800;
        this.Height = 39;
        this.pos_x = 0;
        this.pos_y = 450;

        this.frameX = 0;
        this.max_frame = 1;
        const newLocal = 20;
        this.fps = newLocal;
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
        this.checkEnemyGothrough();

        this.ctx.drawImage(this.skeleton_image,this.frameX * this.Width,0,this.Width,this.Height,this.pos_x,this.pos_y,this.Width,this.Height);

        
    }

    checkEnemyGothrough()
    {

        var wv = this.game.current_level.wave;

        wv.forEach((enemy,i) =>{
        if (enemy.pos_y > 450 &&  enemy.created)
             { 
                 enemy.instaKill() ;
                    
             }


             

    })
    }

    

}
