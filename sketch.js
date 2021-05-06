var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1;

var score=0

//var gameOverImg,restartImg;



function preload(){
 boy_running = loadAnimation("b1.png","b2.png","b3.png",'b4.png');
  boy_collided = loadAnimation("ouch.png");
  
  groundImage = loadImage("bg.jpg");
  
  obstacle1 = loadImage("snake.png");
  
  // restartImg = loadImage("restart.png")
  //gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(600, 400);
  ground = createSprite(300,200,600,400);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  boy = createSprite(99,380,20,50);
  boy.addAnimation("running", boy_running);
  boy.addAnimation("collided" ,boy_collided);
  boy.scale = 2.2;
  
  
  invisibleGround = createSprite(300,380,600,20);
 // invisibleGround.visible = true;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();

  
  boy.setCollider("rectangle",0,0,45,45);
  boy.debug = false;
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score

  if(gameState === PLAY){
   
    
    ground.velocityX = -(4+3*score/200);
    
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;

    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  

    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
      //comment for articial intelligence the comp is playing
      //trex.velocityY=-12
        gameState = END;

      
    }
  }
   else if (gameState === END) {

     
      ground.velocityX = 0;
      boy.velocityY = 0
     
      //change the trex animation
      boy.changeAnimation("collided", boy_collided);
     boy.scale=0.5
     boy.x=300;
     boy.y=200;
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

     
     obstaclesGroup.setVelocityXEach(0);

     
   }
  
 
  //stop trex from falling down
  boy.collide(invisibleGround);
  
  
  
  drawSprites();
  textSize(20)
  fill('black')
 // strokeWeight(20)
//stroke('magenta')
  text("Score: "+ score, 500,50);

}

function spawnObstacles(){
 if (frameCount % 99 === 0){
   var obstacle = createSprite(400,350,10,40);
   //obstacle.velocityX = -6;

   obstacle.setCollider('rectangle',0,0,10,10)
   obstacle.velocityX = -(4+3*score/200);
   
    obstacle.addImage(obstacle1);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.399;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
