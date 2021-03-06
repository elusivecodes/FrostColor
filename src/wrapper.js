/**
 * FrostColor v3.0.0
 * https://github.com/elusivecodes/FrostColor
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(this, function() {
    'use strict';

    // {{code}}
    return {
        Color,
        ColorImmutable
    };

});