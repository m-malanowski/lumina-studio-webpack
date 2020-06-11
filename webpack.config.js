var path = require('path');
module.exports = {
    entry: {
        common: './src/js/common.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
                include: [
                    path.resolve(__dirname, 'node_modules', '@dogstudio', 'highway')
                ]
            },
            {
                test: /\.(jpe?g|png|ico|gif|svg)$/,
                loader: "file-loader",
                query: {
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath:  './src/assets/fonts'
                        }
                    }
                     ]
            },
            {
                test: /\.(glb|gltf)$/,
                use:
                    [
                        {
                            loader: 'file-loader',

                        }
                    ]
            },
            {
                test: [/\.(scss)$/, /\.(css)$/],
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            'highway': 'build/highway.js'
        },
    },
    devServer: {
        contentBase: './public',
        watchContentBase: true
    },
    // target: 'node'
};
