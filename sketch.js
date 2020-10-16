var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var Score=0;
var jungle,Jungle_img;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  Jungle_img= loadImage("jungle.jpg");
}



function setup() {
createCanvas(450,450);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(400,400,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  jungle =createSprite(0,180,900,10);
   jungle.addImage(Jungle_img);
   jungle.scale=0.99;
  jungle.velocityX=-4;

  
  
   FoodGroup= createGroup();
   obstacleGroup= createGroup();
 // monkey.debug = true

  jungle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
  Score=0;
  
}
function draw() {
background(180);
 drawSprites();
  
 ground.visible=false;
  
  if(gameState === PLAY){
    
    stroke("white");
  textSize(20)
  fill("white")
  text("Score: "+Score,200,50);
    
    
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    
     if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY=-12;
  }

  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  food();
  Stone();
    
     if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    Score = Score+2;
    monkey.scale = monkey.scale + 0.02;
    }
  
  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach();
    Score = Score-2;
    monkey.scale = monkey.scale - 0.02;
  }
    
   if(Score===-4) {
   gameState=END;
   }
    
  }
else if (gameState === END) {
  background("lightblue")
  stroke("white");
  textSize(80)
  fill("red")
  text("Game Over! ",0,250);
  
  monkey.visible=false;
FoodGroup.visible=false;
obstacleGroup.visible=false;
  jungle.visible=false;
jungle.velocityX=0;

} 
}

function food(){
  if(frameCount % 80 === 0){
   banana=createSprite(350,50,50,50);
   banana.y= Math.round(random(120,200));
   banana.addImage(bananaImage);
   banana.scale=0.1;
   banana.velocityX=-5;  
   banana.lifetime=80; 
   FoodGroup.add(banana);
  } 
}

function Stone(){
  if(frameCount % 150 === 0){
  obstacle=createSprite(350,375,50,50);
   obstacle.addImage(obstaceImage);
   obstacle.scale=0.13;
   obstacle.velocityX=-5;  
   obstacle.lifetime=80; 
   obstacleGroup.add(obstacle);
  }
}



