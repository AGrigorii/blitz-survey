const path = require('path');
module.exports = {
    entry: path.join(__dirname, 'source', 'main.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                targets: {
                                    browsers: ['last 5 versions', 'ie >= 11']
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    }
};