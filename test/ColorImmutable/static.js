const assert = require('assert');
const { Color, ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Static', function() {

    describe('#contrast', function() {
        it('returns the contrast between two colors', function() {
            assert.strictEqual(
                Color.contrast(
                    new ColorImmutable(100, 0, 0),
                    new ColorImmutable(0, 0, 100)
                ),
                1.3022288504206543
            );
        });

        it('works with Color', function() {
            assert.strictEqual(
                Color.contrast(
                    new ColorImmutable(100, 0, 0),
                    new Color(0, 0, 100)
                ),
                1.3022288504206543
            );
        });
    });

    describe('#dist', function() {
        it('returns the distance between two colors', function() {
            assert.strictEqual(
                ColorImmutable.dist(
                    new ColorImmutable(100, 0, 0),
                    new ColorImmutable(0, 0, 100)
                ),
                141.4213562373095
            );
        });

        it('works with Color', function() {
            assert.strictEqual(
                ColorImmutable.dist(
                    new ColorImmutable(100, 0, 0),
                    new Color(0, 0, 100)
                ),
                141.4213562373095
            );
        });
    });

    describe('#findContrast', function() {
        it('returns a minimally contrasting color between two colors', function() {
            const color1 = new ColorImmutable(203, 213, 255);
            const color2 = new ColorImmutable(122, 143, 255);
            const color3 = ColorImmutable.findContrast(color1, color2);
            assert.strictEqual(
                color3.toString(),
                '#4c599e'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with minContrast', function() {
            const color1 = new ColorImmutable(203, 213, 255);
            const color2 = new ColorImmutable(122, 143, 255);
            const color3 = ColorImmutable.findContrast(color1, color2, 3);
            assert.strictEqual(
                color3.toString(),
                '#6272cc'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with stepSize', function() {
            const color1 = new ColorImmutable(203, 213, 255);
            const color2 = new ColorImmutable(122, 143, 255);
            const color3 = ColorImmutable.findContrast(color1, color2, 4.5, 0.1);
            assert.strictEqual(
                color3.toString(),
                '#495699'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with Color', function() {
            const color1 = new ColorImmutable(203, 213, 255);
            const color2 = new Color(122, 143, 255);
            const color3 = ColorImmutable.findContrast(color1, color2);
            assert.strictEqual(
                color3.toString(),
                '#4c599e'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });
    });

    describe('#mix', function() {
        it('returns a new ColorImmutable mixed from two colors', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = ColorImmutable.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with Color', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with two Color', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.mix(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'purple'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });
    });

    describe('#multiply', function() {
        it('returns a new ColorImmutable multiplied from two colors', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(0, 0, 255);
            const color3 = ColorImmutable.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with Color', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });

        it('works with two Color', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new Color(0, 0, 255);
            const color3 = ColorImmutable.multiply(color1, color2, .5);
            assert.strictEqual(
                color1.toString(),
                'red'
            );
            assert.strictEqual(
                color2.toString(),
                'blue'
            );
            assert.strictEqual(
                color3.toString(),
                'maroon'
            );
            assert.ok(
                color3 instanceof ColorImmutable
            );
        });
    });
});
