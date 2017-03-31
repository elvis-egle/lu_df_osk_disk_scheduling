function fcfs(arr) {
	var result = arr.slice();
	return result;
}

function sstf(start, arr) {
    var result = [];
    var ordered = arr.slice();
    ordered.sort(function (a, b) {
        return a.pos - b.pos;
    });
    var i=0;
    for (var index in arr) {
        if (start<ordered[index].pos)
        {
            break;
        }
        i++;
    }
    var prev = start;
    while (ordered.length!=0) {
        if (i<=0) {
            result.push(ordered[0]);
            ordered.splice(0,1);
        }
        else if (i>=ordered.length) {
            result.push(ordered[ordered.length-1]);
            ordered.splice(ordered.length-1,1);
        }
        else if ((prev-ordered[i-1].pos)<(ordered[i].pos-prev)) {
            result.push(ordered[i-1]);
            prev = ordered[i-1].pos;
            ordered.splice(i-1,1);
            i--;
        }
        else {
            result.push(ordered[i]);
            prev = ordered[i].pos;
            ordered.splice(i,1);
        }
    }
    return result;
}

var algos = {
	fcfs: {
		name: 'First Come-First Serve (FCFS)',
		func: function (track_start, track_size, seek_queue) {
			var result = fcfs(seek_queue);
			return result;
		}
	},
	
	/*dummy: {
		name: 'Really dumb algo',
		func: function (track_start, track_size, seek_queue) {
			var result = yolo_copy(seek_queue);
			result.sort(function (a, b) {
				return a.pos - b.pos;
			});
			return result;
		}
	},*/
	
	sstf: {
		name: 'Shortest Seek Time First (SSTF)',
		func: function (track_start, track_size, seek_queue) {
			var result = sstf(track_start, seek_queue);
            return result;
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