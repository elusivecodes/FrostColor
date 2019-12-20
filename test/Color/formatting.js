const assert = require('assert').strict;
const { Color } = require('../../dist/frost-color.min');

describe('Color Formatting Tests', function() {

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

    describe('#toHexString', function() {
        it('returns a short hex string', function() {
            assert.equal(
                new Color(17, 17, 17)
                    .toHexString(),
                '#111'
            );
        });

        it('returns a short hex string (with alpha)', function() {
            assert.equal(
                new Color(17, 17, 17, .07)
                    .toHexString(),
                '#1111'
            );
        });

        it('returns a hex string', function() {
            assert.equal(
                new Color(120, 50, 50)
                    .toHexString(),
                '#783232'
            );
        });

        it('returns a hex string (with alpha)', function() {
            assert.equal(
                new Color(120, 50, 50, .5)
                    .toHexString(),
                '#7832327f'
            );
        });
    });

    describe('#toRGBString', function() {
        it('returns a rgb string', function() {
            assert.equal(
                new Color(120, 50, 50)
                    .toRGBString(),
                'rgb(120, 50, 50)'
            );
        });

        it('returns a rgba string', function() {
            assert.equal(
                new Color(120, 50, 50, .5)
                    .toRGBString(),
                'rgba(120, 50, 50, 0.5)'
            );
        });
    });

    describe('#toHSLString', function() {
        it('returns a hsl string', function() {
            assert.equal(
                Color.fromHSL(120, 50, 50)
                    .toHSLString(),
                'hsl(120, 50%, 50%)'
            );
        });

        it('returns a hsla string', function() {
            assert.equal(
                Color.fromHSL(120, 50, 50, .5)
                    .toHSLString(),
                'hsla(120, 50%, 50%, 0.5)'
            );
        });
    });

    describe('#label', function() {
        it('returns the closest html color name', function() {
            assert.equal(
                new Color(120, 50, 50)
                    .label(),
                'saddlebrown'
            );
        });

    });

});
