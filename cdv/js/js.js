/*
 *snow normal
 */


let id_h,
	cnt = 0,
	old = 0,
	clickedId,
	arr = [1 , 2, 3, 4, 5, 6];



$(".classOfLink").click(function()
	{
		old = 1;
		clickedId = $(this).attr("id");
		id_h = document.getElementById(clickedId);
		arr.indexOf(clickedId);
		id_h.style.display = "none";
		cnt++;
		if (cnt == 6)
		{
			var div = document.createElement('div');
			div.className = 'xmasTree';
			document.getElementById("wrap").style.display = "none";
			document.getElementById("removen").style.display = "none";
			document.getElementById("snow").style.display = "none";
			document.getElementById("color-n").style.display = "none";
			document.getElementById("bdy").id = "";
			document.body.appendChild(div);
		}
	});
/*
			------------------
			*/
function someFunction(cnt, oldcnt, clickedId){
	if (cnt == 7)
		cnt = 1;
	let element = document.getElementById(cnt);
	let str = document.getElementById(cnt).className;
	let name = "aniBtn";
	element.className += " " + name;
	if (oldcnt > 0)
	{
		element = document.getElementById(oldcnt);
		element.classList.remove(name);
	}
	oldcnt = cnt;
	cnt++;	
	setTimeout(someFunction, 2000, cnt, oldcnt, clickedId);
	// YES, setTimeout passes any extra args to
	// function being called
}
someFunction(1, 0, clickedId);
/*
			------------------
			*/
var y = 5,
	on = 0,
	win = window,
	doc = document,
	docElem = doc.documentElement,
	body = doc.getElementsByTagName('body')[0],
	y = win.innerHeight|| docElem.clientHeight|| body.clientHeight,
	y = y + 'px';

document.getElementById('fixH').style.height = y;

(function () {

	var COUNT = 500;
	var masthead = document.querySelector('.sky');
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var width = masthead.clientWidth;
	var height = masthead.clientHeight;
	var i = 0;
	var active = false;

	function onResize() {
		width = masthead.clientWidth;
		height = masthead.clientHeight;
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = 'snow';

		var wasActive = active;
		active = width > 600;

		if (!wasActive && active)
			requestAnimFrame(update);
	}

	var Snowflake = function () {
		this.x = 0;
		this.y = 0;
		this.vy = 0;
		this.vx = 0;
		this.r = 0;

		this.reset();
	}

	Snowflake.prototype.reset = function() {
		this.x = Math.random() * width;
		this.y = Math.random() * -height;
		this.vy = 1 + Math.random() * 3;
		this.vx = 0.5 - Math.random();
		this.r = 1 + Math.random() * 2;
		this.o = 0.5 + Math.random() * 0.5;
	}

	canvas.style.position = 'absolute';
	canvas.style.left = canvas.style.top = '0';

	var snowflakes = [], snowflake;
	for (i = 0; i < COUNT; i++) {
		snowflake = new Snowflake();
		snowflake.reset();
		snowflakes.push(snowflake);
	}

	function update() {

		ctx.clearRect(0, 0, width, height);

		if (!active)
			return;

		for (i = 0; i < COUNT; i++) {
			snowflake = snowflakes[i];
			snowflake.y += snowflake.vy;
			snowflake.x += snowflake.vx;

			ctx.globalAlpha = snowflake.o;
			ctx.beginPath();
			ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();

			if (snowflake.y > height) {
				snowflake.reset();
			}
		}

		requestAnimFrame(update);
	}

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	onResize();
	window.addEventListener('resize', onResize, false);

	masthead.appendChild(canvas);
})();

/*
 *snow effect gold
 */

'use strict';

const canvas = document.querySelector('canvas.snowWrap');
const ctx = canvas.getContext('2d');
let width, height, lastNow;
let snowflakes;
const maxSnowflakes = 150;

function init() {
	snowflakes = [];
	resize();
	render(lastNow = performance.now());
}

function render(now) {
	requestAnimationFrame(render);
	const elapsed = now - lastNow;
	lastNow = now;
	ctx.clearRect(0, 0, width, height);
	if (snowflakes.length < maxSnowflakes) snowflakes.push(new Snowflake());
	ctx.fillStyle = ctx.strokeStyle = '#FFD700';
	snowflakes.forEach(snowflake => snowflake.update(elapsed, now));
}

function pause() {
	cancelAnimationFrame(render);
}

function resume() {
	lastNow = performance.now();
	requestAnimationFrame(render);
}

class Snowflake {
	constructor() {
		this.spawn();
	}

	spawn(anyY = false) {
		this.x = rand(0, width);
		this.y = anyY === true ? rand(-50, height + 50) : rand(-50, -10);
		this.xVel = rand(-.05, .05);
		this.yVel = rand(.02, .1);
		this.angle = rand(0, Math.PI * 2);
		this.angleVel = rand(-.001, .001);
		this.size = rand(7, 12);
		this.sizeOsc = rand(.01, .5);
	}

	update(elapsed, now) {
		const xForce = rand(-.001, .001);

		if (Math.abs(this.xVel + xForce) < .075) {
			this.xVel += xForce;
		}

		this.x += this.xVel * elapsed;
		this.y += this.yVel * elapsed;
		this.angle += this.xVel * 0.05 * elapsed; //this.angleVel * elapsed

		if (this.y - this.size > height || this.x + this.size < 0 || this.x - this.size > width) {
			this.spawn();
		}

		this.render();
	}

	render() {
		ctx.save();
		const {
			x,
			y,
			angle,
			size
		} = this;
		ctx.beginPath();
		ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}

} // Utils


const rand = (min, max) => min + Math.random() * (max - min);

function resize() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
window.addEventListener('blur', pause);
window.addEventListener('focus', resume);
init();
