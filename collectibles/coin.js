
import Collectibles from "../collectibles.js";
export default class Coin extends Collectibles{
    constructor(game){
        super(game);
        this.skeleton_image.src =  'assets/gold_coin.png';
        this.gold = 30;
        this.mana = 0;
        this.sound = new Audio("assets/Retro PickUp Coin 07.wav")
        this.sound.volume = 0.3;
    }

}