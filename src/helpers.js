function lerp(a, b, amount) {
    return a * (1 - amount) + b * amount;
}

function clamp(val, min = 0, max = 100) {
    return val > min ? val < max ? val : max : min;
}