import Level from "./Levels.js";
import { Wizard } from "./wizard.js";
import Enemy from "./enemy.js";
import Ally from "./ally.js";
import GoldCart from "./gold_cart.js";
import Solider from "./solider.js";
export default class Game{

    constructor(ctx){

        this.audio = new Audio("assets/8_bit_boss_battle_4_by_eliteferrex.mp3");
        this.audio.volume = 0.3;
       // this.audio.play();
        this.width = 800;
        this.height = 600;
        this.ctx = ctx;
        this.lastTime = 0;
        this.skeletons = []; //array of skeleton enemys 


        this.archer_sound1 = new Audio("assets/archer_1.mp3")
        this.archer_sound2 = new Audio("assets/archer_2.mp3")
        this.archer_sound3 = new Audio("assets/archer_3.mp3")
        this.archer_sound4 = new Audio("assets/archer_4.mp3")
        this.archer_sound5 = new Audio("assets/archer_5.mp3")
        this.archer_sound6 = new Audio("assets/archer_6.mp3")
        this.archer_sound7 = new Audio("assets/archer_7.mp3")
        this.archer_sound8 = new Audio("assets/archer_8.mp3")
        this.archer_sound9 = new Audio("assets/archer_9.mp3")
        this.archer_sound10 = new Audio("assets/archer_10.mp3")
        this.archer_sound11 = new Audio("assets/archer_11.mp3")

        this.archer_sound_list = [];
        this.archer_sound_list.push(this.archer_sound1);
        this.archer_sound_list.push(this.archer_sound2);
        this.archer_sound_list.push(this.archer_sound3);
        this.archer_sound_list.push(this.archer_sound4);
        this.archer_sound_list.push(this.archer_sound5);
        this.archer_sound_list.push(this.archer_sound6);
        this.archer_sound_list.push(this.archer_sound7);
        this.archer_sound_list.push(this.archer_sound8);
        this.archer_sound_list.push(this.archer_sound10);
        this.archer_sound_list.push(this.archer_sound11);



        //this.createEnemys();
        this.killedEnemys=0;
        this.escapedEnemys=0;

        this.level_count = 0;
        this.Levels = [];
        this.stop = false;

        this.tutorial =  new Level(this);
        this.tutorial.createWaves(0);
        this.Levels.push(this.tutorial);

        var lvl1 =  new Level(this);
        lvl1.createWaves(1);
        this.Levels.push(lvl1);

        var lvl2 =  new Level(this);
        lvl2.createWaves(2);
        this.Levels.push(lvl2);

        var lvl3 =  new Level(this);
        lvl3.createWaves(3);
        this.Levels.push(lvl3);

        var lvl4 =  new Level(this);
        lvl4.createWaves(4);
        this.Levels.push(lvl4);


        var lvl5 =  new Level(this);
        lvl5.createWaves(5);
        this.Levels.push(lvl5);

        var lvl6 =  new Level(this);
        lvl6.createWaves(6);
        this.Levels.push(lvl6);

        var lvl7 =  new Level(this);
        lvl7.createWaves(7);
        this.Levels.push(lvl7);

        var lvl8 =  new Level(this);
        lvl8.createWaves(8);
        this.Levels.push(lvl8);




        this.allys = [];

        this.archer_number = 0;
        this.max_archer = 10;
        this.archer_cost = 5;
        this.rain_cost = 6;
        this.archer_speed_cost = 10;

        this.solider_cost = 320;
        this.solider_number = 0;
        this.max_solider = 4;

        this.cart_cost = 70;
        this.cart_number = 0;
        this.max_cart = 4;
        this.cart_speed_cost = 30;

        this.max_rain = 3;
        this.rain_cost_D = 250;
        this.snow_cost = 15;
        this.snow_cost_decreasee = 650;

        // let x = new Solider(this);
        // this.allys.push(x);
      

        this.create_snow_particle();
        this.create_20_random_waves();

        


        this.current_level = this.Levels[this.level_count];

        // this.interval --> interval created

        this.mana = 0;
        this.gold =0;

        this.cast_rain = false;
        this.cast_snow = false;

        this.wizard = new Wizard(this);

        this.draw_rain();



    }

    create_20_random_waves(){
        for(let i = 0 ;i<20;i++)
        {    
        var new_lvl =  new Level(this);
        new_lvl.randomWave();
        this.Levels.push(new_lvl);
        }
    }

    
    //rain functions
    //----------------------------------
    draw_rain(){
        this.ctx.strokeStyle = 'rgba(102, 102, 255,0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';

        var init = [];
        var maxParts = 2800;
        for(var a = 0; a < maxParts; a++) {
          init.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
          })
        }
        
         this.rain_particles = [];
        for(var b = 0; b < maxParts; b++) {
            this.rain_particles[b] = init[b];
        }
        // var game_p = this
        // setInterval(function(){game_p.draw_R()}, 30);
        
      }
    
    draw_R(){
       // this.ctx.clearRect(0, 0, this.width, this.height);
        for(var c = 0; c < this.rain_particles.length; c++) {
          var p = this.rain_particles[c];
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          this.ctx.stroke();
        }
        this.move_rain();
      }
      
    move_rain() {
        for(var b = 0; b < this.rain_particles.length; b++) {
          var p = this.rain_particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if(p.x > this.width || p.y > this.height) {
            p.x = Math.random() * this.width;
            p.y = -20;
          }
        }
      }

      castRain()
      {
         if(this.mana >= this.rain_cost &&  !this.cast_rain)
         {
             this.cast_rain = true;
             this.mana -= this.rain_cost;
             var me = this; 
             setTimeout(function(){me.cast_rain = false;},20000);
         }
  
      }

    //--------rain functions end--------
    //----------------------------------  

    //snow functions
    	//snowflake particles
    create_snow_particle() 
    {       
	this.mp_snow = 100; //max particles
	this.snow_particles = [];
    this.snow_angle =0;
	for(var i = 0; i < this.mp_snow; i++)
	{
		this.snow_particles.push({
			x: Math.random()*this.width, //x-coordinate
			y: Math.random()*this.height, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*this.mp_snow //density
		})
	}
    }

    draw_snow()
	{
		//ctx.clearRect(0, 0, W, H);
		
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		this.ctx.beginPath();
		for(var i = 0; i < this.mp_snow; i++)
		{
			var p = this.snow_particles[i];
			this.ctx.moveTo(p.x, p.y);
			this.ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		this.ctx.fill();
		this.update_snow();
	}

    update_snow()
	{
        var angle = this.snow_angle ;
		angle += 0.01;
        this.snow_angle = angle;
		for(var i = 0; i < this.mp_snow; i++)
		{
			var p = this.snow_particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > this.width+5 || p.x < -5 || p.y > this.height)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					this.snow_particles[i] = {x: Math.random()*this.width, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						this.snow_particles[i] = {x: -5, y: Math.random()*this.height, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						this.snow_particles[i] = {x: this.width+5, y: Math.random()*this.height, r: p.r, d: p.d};
					}
				}
			}
		}
	}

    castSnow()
    {
       if(this.mana >= this.snow_cost &&  !this.cast_snow && !this.cast_rain)
       {
           this.cast_snow = true;
           this.mana -= this.snow_cost;
           var me = this; 
           Enemy.enemy_freez();
           setTimeout(function(){me.cast_snow = false;
           Enemy.freez = false;
        },6000);
       }

    }
    //--------snow functions end
    pause(){
        this.stop = true;
    }

    un_pause(){
        this.stop = false;
    }
    
    gameLoop(timestamp) {
            


        if(this.current_level.game_over)
        {
           this.gameOver();
           this.audio.pause();
           return;
        }
        if(!this.stop)//pause the game
        {

        let deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        // update all the objects
        this.ctx.strokeStyle = "blue";
        this.ctx.clearRect(0, 0, this.width, this.height);
      //  this.drawCheckeredBackground(this.ctx,5,5);
        this.drawCercle()


        this.updateScore();

        if(this.cast_rain && !this.cast_snow)
           this.draw_R(); // draw rain
        if(!this.cast_rain && this.cast_snow) 
           this.draw_snow(); // draw snow  
        
    
           
        this.current_level.start(deltaTime)
        this.ctx.drawImage(this.wizard.skeleton_image,this.wizard.pos_x,this.wizard.pos_y);

        this.allys.forEach((x) => {
            x.draw(deltaTime);
            x.update(deltaTime);
        }
            ); 


    }
    

        requestAnimationFrame(this.gameLoop.bind(this));
    }
    drawCercle(){
        this.ctx.beginPath();
        this.ctx.arc(this.click_x, this.click_y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();

    }

    checkClickedObject(x,y){
        let bool_hit = false;

        this.click_x = x;
        this.click_y = y;


        var audio_skeleton_hit = new Audio("assets/game_hit_sound_effect.mp3");
        audio_skeleton_hit.volume = 0.1;
        audio_skeleton_hit.playbackRate = 2.5;
        this.current_level.wave.forEach((enemy,i) =>{
        if ((Math.pow(x - enemy.pos_x - enemy.Width/2,2) + Math.pow(y - enemy.pos_y - enemy.Height/2,2)) <= Math.pow(enemy.Height/2,2))
             { enemy.hit();
                bool_hit = true;
             }
            
        
        if(bool_hit)
          audio_skeleton_hit.play();
        });
    
}




    updateScore(){
        let length = 0; //how much skeletons still remain

            length += this.current_level.wave.length;
        

        this.ctx.fillStyle = "grey";
        this.ctx.font = '48px serif';
        this.ctx.fillText(String(length), 0, 30);
        
        this.ctx.fillStyle = "red";
        this.ctx.fillText(String(this.current_level.escapedEnemys), 750, 30);

        this.ctx.fillStyle = "blue";
        this.ctx.fillText(String(this.mana) + "/20", 270, 30);

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(String(this.gold), 400, 30);

        if(this.current_level.game_over)
        {
            this.audio.pause();
        }


        if(length == 0){
           //this.audio.pause();
           if(this.Levels.length <= (this.level_count + 1))
             return;
           this.level_count++;
           if(this.level_count % 2 == 0)
             Enemy.up_speedd();
           this.current_level = this.Levels[this.level_count];

        }

          
    }

    increaseMana()
    {   
       var me = this; 
       this.intervalM = setInterval(function(){me.increaseM();},500);//create interval
    }

    increaseM(){
         if(this.mana < 20)
             this.mana +=1;
    }

    stopMana(){
        clearInterval(this.intervalM); 
    }

    increaseGold()
    {   
       var me = this; 
       this.intervalG = setInterval(function(){me.increaseG();},500);
    }

    increaseG(){
             this.gold +=1;
    }

    stopGold(){
        clearInterval(this.intervalG); 
    }

    addCart(){
        if(this.gold >= this.cart_cost && this.cart_number < this.max_cart ){
        var cost = document.getElementById("gold_cart_cost");

        var new_cart = new GoldCart(this);
        this.allys.push(new_cart);
        this.gold -= this.cart_cost;
        this.cart_cost +=  this.cart_cost;
        cost.innerHTML = this.cart_cost;
        this.cart_number++;

        }
           
    }

    addArcher(){
        if(this.gold >= this.archer_cost && this.archer_number < this.max_archer ){
        var cost = document.getElementById("archer_cost");
        this.archer_sound_list[this.archer_number].play();

        var new_archer = new Ally(this);
        this.allys.push(new_archer);
        this.gold -= this.archer_cost;
        this.archer_cost +=  this.archer_cost;
        cost.innerHTML = this.archer_cost;
        this.archer_number++;

        }
           
    }

    addSolider(){
        if(this.gold >= this.solider_cost && this.solider_number < this.max_solider ){
        var cost = document.getElementById("solider_cost");

        var new_solider = new Solider(this);
        this.allys.push(new_solider);
        this.gold -= this.solider_cost;
        this.solider_cost +=  this.solider_cost;
        cost.innerHTML = this.solider_cost;
        Solider.start_x +=200;
        this.solider_number++;

        }
           
    }
    incresArcherSpeed(){
        if(this.gold >= this.archer_speed_cost)
        {
        Ally.increaseSpeedReload();
        this.gold -= this.archer_speed_cost;
        this.archer_speed_cost += this.archer_speed_cost;
        var cost = document.getElementById("archer_cost_speed");
        cost.innerHTML =  this.archer_speed_cost;
        }

    }

    increase_gold_cart_speed(){
      if(this.gold >= this.cart_speed_cost)
      {
         GoldCart.SPEED += 5;
         GoldCart.CAPACITY += GoldCart.CAPACITY;
         this.gold -= this.cart_speed_cost;
         this.cart_speed_cost += Math. round(this.cart_speed_cost / 2);
         var cost = document.getElementById("gold_cart_increase");
         cost.innerHTML =  this.cart_speed_cost;
      }   
         
      
    }


    rain_cost_decrees(){
        if(this.gold >= this.rain_cost_D &&  this.rain_cost != 3)
        {
            this.gold  -= this.rain_cost_D;
            this.rain_cost_D += this.rain_cost_D;
            var cost = document.getElementById("rain_cost_decrees");
            cost.innerHTML =  this.rain_cost_D;
            var rainC = document.getElementById("RAIN_COST");
            this.rain_cost -= 1;
            rainC.innerHTML = this.rain_cost;
        }

    }

    snow_cost_decrease()
    {
        if(this.gold >= this.snow_cost_decreasee &&  this.snow_cost != 9){
         this.gold -= this.snow_cost_decreasee;
         this.snow_cost_decreasee += 250;
         var cost = document.getElementById("snow_cost_decrees");
         cost.innerHTML = this.snow_cost_decreasee;
         var cost2 = document.getElementById("snow_cost");
         this.snow_cost -= 3;
         cost2.innerHTML = this.snow_cost ;


        }
    }


    gameOver(){
        this.current_level.gameOver();
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Game Over!", 320, 300);
        
        this.mana = 0;

    }

}
