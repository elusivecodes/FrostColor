const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

describe('Color Palette Tests', function() {

    describe('#shades', function() {
        it('creates a shades palette', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .shades()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#3a743a',
                    '#346834',
                    '#2e5d2e',
                    '#295129',
                    '#234623',
                    '#1d3a1d',
                    '#172e17',
                    '#112311',
                    '#0c170c'
                ]
            );
        });

        it('works with shades argument', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .shades(5)
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#356a35',
                    '#2b552b',
                    '#204020',
                    '#152b15'
                ]
            );
        });
    });

    describe('#tints', function() {
        it('creates a tints palette', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .tints()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#518b51',
                    '#639763',
                    '#74a274',
                    '#85ae85',
                    '#97b997',
                    '#a8c5a8',
                    '#b9d1b9',
                    '#cbdccb',
                    '#dce8dc'
                ]
            );
        });

        it('works with tints argument', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .tints(5)
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#609560',
                    '#80aa80',
                    '#9fbf9f',
                    '#bfd5bf'
                ]
            );
        });
    });

    describe('#tones', function() {
        it('creates a tones palette', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .tones()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#468046',
                    '#4b804b',
                    '#518051',
                    '#578057',
                    '#5d805d',
                    '#638063',
                    '#688068',
                    '#6e806e',
                    '#748074'
                ]
            );
        });

        it('works with tones argument', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .tones(5)
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#4a804a',
                    '#558055',
                    '#608060',
                    '#6a806a'
                ]
            );
        });
    });

    describe('#palette', function() {
        it('creates a color palette', function() {
            const palette = Color.fromHSV(120, 50, 50)
                .palette();

            assert.ok('shades' in palette);
            assert.ok('tints' in palette);
            assert.ok('tones' in palette);

            assert.deepEqual(
                {
                    shades: palette.shades
                        .map(
                            color => color.toString()
                        ),
                    tints: palette.tints
                        .map(
                            color => color.toString()
                        ),
                    tones: palette.tones
                        .map(
                            color => color.toString()
                        )
                },
                {
                    shades: [
                        '#408040',
                        '#3a743a',
                        '#346834',
                        '#2e5d2e',
                        '#295129',
                        '#234623',
                        '#1d3a1d',
                        '#172e17',
                        '#112311',
                        '#0c170c'
                    ],
                    tints: [
                        '#408040',
                        '#518b51',
                        '#639763',
                        '#74a274',
                        '#85ae85',
                        '#97b997',
                        '#a8c5a8',
                        '#b9d1b9',
                        '#cbdccb',
                        '#dce8dc'
                    ],
                    tones: [
                        '#408040',
                        '#468046',
                        '#4b804b',
                        '#518051',
                        '#578057',
                        '#5d805d',
                        '#638063',
                        '#688068',
                        '#6e806e',
                        '#748074'
                    ]
                }
            );
        });

        it('works with shades argument', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .palette(5, 0, 0)
                    .shades
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#356a35',
                    '#2b552b',
                    '#204020',
                    '#152b15'
                ]
            );
        });

        it('works with tints argument', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .palette(0, 5, 0)
                    .tints
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#609560',
                    '#80aa80',
                    '#9fbf9f',
                    '#bfd5bf'
                ]
            );
        });

        it('works with tones argument', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .palette(0, 0, 5)
                    .tones
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408040',
                    '#4a804a',
                    '#558055',
                    '#608060',
                    '#6a806a'
                ]
            );
        });
    });

});
