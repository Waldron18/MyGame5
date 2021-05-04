var soldier, alienBoss, alienArmy, alienGroup;
var life = 3, bullets, bulletsGroup;
var invisibleGround;
var score = 0;
var gameState;
var PLAY , END;

function preload(){
  lifeImg = loadImage("images/life.png");
  soldierStanding = loadImage("images/standing.png")
  soldierRunning = loadAnimation("images/jumping1.png","images/jumping4.png")
  soldierJumping = loadAnimation("images/jumping1.png","images/jumping2.png","images/jumping3.png",
  "images/jumping4.png","images/jumping5.png","images/jumping6.png");
  soldierShooting = loadImage("images/soldiershooting.png");
  alienBossRunning = loadAnimation("images/alien1.png","images/alien2.png","images/alien3.png");
  alienArmyImg = loadImage("images/alienarmy.png");
  bgImg = loadImage("images/bg1.png")
}

function setup(){
  createCanvas(1000,500);
  
  soldier = createSprite(200,440,50,80);
  soldier.addImage(soldierStanding);
  soldier.scale = 0.5;
  soldier.addAnimation("run",soldierRunning);
  soldier.addAnimation("jump",soldierJumping);
  soldier.addImage("standing",soldierStanding);
  soldier.addImage("shoot",soldierShooting);
  soldier.setCollider("rectangle",0,30,250,300);

  /*alienBoss = createSprite(800,440,50,80);
  alienBoss.addAnimation("alienrunning", alienBossRunning);
  alienBoss.velocityX = -3;
  alienBoss.scale = 3;
  */
  
  alienGroup = new Group();
  bulletsGroup = new Group();

  invisibleGround = createSprite(500,490,1000,20);
  invisibleGround.visible = false;

}

function draw(){
  background("black");
  //bgImg(100,200)

  soldier.x = camera.x-300;

  var x = 20;
  for(var i = 0; i <life; i++){
    image(lifeImg, x,10,50,50);
    x=x+50
  }

  soldier.velocityY = soldier.velocityY + 0.8;
  soldier.collide(invisibleGround);

  //alienBoss.collide(invisibleGround);

  spawnArmy();

  if(keyWentDown(DOWN_ARROW)){
    fill("red");
    bulletsShooting();
    soldier.changeImage("shoot",soldierShooting);
  } if(keyDown(RIGHT_ARROW)){
    soldier.changeAnimation("run",soldierRunning);
    soldier.velocityX = 3;
  }else if(soldier.y > 390){
    soldier.changeImage("standing",soldierStanding);
    soldier.velocityX = 0;
  }

  if(keyDown(UP_ARROW)){
    soldier.velocityY = -10;
    soldier.changeAnimation("jump",soldierJumping);
  }

  if(alienGroup.isTouching(soldier)){
    life -= 1;
    alienGroup.destroyEach();
  }
  

  if(bulletsGroup.isTouching(alienGroup)){
    alienGroup.destroyEach();
    bulletsGroup.destroyEach();
    score +=10;
  }

  console.log(score);
  drawSprites();

  fill("white");
  text("SCORE: "+score, 20,100 );
}


function keyPressed(){
  
}

function spawnArmy(){
  if(frameCount % 80 === 0){
    alienArmy = createSprite(800,400,50,30);
    alienArmy.addImage(alienArmyImg);
    alienArmy.velocityX = -3;
    alienArmy.collide(invisibleGround);
    alienArmy.scale = 1;
    alienArmy.setCollider("circle",0,0,50);

    alienArmy.lifetime = 800;
    alienGroup.add(alienArmy);
  }
}

function bulletsShooting(){
  bullets = createSprite(soldier.x+55, soldier.y-30,10,5);
  bullets.velocityX = 10;
  bullets.shapeColor = "red";
  bullets.visible = true;
  bulletsGroup.add(bullets);
}