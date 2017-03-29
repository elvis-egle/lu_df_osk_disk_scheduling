var anim_time = 0;
var anim_paused = true;
var anim_data = null;

var anim_track_size, anim_track_start;

var anim_colors = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'indigo',
	'violet'
];

function animSetup(config) {
	anim_track_size = config.trackSize;
	anim_track_start = config.trackStart;
	
	anim_data = [];
	
	var color_index = 0;
	for (var algo_id in algos) {
		var algo_info = algos[algo_id];
		
		var processed_queue = algo_info.func(anim_track_size, anim_track_start, config.seekQueue);
		if (processed_queue != null) {
			var algo_data = {
				id: algo_id,
				info: algo_info,
				queue: processed_queue,
				color: anim_colors[color_index++]
			};
			
			anim_data.push(algo_data);	
		}
	}
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
	
	var radius_initial = 4;
	
	var padding = 20;
	var line_y = padding * 3 / 2;
	var start_x = 0;
	
	drawLine(padding, line_y, canvas_width - padding, line_y);
	
	var segment_width = (canvas_width - 2 * padding) / (anim_track_size - 1);
	
	for (var track_index = 0; track_index < anim_track_size; track_index++) {
		var notch_x = padding + track_index * segment_width;
		
		// TODO: draw text for each notch?
		drawLine(notch_x, line_y - padding / 2, notch_x, line_y + padding / 2);
		
		if (track_index == anim_track_start) {
			drawCircle(notch_x, line_y, radius_initial);
			start_x = notch_x;
		}
	}
	
	for (var algo_index in anim_data) {
		var node_y = line_y;
		
		var prev_node_pos = anim_track_start;
		
		var prev_x = start_x;
		var prev_y = line_y;
			
		var radius_incr = 2;
		var radius = radius_initial;
		
		var algo_data = anim_data[algo_index];
		
		// TODO: calculate entire path in animSetup?
			
		for (var i in algo_data.queue) {
			var pos = algo_data.queue[i].pos;
			
			// TODO: make sure this fits into canvas_height?
			node_y += 0.25 * segment_width * Math.abs(pos - prev_node_pos);
			
			if (prev_node_pos == pos) {
				radius += radius_incr;
			}
			else {
				radius = radius_initial;
			}
			
			// TODO: move this x calculation to a separate function
			var node_x = padding + pos * segment_width;
			
			context.strokeStyle = algo_data.color;
			drawLine(prev_x, prev_y, node_x, node_y);
			drawCircle(node_x, node_y, radius);
			
			prev_node_pos = pos;
			
			prev_x = node_x;
			prev_y = node_y;
		}
	}
	
    context.font = "9px Courier New";
    context.fillText(round(dt * 1000, 2) + "ms", 0, 0);
}

function drawCircle(x, y, radius) {
	context.beginPath();
	context.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
	context.stroke();
}

function drawLine(ax, ay, bx, by) {
	context.beginPath();
	context.moveTo(ax, ay);
	context.lineTo(bx, by);
	context.stroke();
}