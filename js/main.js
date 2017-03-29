/// REFERENCES (for auto-complete/IntelliSense)
/// <reference path="../typings/jquery.d.ts" />

/// GLOBALS
var test_canvas = document.getElementById("test_canvas");
var context = test_canvas.getContext("2d");
var last_time = null;

/// FUNCTIONS
function mainInit() {
    console.log("[DEBUG] mainInit() - begin");
    uiInit();
    window.requestAnimationFrame(animUpdate);
    console.log("[DEBUG] mainInit() - end");
}

function uiInit() {
    console.log("[DEBUG] uiInit() - begin");

    // Initial button states - you can only start
    animationControlsLock(false, true, true, true);

    // Bind button actions
    $("#btnStart").click(startAnimation);
    $("#btnPause").click(pauseAnimation);
    $("#btnContinue").click(continueAnimation);
    $("#btnReset").click(resetAnimation);
    $("#btnGenerateQueue").click(generateSeekPositions);

    // Hide alerts
    $("#alertQueueError").hide();

    // Make sure number inputs are fixed after inputing value
    $("#inputTrackSize").change(function() {
        var trackSize = $("#inputTrackSize").val();

        if (trackSize < 10) {
            $("#inputTrackSize").val("10");
        }
    });
    $("#inputGenerateCount").change(function() {
        var genCount = $("#inputGenerateCount").val();

        if (genCount < 1) {
            $("#inputGenerateCount").val("1");
        }
    });
    $("#inputStartingTrack").change(function() {
        var trackSize = $("#inputTrackSize").val();
        var startingTrack = $("#inputStartingTrack").val();

		
        /* TODO: disabled for now due to weird bug
		if (startingTrack < 0) {
            $("#inputStartingTrack").val("0");
        } else if (startingTrack >= trackSize) {
            $("#inputStartingTrack").val(trackSize - 1);
        }
		*/
    });
	
	generateSeekPositions();

    console.log("[DEBUG] uiInit() - end");
}

// Starts new animation
function startAnimation() {
    console.log("[DEBUG] startAnimation() - begin");
    console.log("[DEBUG] startAnimation() - TrackSize: " + $("#inputTrackSize").val());

    // Hide previous alerts, so fade-in anim always play
    $("#alertQueueError").hide();

    // Lock configuration UI
    configurationLock(true);

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);

    // Do data validation
    if (!validateQueue()) {
        // Enable queue error message
        $("#alertQueueError").alert();
        $("#alertQueueError").fadeIn();

        // Reset controls and unlock configuration 
        animationControlsLock(false, true, true, true);
        configurationLock(false);
        return;
    }

    animStart(getConfigData());

    // Update button states
    animationControlsLock(true, false, true, false);
    console.log("[DEBUG] startAnimation() - end");
}

// Pauses animation
function pauseAnimation() {
    console.log("[DEBUG] pauseAnimation() - begin");

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);

    animSetPaused(true);

    // Update button states
    animationControlsLock(true, true, false, false);
    console.log("[DEBUG] pauseAnimation() - end");
}

// Continues paused animation
function continueAnimation() {
    console.log("[DEBUG] continueAnimation() - begin");

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);
	
	animSetPaused(false);
	
    // Update button states
    animationControlsLock(true, false, true, false);
    console.log("[DEBUG] continueAnimation() - end");
}

// Resets animation (so a new one can be started)
function resetAnimation() {
    console.log("[DEBUG] resetAnimation() - begin");

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);

    // Update button states
    $("#btnStart").prop("disabled", false);
    $("#btnPause").prop("disabled", true);
    $("#btnContinue").prop("disabled", true);
    $("#btnReset").prop("disabled", true);
	
	animReset();

    // Unlock configuration UI
    configurationLock(false);

    // Update button states
    animationControlsLock(false, true, true, true);
    console.log("[DEBUG] resetAnimation() - end");
}

// Lock/Disable or Unlock/Enable configuration inputs
function configurationLock(lock) {
    if (lock) {
        $("#inputTrackSize").prop("disabled", true);
        $("#inputStartingTrack").prop("disabled", true);
        $("#inputSeekPositionQueueGenSelect").prop("disabled", true);
        $("#inputSeekPositionQueueGenSelect").selectpicker("refresh");
        $("#inputGenerateCount").prop("disabled", true);
        $("#btnGenerateQueue").prop("disabled", true);
        $("#inputSeekPositionQueue").prop("disabled", true);
    } else {
        $("#inputTrackSize").prop("disabled", false);
        $("#inputStartingTrack").prop("disabled", false);
        $("#inputSeekPositionQueueGenSelect").prop("disabled", false);
        $("#inputSeekPositionQueueGenSelect").selectpicker("refresh");
        $("#inputGenerateCount").prop("disabled", false);
        $("#btnGenerateQueue").prop("disabled", false);
        $("#inputSeekPositionQueue").prop("disabled", false);
    }
}

// Lock/Disable/true or Unlock/Enable/false animation control buttons 
function animationControlsLock(lockStart, lockPause, lockContinue, lockReset) {
    $("#btnStart").prop("disabled", lockStart);
    $("#btnPause").prop("disabled", lockPause);
    $("#btnContinue").prop("disabled", lockContinue);
    $("#btnReset").prop("disabled", lockReset);
}

function generateSeekPositions() {
    var mode = $("#inputSeekPositionQueueGenSelect").selectpicker("val");
    var genCount = $("#inputGenerateCount").val();
    var trackSize = $("#inputTrackSize").val();

    var positions = [];

    var newPos;
    var step;
    var backAndForthFlag = 0;

    // Generate array
    for (step = 0; step < genCount; step++) {
        if (mode == "unsorted") {
            newPos = Math.floor(Math.random() * trackSize);
            positions.push(newPos);
        } else if (mode == "sorted") {
            newPos = Math.floor(Math.random() * trackSize);
            positions.push(newPos);

            if (step + 1 >= genCount) {
                positions.sort(function(a, b) { return a - b; });
            }
        } else if (mode == "rsorted") {
            newPos = Math.floor(Math.random() * trackSize);
            positions.push(newPos);

            if (step + 1 >= genCount) {
                positions.sort(function(a, b) { return b - a; });
            }
        } else if (mode == "backnforth") {
            newPos = Math.floor(Math.random() * (trackSize / 2 - 1)) + (trackSize / 2) * backAndForthFlag;
            backAndForthFlag = ~backAndForthFlag & 1; // Flip bit
            positions.push(newPos);
        }
    }

    // Append array to queue input
    if ($("#inputSeekPositionQueue").val().trim().length > 0) {
        $("#inputSeekPositionQueue").val(function() {
            return this.value + ", " + positions.join(", ");
        });
    } else {
        $("#inputSeekPositionQueue").val(function() {
            return positions.join(", ");
        });
    }
}

function validateQueue() {
    // Prepare for checks
    var trackSize = $("#inputTrackSize").val();
    var content = $("#inputSeekPositionQueue").val();
    content = content.replace(/\s+/g, "");
    content = content.replace(/,$/g, "");

    // Check format
    var re = new RegExp(/^\d+(,\d+)*$/);
    if (!re.test(content)) {
        return false;
    }

    // Check values
    var positions = content.split(",");
    var index;
    for (index = 0; index < positions.length; index++) {
        if (parseInt(positions[index]) > trackSize) {
            return false;
        }
    }

    return true;
}

// Returns simple JSON object of configuration data
function getConfigData() {
    var data = {};

    // Fetch track size
    data.trackSize = $("#inputTrackSize").val();

    // Fetch track starting position
    data.trackStart = $("#inputStartingTrack").val();

    // Queue
    data.seekQueue = [];
    var queueInputValues = $("#inputSeekPositionQueue").val();
    queueInputValues = queueInputValues.replace(/\s+/g, "");
    queueInputValues = queueInputValues.replace(/,$/g, "");
    var positionStrings = queueInputValues.split(",");

    var index;
    for (index = 0; index < positionStrings.length; index++) {
        data.seekQueue.push({
            "index": index,
            "pos": parseInt(positionStrings[index])
        });
    }

    return data;
}