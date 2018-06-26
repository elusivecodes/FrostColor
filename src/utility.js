function clamp(value, min = 0, max = 1) {
    return value < min ?
        min : value > max ?
            max : value;
}

function lerp(a, b, amount) {
    return a * (1 - amount) + b * amount;
}