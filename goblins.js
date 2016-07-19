/**
 * Created by Jackson on 7/19/16.
 */
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var killCount = 0;

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

var bgImage = new Image();
bgImage.src = 'assets/background.png';

var hero = new Image();
hero.src = 'assets/hero.png';
var heroLocation = {
    x: 100,
    y: 100
};

var goblin = new Image();
goblin.src = 'assets/monster.png';
var goblinLocation = {
    x: 150,
    y: 100
};
var goblinFace = 0;


var keysDown = [];

addEventListener('keydown', function(event){
    keysDown[event.keyCode] = true;
});

addEventListener('keyup', function(event){
    keysDown[event.keyCode] = false;
});

function update(){
    if(keysDown[40]){
        if(canMove(heroLocation, 2)){ //2
            moveEntity(heroLocation, 2)
        }
    }

    if(keysDown[39]){
        if(canMove(heroLocation, 1)){ //1
            moveEntity(heroLocation, 1)
        }
    }

    if(keysDown[38]){
        if(canMove(heroLocation, 0)){ //3
            moveEntity(heroLocation, 0)
        }
    }

    if(keysDown[37]){
        if(canMove(heroLocation, 3)){ //0
            moveEntity(heroLocation, 3)
        }
    }

    hitGoblin();
}

function canMove(locSet, direction){
    switch(direction){
        case 0:
            return locSet.y - 5 >= 0;
        case 1:
            return locSet.x + 5 + 32 < 512;
        case 2:
            return locSet.y + 5 + 32 < 480;
        case 3:
            return locSet.x - 5 >= 0;
        default:
            return false;
    }
}

function moveEntity(entity, direction){
    switch(direction){
        case 0:
            if(canMove(entity, 0)){
                entity.y -= 5;
            }

            break;
        case 1:
            if(canMove(entity, 1)){
                entity.x += 5;
            }

            break;
        case 2:
            if(canMove(entity, 2)){
                entity.y += 5;
            }

            break;
        case 3:
            if(canMove(entity, 3)){
                entity.x -= 5;
            }

            break;
        case 4:
            if(canMove(entity, 0) && canMove(entity, 1)){
                entity.x += 5;
                entity.y -= 5;
            }

            break;
        case 5:
            if(canMove(entity, 1) && canMove(entity, 2)){
                entity.x += 5;
                entity.y += 5;
            }

            break;
        case 6:
            if(canMove(entity, 2) && canMove(entity, 3)){
                entity.x -= 5;
                entity.y += 5;
            }

            break;
        case 7:
            if(canMove(entity, 3) && canMove(entity, 0)){
                entity.x -= 5;
                entity.y -= 5;
            }

            break;
    }
}

function moveGoblin(){
    var min = goblinFace - 1;
    var max = goblinFace + 1;

    if(min < 0){
        min = 3;
    }

    if(min > 3){
        min = 0;
    }

    if(max < 0){
        max = 3;
    }

    if(max > 3){
        max = 0;
    }

    var direction = getRandomInt(min, max);
    moveEntity(goblinLocation, direction);
    goblinFace = direction;

}

function hitGoblin(){
    if((heroLocation.x <= goblinLocation.x + 32) &&
        (heroLocation.y <= goblinLocation.y + 32) &&
        (goblinLocation.x <= heroLocation.x + 32) &&
        (goblinLocation.y <= heroLocation.y + 32)){

        goblinLocation.x = Math.floor(Math.random() * 480);
        goblinLocation.y = Math.floor(Math.random() * 458);
        killCount++;
        document.getElementById('counter').innerHTML = killCount;
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw(){
    update();
    moveGoblin();
    context.drawImage(bgImage, 0, 0);
    context.drawImage(hero, heroLocation.x, heroLocation.y);
    context.drawImage(goblin, goblinLocation.x, goblinLocation.y);


    requestAnimationFrame(draw);
}

draw();