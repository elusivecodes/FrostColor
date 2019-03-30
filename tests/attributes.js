const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

console.log('\x1b[0m');
console.log('Testing getAlpha method');
assert.equal(
    new Color(255, 0, 0, 0.5).getAlpha(),
    0.5
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getBrightness method');
assert.equal(
    Color.fromHSV(120, 50, 50).getBrightness(),
    50
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getHue method');
assert.equal(
    Color.fromHSV(120, 50, 50).getHue(),
    120
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing getSaturation method');
assert.equal(
    Color.fromHSV(120, 50, 50).getSaturation(),
    50
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing luma method');
assert.equal(
    Color.fromHSV(120, 50, 80).luma(),
    0.68608
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setAlpha method');
assert.equal(
    Color.fromHSV(120, 50, 50).setAlpha(0.5).getAlpha(),
    0.5
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setBrightness method');
assert.equal(
    Color.fromHSV(120, 50, 50).setBrightness(30).getBrightness(),
    30
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setHue method');
assert.equal(
    Color.fromHSV(120, 50, 50).setHue(240).getHue(),
    240
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing setSaturation method');
assert.equal(
    Color.fromHSV(120, 50, 50).setSaturation(70).getSaturation(),
    70
);
console.log('\x1b[32m', 'passed');
