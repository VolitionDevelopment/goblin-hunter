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


var keysDown = [];

addEventListener('keydown', function(event){
    keysDown[event.keyCode] = true;
});

addEventListener('keyup', function(event){
    keysDown[event.keyCode] = false;
});

function update(){
    if(keysDown[40]){
        if(canMoveDown()){
            heroLocation.y += 5;
        }
    }

    if(canMoveRight()){
        if(keysDown[39]){
            heroLocation.x += 5;
        }
    }

    if(canMoveUp()){
        if(keysDown[38]){
            heroLocation.y -= 5;
        }
    }

    if(canMoveLeft()){
        if(keysDown[37]){
            heroLocation.x -= 5;
        }
    }

    hitGoblin();
}

function canMoveLeft(){
    return heroLocation.x - 5 >= 0;
}

function canMoveRight(){
    return heroLocation.x + 5 + 32 < 512;
}

function canMoveDown(){
    return heroLocation.y + 5 + 32 < 480;
}

function canMoveUp(){
    return heroLocation.y - 5 >= 0;
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

function moveGoblin(){

}

function draw(){
    update();
    context.drawImage(bgImage, 0, 0);
    context.drawImage(hero, heroLocation.x, heroLocation.y);
    context.drawImage(goblin, goblinLocation.x, goblinLocation.y);


    requestAnimationFrame(draw);
}

draw();