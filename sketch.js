var PLAY = 1;
var END = 0
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,invisibleGround;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg = loadImage("ground.jpg");
  monkey_collided = loadAnimation("sprite_0.png");
 
}



function setup() {
 
  createCanvas(600,400);
 
  ground = createSprite(0,400,600,10);
  ground.velocityX = -10;
  ground.addImage(groundImg);
  ground.scale = 3;  
  
  monkey = createSprite(80,320,10,20)
  monkey.addAnimation("running",monkey_running); 
  monkey.scale = 0.15;
  monkey.debug = true;
  monkey.setCollider("rectangle",80,10,300,monkey.height);
  
  invisibleGround = createSprite(300,370,1200,10);
  
  obstacleGroup = new Group;
  FoodGroup = new Group;
  
  
}


function draw() {
  background("white");
 
  if(gameState === PLAY){
  if(keyDown("space") && monkey.y >= 303){
   
  monkey.velocityY = -13;
  
   }
  
  invisibleGround.visible = false;
  
  console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(ground.x<0){
     ground.x = invisibleGround.width/2;
     
     }
    
    if(monkey.isTouching(FoodGroup)){
       
      FoodGroup.destroyEach();
      score = score + 1;
       
       }
  
  
  obstacles();
  bananas();
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
       }
  }
  
  text("score : " + score,500,50);
 monkey.collide(invisibleGround);
  
  if(gameState === END){
    
    obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
    
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
    
    ground.velocityX = 0;
     
  }
  
  

drawSprites();
}

function obstacles(){
  
  if(frameCount%200 === 0){
    
  obstacle = createSprite(600,320,10,10); 
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.20;
  obstacle.velocityX = -5;
  obstacleGroup.add(obstacle);
    
     }
  
}
  
  function bananas(){
  
    if(frameCount%100 === 0){
      
  banana = createSprite(600,200,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.10;
      banana.velocityX = -5;
      
      banana.y = Math.round(random(120,200))
      FoodGroup.add(banana);
    }
  }






