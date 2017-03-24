function round(x, n) {
    if (!n) {
        n = 0;
    }
    var dec = Math.pow(10, n);
    return Math.round(x * dec) / dec;
}