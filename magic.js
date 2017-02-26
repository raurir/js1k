d = document.createElement("canvas"); // create offscreen canvas for drawing 2x version.
e = d.getContext("2d");

// debug = document.createElement("div");
// b.appendChild(debug)
// b.appendChild(d);

var size = a.width = a.height = 1024,
	M = Math,
	sc = 1, // true
	scaleTarget = 1, // true
	beginWarp = 1, // true
	// third = M.PI / 3, // doesn't compress better, eek!
	parts = [],
	dead = [];

d.width = d.height = size * 2;

var r = v => ~~(M.random() * v); // hah, so much for arrow funcs. choosing closure compiler was dumb.

var create = (parent, d, mod) => {
	var p;
	var x = parent ? parent.x : size;
	var y = parent ? parent.y : size;
	mod = mod || 1;
	var o = !parent;

	var hue = parent ? 
		parent.hue + r(40) - 20 : // adopt and mutate parent colour
		160 + r(70); // or generate a new one
	var colour = "hsl(" + hue + ",99%," + mod * 60 + "%)";

	if (parent && dead[0]) {
		p = dead.splice(-1)[0]; // restore a particle from dead pool
		p.d = d;
		p.x = x;
		p.y = y;
		p.o = 0; // false
		p.pos = 0;
		p.alive = 3;
		p.colour = colour;
		p.P = [x,y];

	} else {

		// if (parts.length > size) return; // seems to naturally level out at <2k particles

		p = {
			P: [x,y], 	// path
			pos: 0, 	// position along side of polygon, goes from 0 > 1
			alive: 3,	// keep going until you're zero, ie. dead.
			x,
			y,
			o,					// origin, doesn't have a parent
			d: d || r(3) * 2, 	// direction 0, 2 or 4
			mod,				// modifier for scale, colour and speed
			s: 8 * mod,
			fade: .9 + r(9) * .01, // a number close to .95
			hue,
			colour,
			kill: () => {
				p.alive = 0;
				dead.push(p);
			},
			m: () => {

				if (p.alive == 0) {
					return;
				}

				if (!p.o) p.alive *= p.fade;

				if (p.alive < 1/size) { // arbitrary small number... 
					p.kill();
					return;
				}

				p.pos += 1 / 8; // thanks p01!!
				if (p.pos == 1) {

					if (p.x < 0 || p.x > size * 2 || p.y < 0 || p.y > size * 2) { // out of bounds
						if (p.o) {
							create(); // if origin create a new origin
						} else {
							p.kill();
						}
						return;
					}

					p.pos = 0; // reset to start of next side

					p.d += r(2) * 2 - 1; // add +/- 1 to new dir.
					// p.d += r(16); // funky triangles or whatever...

					if (p.mod > 1 / 4 && r(9) > 7) { // if large enough, rarely duplicate at current position

						for (var i = r(6); i--;) { // make a few clones
							var newDir = p.d + r(2) * 4 - 2; // make sure clone has new direction +/- 2
							create(p, newDir, p.mod / 2); // duplicate at half size
						}
					}

				} else {

					// con.log("p.pos", p.pos)
					p.x += M.sin(p.d * M.PI / 3) * p.s;
					p.y += M.cos(p.d * M.PI / 3) * p.s;

					p.P.unshift(p.x, p.y);
					p.P.splice(6); // 3 sets of x,y pairs
					// 3 points is enough to draw a nice line around corners with out ugly line capping

					e.lineWidth = p.mod * 6;
					e.strokeStyle = p.colour;
					e.beginPath();
					e.moveTo(p.P[0], p.P[1]);
					e.lineTo(p.P[2], p.P[3]);
					e.lineTo(p.P[4], p.P[5]);
					e.stroke();

				}

			}
		}

		parts.push(p);

	}

};

// var flipLights = 0;

var render = (t) =>{
	requestAnimationFrame(render);
	// debug.innerHTML = parts.map(p=>Math.round(p.x));

	if ((0|(t / size)) % 5 == 0) {
		if (!beginWarp) { // warp has just begun! fuck yeah.
			beginWarp = 1; // true
			// flipLights = !flipLights;
			scaleTarget = M.random() / 2 + .7; // Math.sqrt(2) / 2 is min scale
		}
	} else {
		beginWarp = 0; // false
	}

	sc -= (sc - scaleTarget) / 20;

	c.save();
	c.translate(size / 2, size / 2);
	c.scale(sc, sc);
	c.rotate(t * .0001); // arbitrary divisor
	c.translate(-size, -size);

	// e.globalCompositeOperation = flipLights ? "source-over" : "lighter";
	// nice effects but... not what i had in mind.
	e.fillStyle = "rgba(0,0,0,.02)";
	e.fillRect(0, 0, size * 2, size * 2);

	// e.shadowColor = "black";
	// e.shadowBlur = 4;

	for(var i=parts.length;i--;) parts[i].m();

	c.drawImage(d, 0, 0);
	c.restore();

};

while(sc -= 1/8) create(); // creates 7.
// con.log(parts.length)
render(1);