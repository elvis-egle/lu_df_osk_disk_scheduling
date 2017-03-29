function yolo_copy(arr) {
	var result = [];
	for (var index in arr) {
		result[index] = arr[index];
	}
	return result;
}

var algos = {
	fcfs: {
		name: 'First Come-First Serve (FCFS)',
		func: function (track_start, track_size, seek_queue) {
			var result = yolo_copy(seek_queue);
			return result;
		}
	},
	
	dummy: {
		name: 'Really dumb algo',
		func: function (track_start, track_size, seek_queue) {
			var result = yolo_copy(seek_queue);
			result.sort(function (a, b) {
				return a.pos - b.pos;
			});
			return result;
		}
	},
	
	sstf: {
		name: 'Shortest Seek Time First (SSTF)',
		func: function (track_start, track_size, seek_queue) {
			return null;
		}
	},
	
	scan: {
		name: 'Elevator (SCAN)',
		func: function (track_start, track_size, seek_queue) {
			return null;
		}
	},
	
	cscan: {
		name: 'Circular SCAN (C-SCAN)',
		func: function (track_start, track_size, seek_queue) {
			return null;
		}
	},
	
	look: {
		name: 'LOOK',
		func: function (track_start, track_size, seek_queue) {
			return null;
		}
	},
	
	clook: {
		name: 'C-LOOK',
		func: function (track_start, track_size, seek_queue) {
			return null;
		}
	}
};