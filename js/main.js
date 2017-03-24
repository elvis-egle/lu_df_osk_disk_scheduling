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
    update();
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

    // Make sure number inputs are fixed after inputing value
    $("#inputTrackSize").change(function() {
        var trackSize = $("#inputTrackSize").val();

        if (trackSize < 10) {
            $("#inputTrackSize").val("10");
        }
    });
    $("#inputGenerateCount").change(function() {
        var trackSize = $("#inputGenerateCount").val();

        if (trackSize < 1) {
            $("#inputGenerateCount").val("1");
        }
    });

    console.log("[DEBUG] uiInit() - end");
}

// Starts new animation
function startAnimation() {
    console.log("[DEBUG] startAnimation() - begin");
    console.log("[DEBUG] startAnimation() - TrackSize: " + $("#inputTrackSize").val());

    // Lock configuration UI
    configurationLock(true);

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);

    // Get config data if needed
    var data = getConfigData();

    // Start animation code/function here...

    // Update button states
    animationControlsLock(true, false, true, false);
    console.log("[DEBUG] startAnimation() - end");
}

// Pauses animation
function pauseAnimation() {
    console.log("[DEBUG] pauseAnimation() - begin");

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);

    // Get config data if needed
    var data = getConfigData();

    // Pause animation code/function here...

    // Update button states
    animationControlsLock(true, true, false, false);
    console.log("[DEBUG] pauseAnimation() - end");
}

// Continues paused animation
function continueAnimation() {
    console.log("[DEBUG] continueAnimation() - begin");

    // Lock button states before handling state transition
    animationControlsLock(true, true, true, true);

    // Get config data if needed
    var data = getConfigData();

    // Continue animation code/function here...

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

    // Get config data if needed
    var data = getConfigData();

    // Reset animation code/function here...

    // Unlock configuration UI
    configurationLock(false);

    // Update button states
    animationControlsLock(false, true, true, true);
    console.log("[DEBUG] resetAnimation() - end");
}

// Lock/Disable or Unlock/Enable configuration inputs
function configurationLock(lock) {
    if (lock) {
        $("#algorithmSelect").prop("disabled", true);
        $("#algorithmSelect").selectpicker("refresh");
        $("#inputTrackSize").prop("disabled", true);
    } else {
        $("#algorithmSelect").prop("disabled", false);
        $("#algorithmSelect").selectpicker("refresh");
        $("#inputTrackSize").prop("disabled", false);
    }
}

// Lock/Disable/true or Unlock/Enable/false animation control buttons 
function animationControlsLock(lockStart, lockPause, lockContinue, lockReset) {
    $("#btnStart").prop("disabled", lockStart);
    $("#btnPause").prop("disabled", lockPause);
    $("#btnContinue").prop("disabled", lockContinue);
    $("#btnReset").prop("disabled", lockReset);
}

// Returns simple JSON object of configuration data
function getConfigData() {
    var data = {};
    // Fetch algorithm. Possible values:
    //  "fcfs" - FCFS (First Come, First Served)
    //  "sstf" - SSTF (Shortest Seek Time First)
    //  "scan" - Elevator (SCAN)
    //  "cscan" - Circular SCAN (C-SCAN)
    //  "look" - LOOK
    //  "clook" - C-LOOK
    data.algorithm = $("#algorithmSelect").selectpicker("val");

    // Fetch track size
    data.trackSize = $("#inputTrackSize").val();

    // Queue
    data.seekQueue = [1, 9, 2, 8, 3, 7, 4, 6, 5]; // TODO: Finish queue ui input logic

    return data;
}