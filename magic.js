
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

// var approxSin0 = 0; 			//sin0 = M.sin(0 * third); con.log("approxSin0", approxSin0, "sin0", sin0, M.round(approxSin0 * 10) === M.round(sin0 * 10))
// var approxCos0 = 1; 			//cos0 = M.cos(0 * third); con.log("approxCos0", approxCos0, "cos0", cos0, M.round(approxCos0 * 10) === M.round(cos0 * 10))
// var approxSin1 = 1/2+1/4+1/8;	//sin1 = M.sin(1 * third); con.log("approxSin1", approxSin1, "sin1", sin1, M.round(approxSin1 * 10) === M.round(sin1 * 10))
// var approxCos1 = 1/2; 			//cos1 = M.cos(1 * third); con.log("approxCos1", approxCos1, "cos1", cos1, M.round(approxCos1 * 10) === M.round(cos1 * 10))
// var approxSin2 = approxSin1; 	//sin2 = M.sin(2 * third); con.log("approxSin2", approxSin2, "sin2", sin2, M.round(approxSin2 * 10) === M.round(sin2 * 10))
// var approxCos2 = -approxCos1;			//cos2 = M.cos(2 * third); con.log("approxCos2", approxCos2, "cos2", cos2, M.round(approxCos2 * 10) === M.round(cos2 * 10))
// var approxSin3 = 0; 			//sin3 = M.sin(3 * third); con.log("approxSin3", approxSin3, "sin3", sin3, M.round(approxSin3 * 10) === M.round(sin3 * 10))
// var approxCos3 = -1; 			//cos3 = M.cos(3 * third); con.log("approxCos3", approxCos3, "cos3", cos3, M.round(approxCos3 * 10) === M.round(cos3 * 10))
// var approxSin4 = -approxSin2;	//sin4 = M.sin(4 * third); con.log("approxSin4", approxSin4, "sin4", sin4, M.round(approxSin4 * 10) === M.round(sin4 * 10))
// var approxCos4 = -approxCos1;			//cos4 = M.cos(4 * third); con.log("approxCos4", approxCos4, "cos4", cos4, M.round(approxCos4 * 10) === M.round(cos4 * 10))
// var approxSin5 = -(1/2+1/4+1/8);//sin5 = M.sin(5 * third); con.log("approxSin5", approxSin5, "sin5", sin5, M.round(approxSin5 * 10) === M.round(sin5 * 10))
// var approxCos5 = approxCos1; 			//cos5 = M.cos(5 * third); con.log("approxCos5", approxCos5, "cos5", cos5, M.round(approxCos5 * 10) === M.round(cos5 * 10))

// var dirs = [
// 	approxSin0, approxCos0,
// 	approxSin1, approxCos1,
// 	approxSin2, approxCos2,
// 	approxSin3, approxCos3,
// 	approxSin4, approxCos4,
// 	approxSin5, approxCos5
// ]

var r = function (v) { return ~~(M.random() * v || 1); };

var create = function(x, y, dir){
	var p;
	if (dead.length) {
		p = dead.splice(-1)[0];
		p.alive = true;
		p.x = size;
		p.y = size;
		p.dir = dir;
		p.pos = 0;
		p.setColour();
		// con.log("dead.length", dead.length, p)

	} else {

		if (parts.length > size) return ;//con.warn("too many!");

		p = {
			alive: true,
			life: 0,
			dir: dir || r(3) * 2, // 0, 2 or 4
			x: x || size,
			y: y || size,
			pos: 0,
			s: 2 / M.pow(2, r(2)),
			setColour: () => {
				p.colour = "hsla(" + (p.life++ * 20) + ",70%,50%,0.7)";
			},
			m: () => {

				if (p.alive == false) return ;//con.log("returning")

				p.pos += 1/32; //p01!!
				if (p.pos==1) {

					if (p.x < 0 || p.y > size * 2 || p.y < 0 || p.y > size * 2) {
						p.alive = false;
						dead.push(p);
						return;
					}


					p.pos = 0;
					p.dir += r(2) * 2 - 1; // -1 or 1
					p.dir = (p.dir + 6) % 6; // clamp to positives: 0 > 5

					if (r(10) > 8) {
						var newDir = r(2) * 4 - 2; // + -2 or 2
						newDir = p.dir + newDir; // make sure clone has new direction
						newDir = (newDir + 6) % 6; // clamp to positives: 0 > 5

						create(p.x, p.y, newDir)

					}

				} else {

					// p.x += dirs[p.dir][0] * p.s;
					// p.y += dirs[p.dir][1] * p.s;

					// con.log("p.pos", p.pos)
					p.x += M.sin(p.dir * third) * p.s;
					p.y += M.cos(p.dir * third) * p.s;


					e.fillStyle = p.colour;
					e.fillRect(p.x, p.y, p.s, p.s);

				}
				// if (p.dir < 0 || p.dir > 5) {con.log("aargh", p.dir);}

				// if (M.round(p.x * 32) != p.x * 32) con.log("unround", p.x)


			}
		}

		p.setColour();

		parts.push(p);


	}

}, render = function(t){

	if ((M.floor(t / 1000) + 1) % 3 == 0) {
		if (beginWarp == false) { // warp has just begun! fuck yeah.
			beginWarp = true;
			scaleTarget = M.random() + .7;
		}
	} else {
		beginWarp = false;
	}

	sc -= (sc - scaleTarget) / 9;

	// debug.innerHTML = [seconds, warpMode, scaleTarget];

	// create();

	// c.fillStyle = "rgba(0,0,0,0.2)";
	// c.fillRect(0,0,size, size);


	c.save();
	c.translate(size / 2, size / 2);
	c.scale(sc, sc);
	c.rotate(t * 0.0001); // arbitrary divisor
	c.translate(-size, -size)

	e.fillStyle = "rgba(0,0,0,0.08)"
	e.fillRect(0,0,size * 2, size*2)


	// if (!warpMode)
	for(i=0;i<parts.length;i++) parts[i].m();

	c.drawImage(d, 0, 0);
	c.restore();
	// if (t < 2000)
	requestAnimationFrame(render);
};

while(parts.length < 64) create();


render(0);