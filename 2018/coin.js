var W = innerWidth,
H = innerHeight,
B = _ => c.fillStyle = _||"#000",
f = .5, // just a half
J = 250, // no of objects
F = .99, // friction
v = [],
u = Math.PI*2,

R = (min, max) => min + Math.random() * (max - min),
s = i => Math.abs(i),

C = _ => { // create coin
	O = ~~R(3,6) // coin size
	v.push({
		mx: R(-f,f),
		my: R(-f,f),
		mmx: 0,
		mmy: 0,
		r: O ** 2,
		x: R(0, W),
		y: R(0, -H),
		colour: [
		"#aaa",
		"#c81",
		"#da4",
		][O-3]
	})
},

n = _ => { // pacman
	r = R(5,15) ** 2
	p = {
		r,
		y: H - r,
		x: -r
	}
},

h = (a,b) => { // distance
	X = a.x - b.x;
	Y = a.y - b.y;
	d = Math.hypot(X,Y) + 1/1e5;
},

e = t => { // render
	requestAnimationFrame(e);
	B();
	c.fillRect(0,0,W,H);

	v.length < J && R(0,1) > f && C();
	(p.x += 280/p.r) > W + p.r && n();

	v = v.filter((b,i)=>{
	  	v.slice(i).map(o=>{
	  		h(b, o);
			D = b.r + o.r;
			if (d < D) { // ok, let's bounce
				m = D / d * 5,
				U = m * X / d,
				V = m * Y / d;

				b.mx += U / b.r;
				b.my += V / b.r;

				o.mx -= U / o.r;
				o.my -= V / o.r;
			}

		});

		b.mx *= F;
		b.my += .1; // gravity
		b.my *= F;

		B(b.colour);
		c.beginPath();
		c.arc(b.x, b.y, b.r, 0, u, 0);
		c.fill();

		c.font=`${b.r}px Arial`;
		B();
		z=b.r/3;
		c.fillText("$", b.x-z, b.y+z);

		h(b, p)
		return !(d < b.r + p.r); // decide if it's eaten by pacman
	});

	v.map(b => {
		if ( b.x < b.r ) b.mx = s(b.mx);
		if ( b.x > W - b.r ) b.mx = -s(b.mx);
		if ( b.y > H - b.r ) b.my = -s(b.my); // bouncey Os
		b.mmx -= (b.mmx - b.mx) * f;
		b.mmy -= (b.mmy - b.my) * f;
		b.x += b.mmx;
		b.y += b.mmy;
	});

	// draw mouth
	var ang = Math.sin(t/p.r/3);
	B("#ff0");
	c.beginPath();
	c.arc(p.x, p.y, p.r, ang, u - ang, 0);
	c.lineTo(p.x, p.y); // draw mouth
	c.fill();

}

for(i=0;i++<J;)C();
n();
e();
