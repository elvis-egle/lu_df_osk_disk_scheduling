var anim_time = 0;
var anim_paused = true;
var anim_data = null;

var anim_track_size, anim_track_start;

function animSetup(config) {
	anim_track_size = config.trackSize;
	anim_track_start = config.trackStart;
	anim_data = config.seekQueue;
	
	// calculate results for all algorithms and put them in anim_data
}

function animStart(config) {
	animReset();
	animSetup(config);
	animSetPaused(false);
}

function animSetTime(time) {
	anim_time = time;
}

function animSetPaused(paused) {
	anim_paused = paused;
}

function animReset() {
	animSetTime(0);
	animSetPaused(true);
	anim_data = null;
}

function animUpdate(cur_time_ms) {
    var w = test_canvas.width;
    var h = test_canvas.height;
    var cur_time = cur_time_ms / 1000;

    var dt = null;
    if (last_time) {
        dt = cur_time - last_time;
    } else {
        dt = 1 / 60;
    }

    context.clearRect(0, 0, w, h);

    render(anim_time, dt, w, h);

	if (!anim_paused) {
		anim_time += dt;
	}
	
    last_time = cur_time;

    window.requestAnimationFrame(animUpdate);
}

//
//
//
function render(t, dt, canvas_width, canvas_height) {
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.textBaseline = "top";
	
    context.strokeRect(0, 0, canvas_width, canvas_height);
	
	var padding = 20;
	var line_y = padding * 3 / 2;
	
	drawLine(padding, line_y, canvas_width - padding, line_y);
	
	for (var notch_index = 0; notch_index < anim_track_size; notch_index++) {
		var notch_x = padding + notch_index * (canvas_width - 2 * padding) / (anim_track_size - 1);
		
		drawLine(notch_x, line_y - padding / 2, notch_x, line_y + padding / 2);
		
		if (notch_index == anim_track_start) {
			fillCircle(notch_x, line_y, 4);
		}
	}
	
    context.font = "9px Courier New";
    context.fillText(round(dt * 1000, 2) + "ms", 0, 0);

    var f = Math.sin(t * Math.PI * 2 * 0.1) * 0.5 + 0.5;

    context.fillStyle = "green";
    context.fillRect(canvas_width * f - 10, 20, 30, 40);
}

function fillCircle(x, y, radius) {
	context.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
	context.fill();
}

function drawLine(ax, ay, bx, by) {
	context.beginPath();
	context.moveTo(ax, ay);
	context.lineTo(bx, by);
	context.stroke();
}