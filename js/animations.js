var anim_time = 0;
var anim_paused = true;
var anim_data = null;

function animStart(config) {
	anim_time = 0;
	anim_paused = false;
	
	anim_track_size = config.trackSize;
	anim_track_start = config.trackStart;
	
	// calculate results for all algorithms and put them in anim_data
}

function animSetPaused(paused) {
	anim_paused = paused;
}

function animReset() {
	anim_time = 0;
	anim_paused = true;
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
    context.strokeRect(0, 0, canvas_width, canvas_height);

    context.textBaseline = "top";
    context.fillStyle = "black";
    context.font = "9px Courier New";
    context.fillText(round(dt * 1000, 2) + "ms", 0, 0);

    var f = Math.sin(t * Math.PI * 2 * 0.1) * 0.5 + 0.5;

    context.fillStyle = "green";
    context.fillRect(canvas_width * f - 10, 20, 30, 40);
}
