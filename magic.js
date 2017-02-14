
d = document.createElement("canvas");
e = d.getContext("2d");

// debug = document.createElement("div");
// b.appendChild(debug)
// b.appendChild(d);

var size = a.width = a.height = 512, 
	M = Math, 
	sc = 1, 
	scaleTarget = 1, 
	beginWarp = false, 
	third = M.PI / 3, 
	parts = [], 
	dead = [],
	i;

d.width = d.height = size * 2;

var r = (v) => { return ~~(M.random() * v || 1); };

var sixit = (v) => { return (v + 6) % 6 }; // clamp v between 0 and 6

var create = (x, y, dir) => {
	var p;
	if (dead.length) {
		p = dead.splice(-1)[0];
		p.x = p.y = size;
		p.dir = dir;
		p.setColour();
		// con.log("dead.length", dead.length, p)

	} else {

		if (parts.length > size) return ;//con.warn("too many!");

		p = {
			life: 0,
			dir: dir || r(3) * 2, // 0, 2 or 4
			x: x || size,
			y: y || size,
			s: 2 / M.pow(2, r(2)),
			v: 1 / 16, // / M.pow(2, r(4)),
			setColour: () => {
				p.pos = 0;
				p.alive = true;
				p.colour = "hsla(" + (p.life++ * 20) + ",70%," + (40 + p.s * 20) +"%,0.7)";
				// con.log(p.colour)
			},
			m: () => {

				if (p.alive == false) return ;//con.log("returning")

				p.pos += p.v;// 1 / 16; //p01!!
				if (p.pos==1) {

					if (p.x < 0 || p.y > size * 2 || p.y < 0 || p.y > size * 2) {
						p.alive = false;
						dead.push(p);
						return;
					}


					p.pos = 0;
					// p.setColour();
					p.dir += sixit(r(2) * 2 - 1); // add -1 or 1 to new dir.

					if (r(10) > 8) { // duplicate at current position
						
						// var newDir = r(2) * 4 - 2; // + -2 or 2
						// newDir = p.dir + newDir; // make sure clone has new direction
						// newDir = (newDir + 6) % 6; // clamp to positives: 0 > 5

						var newDir = sixit(p.dir + r(2) * 4 - 2); // same as above 3 lines

						create(p.x, p.y, newDir);

					}

				} else {

					// p.x += dirs[p.dir][0] * p.s;
					// p.y += dirs[p.dir][1] * p.s;

					// con.log("p.pos", p.pos)
					p.x += M.sin(p.dir * third) * p.s;
					p.y += M.cos(p.dir * third) * p.s;


					e.fillStyle = p.colour;
					e.fillRect(p.x, p.y, 1, 1);//p.s, p.s);

				}
				// if (p.dir < 0 || p.dir > 5) {con.log("aargh", p.dir);}

				// if (M.round(p.x * 32) != p.x * 32) con.log("unround", p.x)


			}
		}

		p.setColour();

		parts.push(p);


	}

};
var render = (t) =>{

	if ((M.floor(t / 1000) + 1) % 3 == 0) {
		if (beginWarp == false) { // warp has just begun! fuck yeah.
			beginWarp = true;
			scaleTarget = M.random() + .7;
		}
	} else {
		beginWarp = false;
	}

	sc -= (sc - scaleTarget) / 9;

	c.save();
	c.translate(size / 2, size / 2);
	c.scale(sc, sc);
	c.rotate(t * 0.0001); // arbitrary divisor
	c.translate(-size, -size);

	e.fillStyle = "rgba(0,0,0,0.1)";
	e.fillRect(0, 0, size * 2, size * 2);


	// if (!warpMode)
	for(i=0;i<parts.length;i++) parts[i].m();

	c.drawImage(d, 0, 0);
	c.restore();
	requestAnimationFrame(render);
};

while(parts.length < 64) create();

render(0);