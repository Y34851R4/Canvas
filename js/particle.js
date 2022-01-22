var particle = {
	position: null,
	velocity: null,
	friction: 1,
	
	create: function(x,y,len,dir) {
		var obj = Object.create(this);
		obj.position = vector.create(x,y);
		obj.velocity = vector.create(x,y);
		obj.velocity.setLength(len);
		obj.velocity.setAngle(dir);
		
		return obj;
	},
	update: function() {
		this.velocity.multiplyBy(this.friction);
		this.position.addTo(this.velocity);
	}
}