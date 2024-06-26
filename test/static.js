import assert from 'node:assert/strict';
import Color from './../src/index.js';

describe('Color Static', function() {
    describe('#contrast', function() {
        it('returns the contrast between two colors', function() {
            assert.strictEqual(
                Color.contrast(
                    new Color(100, 0, 0),
                    new Color(0, 0, 100),
                ),
                1.3022288504206543,
            );
        });
    });

    describe('#dist', function() {
        it('returns the distance between two colors', function() {
            assert.strictEqual(
                Color.dist(
                    new Color(100, 0, 0),
                    new Color(0, 0, 100),
                ),
                141.4213562373095,
            );
        });
    });

    describe('#findContrast', function() {
        it('returns a minimally contrasting color', function() {
            const color1 = new Color(203, 213, 255);
            const color2 = Color.findContrast(color1);
            assert.strictEqual(
                color2.toString(),
                '#575c6e',
            );
            assert.ok(
                color2 instanceof Color,
            );
        });

        it('returns a minimally contrasting color between two colors', function() {
            const color1 = new Color(203, 213, 255);
            const color2 = new Color(122, 143, 255);
            const color3 = Color.findContrast(color1, color2);
            assert.strictEqual(
                color3.toString(),
                '#4c599e',
            );
            assert.ok(
                color3 instanceof Color,
            );
        });

        it('works with minContrast', function() {
            const color1 = new Color(203, 213, 255);
            const color2 = new Color(122, 143, 255);
            const color3 = Color.findContrast(color1, color2, { minContrast: 3 });
            assert.strictEqual(
                color3.toString(),
                '#6272cc',
            );
            assert.ok(
                color3 instanceof Color,
            );
        });

        it('works with stepSize', function() {
            const color1 = new Color(203, 213, 255);
            const color2 = new Color(122, 143, 255);
            const color3 = Color.findContrast(color1, color2, { stepSize: .1 });
            assert.strictEqual(
                color3.toString(),
                '#495699',
            );
            assert.ok(
                color3 instanceof Color,
            );
        });
    });

    describe('#mix', function() {
        it('returns a new Color mixed from two colors', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = Color.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red',
            );
            assert.strictEqual(
                color2.toString(),
                'blue',
            );
            assert.strictEqual(
                color3.toString(),
                'purple',
            );
            assert.ok(
                color3 instanceof Color,
            );
        });
    });

    describe('#multiply', function() {
        it('returns a new Color multiplied from two colors', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = Color.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red',
            );
            assert.strictEqual(
                color2.toString(),
                'blue',
            );
            assert.strictEqual(
                color3.toString(),
                'maroon',
            );
            assert.ok(
                color3 instanceof Color,
            );
        });
    });
});
