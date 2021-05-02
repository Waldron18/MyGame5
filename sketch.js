var soldier, alienBoss, alienArmy;
var bullets;
var invisibleGround;
var gameState;
var PLAY , END;

function preload(){
  soldierRunning = loadAnimation("images/jumping1.png","images/jumping4.png")
  soldierJumping = loadAnimation("images/jumping1.png","images/jumping2.png","images/jumping3.png",
  "images/jumping4.png","images/jumping5.png","images/jumping6.png");
  soldierShooting = loadImage("images/soldiershooting.png");
  alienBossRunning = loadAnimation("images/alien1.png","images/alien2.png","images/alien3.png");
  alienArmyImg = loadImage("images/alienarmy.png");
}

function setup(){
  createCanvas(1000,500);
  
  soldier = createSprite(200,440,50,80);
  soldier.addAnimation("soldierrunning", soldierRunning);
  soldier.scale = 0.5;


  /*alienBoss = createSprite(800,440,50,80);
  alienBoss.addAnimation("alienrunning", alienBossRunning);
  alienBoss.velocityX = -3;
  alienBoss.scale = 3;
  */
  
  alienGroup = new Group();

  invisibleGround = createSprite(500,490,1000,20);
  invisibleGround.visible = false;

}

function draw(){
  background("green");

  if(keyPressed("space")){
    soldier.velocityY = -10;
  }

  soldier.velocityY = soldier.velocityY + 0.8;
  soldier.collide(invisibleGround);

  //alienBoss.collide(invisibleGround);

  spawnArmy();

  if(frameCount % 10 === 0){
    fill("red");
    bulletsShooting();
  }


  drawSprites();
}

function keyPressed(){
  if(keyCode === "RIGHT_ARROW"){
    soldier.velocityX = 3;
  }
}

function spawnArmy(){
  if(frameCount % 80 === 0){
    alienArmy = createSprite(800,440,50,30);
    alienArmy.addImage(alienArmyImg);
    alienArmy.velocityX = -3;
    alienArmy.collide(invisibleGround);
  }
}

function bulletsShooting(){
  bullets = createSprite(soldier.x+30, soldier.y-40,20,10);
  bullets.velocityX = 10;
  bullets.visible = true;
}