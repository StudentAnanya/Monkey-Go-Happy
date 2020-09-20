var backgroImage,backgro;
var monkey,moneyImage;
var banana,bananaGroup,bananaImage;
var obstacle,obstaclesGroup,obstacleImage;
var ground;
var score;

function preload() {
 backgroImage=loadImage("jungle.jpg");
  
 monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
  bananaImage=loadImage("banana.png");
  
  obstacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgro=createSprite(200,200,400,400);
  backgro.addImage("backgro",backgroImage);
  backgro.velocityX=-4;
  backgro.x=backgro.width/2;
  
  monkey=createSprite(150,360,20,20);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.1;
  
  bananaGroup=createGroup();
  
  obstaclesGroup=createGroup();
  //obstacle.addImage("stone",obstacleImage);
  
  ground=createSprite(400,380,800,10);
  ground.velocityX=-4;
  ground.visible=false;
  
  score=0;
}

function draw() {
  
  background(255);
  
  if(ground.x<0){
   ground.x=ground.width/2; 
  }
  
  if(backgro.x<150){
    backgro.x=backgro.width/2;
  }
  monkey.collide(ground);
  
  if(keyDown("space")&&monkey.y>80){
   monkey.velocityY=-10; 
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  
  switch(score){
    case 10 : monkey.scale=0.12; 
    break;
    case 20 : monkey.scale=0.13;
    break;
    case 30 : monkey.scale=0.14;
    break;
    case 40 : monkey.scale=0.15;
    break;
    default : break;
  }  
  
  if(obstaclesGroup.isTouching(monkey)){
   monkey.scale=0.1;
   obstaclesGroup.destroyEach(); 
  }
   
  spawnBanana();
  
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+ score,500,50);
}

function spawnBanana(){
  if(World.frameCount%80===0){
   banana=createSprite(600,200,20,20);
   banana.addImage("banana",bananaImage);
   banana.scale=0.05; 
   banana.velocityX=-6;
   banana.y=random(120,250);
   banana.lifetime=200; 
   monkey.depth=banana.depth+1;
   bananaGroup.add(banana);
  }
}

 function spawnObstacles(){
 if(World.frameCount%250===0){
  obstacle=createSprite(600,360,20,20);
  obstacle.addImage("stone",obstacleImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-5;
  obstacle.lifetime=200;
  obstaclesGroup.add(obstacle);
 }
}
