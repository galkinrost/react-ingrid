/* eslint-disable */
var path = require('path');

var glob = require('glob');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

function createConfig (filepath) {
    var filename = path.basename(filepath, '.example.js');
    var outputPath = path.dirname(filepath);

    return {

        entry: path.resolve(__dirname, filepath),

        module: {
            loaders: [
                { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
            ]
        },

        output: {
            filename: filename + '.js',
            path: path.resolve(__dirname, outputPath)
        },

        plugins: [
            {
                apply: function apply(compiler) {
                    compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
                        this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
                        return false
                    })
                }
            },
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            })
        ]
    };
}

module.exports = glob.sync('examples/**/*.example.js').map(createConfig);
