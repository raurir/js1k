// 99% done by @rauri rochford
// http://js1k.com/2012-love/demo/1071

// i just rAF'd it.


// demo at http://bl.ocks.org/1823634


e = [];// trails
h = [];// heart path
O = c.width = innerWidth;
Q = c.height = innerHeight;

v = 32; // num trails, num particles per trail & num nodes in heart path
M = Math;
R = M.random;
C = M.cos;
Y = 6.3;// close to 44/7 or Math.PI * 2 - 6.3 seems is close enough.
radius = 200;
radiusIntersection = radius * 0.5

for( i = 0; i < 5; i++) {
	// calculate pentagram outer points
	angle0 = i * 2 / 5 * Math.PI * 2;
	angle1 = (i + 1) * 2 / 5 * Math.PI * 2;

	x0 = O/2 + M.sin(angle0) * radius
	y0 = Q/2 + M.cos(angle0) * radius

	x1 = O/2 + M.sin(angle1) * radius
	y1 = Q/2 + M.cos(angle1) * radius

	hx = x0 + (x1 - x0) / 2
	hy = y0 + (y1 - y0) / 2

	h.push([x0, y0])

	h.push([hx, hy])

}
availablePoints = h.length
for(i = availablePoints ; i < v; i++) { // calculate pentagram points
	radius = 200;
	angle = i / availablePoints * Math.PI * 2;
	h.push([
		O/2 + M.sin(angle) * radius,
		Q/2 + M.cos(angle) * radius
	])
}



i = 0;
while (i < v ) {

	x = R() * O;
	y = R() * Q;
	//r = R() * 50 + 200;
	//b = R() * r;
	//g = R() * b;

	H = i/v * 80 + 280;
	S = R() * 40 + 60;
	B = R() * 60 + 20;

	f = []; // create new trail

	k = 0;
	while ( k < v ) { 
		f[k++] = { // create new particle
			x : x, // position 
			y : y,
			X : 0, // velocity
			Y : 0,
			R : (1 - k/v)  + 1, // radius
			S : (R() + 1) * 0.6, // acceleration 
			q : ~~(R() * v), // target node on heart path
			//D : R()>.5?1:-1,
			D : i%2*2-1, // direction around heart path
			F : R() * .2 + .7, // friction
			//f : "rgba(" + ~~r + "," + ~~g + "," + ~~b + ",.1)"
			f : "red" // colour
		}
	}

	e[i++] = f; // dots are a 2d array of trails x particles
}

function render(_) { // draw particle
	a.fillStyle = _.f;
	a.beginPath();
	a.arc(_.x, _.y, _.R, 0, Y, 1);
	a.closePath();
	a.fill();
}

function loop(){

	a.fillStyle = "rgba(0,0,0,.2)"; // clear screen
	a.fillRect(0,0,O,Q);

	// for (var i = 0; i < v; i++) {
	// 	a.fillStyle = "red"; // clear screen
	// 	// a.fillRect(h[i][0], h[i][1], 2, 2);
	// 	a.fillText(i, h[i][0], h[i][1])
	// }

	i = v;
	while (i--) {

		f = e[ i ]; // get worm
		u = f[ 0 ]; // get 1st particle of worm
		q = h[ u.q ]; // get current node on heart path
		D = u.x - q[0]; // calc distance
		E = u.y - q[1];
		G = M.sqrt( (D * D) + (E * E) );
		
		if ( G < 10 ) { // has trail reached target node?
			if (R() > .95 ) { // randomly send a trail elsewhere
				u.q = ~~(R() * v);
			} else {
				if ( R() > .99) u.D *= -1; // randomly change direction
				u.q += u.D;
				u.q %= v;
				if ( u.q < 0 ) u.q += v;
			 }
		}

		u.X += -D / G * u.S; // calculate velocity
		u.Y += -E / G * u.S;

		u.x += u.X; // apply velocity
		u.y += u.Y;

		render(u); // draw the first particle

		u.X *= u.F; // apply friction
		u.Y *= u.F;

		k = 0;
		while ( k < v-1 ) { // loop through remaining dots
			
			T = f[ k ]; // this particle
			N = f[ ++k ]; // next particle

			N.x -= (N.x - T.x) * .7; // use zenos paradox to create trail
			N.y -= (N.y - T.y) * .7;

			render(N);

		}

	}
}; // eo loop()

(function doit(){
	requestAnimationFrame(doit);
	loop();
}());