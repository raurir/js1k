// b.addEventListener("click", e=> {debugger});
d = document.createElement("canvas");
e = d.getContext("2d");

// debug = document.createElement("div");
// b.appendChild(debug)
// b.appendChild(d);

var size = a.width = a.height = 1024, 
	M = Math, 
	sc = 1, 
	scaleTarget = 1, 
	beginWarp = 1, // true 
	third = M.PI / 3, 
	parts = [], 
	dead = [];

d.width = d.height = size * 2;

var r = v => ~~(M.random() * v);

var sixit = v => v;//(v + 6) % 6; // clamp v between 0 and 6

var create = (parent, d, mod) => {
	var p;
	var x = parent ? parent.x : size;
	var y = parent ? parent.y : size;
	mod = mod || 1;
	var o = !parent;

	var hue = parent ? parent.hue + r(40) - 20 : 160 + r(70);//(150 + parts.length * 20);

	// con.log(o)
	// con.log(x, y);

	// e.fillStyle = "blue"

	// e.fillRect(x - 5, y - 5, 10, 10);//p.s, p.s);

	var colour = "hsl(" + hue + ",100%," + mod * 60 + "%)";
	// con.log(colour)

	
	if (parent && dead.length) {
		p = dead.splice(-1)[0];
		p.d = d;
		p.x = p.lx = x;
		p.y = p.ly = y;
		p.o = 0; // false;
		p.pos = 0;
		p.dying = r(4) + 1;
		p.alive = 1; // true
		p.colour = colour;
		p.path = [];
		//p.setColour();
		
	} else {

		// if (parts.length > size) return ;//con.warn("too many!");



		p = {
			path: [],
			pos: 0,
			dying: 1,
			alive: 1, // true
			x,
			y,
			lx: x,
			ly: y,

			o,
			life: 0,
			d: d || r(3) * 2, // 0, 2 or 4
			mod,
			s: 8 * mod,
			hue,
			// s: 1 / M.pow(2, r(2)),
			// setColour: () => {
				// p.colour = "hsla(" + (p.life++ * 20) + ",50%," + (20 + p.s * 20) +"%,0.7)";
			colour,
				// p.colour = parent ? parent.colour : "hsla(" + r(360) + ",50%,50%,1)";
				// con.log(p.colour)
			// },
			kill: () => {
				p.path = [];
				// p.x = 0;
				// p.y = 0;
				p.alive = 0; //false;
				dead.push(p);
			},
			m: () => {

				if (p.alive == 0) {
					// e.fillStyle = p.colour;
					// e.fillText(p.index, p.index * 5, 10);
					return;//con.log("returning")
				}

				p.dying *= p.o ? 1 : 0.95;

				if (p.dying < 0.001) {
					p.kill();
					return;
				}

				p.pos += 1 / 8; //p01!!
				if (p.pos==1) {

					if (p.x < 0 || p.x > size * 2 || p.y < 0 || p.y > size * 2) {
						if (p.o) {
							create();
						} else {
							p.kill();
						}
						return;
					}


					p.pos = 0;
					// p.setColour();
					p.d += r(2) * 2 - 1; // add -1 or 1 to new dir.
					// p.d += r(16);//

					if (p.mod > 1 / 4 && r(9) > 7) { // duplicate at current position
						
						// var newDir = r(2) * 4 - 2; // + -2 or 2
						// newDir = p.d + newDir; // make sure clone has new direction
						// newDir = (newDir + 6) % 6; // clamp to positives: 0 > 5
						for (var i = r(6); i--;) {
							// con.log(i)
							
							var newDir = p.d + r(2) * 4 - 2; // same as above 3 lines
							
							// e.fillStyle = "red"
							// e.fillRect(p.x - 10, p.y - 10, 20, 20);//p.s, p.s);

							// create(false, p.x, p.y, newDir, p.mod / 2);
							create(p, newDir, p.mod / 2);
							// debugger;
						}
					}

				} else {

					// con.log("p.pos", p.pos)
					p.x += M.sin(p.d * third) * p.s;
					p.y += M.cos(p.d * third) * p.s;


					p.path.push([p.x, p.y]);

					if (p.path.length > 30) {
						p.path.shift();
					}
					// if 

					// e.fillStyle = "#000"
					// e.fillStyle = p.colour;
					// e.fillRect(p.x, p.y, 1, 1);//p.s, p.s);
					// e.fillText(p.index, p.x, p.y + 10);
					e.lineWidth = p.mod * 6;
					e.strokeStyle = p.colour;
					e.beginPath();
					
					p.path.forEach((n,i) => {
						e[i ? "lineTo" : "moveTo"](n[0], n[1]);
					});

					// e.(p.x, p.y);
					e.stroke();



				}
				// if (p.d < 0 || p.d > 5) {con.log("aargh", p.d);}

				// if (M.round(p.x * 32) != p.x * 32) con.log("unround", p.x)


			}
		}

		// p.setColour();
		// p.index = parts.length;
		parts.push(p);


	}

};
var render = (t) =>{
	// con.log(t)

	// debug.innerHTML = parts.map(p=>Math.round(p.x)); 

	if ((0|(t / size)) % 5 == 0) {
		if (!beginWarp) { // warp has just begun! fuck yeah.
			beginWarp = 1; // true
			scaleTarget = M.random() / 2 + .7; // Math.sqrt(2) / 2 is min scale
		}
	} else {
		beginWarp = 0; // false
	}

	sc -= (sc - scaleTarget) / 20;

	c.save();
	c.translate(size / 2, size / 2);
	c.scale(sc, sc);
	c.rotate(t * 0.0001); // arbitrary divisor
	c.translate(-size, -size);

	// e.globalCompositeOperation = "source-over";
	// e.globalCompositeOperation = "lighter";
	e.fillStyle = "rgba(0,0,0,.03)";
	e.fillRect(0, 0, size * 2, size * 2);

	for(var i=parts.length;i--;) parts[i].m();

	c.drawImage(d, 0, 0);
	c.restore();
	requestAnimationFrame(render);
};

while(parts.length < 6) create();

render(1);