const assert = require('assert').strict;
const { Color } = require('../../dist/frost-color.min');

describe('Color Primitive Tests', function() {

    describe('#toString', function() {
        it('returns a html color name', function() {
            assert.equal(
                new Color(255, 0, 0)
                    .toString(),
                'red'
            );
        });

        it('returns a short hex string', function() {
            assert.equal(
                new Color(17, 17, 17)
                    .toString(),
                '#111'
            );
        });

        it('returns a hex string', function() {
            assert.equal(
                new Color(120, 50, 50)
                    .toString(),
                '#783232'
            );
        });

        it('returns a rgba string', function() {
            assert.equal(
                new Color(120, 50, 50, .5)
                    .toString(),
                'rgba(120, 50, 50, 0.5)'
            );
        });
    });

    describe('#valueOf', function() {
        it('returns the luma value', function() {
            assert.equal(
                Color.fromHSV(180, 50, 50)
                    .valueOf(),
                0.44684999999999997
            );
        });
    });

    describe('#[Symbol.toPrimitive]', function() {
        it('returns a html color name', function() {
            const color = new Color(255, 0, 0);
            assert.equal(
                `${color}`,
                'red'
            );
        });

        it('returns a short hex string', function() {
            const color = new Color(17, 17, 17);
            assert.equal(
                `${color}`,
                '#111'
            );
        });

        it('returns a hex string', function() {
            const color = new Color(120, 50, 50);
            assert.equal(
                `${color}`,
                '#783232'
            );
        });

        it('returns a rgba string', function() {
            const color = new Color(120, 50, 50, .5);
            assert.equal(
                `${color}`,
                'rgba(120, 50, 50, 0.5)'
            );
        });

        it('returns the luma value', function() {
            const color = Color.fromHSV(180, 50, 50);
            assert.ok(color < .5);
        });
    });

});
