function displayLives() {
    //shows the lives
    var x = soldier.x - 480;
    for (var i = 0; i < life; i++) {
        image(lifeImg, x, 10, 50, 50);
        x = x + 50
    }

}

function displayScore() {
    fill("white");
    textSize(30);
    textFont("Algerian");
    text(" SCORE: " + score, 20, 90);
}

function spawnArmy() {
    if (frameCount % 80 === 0) {
        alienArmy = createSprite(soldier.x + 500, 410, 50, 30);
        alienArmy.addImage(alienArmyImg);
        alienArmy.velocityX = -3;
        alienArmy.collide(invisibleGround);
        alienArmy.scale = 1.25;
        alienArmy.setCollider("circle", 0, 0, 60);

        alienArmy.lifetime = 800;
        alienGroup.add(alienArmy);
    }
}

function bulletsShooting() {
    bullets = createSprite(soldier.x + 55, soldier.y - 30, 10, 5);
    bullets.velocityX = 10;
    bullets.shapeColor = "red";
    bullets.visible = true;
    bulletsGroup.add(bullets);
}

function movement() {

    soldier.x = camera.position.x;
    invisibleGround.x = soldier.x

    //gravity
    soldier.velocityY = soldier.velocityY + 0.8;
    soldier.collide(invisibleGround);

    if (keyWentDown(DOWN_ARROW)) {
        fill("red");
        bulletsShooting();
        soldier.changeImage("shoot", soldierShooting);
    } else if (keyIsDown(RIGHT_ARROW)) {
        soldier.changeAnimation("run", soldierRunning);
        soldier.velocityX = 3;
        bgsprite.velocityX = -3;
    } else {
        soldier.changeImage("standing", soldierStanding);
        soldier.velocityX = 0;
        bgsprite.velocityX = 0;
    }
    //jumping
    if (keyDown(UP_ARROW)) {
        soldier.velocityY = -5;
        soldier.changeAnimation("jump", soldierJumping);
    }

}

function play() {

    movement();
    spawnArmy();

    if (alienGroup.isTouching(soldier)) {
        life -= 1;
        alienGroup.destroyEach();
    }


    if (bulletsGroup.isTouching(alienGroup)) {
        alienGroup.destroyEach();
        bulletsGroup.destroyEach();
        score += 10;
    }

    if (score == 100) {
        alienBoss = createSprite(soldier.x + 500, 440, 50, 80);
        alienBoss.addAnimation("alienrunning", alienBossRunning);
        alienBoss.velocityX = -3;
        alienBoss.scale = 2;
        alienBoss.collide(invisibleGround);
        healthBar = createSprite(soldier.x+300, 100, alienHealth*2,20);
        healthBar.shapeColor = "green";
        gameState = LEVEL1;
    }
}

function level1() {

    movement();

    healthBar.width = alienHealth*2;

    if (alienBoss.isTouching(soldier)) {
        life -= 1;
        soldier.x -= 400;
    }

    if (bulletsGroup.isTouching(alienBoss)) {
        alienHealth -= 10;
        bulletsGroup.destroyEach();
    }

    if(alienHealth === 0){
        alienBoss.destroy();
        gameState = END;
    }
}
