
var sw = a.width, 
  sh = a.height, 
  M = Math, 
  pfloat = 0, 
  pi = M.PI, 
  TAU = pi * 2, 
  dragons = [], 
  shape = [],



loop = function() {

  a.width = sw;

  for ( var j = 0; j < 3; j++) {
    if ( !dragons[j] ) dragons[j] = dragon(j);
    dragons[j]();
  }

  pfloat++;

  requestAnimationFrame(loop);

},

ran = function(a,b) {return a + M.random() * (b-a);},

dragon = function(index) {

  var scale = 0.1 + index * index / 8, 
    gx = sw / 2 / scale, 
    gy = sh / scale, 
    lim = 300, 

    speed = ran(3,5), 
    direction = ran(0,TAU), 
    direction1 = direction, 
    snake = [];

  return function() {

    if (gx < -lim || gx > sw / scale + lim || gy < -lim || gy > sh / scale + lim) {

        var dx = ran( sw / scale / 4, sw / scale * 3 / 4) - gx,
          dy = ran( sh / scale / 4, sh / scale * 3 / 4) - gy

        direction = direction1 = M.atan(dx/dy) + (dy < 0 ? pi : 0);

    } else {

       direction1 += ran(-.05, .05);

       direction -= (direction - direction1) * .1;

    }

   // if (pfloat < 70) {
      gx += M.sin(direction) * speed;
      gy += M.cos(direction) * speed;
  //  }

    // calculate a snake - a chain of points
    // the first point in the array follows a floating position: direction
    // the rest of the chain of points following each other in turn

    for (var i=0; i < 160; i++) {

      if (i) {

        if (!pfloat) snake[i] = {x: gx, y: gy}

        var p = snake[i - 1], 
          dx = snake[i].x - p.x, 
          dy = snake[i].y - p.y, 
          d = M.sqrt(dx * dx + dy * dy), 
          perpendicular = M.atan(dy/dx) + pi / 2 + (dx < 0 ? pi : 0)

        if (d > 4) {
          var mod = .5
        } else if (d > 2){
          mod = (d - 2) / 4
        } else {
          mod = 0
        }

        snake[i].x -= dx * mod
        snake[i].y -= dy * mod
        snake[i].px = M.cos(perpendicular)
        snake[i].py = M.sin(perpendicular)

        // c.strokeStyle = "rgba(255,180,180,1)"
        // c.beginPath()
        // c.moveTo(snake[i].x * scale, snake[i].y * scale);
        // c.lineTo((snake[i].x - snake[i].px * 200) * scale, (snake[i].y - snake[i].py * 200) * scale);
        // c.closePath()
        // c.stroke()

        // c.strokeStyle = "rgba(180,255,180,1)"
        // c.beginPath()
        // c.moveTo(snake[i].x * scale, snake[i].y * scale);
        // c.lineTo((snake[i].x + snake[i].px * 200) * scale, (snake[i].y + snake[i].py * 200) * scale);
        // c.closePath()
        // c.stroke()



      } else {

        snake[i] = {x: gx, y: gy, px: 0, py: 0} // i is 0 - first point in snake

      }

    }

    // c.fillStyle = colour;

    c.beginPath()

    var loop = 50;

    for (var j = 0; j < loop; j++) {

      var i = j * 4;

      if (j < loop / 2 ) { // shape.length
        // draw the right hand half from nose to tail
        var index = i; // even index is x , odd (index + 1) is y of each coordinate
        var L = 1;
      } else {
        // draw the left hand half from tail back to nose
        index = loop * 4 - i;  
        L = -1;
      }
    
      // con.log(index);

      if ( index >= 32 ) {  // draw tail

        // if (L != 1 || index != 32) {

          var tailIndex = ((136 - Math.abs((loop * 4 - i) - i)) / 136);

          var y = ~~(32 + tailIndex * 30)

          var wobble = Math.sin(tailIndex * -8 + pfloat * 0.1) * tailIndex * L * 2;

          var x = (100 - index) / 17 + wobble; //(160 - index) / 4 + wobble;

          var basePosition = snake[ y ];

          // // con.log(wobbleIndex, basePosition);

          var cx = (basePosition.x + x * L * basePosition.px) * scale, 
            cy = (basePosition.y + x * L * basePosition.py) * scale

          c.lineTo(cx, cy);

        // }
      

      } else {  // draw "flappy wings"

        

        var x = shape[index];
        var y = shape[index + 1];
        var controlPosition = snake[y];

        var x1 = shape[index + 2 * L ];
        var y1 = shape[index + 2 * L + 1 ];
        var basePosition = snake[y1];
        
        // con.log(basePosition, index, index + 2 * L + 1 )

        // con.log( index, x1, basePosition)

        // 6 is hinge point // this don't work, gotta use index range again.
        //x = 6 + (x-6) * (M.sin((index + pfloat) * .04) + 2) * 2


        // if ( pfloat == 0) {
        //   con.log("x,y:\t", x, y)
        //   con.log("x1,y1:\t", x1, y1)
        // }



        if ( x > 8 ) {
          x = 6 + (x-6) * (M.sin((pfloat) * .04) + 2) * 2
        }
        if ( x1 > 8 ) {
          x1 = 6 + (x1-6) * (M.sin((pfloat) * .04) + 2) * 2
        }

        var cx = (controlPosition.x + x * L * controlPosition.px) * scale, 
          cy = (controlPosition.y + x * L * controlPosition.py) * scale,
          ex = (basePosition.x + x1 * L * basePosition.px) * scale, 
          ey = (basePosition.y + x1 * L * basePosition.py) * scale;


        c.quadraticCurveTo(cx,cy,ex,ey);
        // c.lineTo(cx, cy);
        // c.lineTo(ex, ey);


        // circle( index + 0, index + 1, cx, cy );
        // circle( index + 2 * L, index + 2 * L + 1, ex, ey );

        // c.strokeStyle = "rgba(180,255,180,1)"
        // c.beginPath()
        // c.moveTo(snake[i].x * scale, snake[i].y * scale);
        // c.lineTo((snake[i].x + snake[i].px * 200) * scale, (snake[i].y + snake[i].py * 200) * scale);
        // c.closePath()
        // c.stroke()

      }


    }

    c.closePath()

    c.fill();

  }

  

}

'! (($(&.0.3"C+E@@6<@864@06,@(6$@'.split("").map(function(a,i) {
  shape[i] = (a.charCodeAt(0) - 32)// + ~~ran(-2, 2);
})


// con.log(shape)
// con.log(shape.length)
// con.log("====================")


loop()