const path = require('path');

const entry = path.join(__dirname, 'src/entry.js');
const output = 'bundle.js';
const publicDir = path.join(__dirname, 'public');

module.exports ={
    context: publicDir,
    entry: entry,
    output: {
        path: publicDir,
        filename: output
    },
    devServer: {
        contentBase: publicDir,
        port: 8090
    }
};