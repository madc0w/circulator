const initTimeFactor = 80;
const initRadiusFactor = 0.40;
const numIts = 12;
const contexts = [];
let t, radiusFactor;

function onLoad() {
	radiusFactor = initRadiusFactor;
	t = 0;
	for (let i = 0; i < 200; i++) {
		addCanvas();
	}

	requestAnimationFrame(draw);
	// setInterval(draw, 120);
}

function draw() {
	// ctx.fillStyle = '#226';
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (const context of contexts) {
		const canvas = document.getElementById(context.id);
		const ctx = canvas.getContext('2d');
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
			radius *= context.radiusFactor;
			timeFactor *= context.radiusFactor;
		}
		// ctx.stroke();

		if (!context.didInit) {
			ctx.fillStyle = '#226';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#ddd';
			ctx.font = '22px Arial';
			ctx.fillText(context.radiusFactor.toFixed(3), 10, 20);
			context.didInit = true;
		}

		if (context.prevTip) {
			ctx.beginPath();
			ctx.moveTo(context.prevTip.x, context.prevTip.y);
			ctx.lineTo(tip.x, tip.y);
			ctx.strokeStyle = '#ddd';
			// ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
			ctx.stroke();
		}

		// if (contexts.length > 1) {
		// 	console.log(context.id, context.didInit);
		// }
		// if (!context.didInit) {
		// 	ctx.fillStyle = '#ddd';
		// 	ctx.font = '22px Arial';
		// 	ctx.fillText(context.radiusFactor.toFixed(3), 10, 20);
		// 	context.didInit = true;
		// }
		context.prevTip = tip;
	}
	t++;
	requestAnimationFrame(draw);
}

function addCanvas() {
	const canvasContainer = document.getElementById('canvas-container');
	const id = `canvas-${radiusFactor.toFixed(3)}`;
	// canvasContainer.innerHTML += `<div><div>${radiusFactor.toFixed(3)}</div><canvas id="${id}"></canvas></div>`;
	canvasContainer.innerHTML += `<div><canvas id="${id}"></canvas></div>`;
	const canvas = document.getElementById(id);
	const size = Math.min(innerWidth, innerHeight) - 80;
	canvas.height = size;
	canvas.width = size;
	// const ctx = canvas.getContext('2d');
	contexts.push({
		id,
		radiusFactor,
		prevTip: null,
	});
	radiusFactor += 0.001;
}
