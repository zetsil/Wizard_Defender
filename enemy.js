export default class Enemy
{
    constructor(game)
    {
        this.game = game;
        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/skeleton_animation.png';
        this.Width = 24;
        this.Height = 31;
        this.type = "enemy";
        this.pos_x = Math.floor(Math.random() * (game.width - 50))+ 20;
        if( this.pos_x  >= game.width)
          this.pos_x = game.width - this.Width - 10;
        this.pos_y = 20;

        this.frameX = 0;
        this.max_frame = 4;
        const newLocal = 20;
        this.fps = newLocal;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;


        this.kill = false;
        this.alive = true;
        this.created = false;
        this.health = 2;
        this.bounce_off = false;

        this.speed = 5;
        this.gold = 1;
        this.freez_state = false;
        this.start_freez = false;

        this.time_of_arivel = 0;
     
    }
    static up_speed = 0;
    static freez = false;
    static gold_up = 0;
    


    static up_speedd()
    {
        Enemy.up_speed += 1;
    }
    static enemy_freez()
    {
        Enemy.freez = true;
    
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
          let a = String(10 + (this.gold + Enemy.gold_up) * 2) + 'px serif';
          this.ctx.font = a;
          this.ctx.fillText(String(this.gold + Enemy.gold_up), this.pos_x,this.pos_y);
          return;
        }


        if(!this.kill && this.created && this.alive)
          this.ctx.drawImage(this.skeleton_image,this.frameX * this.Width,0,this.Width,this.Height,this.pos_x,this.pos_y,this.Width,this.Height);
        else{
        this.pos_x =Math.abs(Math.floor(Math.random() *  (this.game.width - this.Width)));
        this.pos_y = 0;
        this.kill = false;
        }
        
    }

    instaKill(){
      this.speed = -20;
      var me = this;
      setTimeout(function(){me.alive = false;},500);
      this.game.gold += this.gold + Enemy.gold_up;
      this.health = 0;
    }

    hit(){
       this.kill = true;
       this.speed +=2;
       this.health -= 1;

       if(this.health == 0){
          this.speed = -20;
          var me = this;
          setTimeout(function(){me.alive = false;},500);
          this.game.gold += this.gold  + Enemy.gold_up;
       }

    }

    update(deltaTime){
    var slow_buff = 0;
    var freez_buff = 1;
    if(!this.freez_state && Enemy.freez && !this.start_freez && this.created)
    {
       var me = this;
       setTimeout(function(){me.freez_state = true;},900);
       this.start_freez = true;
    }
    if(this.freez_state && Enemy.freez)
      freez_buff =0 ;

    if(this.game.cast_rain)
    {
        var slow_buff = 3;
        
    }else
    slow_buff = 0;

        
        if(!deltaTime) 
         return;
        this.pos_y += freez_buff * (this.speed - slow_buff + Enemy.up_speed) / deltaTime;
    }
}