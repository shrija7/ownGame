var PLAY = 1;
var END = 0;
var gameState = PLAY;

var wow, wow_running, wow_collided;
var ground, invisibleGround, groundImage;

var flyGroup,fly2,fly1
var obstaclesGroup, obstacle3

var score;
var gameOverImg,restartImg



function preload(){
                    
  wow_running = loadAnimation("l.png","m.png","n.png","o.png","i.png");
  wow_collided = loadAnimation("j.png");
  
 groundImage = loadImage("q.png");
 
  
  fly1 = loadImage("b.png");
  fly2 = loadImage("c.png");
  obstacle3 = loadImage("e.png");
  
  restartImg = loadImage("g.png")
  gameOverImg = loadImage("h.png")

}

function setup() {
 
  createCanvas(700, 600);

 var message = "This is a message";
 console.log(message)
  
  wow = createSprite(100,460,1,100);
  wow.addAnimation("running", wow_running);
  wow.addAnimation("collided", wow_collided);
  

  wow.scale = 0.5;
  
  ground = createSprite(600,525,400,20);
 ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(350,250);
  gameOver.addImage(gameOverImg)
  
  restart = createSprite(400,350);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1;
  restart.scale = 0.3;
  
  invisibleGround = createSprite(600,470,6000,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  flyGroup = createGroup();

  
  wow.setCollider("rectangle",0,0,30,60);
  wow.debug = true
  
  score = 0;
  
}


function draw() {
  
  background("black");
 
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    //if(score>0 && score%100 === 0){
    //   checkPointSound.play() 
    //}
    
    if (ground.x < 300){
     ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& wow.y >= 100) {
        wow.velocityY = -10;
      
    }
    
    //add gravity
    wow.velocityY = wow.velocityY + 0.8
  
    //spawn the clouds
    spawnfly();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(wow)){
        
       // jumpSound.play();
        gameState = END;
       // dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
      wow.changeAnimation("collided", wow_collided);
    
     
     
      ground.velocityX = 0;
      wow.velocityY = 0
      
     
    obstaclesGroup.setLifetimeEach(-1);
    flyGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     flyGroup.setVelocityXEach(0);    
   }
  
 
  wow.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  

  gameState = PLAY;
 
  restart.visible=false;
  gameOver.visible=false;

 wow.changeAnimation("running",wow_running)

 obstaclesGroup.destroyEach();
 flyGroup.destroyEach();

score =0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,500,10,40);
   
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(fly2);
              break;
      case 2: obstacle.addImage(obstacle3);
              break;
     
     
      default: break;
    }
          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnfly() {
  
  
  if (frameCount % 60 === 0){
    var fly = createSprite(600,125,40,10);
   
   fly.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: fly.addImage(fly1);
              break;
              case 2: fly.addImage(fly2);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    fly.scale = 0.5;
    fly.lifetime = 300;
   
   //add each obstacle to the group
     flyGroup.add(fly);}
}

