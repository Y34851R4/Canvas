window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight,
		
		ball	= {
			r: 50,
			par: null,
			create: function(r) {
				var obj = Object.create(this);
				obj.par = particle.create(Math.random()*width,Math.random()*height,Math.random()*5+1,Math.random()*Math.PI*2);
				obj.r = r;
				return obj;
			},
			collide: function(obj) {
				var dx = Math.max(obj.par.position.getX(),this.par.position.getX())-Math.min(obj.par.position.getX(),this.par.position.getX()),
					dy = Math.max(obj.par.position.getY(),this.par.position.getY())-Math.min(obj.par.position.getY(),this.par.position.getY());
				if(Math.sqrt(dx*dx+dy*dy)<this.r+obj.r) {
					context.beginPath();
					context.moveTo(obj.par.position.getX(),obj.par.position.getY());
					context.lineTo(this.par.position.getX(),this.par.position.getY());
					context.stroke();
				}
			},
			draw: function() {
				if(this.par.position.getX()>width) this.par.position.setX(0);
				if(this.par.position.getY()>height) this.par.position.setY(0);
				if(this.par.position.getX()<0) this.par.position.setX(width);
				if(this.par.position.getY()<0) this.par.position.setY(height);
				this.par.update();
				context.beginPath();
				context.arc(this.par.position.getX(),this.par.position.getY(),5,0,Math.PI*2);
				context.fill();
			}
		},
		ballar	= [];
		var n = 150;
		canvas.style.backgroundColor = "#000";
		context.fillStyle = "white";
		context.strokeStyle = "white";
		for(i=0;i<n;i++)
			ballar[i] = ball.create(Math.random()*120+10);
		
		document.addEventListener("mousemove",function(event) {
			ballar[0].par.position.setX(event.clientX);
			ballar[0].par.position.setY(event.clientY);
		});
		
		
		render();
		function render() {
			context.clearRect(0,0,width,height);
			for(i=0;i<ballar.length;i++) {
				for(j=0;j<ballar.length;j++) {
					if(i == j) continue;
					ballar[i].collide(ballar[j]);
				}
				ballar[i].draw();
			}
			
			requestAnimationFrame(render);
		}
});