function round(x, n) {
    if (!n) {
        n = 0;
    }
    var dec = Math.pow(10, n);
    return Math.round(x * dec) / dec;
}

function maxInArray(a) {
    if ($.isArray(a) && a.length > 0) {
        var index;
        var max = a[0];
        var maxIndex = 0;
        for (index = 1; index < a.length; ++index) {
            if (a[index] > max) {
                max = a[index];
                maxIndex = index;
            }
        }

        return { "value": max, "index": maxIndex };
    } else {
        return { "value": 0, "index": -1 };
    }
}

function minInArray(a) {
    if ($.isArray(a) && a.length > 0) {
        var index;
        var min = a[0];
        var minIndex = 0;
        for (index = 1; index < a.length; ++index) {
            if (a[index] < min) {
                min = a[index];
                minIndex = index;
            }
        }

        return { "value": min, "index": minIndex };
    } else {
        return { "value": 0, "index": -1 };
    }
}

/// Bootstrap js extensions
$(function() {
    $("[data-hide]").on("click", function() {
        $("." + $(this).attr("data-hide")).hide();
    });
});