/*$(function() {
  // H1 only
  // $('h1').fontFlex(36, 48, 120);
  $("#typing-text").typed({
      strings: [
        "A global language.", "Everything online.",
        "An intriguing business.",
        "Like a family of friends.",
        "A VPS and a will.",
        "A VPN and a way.",
        "HTML and CSS.",
        "Github and Codepen."
      ],
      typeSpeed: 100,
      backDelay: 2000,
      // loop
      loop: true,
  });
});
*/
var canvas = document.getElementById('nodes')
    , context = canvas.getContext('2d')
    , pool = []
    , maxPoolSize = 500
    , distanceThreshold = 90
    , lastTimestamp = 0
    , nodeConnections = []
  ;

  canvas.width = window.innerWidth;
  canvas.height = 500;
  maxPoolSize = ( canvas.width * canvas.height ) / 6000

  function Boid(x,y) {
    this.id = Boid.lastId++;
    this.position = [x, y];
    this.size = 10;
    this.color = "red";
    this.velocity = [25-Math.random()*30, 25-Math.random()*80];
  };

  Boid.lastId = 0;

  Boid.prototype = {
    update: function(dt) {
      for (var i = 0; i < maxPoolSize; i++) {
        var boid = pool[i]
          , distance = this.distanceTo(boid)
        ;
        if(distance < distanceThreshold) {
          cohesion = []
        }
      };

      this.position[0] += this.velocity[0] * dt;
      this.position[1] += this.velocity[1] * dt;

      if(this.position[0] > canvas.width) {
        this.position[0] = 0;
        // this.velocity[0] *= -1;
      }

      if(this.position[1] > canvas.height) {
        this.position[1] = 0;
        // this.velocity[1] *= -1;
      }

      if(this.position[0] < 0) {
        this.position[0] = canvas.width;
        // this.velocity[0] *= -1;
      }
      if(this.position[1] < 0) {
        this.position[1] = canvas.height;
        // this.velocity[1] *= -1;
      };
    },

    distanceTo: function(boid) {
      var diff = vDiff(this.position, boid.position);
      return Math.abs(vLength(diff));
    },

    isConnectedTo: function(boid) {
      return nodeConnections[boid.id] == this.id
          || nodeConnections[this.id] == boid.id;
    },

    connectTo: function(boid) {
      nodeConnections[this.id] = boid.id;
      nodeConnections[boid.id] = this.id;
    },

    draw: function() {
      var pos = [round(this.position[0]), round(this.position[1])]
        , connections = 0;
      context.globalAlpha = 0.1;
      for (var i = 0; i < maxPoolSize; i++) {
        var boid = pool[i]
          , distance = this.distanceTo(boid)
          , opacity = 1-( distance/distanceThreshold )
        ;
        if(distance <= distanceThreshold) {
          connections++;
          if(!this.isConnectedTo( boid )){
            this.connectTo(boid);
            context.beginPath();
            context.moveTo( pos[0], pos[1]);
            context.lineTo(round( boid.position[0] ), round( boid.position[1] ));
            context.stroke();
          }
        }
      };
      context.globalAlpha = 0.5;

      context.beginPath();
      context.arc(
        pos[0],
        pos[1],
        this.size*( connections/5 ),
        0, Math.PI*2
      );
      context.fill();


    }
  };

  function vDiff(a, b) {
    return [ a[0] - b[0], a[1] - b[1] ];
  }

  function vLength(a) {
    return Math.sqrt( ( a[0]*a[0] ) + (a[1]*a[1]) );
  }

  function round(i) { return 0.5 + i | 0 }
  function draw(timestamp) {
    var dt = ( timestamp - (lastTimestamp || timestamp) ) / 1000;
    lastTimestamp = timestamp;

    context.clearRect(0,0,canvas.width, canvas.height);

    for (var i = 0; i < maxPoolSize; i++) {
      var boid = pool[i];
      boid.update(dt);
      boid.draw();
    }

    window.requestAnimFrame(draw);
  }

  window.requestAnimFrame = (function(){ return  window.requestAnimationFrame       || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || function(/* function */ callback, /* DOMElement */ element){ window.setTimeout(callback, 1000 / 60); }; })();

      for (var i = 0; i < maxPoolSize; i++) {
        pool.push(
          new Boid(Math.random()*canvas.width, Math.random()*canvas.height)
        );
      }
      document.body.appendChild(canvas);
      window.requestAnimFrame(draw);

/*#00affe: 0,175,254*/

$(function(){
	
	/***** BG TRANSITIONING *****/
	
	var transTime = 3000;
	
	var numBgColors = $('.bg-grad').length;
	
	var bgtrans = setInterval(function(){
		if($('.bg-grad.active').index() == ($('.bg-grad').length-1)){
			$('.bg-grad.active').removeClass('active');
			$('.bg-grad').eq(0).addClass('active');
		}else{
			var curIndex = $('.bg-grad.active').index();
			$('.bg-grad.active').removeClass('active');
			$('.bg-grad').eq(curIndex+1).addClass('active');
		}
	},transTime);	

})