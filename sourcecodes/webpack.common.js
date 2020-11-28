module.exports = {
    // target: 'node',
    // node: {
    //     fs: 'empty'
    // },
    entry: {
        indexEntry: './src/js/app.js',
        lottieAnimations: './src/js/animations/lottieAnimations.js',
        styleJS: './src/js/style.js',
        HackathonMap: './src/js/HackathonMap.js',
        // preloadAnimation: './src/js/preloadAnimation.js',
        // textColors: './src/js/textColors.js'
    },
    module: {
        rules: [{
                //Babel loader transpiles the latest version of JS to old js
                // Babel loader compiles ES2015 into ES5 for
                // complete cross-browser support
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },

            {
                //HTML loader Exports HTML as string, hence it can capture file extention names
                test: /\.html$/,
                use: ["html-loader"]
            },

            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'imgsFolder/'
                    }
                }]
            },

            {
                // Apply rule for fonts files
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                    // Using file-loader
                    loader: "file-loader",
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'fontsFolder/'
                    }
                }]
            }
        ]
    }
}