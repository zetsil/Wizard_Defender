import Enemy from "../enemy.js";
export default class Creepe extends Enemy
{
    constructor(game)
    {
      super(game);   
      this.skeleton_image.src = 'assets/creeper_animation.png';
      this.Width = 23;
      this.Height = 38;
      this.max_frame = 5;
      this.speed = 10;
      this.health = 1;
      this.fps = 30;

    }

 
}

