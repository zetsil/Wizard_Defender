import Enemy from "../enemy.js";
export default class GameOver extends Enemy
{
    constructor(game)
    {

        super(game);
        this.skeleton_image.src = 'assets/game_over.png';
        this.width = this.skeleton_image.width;
        this.height = this.skeleton_image.height;
        this.pos_x = 20;
        this.pos_y = 20;
        this.health = 1;
        this.speed = 0;
    }

     
 }