const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

console.log('\x1b[0m');
console.log('Testing new Color constructor');

assert.equal(
    new Color(255, 0, 0).toString(),
    'red'
);
assert.equal(
    new Color(0, 255, 0).toString(),
    'lime'
);
assert.equal(
    new Color(0, 0, 255).toString(),
    'blue'
);
assert.equal(
    new Color(255, 255, 255, 0.5).toString(),
    'rgba(255, 255, 255, 0.5)'
);
assert.equal(
    new Color(100).toString(),
    'white'
);
assert.equal(
    new Color(100, 0.5).toString(),
    'rgba(255, 255, 255, 0.5)'
);

console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing fromString method');

assert.equal(
    Color.fromString('red').toString(),
    'red'
);
assert.equal(
    Color.fromString('#f00').toString(),
    'red'
);
assert.equal(
    Color.fromString('#ff0000').toString(),
    'red'
);
assert.equal(
    Color.fromString('rgb(255, 0, 0)').toString(),
    'red'
);
assert.equal(
    Color.fromString('rgba(255, 0, 0, 1)').toString(),
    'red'
);

console.log('\x1b[32m', 'passed');

assert.equal(
    Color.fromRGB(153, 51, 0).toString(),
    '#930'
);

console.log('\x1b[0m');
console.log('Testing fromHSL method');

assert.equal(
    Color.fromHSL(120, 50, 50).toString(),
    '#40bf40'
);
assert.equal(
    Color.fromHSL(300, 100, 70).toString(),
    '#f6f'
);
assert.equal(
    Color.fromHSL(180, 100, 30, 0.5).toString(),
    'rgba(0, 153, 153, 0.5)'
);

console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing fromHSV method');

assert.equal(
    Color.fromHSV(20, 100, 60).toString(),
    '#930'
);
assert.equal(
    Color.fromHSV(120, 50, 50).toString(),
    '#408040'
);
assert.equal(
    Color.fromHSV(195, 85, 30, 0.5).toString(),
    'rgba(11, 60, 77, 0.5)'
);

console.log('\x1b[32m', 'passed');

console.log('\x1b[0m');
console.log('Testing fromCMYK method');

assert.equal(
    Color.fromCMYK(26, 88, 100, 24).toString(),
    '#8f1700'
);
assert.equal(
    Color.fromCMYK(57, 56, 58, 48).toString(),
    '#393a38'
);
assert.equal(
    Color.fromCMYK(29, 14, 76, 9).toString(),
    '#a5c838'
);

console.log('\x1b[32m', 'passed');