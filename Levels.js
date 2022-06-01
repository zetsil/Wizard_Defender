import Skeleton from "./enemies/skeleton.js"; 
import Creepe from "./enemies/creep.js";
import GameOver from "./enemies/gameOver.js";
import WAVES from "./waves_config.js"
import Enemy from "./enemy.js";
import FiereEntity from "./enemies/fire_entity.js";
import EvilKnight from "./enemies/evil_knight.js";
import IceCreep from "./enemies/ice_creep.js";
import MessageBox from "./message_box.js";
import Collectibles from "./collectibles.js";
import Coin from "./collectibles/coin.js";


export default class Level{

    constructor(game){
        this.game = game;
        this.wave = [];
        this.enemys = 0;
        this.escapedEnemys = 0;

        this.audio_game_over =  new Audio("assets/Game_Over_(8-Bit Music).mp3");

        this.finish_level = false;
        this.game_over = false;



    }

    start(deltaTime)
    {  
   
    this.wave.forEach((x,i) =>{
    if(x.type == "message" && x.show == true){  
      x.startMessage();
      x.show = false;
    }else if(x.type == "collect" || x.type == "coin"){
      if(!x.created)
      {
          var randomNr = Math.floor(Math.random() * 20)* 1000 + 1000;
          setTimeout(function(){x.created = true;},1000 * x.time_of_arivel + randomNr );
      }
      if(x.pos_y > (this.game.height ) && x.alive){
          this.wave.splice(i,1);
          this.enemys--;
        }

        x.draw(deltaTime);
        x.update(deltaTime);
        if(!x.alive){
         this.wave.splice(i,1);//delete collectible when cliked 
         this.enemys--;

        }

    }
    else if(x.type == "enemy"){  
     if(!x.created)
        {
            var randomNr = Math.floor(Math.random() * 20)* 1000 + 1000;
            setTimeout(function(){x.created = true;},1000 * x.time_of_arivel + randomNr );
        }
        if(x.pos_y > (this.game.height ) && x.alive){
            this.game.escapedEnemys += 1;
            this.wave.splice(i,1);
            this.enemys--;
          }

            if(this.game.escapedEnemys > 7 && !this.game_over)
            {
              // this.gameOver(deltaTime);
               this.game_over = true;
               this.audio_game_over.volume = 0.3;
               this.audio_game_over.play();
            }
    
    
        x.draw(deltaTime);
        x.update(deltaTime);
        if(!x.alive)
        {
        this.wave.splice(i,1);//delete skeletons when dead 
        this.enemys--;
        }
          }
            
        });
        
    
}

    createWaves(wave_nr)// create a new wave at a given number
    {
            
          var wave = WAVES.WAVES.WV[wave_nr];
          wave.enemys.forEach((x) =>{

          for(let i = 0;i<x.amont;i++)
          {
            var sk = new Enemy(this.game);
            if(x.type == 'skeleton')
               sk = new Skeleton(this.game);
            if(x.type == 'creep')
               sk = new Creepe(this.game);  
            if(x.type == "fire")
               sk = new FiereEntity(this.game);    
            if(x.type == "knight")
               sk = new EvilKnight(this.game);
            if(x.type == "ice")
               sk = new IceCreep(this.game);
            if(x.type == "collect")  
               sk = new Collectibles(this.game);   
            if(x.type == "coin")  
               sk = new Coin(this.game);           
            sk.time_of_arivel = x.arive ;
            this.wave.push(sk);
            this.enemys++;
          }
          
          if(x.type == "message"){
            var message =  new  MessageBox(x.txt);
            this.wave.push(message);

          }
        }
        
        )
           
    }

    randomWave(){
            let random_nr = Math.floor(Math.random() * 50)+10;
            for(let i = 0;i<random_nr;i++){
                let random = Math.floor(Math.random() * 3);
                var sk = new Enemy(this.game);
                if(random == 0)
                  sk = new Skeleton(this.game);
                else if(random == 1)
                  sk = new Creepe(this.game);
                else if (random == 2)
                  sk = new IceCreep(this.game);   
                sk.time_of_arivel = i / 10 + 0.3 ;  
                this.enemys++;
                this.wave.push(sk);

            }
        }
    gameOver(){
         this.game_over_object = new GameOver(this.game);
         this.game_over_object.created = true;
         this.game_over_object.draw();

    }    



}