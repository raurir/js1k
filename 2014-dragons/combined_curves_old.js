// con = console

var sw = a.width, 
  sh = a.height, 
  M = Math, 
  pfloat = 0, 
  pi = M.PI, 
  TAU = pi * 2, 
  dragons = [], 
  shape = [],


circle = function(i, index, cx, cy) {
  c.fillStyle = "hsla(" + ~~(i / 60 * 300) + ",100%, 30%, 0.7)"
  c.fillRect(cx - 20, cy - 10, 40, 20);
  c.fillStyle = "white"


  c.textAlign = 'center';
  c.textBaseline = 'middle';

  c.fillText(i+":"+index, cx, cy);
},


loop = function() {

  a.width = sw;

  for ( j = 0; j < 1; j++) {
    if ( !dragons[j] ) dragons[j] = dragon(j);
    dragons[j]();
  }

  

  pfloat++;

  if (pfloat < 50) 
    requestAnimationFrame(loop);

},

ran = function(a,b) {return a + M.random() * (b-a);},

dragon = function(index) {

  var scale = 6,//0.1 + index * index / 36, 
    gx = sw / 2 / scale, 
    gy = sh / scale, 
    lim = 0, 

    speed = 2,//ran(3,5), 
    direction = TAU / 2, //ran(0,TAU), 
    direction1 = direction, 
    snake = [];

  return function() {

    if (gx < -lim || gx > sw / scale + lim || gy < -lim || gy > sh / scale + lim) {

        var dx = ran( sw / scale / 4, sw / scale * 3 / 4) - gx,
          dy = ran( sh / scale / 4, sh / scale * 3 / 4) - gy

        // var dx = sw / scale / 2 - gx,
        //   dy = sh / scale / 2 - gy

        direction = direction1 = M.atan(dx/dy) + (dy < 0 ? pi : 0);

    } else {

       // direction1 += ran(-.05, .05);

       direction -= (direction - direction1) * .1;

    }

    gx += M.sin(direction) * speed;
    gy += M.cos(direction) * speed;
   

    // calculate a snake - a chain of points
    // the first point in the array follows a floating position: direction
    // the rest of the chain of points following each other in turn

    for (var i=0; i < 80; i++) {

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

    // map the dragon to the snake
    // the x co-ordinates of each point of the dragon shape are honoured
    // the y co-ordinates of each point of the dragon are mapped to the snake

    // c.moveTo(snake[0].x,snake[0].y)

    // probably start i from 2 rather than 0.

    for (i=0; i < 64; i+=2) { // shape.length * 2 - it's symmetrical, so draw up one side and back down the other

      if (i < 32 ) { // shape.length
        // draw the right hand half from nose to tail
        var index = i; // even index is x , odd (index + 1) is y of each coordinate
        var L = 1;
      } else {
        // draw the left hand half from tail back to nose
        index = 62 - i;  
        L = -1;
      }

      // con.log(i,index,L)

      

      var basePosition = snake[shape[index+1]]; // get the equivalent snake position from the dragon shape


      if ( index < 28) {  // draw "flappy wings"        
        

        // con.log(index + 3, shape[index + 3], snake[shape[index + 3]])

        if (index % 4 == 0) {


          var x1 = shape[index + 2 ];
          var basePosition = snake[shape[index + 3 ]];

          if (L == 1) {

            var x = shape[index];
            var controlPosition = snake[shape[index + 1]];

          } else {

            x = shape[index + 4];
            var controlPosition = snake[shape[index + 1 + 4]];

          }
          
          // 6 is hinge point
          //x = 6 + (x-6) * (M.sin((index + pfloat) * .04) + 2) * 2
          // x = 6 + (x-6) * (M.sin((pfloat) * .04) + 2) * 2
          // x1 = 6 + (x1-6) * (M.sin((pfloat) * .04) + 2) * 2

          var cx = (controlPosition.x + x * L * controlPosition.px) * scale, 
            cy = (controlPosition.y + x * L * controlPosition.py) * scale,
            ex = (basePosition.x + x1 * L * basePosition.px) * scale, 
            ey = (basePosition.y + x1 * L * basePosition.py) * scale;


          c.quadraticCurveTo(cx,cy,ex,ey);
          // c.lineTo(cx, cy);
          c.lineTo(ex, ey);


          circle( i, index + 0, cx, cy );
          circle( i, index + 1, ex, ey );

          // c.strokeStyle = "rgba(180,255,180,1)"
          // c.beginPath()
          // c.moveTo(snake[i].x * scale, snake[i].y * scale);
          // c.lineTo((snake[i].x + snake[i].px * 200) * scale, (snake[i].y + snake[i].py * 200) * scale);
          // c.closePath()
          // c.stroke()


        }


      } else { // draw tail

        // var wobbleIndex = 58 - index;

        // var wobble = Math.sin(wobbleIndex * 0.3 + pfloat * 0.1) * wobbleIndex * L;


        var x = 10// + wobble;

        var basePosition = snake[ index + 20];

        var cx = (basePosition.x + x * L * basePosition.px) * scale, 
          cy = (basePosition.y + x * L * basePosition.py) * scale

        c.lineTo(
          cx, 
          cy
        );

        circle( i, index, cx, cy );

      }

      

/*

      if ( index >= 60) {  // draw tail

        var wobbleIndex = 58 - index;

        var wobble = Math.sin(wobbleIndex * 0.3 + pfloat * 0.1) * wobbleIndex * L;

        x = (78 - index) / 4 + wobble;

        basePosition = snake[ index * 2 - 85 ];


      c.lineTo(
        (basePosition.x + x * L * basePosition.px) * scale, 
        (basePosition.y + x * L * basePosition.py) * scale
      );



      }
      */
      


    }

    c.closePath()

    c.stroke();

  }

  

}

// '  ! ((&(&*$($,&.)/-.0,4%3"7$;(@/EAA<?:<9;;88573729/7,6(8&;$B#J$P"O$T"S#X"W"Z `'.split("").map(function(a,i) {
//   shape[i] = (a.charCodeAt(0) - 32);
// })

'! ((#)&.0.3"C+EA=1;;5429,7$B$C'.split("").map(function(a,i) {
  shape[i] = (a.charCodeAt(0) - 32);
})


con.log(shape, shape.length)


loop()