/**
 * Created by Jackson on 7/19/16.
 */
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var killCount = 0;
var tick = 0;

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

var bgImage = new Image();
bgImage.src = 'assets/background.png';

var hero = {
    image: 'assets/hero.png',
    location: {
        x: 100,
        y: 100
    }
};

var goblin = {
    image: 'assets/monster.png',
    location: {
        x: 150,
        y: 150
    },
    face: 0
};

var keysDown = [];

addEventListener('keydown', function(event){
    keysDown[event.keyCode] = true;
});

addEventListener('keyup', function(event){
    keysDown[event.keyCode] = false;
});

function update(){
    if(keysDown[40]){
        moveEntity(hero.location, 5, 2)
    }

    if(keysDown[39]){
        moveEntity(hero.location, 5, 1)
    }

    if(keysDown[38]){
        moveEntity(hero.location, 5, 0)
    }

    if(keysDown[37]){
        moveEntity(hero.location, 5, 3)
    }

    hitGoblin();
}

function canMove(locSet, direction){
    switch(direction){
        case 0:
            return locSet.y - 5 >= 0;
        case 1:
            return locSet.x + 5 < 512;
        case 2:
            return locSet.y + 5 < 480;
        case 3:
            return locSet.x - 5 >= 0;
        default:
            return false;
    }
}

function moveEntity(entity, magnitude, direction){
    switch(direction){
        case 0:
            if(canMove(entity, 0)){
                entity.y -= magnitude;
            }else{
                entity.y = 480;
            }

            break;
        case 1:
            if(canMove(entity, 1)){
                entity.x += magnitude;
            }else{
                entity.x = 0;
            }

            break;
        case 2:
            if(canMove(entity, 2)){
                entity.y += magnitude;
            }else{
                entity.y = 0;
            }

            break;
        case 3:
            if(canMove(entity, 3)){
                entity.x -= magnitude;
            }else{
                entity.x = 512;
            }

            break;
        case 4:
            if(canMove(entity, 0) && canMove(entity, 1)){
                entity.x += magnitude;
                entity.y -= magnitude;
            }else{
                entity.x = 0;
                entity.y = 512;
            }

            break;
        case 5:
            if(canMove(entity, 1) && canMove(entity, 2)){
                entity.x += magnitude;
                entity.y += magnitude;
            }else{
                entity.x = 0;
                entity.y = 0;
            }

            break;
        case 6:
            if(canMove(entity, 2) && canMove(entity, 3)){
                entity.x -= magnitude;
                entity.y += magnitude;
            }else{
                entity.x = 512;
                entity.y = 0;
            }

            break;
        case 7:
            if(canMove(entity, 3) && canMove(entity, 0)){
                entity.x -= magnitude;
                entity.y -= magnitude;
            }else{
                entity.x = 512;
                entity.y = 480;
            }

            break;
    }
}

function moveGoblin(){
    var min = goblin.face - 1;
    var max = goblin.face + 1;

    if(min < 0){
        min = 7;
    }

    if(min > 7){
        min = 0;
    }

    if(max < 0){
        max = 7;
    }

    if(max > 7){
        max = 0;
    }

    if(tick % 25 == 0){
        goblin.face = getRandomInt(min, max);
    }

    moveEntity(goblin.location, 4, goblin.face);
}

function hitGoblin(){
    if((hero.location.x <= goblin.location.x + 32) &&
        (hero.location.y <= goblin.location.y + 32) &&
        (goblin.location.x <= hero.location.x + 32) &&
        (goblin.location.y <= hero.location.y + 32)){

        goblin.location.x = Math.floor(Math.random() * 480);
        goblin.location.y = Math.floor(Math.random() * 458);
        killCount++;
        document.getElementById('counter').innerHTML = killCount;
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

function draw(){
    update();
    moveGoblin();
    tick++;
    context.drawImage(bgImage, 0, 0);

    var heroImg = new Image();
    heroImg.src = hero.image;
    var goblinImg = new Image();
    goblinImg.src = goblin.image;

    context.drawImage(heroImg, hero.location.x, hero.location.y);
    context.drawImage(goblinImg, goblin.location.x, goblin.location.y);


    requestAnimationFrame(draw);
}

draw();