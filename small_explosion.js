import Explosion from "./explosion";

export default class SmallExplosion extends Explosion{

    constructor(game,posX,posY){
        super(game);

        this.skeleton_image.src = 'assets/explosion.png';
        this.Width = 30;
        this.Height = 30;
        this.pos_x = posX;
        this.pos_y = posY;

        this.frameX = 0;
        this.max_frame = 1;
        this.fps = 1;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;

    }


}