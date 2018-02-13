// con = console

var sw = a.width, 
  sh = a.height, 
  M = Math, 
  pfloat = 0, 
  pi = M.PI, 
  dragons = [], 
  shape = [],

loop = function() {

  a.width = sw;

  for ( j = 0; j < 7; j++) {
    if ( !dragons[j] ) dragons[j] = dragon(j);
    dragons[j]();
  }

  

  pfloat++;

  requestAnimationFrame(loop);

},

ran = M.random,

dragon = function(index) {

  var scale = 0.1 + index * index / 36, 
    gx = sw / 2 / scale, 
    gy = sh / 2 / scale, 
    lim = 300, 

    speed = 3 + ran(2), 
    direction = ran() * pi * 2, //ran(0,TAU), 
    direction1 = direction, 
    snake = [];

  return function() {

    if (gx < -lim || gx > sw / scale + lim || gy < -lim || gy > sh / scale + lim) {

        // var dx = ran( sw / scale / 4, sw / scale * 3 / 4) - gx,
        //   dy = ran( sh / scale / 4, sh / scale * 3 / 4) - gy;
          
        var dx = sw / scale / 2 - gx,
          dy = sh / scale / 2 - gy;


        direction = direction1 = M.atan(dx/dy) + (dy < 0 ? pi : 0);

    } else {

       direction1 += ran() * .1 - .05;

       direction -= (direction - direction1) * .1;

    }

    gx += M.sin(direction) * speed;
    gy += M.cos(direction) * speed;
   

    // calculate a snake - a chain of points
    // the first point in the array follows a floating position: direction
    // the rest of the chain of points following each other in turn

    for (var i=0; i < 70; i++) {

      if (i) {

        if (!pfloat) snake[i] = {x: gx, y: gy}

        var p = snake[i - 1], 
          dx = snake[i].x - p.x, 
          dy = snake[i].y - p.y, 
          d = M.sqrt(dx * dx + dy * dy), 
          perpendicular = M.atan(dy/dx) + pi / 2 + (dx < 0 ? pi : 0);

        if (d > 4) {
          var mod = .5;
        } else if (d > 2){
          mod = (d - 2) / 4;
        } else {
          mod = 0;
        }

        snake[i].x -= dx * mod;
        snake[i].y -= dy * mod;
        snake[i].px = M.cos(perpendicular);
        snake[i].py = M.sin(perpendicular);

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

        snake[i] = {x: gx, y: gy, px: 0, py: 0}; // i is 0 - first point in snake

      }

    }

    // c.fillStyle = colour;

    // c.beginPath()

    // map the dragon to the snake
    // the x co-ordinates of each point of the dragon shape are honoured
    // the y co-ordinates of each point of the dragon are mapped to the snake

    c.moveTo(snake[0].x,snake[0].y)

    // probably start i from 2 rather than 0.

    for (i=0; i < 156; i+=2) { // shape.length * 2 - it's symmetrical, so draw up one side and back down the other

      if (i < 78 ) { // shape.length
        // draw the right hand half from nose to tail
        var index = i; // even index is x , odd (index + 1) is y of each coordinate
        var L = 1;
      } else {
        // draw the left hand half from tail back to nose
        index = 154 - i;  
        L = -1;
      }

      // con.log(i,index,L, 78)

      var x = shape[index];

      var basePosition = snake[shape[index+1]]; // get the equivalent snake position from the dragon shape

      if (index >= 58) {  // draw tail

        var wobbleIndex = 58 - index;

        var wobble = Math.sin(wobbleIndex * 0.3 + pfloat * 0.1) * wobbleIndex * L;

        x = (78 - index) / 4 + wobble;

        basePosition = snake[ index * 2 - 85 ];

      } else if (index > 12) {  // draw "flappy wings"

        // 6 is hinge point
        // x = 6 + (x-6) * (M.sin((index + pfloat) * .04) + 2) * 2
        x = 4 + (x-4) * (M.sin((index + pfloat) * .04) + 2) * 2

      }


      c.lineTo(
        (basePosition.x + x * L * basePosition.px) * scale, 
        (basePosition.y + x * L * basePosition.py) * scale
      );
    }

    // c.closePath()

    c.fill();

  }

  

}

'  ! ((&(&*$($,&.)/-.0,4%3"7$;(@/EAA<?:<9;;88573729/7,6(8&;$B'.split("").map(function(a,i) {
  shape[i] = (a.charCodeAt(0) - 32);
})





loop()