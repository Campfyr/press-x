const path = require('path');

module.exports = (env) => {
    const {production: isProduction} = env;
    const envMode = isProduction ? 'production' : 'development'

    return {
        mode: envMode,
        watch: !isProduction,
        devtool: isProduction ? 'eval-source-map' : 'source-map',
        stats: isProduction ? 'normal' : 'errors-only',
        entry: './src/index.ts',
        output: {
            filename: 'press-x.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            globalObject: 'this',
            library: {
                name: "press-x",
                type: "umd"
            }
        },
        module: {
            rules: [
                {
                    test: /\.[m?j|t]s$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ]
                        }
                    }
                }
            ],
        },
        optimization: {
            usedExports: true,
        },
        resolve: {
            extensions: ['.ts'],
        }
    };
}