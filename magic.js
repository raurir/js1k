
d = document.createElement("canvas");
e = d.getContext("2d")

debug = document.createElement("div");

b.appendChild(debug)
b.appendChild(d)



a.width = a.height = size = 512;

d.width = d.height = size * 2;


var third = Math.PI / 3

var approxSin0 = 0; 			//sin0 = Math.sin(0 * third); con.log("approxSin0", approxSin0, "sin0", sin0, Math.round(approxSin0 * 10) === Math.round(sin0 * 10))
var approxCos0 = 1; 			//cos0 = Math.cos(0 * third); con.log("approxCos0", approxCos0, "cos0", cos0, Math.round(approxCos0 * 10) === Math.round(cos0 * 10))
var approxSin1 = 1/2+1/4+1/8;	//sin1 = Math.sin(1 * third); con.log("approxSin1", approxSin1, "sin1", sin1, Math.round(approxSin1 * 10) === Math.round(sin1 * 10))
var approxCos1 = 1/2; 			//cos1 = Math.cos(1 * third); con.log("approxCos1", approxCos1, "cos1", cos1, Math.round(approxCos1 * 10) === Math.round(cos1 * 10))
var approxSin2 = 1/2+1/4+1/8; 	//sin2 = Math.sin(2 * third); con.log("approxSin2", approxSin2, "sin2", sin2, Math.round(approxSin2 * 10) === Math.round(sin2 * 10))
var approxCos2 = -1/2;			//cos2 = Math.cos(2 * third); con.log("approxCos2", approxCos2, "cos2", cos2, Math.round(approxCos2 * 10) === Math.round(cos2 * 10))
var approxSin3 = 0; 			//sin3 = Math.sin(3 * third); con.log("approxSin3", approxSin3, "sin3", sin3, Math.round(approxSin3 * 10) === Math.round(sin3 * 10))
var approxCos3 = -1; 			//cos3 = Math.cos(3 * third); con.log("approxCos3", approxCos3, "cos3", cos3, Math.round(approxCos3 * 10) === Math.round(cos3 * 10))
var approxSin4 = -approxSin2;	//sin4 = Math.sin(4 * third); con.log("approxSin4", approxSin4, "sin4", sin4, Math.round(approxSin4 * 10) === Math.round(sin4 * 10))
var approxCos4 = -1/2;			//cos4 = Math.cos(4 * third); con.log("approxCos4", approxCos4, "cos4", cos4, Math.round(approxCos4 * 10) === Math.round(cos4 * 10))
var approxSin5 = -(1/2+1/4+1/8);//sin5 = Math.sin(5 * third); con.log("approxSin5", approxSin5, "sin5", sin5, Math.round(approxSin5 * 10) === Math.round(sin5 * 10))
var approxCos5 = 1/2; 			//cos5 = Math.cos(5 * third); con.log("approxCos5", approxCos5, "cos5", cos5, Math.round(approxCos5 * 10) === Math.round(cos5 * 10))

var dirs = [
	[approxSin0, approxCos0],
	[approxSin1, approxCos1],
	[approxSin2, approxCos2],
	[approxSin3, approxCos3],
	[approxSin4, approxCos4],
	[approxSin5, approxCos5]
]

var r = (v=1) => ~~(Math.random()*v)
var parts = [];
var dead = [];
var t = 0;

create = (x, y, dir) => {
	var p;
	if (dead.length) {
		p = dead.splice(-1)[0];
		p.alive = true;
		p.life++;
		p.x = x;
		p.y = y;
		p.dir = dir;
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
			s: 2 / Math.pow(2, r(2)),
			setColour: () => {
				p.colour = "rgba(" + [
					p.life * 80 + r(40),
					50 + r(60),
					100 + r(128)
				] +",0.1)";
				p.colour = "hsla(" + ((p.life * 40 + r(40)) % 360) + "," + (40 + r(20)) + "%," + (40 + r(20)) + "%,0.1)";
				// if (p.life > 1) con.log(p.colour);
			},
			move: () => {

				if (p.alive == false) return ;//con.log("returning")

				p.pos += 1/32; //p01!!
				if (p.pos==1) {

					if (p.x < 0 || p.y > size * 2 || p.y < 0 || p.y > size * 2) {
						p.alive = false;
						con.log('killing')
						dead.push(p);
						return;
					}


					p.pos = 0;
					p.dir += r(2) * 2 - 1; // -1 or 1
					p.dir = (p.dir + 6) % 6 // clamp to positives: 0 > 5

					if (r(10) > 8) {
						var newDir = r(2) * 4 - 2 // + -2 or 2
						newDir = p.dir + newDir; // make sure clone has new direction
						newDir = (newDir + 6) % 6 // clamp to positives: 0 > 5

						if (r(10) > 11) {
							con.log("go mental")
							for (i = 0; i++ < 10;) {
								create(p.x, p.y, newDir)
							}
						} else {
							create(p.x, p.y, newDir)
						}


					}

				} else {

					// p.x += dirs[p.dir][0] * p.s;
					// p.y += dirs[p.dir][1] * p.s;

					// con.log("p.pos", p.pos)
					p.x += Math.sin(p.dir * third) * p.s;
					p.y += Math.cos(p.dir * third) * p.s;


					e.fillStyle = p.colour;
					e.fillRect(p.x-1,p.y-1,2,2);

				}
				if (p.dir < 0) con.log("aargh", p.dir)
				if (p.dir > 5) con.log("aargh", p.dir)



				// if (Math.round(p.x * 32) != p.x * 32) con.log("unround", p.x)




			}
		}

		p.setColour();

		parts.push(p)








	}

}

sc = 1;
scaleTarget = 1;
beginWarp = false;
render = (t) => {

	seconds = Math.floor(t / 1000) + 1;

	warpMode = seconds % 3 == 0;

	if (warpMode) {
		if (beginWarp == false) { // warp has just begun! fuck yeah.
			beginWarp = true;
			scaleTarget = Math.random() * 1 + 0.7;
		}
	} else {
		beginWarp = false;
	}

	sc -= (sc - scaleTarget) * 0.1;
	scale = sc;

	debug.innerHTML = [seconds, warpMode, scaleTarget];

	// create();

	c.fillStyle = "rgba(255,255,255,0.1)"
	c.fillRect(0,0,size, size)


	c.save();
	c.translate(size / 2, size / 2);
	c.scale(scale, scale);
	c.rotate(t * 0.0001);
	c.translate(-size, -size)

	e.fillStyle = "rgba(255,255,255,0.02)"
	e.fillRect(0,0,size * 2, size*2)


	// if (!warpMode)
	for(i=0;i<parts.length;i++) parts[i].move();

	c.drawImage(d, 0, 0);
	c.restore();
	// if (t < 2000)
	requestAnimationFrame(render)
}

while(parts.length < 64) create()


render(0)