const initRadiusFactor = 0.1;
const radiusFactorIncrement = 0.001;
const numFrames = 80;
const initTimeFactor = 120;
const numIts = 8;
const contexts = [];
let t = 0;

function onLoad() {
	t = 0;
	let radiusFactor = initRadiusFactor;
	for (let i = 0; i < numFrames; i++) {
		addCanvas(radiusFactor);
		radiusFactor += radiusFactorIncrement;
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

		ctx.lineWidth = 2;

		let radius = Math.min(canvas.width, canvas.height) * 0.25;
		let tip = center;
		let timeFactor = initTimeFactor;
		for (let i = 0; i < numIts; i++) {
			ctx.fillStyle = hsvToRgb(i / numIts, 0.4, 0.8);
			// ctx.strokeStyle = hsvToRgb(i / numIts, 0.4, 0.8);
			ctx.beginPath();
			// ctx.moveTo(tip.x, tip.y);
			tip = {
				x: tip.x + Math.cos(t / timeFactor) * radius,
				y: tip.y + Math.sin(t / timeFactor) * radius
			};
			// ctx.lineTo(tip.x, tip.y);
			// ctx.stroke();
			ctx.arc(tip.x, tip.y, 2, 0, Math.PI * 2);
			ctx.fill();
			radius *= context.radiusFactor;
			timeFactor *= context.radiusFactor;
		}

		if (!context.didInit) {
			ctx.fillStyle = '#eef';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#444';
			ctx.font = '22px Arial';
			ctx.fillText(context.radiusFactor.toFixed(4), 10, 20);
			context.didInit = true;
		}

		// if (context.prevTip) {
		// 	ctx.beginPath();
		// 	ctx.moveTo(context.prevTip.x, context.prevTip.y);
		// 	ctx.lineTo(tip.x, tip.y);
		// 	ctx.strokeStyle = '#ddd';
		// 	// ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
		// 	ctx.stroke();
		// }

		context.prevTip = tip;
	}
	t++;
	requestAnimationFrame(draw);
}

function addCanvas(radiusFactor) {
	const canvasContainer = document.getElementById('canvas-container');
	const id = `canvas-${radiusFactor.toFixed(4)}`;
	// canvasContainer.innerHTML += `<div><div>${radiusFactor.toFixed(4)}</div><canvas id="${id}"></canvas></div>`;
	canvasContainer.innerHTML += `<div><canvas id="${id}"></canvas></div>`;
	const canvas = document.getElementById(id);
	const size = Math.min(innerWidth, innerHeight) - 80;
	canvas.height = size;
	canvas.width = size;
	// const ctx = canvas.getContext('2d');
	contexts.push({
		id,
		radiusFactor,
	});
}

function saveAll() {
	const input = document.getElementById('image-file-chooser');
	const img = document.getElementById('input-image');

	const file = input.files[0];
	const fr = new FileReader();
	fr.onload = function () {
		Image.load(fr.result).then(image => {
			img.src = image.toDataURL();
		}).then(null, err => {
			alert(err);
			console.error(err);
		});
	};
	fr.readAsDataURL(file);

}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
	let r, g, b;

	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0:
			r = v, g = t, b = p;
			break;
		case 1:
			r = q, g = v, b = p;
			break;
		case 2:
			r = p, g = v, b = t;
			break;
		case 3:
			r = p, g = q, b = v;
			break;
		case 4:
			r = t, g = p, b = v;
			break;
		case 5:
			r = v, g = p, b = q;
			break;
	}

	r = Math.floor(r * 255).toString(16);
	if (r.length < 2) {
		r = '0' + r;
	}
	g = Math.floor(g * 255).toString(16);
	if (g.length < 2) {
		g = '0' + g;
	}
	b = Math.floor(b * 255).toString(16);
	if (b.length < 2) {
		b = '0' + b;
	}
	return `#${r}${g}${b}`;
}
