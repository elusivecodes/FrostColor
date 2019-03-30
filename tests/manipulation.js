const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

console.log('\x1b[0m');
console.log('Testing darken method');
assert.equal(
    Color.fromHSV(120, 50, 50).darken(0.5).toString(),
    '#204040'
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing lighten method');
assert.equal(
    Color.fromHSV(120, 50, 50).lighten(0.5).toString(),
    '#95caca'
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing shade method');
assert.equal(
    Color.fromHSV(120, 50, 50).shade(0.3).toString(),
    '#2d592d'
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing tint method');
assert.equal(
    Color.fromHSV(120, 50, 50).tint(0.3).toString(),
    '#79a679'
);
console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing tone method');
assert.equal(
    Color.fromHSV(120, 50, 50).tone(0.3).toString(),
    '#537f53'
);
console.log('\x1b[32m', 'passed');
