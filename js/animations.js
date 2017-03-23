$(function() {
	var test_canvas = document.getElementById("test_canvas");
	var context = test_canvas.getContext("2d");
	
	var last_time = null;
	
	function render(t, dt, canvas_width, canvas_height) {
		context.strokeStyle = "black";
		context.strokeRect(0, 0, canvas_width, canvas_height);
		
		context.textBaseline = "top";
		context.fillStyle = "black";
		context.font = "9px Courier New";
		context.fillText(round(dt * 1000, 2) + "ms", 0, 0);
		
		var f = Math.sin(t * Math.PI * 2 * 0.1) * 0.5 + 0.5;
		
		context.fillStyle = "green";
		context.fillRect(canvas_width * f - 10, 20, 30, 40);
	}
	
	function update(cur_time_ms) {
		var w = test_canvas.width;
		var h = test_canvas.height;
		var cur_time = cur_time_ms / 1000;
		
		var dt = null;
		if (last_time) {
			dt = cur_time - last_time;
		}
		else {
			dt = 1 / 60;
		}
		
		context.clearRect(0, 0, w, h);
		
		render(cur_time, dt, w, h);
		
		last_time = cur_time;
		
		window.requestAnimationFrame(update);
	}
	
	update();
});