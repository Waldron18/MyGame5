var soldier, alienBoss, alienArmy, alienGroup;
var alienHealth, healthBar;
var life, bullets, bulletsGroup, alienBullets, alienBulletsGroup;
var invisibleGround, bgsprite;
var score = 0;
var gameState;
var PLAY, END, LEVEL1, WIN;
var confetti = [];
var shootButton;

function preload() {
  lifeImg = loadImage("images/life.png");
  soldierStanding = loadImage("images/standing.png")
  soldierRunning = loadAnimation("images/jumping1.png", "images/jumping4.png")
  soldierJumping = loadAnimation("images/jumping1.png", "images/jumping2.png", "images/jumping3.png",
    "images/jumping4.png", "images/jumping5.png", "images/jumping6.png");
  soldierShooting = loadImage("images/soldiershooting.png");
  alienBossRunning = loadAnimation("images/alien1.png", "images/alien2.png", "images/alien3.png");
  alienArmyImg = loadImage("images/alienarmy.png");
  bgImg = loadImage("images/bg1.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  PLAY = 1;
  END = 0;
  LEVEL1 = 2;
  WIN = 3;

  gameState = PLAY;

  life = 5;
  alienHealth = 100;

  bgsprite = createSprite(width / 2, height / 2, 100, 100)
  bgsprite.addImage(bgImg);
  bgsprite.scale = windowHeight/100;

  soldier = createSprite(200, 440, 50, 80);
  soldier.addImage(soldierStanding);
  soldier.scale = windowHeight/1400;
  soldier.addAnimation("run", soldierRunning);
  soldier.addAnimation("jump", soldierJumping);
  soldier.addImage("standing", soldierStanding);
  soldier.addImage("shoot", soldierShooting);
  soldier.setCollider("rectangle", 0, 30, 250, 300);

  alienGroup = new Group();
  bulletsGroup = new Group();
  alienBulletsGroup = new Group();

  invisibleGround = createSprite(500, height - 10, 1000, 50);
  invisibleGround.visible = false;

  shootButton = createButton("SHOOT")

}

function draw() {
  background("black");

  drawSprites();

  displayLives();

  displayScore();

  if (gameState == PLAY) {
    play();
  }

  if (gameState == LEVEL1) {
    level1();
  }

  if (life === 0) {
    gameState = END;
  }

  if (gameState === END) {
    end();
  }

  if (alienHealth === 0) {
    for (var i = 0; i < 50; i++) {
      confetti.push(createSprite(random(0, width), random(0, height), 5, 5))
    }
    gameState = WIN;
  }

  if (gameState === WIN) {
    win();
  }

}
