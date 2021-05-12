function displayLives() {
    //shows the lives
    var x = soldier.x - windowWidth/2 + 10;
    for (var i = 0; i < life; i++) {
        image(lifeImg, x, 10, windowWidth/30, windowWidth/30);
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
        alienArmy = createSprite(soldier.x + 500, windowHeight - 100, 50, 30);
        alienArmy.addImage(alienArmyImg);
        alienArmy.velocityX = -3;
        alienArmy.collide(invisibleGround);
        alienArmy.scale = windowHeight / 700 + 0.25;
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

function bulletsShootingAlien() {
    if (frameCount % 80 === 0) {
        alienbullets = createSprite(alienBoss.x - 20, alienBoss.y - 30, 15, 10);
        alienbullets.velocityX = -10;
        alienbullets.shapeColor = "blue";
        alienbullets.visible = true;
        alienBulletsGroup.add(alienbullets);
    }
}

function movement() {

    soldier.x = camera.position.x;
    invisibleGround.x = soldier.x


    //gravity
    soldier.velocityY = soldier.velocityY + 0.8;
    soldier.collide(invisibleGround);

    if (keyWentDown("space")) {
        fill("red");
        bulletsShooting();
        soldier.changeImage("shoot", soldierShooting);
    }

    //jumping
    if (touches.length !== 0 || keyDown(UP_ARROW)) {
        soldier.velocityY = -5;
        soldier.changeAnimation("jump", soldierJumping);
        touches = [];
    }

    if (soldier.x % 2000 === 0) {
        bgsprite.x = soldier.x;
    }
}

function play() {

    shootButton.position(windowWidth-80, windowHeight-80);
    shootButton.mousePressed(() => {
        fill("red");
        bulletsShooting();
        soldier.changeImage("shoot", soldierShooting);
    });

    bgsprite.velocityX = -3;
    soldier.changeAnimation("run", soldierRunning);

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
        alienBoss = createSprite(soldier.x + 500, windowHeight - 100, 50, 80);
        alienBoss.addAnimation("alienrunning", alienBossRunning);
        alienBoss.velocityX = -3;
        alienBoss.scale = windowHeight / 350;
        alienBoss.collide(invisibleGround);
        gameState = LEVEL1;
    }
}

function level1() {

    movement();

    fill("green");
    rect(soldier.x + 200, 100, alienHealth * 2, 20);

    bulletsShootingAlien();

    if (alienBoss.isTouching(soldier)) {
        life -= 1;
        alienBoss.x += 300;
    }

    if (alienBulletsGroup.isTouching(soldier)) {
        life -= 1;
        alienBulletsGroup.destroyEach();
    }

    if (bulletsGroup.isTouching(alienBoss)) {
        alienHealth -= 10;
        bulletsGroup.destroyEach();
    }

    if (alienHealth === 0) {
        alienBoss.destroy();
        gameState = END;
    }
}

function end() {
    textSize(40);
    strokeWeight(5);
    stroke("red");
    background(bgImg);
    text("YOU  LOSE!", width / 2 - 100, height / 2);
}


function win() {
    textSize(40);
    strokeWeight(5);
    stroke("green");
    text("YOU  WON!", width / 2 - 100, height / 2);
    for (var i = 0; i < confetti.length; i++) {
        confetti[i].velocityY = 5;
        confetti[i].shapeColor = color(random(0, 255), random(0, 255), random(0, 255));
        if (confetti[i].y > 500) {
            confetti[i].y = random(0, 500);
        }
    }
}