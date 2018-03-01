B = colour => c.fillStyle = colour||"#000",
v = [],

R = (min, max) => min + Math.random() * (max - min),

C = _ => { // create coin
	O = ~~R(3,6) // coin size
	colour = ["aaa", "c81", "da4"][O-3] // pick a colour scheme
		.split("") // split rgb
		.map(c => ~~(`0x${c}`) * 15 + ~~R(-10, 10)); // warp it
	v.push({
		mx: R(-.5,.5),
		my: R(-.5,.5),
		r: O ** 2,
		x: R(0, innerWidth),
		y: R(0, -innerHeight),
		colour: `rgb(${ colour[0] },${ colour[1] },${ colour[2] })`
	})
},

n = _ => { // pacman
	r = R(5,Math.sqrt(innerHeight / 3)) ** 2
	p = {
		s: 320 / r * R(1,2),
		r,
		y: innerHeight - r,
		x: -r//-R(0,innerWidth)
	}
},

h = (a,b) => { // distance
	X = a.x - b.x;
	Y = a.y - b.y;
	d = Math.hypot(X,Y) + 1e-5
},

e = t => { // render
	requestAnimationFrame(e);
	B();
	c.fillRect(0,0,innerWidth,innerHeight);

	// draw pacman
	(p.x += p.s) > innerWidth + p.r && R(0,1) > .99 && n();
	B("#ff0");
	c.beginPath();
	c.arc(p.x, p.y, p.r, Math.abs(Math.sin(t/p.r/3)), Math.PI*2 -Math.abs(Math.sin(t/p.r/3)), 0);
	c.lineTo(p.x, p.y); // draw mouth
	c.fill();

	// generate more coins maybe?
	v.length < 250 && R(0,1) > .5 && C();

	// calc coins
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



		/*
		D = b.r + p.r;
		var survive = true;
		if (d < D) { // ok, let's bounce off pacman?
			if (b.x < p.x) {

				m = D / d * 9,
				U = m * X / d,
				V = m * Y / d;

				b.mx += U;// / p.r;
				b.my += V;// / p.r;

			} else {
				survive = false;
			}
		}
		*/

		b.mx *= .995; // friction
		b.my += .1;  // gravity
		b.my *= .995; // friction

		B(b.colour);
		c.beginPath();
		c.arc(b.x, b.y, b.r, 0, Math.PI*2, 0);
		c.fill();

		c.font=`${b.r * 1.5}px Arial`;
		B();
		c.fillText(`$`, b.x - b.r*.4, b.y + b.r/2);

		h(b, p);
		return !(d < b.r + p.r); // decide if it's eaten by pacman
	});

	v.map(b => {
		if ( b.x < b.r ) b.mx = Math.abs(b.mx);
		if ( b.x > innerWidth - b.r ) b.mx = -Math.abs(b.mx);
		if ( b.y > innerHeight - b.r ) b.my = -Math.abs(b.my); // bouncey Os
		b.x += b.mx;
		b.y += b.my;
	});

	// print crytop price
	c.font=`30px Arial`;
	B("#fff");
	c.fillText(`$${ v.length ** 2 + ~~R(1,9) }.${ ~~R(1,9) }${ ~~R(1,9) }`, innerWidth / 2, 40);


}

for(i=0;i++<50;)C(); // create a bunch of coins
n(); // create pacman
e(); // start rendering
