export class Wizard
{
    constructor(game)
    {

        this.ctx = game.ctx;
        this.skeleton_image = new Image();
        this.skeleton_image.src = 'assets/wizard.png';
        this.width = this.skeleton_image.width;
        this.height = this.skeleton_image.height;
        this.pos_x = game.width/2;
        this.pos_y = game.height-30;

        //this.ctx.drawImage(this.skeleton_image,this.pos_x,this.pos_y);
    }

    draw(){
        this.ctx.drawImage(this.skeleton_image,this.pos_x,this.pos_y);
    }

}