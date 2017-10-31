//创建画布
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
//背景
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
}
bgImage.src = './img/background.png';
//英雄
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
}
heroImage.src = './img/hero.png';
//怪兽
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
}
monsterImage.src = './img/monster.png';

var hero = {
	speed: 256,
	x: 32,
	y: 32
}
var monster = {
	x: 0,
	y: 0
}
var monstersCaught = 0;
//处理用户的输入
var keysDown = {};
document.addEventListener('keydown', function(e){
	keysDown[e.keyCode] = true;
})
document.addEventListener('keyup', function(e){
	delete keysDown[e.keyCode];
})
//开始一轮游戏
function reset (){
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64)); 
}
//更新对象
function update(modifier){
	if(38 in keysDown){
		hero.y -= hero.speed * modifier
		if( hero.y < 32 ) {
			hero.y = 32;
		}
	}
	if(40 in keysDown){
		hero.y += hero.speed * modifier
		if( hero.y >= 416) {
			hero.y = 416;
		}
	}
	if(37 in keysDown){
		hero.x -= hero.speed * modifier
		if( hero.x < 32){
			hero.x = 32;
		}
	}
	if(39 in keysDown){
		hero.x += hero.speed * modifier
		if( hero.x > 448){
			hero.x = 448;
		}
	}

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
}
//渲染物体
function render(){
	bgReady && ctx.drawImage(bgImage, 0, 0);
	heroReady && ctx.drawImage(heroImage, hero.x, hero.y);
	monsterReady && ctx.drawImage(monsterImage, monster.x, monster.y);
	// 计分
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
}

var w = window,
	requestAnimationFrame = w.requestAnimationFrame 
						 || w.webkitRequestAnimationFrame 
						 || w.msRequestAnimationFrame 
						 || w.mozRequestAnimationFrame;
function main(){
	var now = Date.now();
    var delta = now - then;
 	update(delta / 1000);
    render();
    then = now;
	requestAnimationFrame(main);
}
var then = Date.now();
reset();
main();