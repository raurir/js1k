
a.width = a.height = size = 800;

third = Math.PI / 3

approxSin0 = 0; 			sin0 = Math.sin(0 * third); con.log("approxSin0", approxSin0, "sin0", sin0, Math.round(approxSin0 * 10) === Math.round(sin0 * 10))
approxCos0 = 1; 			cos0 = Math.cos(0 * third); con.log("approxCos0", approxCos0, "cos0", cos0, Math.round(approxCos0 * 10) === Math.round(cos0 * 10))
approxSin1 = 1/2+1/4+1/8;	sin1 = Math.sin(1 * third); con.log("approxSin1", approxSin1, "sin1", sin1, Math.round(approxSin1 * 10) === Math.round(sin1 * 10))
approxCos1 = 1/2; 			cos1 = Math.cos(1 * third); con.log("approxCos1", approxCos1, "cos1", cos1, Math.round(approxCos1 * 10) === Math.round(cos1 * 10))
approxSin2 = 1/2+1/4+1/8; 	sin2 = Math.sin(2 * third); con.log("approxSin2", approxSin2, "sin2", sin2, Math.round(approxSin2 * 10) === Math.round(sin2 * 10))
approxCos2 = -1/2;			cos2 = Math.cos(2 * third); con.log("approxCos2", approxCos2, "cos2", cos2, Math.round(approxCos2 * 10) === Math.round(cos2 * 10))
approxSin3 = 0; 			sin3 = Math.sin(3 * third); con.log("approxSin3", approxSin3, "sin3", sin3, Math.round(approxSin3 * 10) === Math.round(sin3 * 10))
approxCos3 = -1; 			cos3 = Math.cos(3 * third); con.log("approxCos3", approxCos3, "cos3", cos3, Math.round(approxCos3 * 10) === Math.round(cos3 * 10))
approxSin4 = -approxSin2;	sin4 = Math.sin(4 * third); con.log("approxSin4", approxSin4, "sin4", sin4, Math.round(approxSin4 * 10) === Math.round(sin4 * 10))
approxCos4 = -1/2;			cos4 = Math.cos(4 * third); con.log("approxCos4", approxCos4, "cos4", cos4, Math.round(approxCos4 * 10) === Math.round(cos4 * 10))
approxSin5 = -(1/2+1/4+1/8);sin5 = Math.sin(5 * third); con.log("approxSin5", approxSin5, "sin5", sin5, Math.round(approxSin5 * 10) === Math.round(sin5 * 10))
approxCos5 = 1/2; 			cos5 = Math.cos(5 * third); con.log("approxCos5", approxCos5, "cos5", cos5, Math.round(approxCos5 * 10) === Math.round(cos5 * 10))

dirs = [
	[approxSin0, approxCos0],
	[approxSin1, approxCos1],
	[approxSin2, approxCos2],
	[approxSin3, approxCos3],
	[approxSin4, approxCos4],
	[approxSin5, approxCos5]
]

r = (v=1) => ~~(Math.random()*v)
parts = [];
t = 0;

s = () => 1 / Math.pow(2, r(3));

con.log(s())
con.log(s())
con.log(s())
con.log(s())
con.log(s())

create = (x, y, dir) => {
	if (parts.length > size) return;
	var p = {
		dir: dir || r(3) * 2, // 0, 2 or 4
		x: x || size / 2,
		y: y || size / 2,
		pos: 0,
		s: 1 / Math.pow(2, r(3)),
		colour: "rgba(" + [
			0 + r(40),
			50 + r(60),
			100 + r(128)
		] +",0.1)",
		move: () => {

			p.pos += 1/32; //p01!!
			if (p.pos==1) {
				p.pos = 0;
				p.dir += r(2) * 2 - 1; // -1 or 1
				p.dir = (p.dir + 6) % 6 // clamp to positives: 0 > 5

				if (r(10) > 8) {
					var newDir = r(2) * 4 - 2 // + -2 or 2
					newDir = p.dir + newDir; // make sure clone has new direction
					newDir = (newDir + 6) % 6 // clamp to positives: 0 > 5
					create(p.x, p.y, newDir)
				}

			}
			if (p.dir < 0) con.log("aargh", p.dir)
			if (p.dir > 5) con.log("aargh", p.dir)

			// con.log("p.pos", p.pos)
			// p.x += Math.sin(p.dir * third) * p.s;
			// p.y += Math.cos(p.dir * third) * p.s;
			p.x += dirs[p.dir][0] * p.s;
			p.y += dirs[p.dir][1] * p.s;

			if (Math.round(p.x * 32) != p.x * 32) con.log("unround", p.x)


			c.fillStyle = p.colour;
			c.fillRect(p.x-1,p.y-1,2,2);


		}
	}

	parts.push(p)
}

render = (t) => {
	// create();
	c.fillStyle = "rgba(255,255,255,0.01)"
	c.fillRect(0,0,size, size)
	for(i=0;i<parts.length;i++) parts[i].move();
	// if (t < 2000)
	requestAnimationFrame(render)
}

while(parts.length < 32) create()


render(0)