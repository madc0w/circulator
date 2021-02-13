const initTimeFactor = 80;
const radiusFactor = 0.45;
const numIts = 100;
let canvas, ctx, t, prevTip;

function onLoad() {
	document.getElementById('radius-factor').innerHTML = radiusFactor;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	const size = Math.min(innerWidth, innerHeight) - 80;
	canvas.height = size;
	canvas.width = size;
	t = 0;

	ctx.fillStyle = '#226';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(draw);
}

function draw() {
	// ctx.fillStyle = '#226';
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	const center = {
		x: canvas.width / 2,
		y: canvas.height / 2,
	};

	ctx.strokeStyle = '#ddd';
	ctx.lineWidth = 2;

	let radius = Math.min(canvas.width, canvas.height) * 0.25;
	// ctx.beginPath();
	// ctx.moveTo(center.x, center.y);
	let tip = center;
	let timeFactor = initTimeFactor;
	for (let i = 0; i < numIts; i++) {
		tip = {
			x: tip.x + Math.cos(t / timeFactor) * radius,
			y: tip.y + Math.sin(t / timeFactor) * radius
		};
		// ctx.lineTo(tip.x, tip.y);
		radius *= radiusFactor;
		timeFactor *= radiusFactor;
	}
	// ctx.stroke();

	if (prevTip) {
		ctx.beginPath();
		ctx.moveTo(prevTip.x, prevTip.y);
		ctx.lineTo(tip.x, tip.y);
		ctx.strokeStyle = '#ddd';
		// ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
		ctx.stroke();
	}

	t++;
	prevTip = tip;
	requestAnimationFrame(draw);
}
