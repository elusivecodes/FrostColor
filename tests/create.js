const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

describe('Color Creation Tests', function() {

    describe('#constructor', function() {
        it('works with red argument', function() {
            assert.equal(
                new Color(255, 0, 0)
                    .toString(),
                'red'
            );
        });

        it('works with green argument', function() {
            assert.equal(
                new Color(0, 255, 0)
                    .toString(),
                'lime'
            );
        });

        it('works with blue argument', function() {
            assert.equal(
                new Color(0, 0, 255)
                    .toString(),
                'blue'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                new Color(255, 255, 255, 0.5)
                    .toString(),
                'rgba(255, 255, 255, 0.5)'
            );
        });

        it('works with brightness argument', function() {
            assert.equal(
                new Color(100)
                    .toString(),
                'white'
            );
        });

        it('works with brightness and alpha arguments', function() {
            assert.equal(
                new Color(100, 0.5)
                    .toString(),
                'rgba(255, 255, 255, 0.5)'
            );
        });
    });

    describe('#fromString', function() {
        it('works with color name', function() {
            assert.equal(
                Color.fromString('red')
                    .toString(),
                'red'
            );
        });

        it('works with hex string', function() {
            assert.equal(
                Color.fromString('#ff0000')
                    .toString(),
                'red'
            );
        });

        it('works with short hex string', function() {
            assert.equal(
                Color.fromString('#f00')
                    .toString(),
                'red'
            );
        });

        it('works with rgb string', function() {
            assert.equal(
                Color.fromString('rgb(255, 0, 0)')
                    .toString(),
                'red'
            );
        });

        it('works with rgba string', function() {
            assert.equal(
                Color.fromString('rgba(255, 0, 0, 1)')
                    .toString(),
                'red'
            );
        });
    });

    describe('#fromRGB', function() {
        it('works with rgb arguments', function() {
            assert.equal(
                Color.fromRGB(155, 30, 70)
                    .toString(),
                '#9b1e46'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                Color.fromRGB(180, 100, 30, .5)
                    .toString(),
                'rgba(180, 100, 30, 0.5)'
            );
        });
    });

    describe('#fromHSL', function() {
        it('works with hsl arguments', function() {
            assert.equal(
                Color.fromHSL(155, 30, 70)
                    .toString(),
                '#9cc9b6'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                Color.fromHSL(180, 100, 30, .5)
                    .toString(),
                'rgba(0, 153, 153, 0.5)'
            );
        });
    });

    describe('#fromHSV', function() {
        it('works with hsv arguments', function() {
            assert.equal(
                Color.fromHSV(155, 30, 70)
                    .toString(),
                '#7db39c'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                Color.fromHSV(180, 100, 30, .5)
                    .toString(),
                'rgba(0, 77, 77, 0.5)'
            );
        });
    });

    describe('#fromCMY', function() {
        it('works with cmy arguments', function() {
            assert.equal(
                Color.fromCMY(77, 15, 35)
                    .toString(),
                '#3bd9a6'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                Color.fromCMY(90, 50, 15, .5)
                    .toString(),
                'rgba(25, 128, 217, 0.5)'
            );
        });
    });

    describe('#fromCMYK', function() {
        it('works with cmyk arguments', function() {
            assert.equal(
                Color.fromCMYK(77, 15, 35, 45)
                    .toString(),
                '#20775b'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                Color.fromCMYK(90, 50, 15, 55, .5)
                    .toString(),
                'rgba(11, 57, 98, 0.5)'
            );
        });
    });

});
