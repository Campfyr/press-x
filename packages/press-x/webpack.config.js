const path = require('path');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = (env) => {
    const {production: isProduction} = env;
    const envMode = isProduction ? 'production' : 'development'

    return {
        mode: envMode,
        watch: !isProduction,
        devtool: isProduction ? 'eval-source-map' : 'inline-source-map',
        stats: isProduction ? 'normal' : 'errors-only',
        entry: './src/index.ts',
        plugins: [
            new TypescriptDeclarationPlugin({out: 'press-x.d.ts'})
        ],
        output: {
            filename: 'press-x.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            globalObject: 'this',
            library: {
                name: "pressX",
                type: "umd",
                export: "default"
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules)/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
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