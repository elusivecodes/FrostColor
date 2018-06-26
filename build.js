const path = require('path');
const filepath = require('filepath');
const concat = require('concat');
const UglifyJS = require('uglify-es');

const srcFolder = 'src';
const distFolder = 'dist';

const wrapper = `(function(window) {

%%CODE%%

})(window);`;

loadFiles(srcFolder, 'js')
    .then(files => jsChain(files, 'color', wrapper));

function jsChain(jsFiles, name, wrapper) {
    if ( ! jsFiles.length) {
        return;
    }

    concat(jsFiles)
    .then(code => {
        code = wrapper.replace('%%CODE%%', code);
        const destination = path.join(distFolder, 'frost-' + name + '.js');
        filepath.create(destination).write(code);
        return code;
    })
    .then(UglifyJS.minify)
    .then(result => {
        if (result.error) {
            console.error(result.error);
        } else {
            const destination = path.join(distFolder, 'frost-' + name + '.min.js');
            filepath.create(destination).write(result.code);
        }
    })
    .catch(console.error);
}

function loadFiles(folder, ext) {
    const results = [];

    return new Promise (resolve => {
        filepath.create(folder).recurse(path => {
            if ( ! path.isFile()) {
                return;
            }

            if (path.extname(path.path) === '.' + ext) {
                results.push(path.path);
            }
        });
        resolve(results);
    });
}